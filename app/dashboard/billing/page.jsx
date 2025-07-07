"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Calendar,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  IndianRupee,
  Receipt,
  AlertCircle,
  Crown,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthProvider";
import Razorpay from "razorpay";
import Script from "next/script";

export default function Billing() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [planData, setPlanData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const FetchPlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/payments/fetch-plans`,
          { withCredentials: true }
        );

        setPlanData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching plans:", err);
        toast.error(err?.response?.data?.message || "Failed to fetch plans");
      }
    };

    FetchPlans();
  }, []);

  // Mock billing data

  const handlePayment = async (plan_id) => {
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/payments/create-subscription`,
        { plan_id },
        { withCredentials: true }
      );

      const { key, subscription_id } = res.data;

      const loadRazorpay = () => {
        return new Promise((resolve, reject) => {
          if (window.Razorpay) return resolve();

          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve();
          script.onerror = () => reject("Failed to load Razorpay SDK");
          document.body.appendChild(script);
        });
      };

      await loadRazorpay(); // ✅ Wait for Razorpay to load

      const options = {
        key,
        subscription_id,
        name: "Digidine",
        description: "Digidine Subscription",
        image: "/logo.png",
        handler: function (response) {
          console.log("Payment successful:", response);
          axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/payments/payment-response`,
            response,
            { withCredentials: true }
          );
        },
        modal: {
          ondismiss: function () {
            if (confirm("Are you sure you want to close the form?")) {
              console.log("Checkout form closed by the user");
            } else {
              console.log("Complete the payment");
            }
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      success: "default",
      failed: "destructive",
      pending: "secondary",
    };
    return (
      <Badge variant={variants[status] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isLoading)
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <>
            <div className="border border-gray-200 shadow-lg rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
            <div className="border border-gray-200 shadow-lg rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
            <div className="border border-gray-200 shadow-lg rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
          </>
        </div>
      </>
    );
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Billing & Subscription
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription and payment history.
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="plans">Plans & Pricing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Plan */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-600" />
                    Current Plan
                  </CardTitle>
                  <CardDescription>
                    Your active subscription details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">Current Plan name</h3>
                      <p className="text-gray-600">₹price/ .interval</p>
                    </div>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      currentPlan.status
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Plan Features:</h4>
                    <ul className="space-y-1">
                      {/* {billingData.currentPlan.features.map(
                        (feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            {feature}
                          </li>
                        )
                      )} */}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Next billing date
                        </p>
                        <p className="font-medium">nextBilling</p>
                      </div>
                      <Button variant="outline">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Update Payment Method
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Invoice
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Receipt className="mr-2 h-4 w-4" />
                    View All Invoices
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Change Plan
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">QR Code Scans</span>
                    <span className="font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Menu Views</span>
                    <span className="font-medium">1,923</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Analytics Exports</span>
                    <span className="font-medium">12</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Your recent transactions and invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                payment history
                {/* {billingData.paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(payment.status)}
                      <div>
                        <h4 className="font-medium">{payment.description}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString()} •{" "}
                          {payment.method}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <IndianRupee className="h-4 w-4" />
                        <span className="font-medium">{payment.amount}</span>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Receipt className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planData.items.map((plan) => (
              <Card
                key={Math.random()}
                className={`relative ${"border-blue-500 shadow-lg"}`}
              >
                <CardHeader className="text-center">
                  <CardTitle>{plan.item.name}</CardTitle>

                  <div className="text-3xl font-bold">
                    ₹{plan.item.amount / plan.item.unit_amount}
                    <span className="text-sm font-normal text-gray-500">
                      /{plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {plan.item.description}
                    </div>
                  </div>{" "}
                  <Button
                    className="w-full cursor-pointer"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handlePayment(plan.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Upgrade Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                We accept all major payment methods through Razorpay
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center justify-center p-4 border rounded-lg">
                  <span className="text-sm font-medium">UPI</span>
                </div>
                <div className="flex items-center justify-center p-4 border rounded-lg">
                  <span className="text-sm font-medium">Credit Card</span>
                </div>
                <div className="flex items-center justify-center p-4 border rounded-lg">
                  <span className="text-sm font-medium">Debit Card</span>
                </div>
                <div className="flex items-center justify-center p-4 border rounded-lg">
                  <span className="text-sm font-medium">Net Banking</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
