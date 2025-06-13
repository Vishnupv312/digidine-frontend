"use client";

import { useState } from "react";
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

export default function Billing() {
  const [isLoading, setIsLoading] = useState(false);

  // Mock billing data
  const billingData = {
    currentPlan: {
      name: "Pro Plan",
      price: 1,
      currency: "INR",
      interval: "month",
      features: [
        "Unlimited QR codes",
        "Advanced analytics",
        "Custom branding",
        "Priority support",
        "Export data",
      ],
      nextBilling: "2024-01-15",
      status: "active",
    },
    paymentHistory: [
      {
        id: "pay_123456789",
        amount: 1,
        currency: "INR",
        status: "success",
        date: "2023-12-15",
        description: "Pro Plan - Monthly",
        invoice: "INV-2023-001",
        method: "UPI",
      },
      {
        id: "pay_123456788",
        amount: 1,
        currency: "INR",
        status: "success",
        date: "2023-11-15",
        description: "Pro Plan - Monthly",
        invoice: "INV-2023-002",
        method: "Credit Card",
      },
      {
        id: "pay_123456787",
        amount: 1,
        currency: "INR",
        status: "failed",
        date: "2023-10-15",
        description: "Pro Plan - Monthly",
        invoice: "INV-2023-003",
        method: "Net Banking",
      },
      {
        id: "pay_123456786",
        amount: 999,
        currency: "INR",
        status: "success",
        date: "2023-09-15",
        description: "Pro Plan - Monthly",
        invoice: "INV-2023-004",
        method: "UPI",
      },
    ],
    plans: [
      {
        name: "Basic",
        price: 1,
        currency: "INR",
        interval: "month",
        features: [
          "1 QR code",
          "Basic analytics",
          "Standard support",
          "Menu updates",
        ],
        popular: false,
      },
      {
        name: "Pro",
        price: 1,
        currency: "INR",
        interval: "month",
        features: [
          "Unlimited QR codes",
          "Advanced analytics",
          "Custom branding",
          "Priority support",
          "Export data",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: 1,
        currency: "INR",
        interval: "month",
        features: [
          "Everything in Pro",
          "White-label solution",
          "API access",
          "Dedicated support",
          "Custom integrations",
        ],
        popular: false,
      },
    ],
  };

  const handlePayment = async (planName, amount) => {
    setIsLoading(true);

    try {
      // Simulate Razorpay payment integration
      const options = {
        key: "rzp_test_1234567890", // Replace with your Razorpay key
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "DigiDine",
        description: `${planName} Plan Subscription`,
        image: "/logo.png",
        handler: (response) => {
          console.log("Payment successful:", response);
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#205781",
        },
      };

      // In a real app, you would load Razorpay script and create payment
      // const rzp = new window.Razorpay(options)
      // rzp.open()

      // For demo purposes, simulate successful payment
      setTimeout(() => {
        alert(
          "Payment simulation completed! In production, this would integrate with Razorpay."
        );
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
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
                      <h3 className="text-2xl font-bold">
                        {billingData.currentPlan.name}
                      </h3>
                      <p className="text-gray-600">
                        ₹{billingData.currentPlan.price}/
                        {billingData.currentPlan.interval}
                      </p>
                    </div>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      {billingData.currentPlan.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Plan Features:</h4>
                    <ul className="space-y-1">
                      {billingData.currentPlan.features.map(
                        (feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Next billing date
                        </p>
                        <p className="font-medium">
                          {new Date(
                            billingData.currentPlan.nextBilling
                          ).toLocaleDateString()}
                        </p>
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
                {billingData.paymentHistory.map((payment) => (
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
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {billingData.plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular ? "border-blue-500 shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    ₹{plan.price}
                    <span className="text-sm font-normal text-gray-500">
                      /{plan.interval}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handlePayment(plan.name, plan.price)}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Processing..."
                      : plan.name === billingData.currentPlan.name
                      ? "Current Plan"
                      : "Upgrade Now"}
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
