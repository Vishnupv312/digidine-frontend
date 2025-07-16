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
import UserDataModal from "../../../components/user-data-modal";

export default function Billing() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [planData, setPlanData] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [userStatus, setUserStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchUserDetails();
    FetchPlans();
  }, []);

  useEffect(() => {
    if (userData) {
      userStatusCheck();
    }
  }, [userData]);

  // Check user status when plans tab is clicked
  useEffect(() => {
    if (activeTab === "plans" && userData) {
      const status = checkUserDataComplete();
      if (!status) {
        setIsModalOpen(true);
      }
    }
  }, [activeTab, userData]);

  const FetchPlans = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/payments/fetch-plans`,
        { withCredentials: true }
      );
      setPlanData(response.data);
    } catch (err) {
      console.error("Error fetching plans:", err);
      toast.error(err?.response?.data?.message || "Failed to fetch plans");
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserDataComplete = () => {
    if (!userData) return false;

    // Check if billing address exists and all required fields are filled
    const billingComplete =
      userData.billingAddress &&
      userData.billingAddress.street?.trim() &&
      userData.billingAddress.city?.trim() &&
      userData.billingAddress.state?.trim();

    // Check if user data is complete
    const userDataComplete =
      userData.ownerName?.trim() &&
      userData.phone?.trim() &&
      userData.email?.trim();

    return billingComplete && userDataComplete;
  };

  const userStatusCheck = () => {
    const status = checkUserDataComplete();
    setUserStatus(status);
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/me`,
        { withCredentials: true }
      );
      setUserData(response.data.userData);

      // Check if user has active subscription
      if (
        response.data.userData.subscription &&
        response.data.userData.subscription.length > 0
      ) {
        setCurrentPlan(response.data.userData.subscription[0]);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      toast.error(
        err?.response?.data?.message || "Failed to fetch user details"
      );
    }
  };

  const updateUserData = async (formData) => {
    try {
      const updateData = {
        ownerName: `${formData.userData.firstName} ${formData.userData.lastName}`,
        phone: formData.userData.phone,
        email: formData.userData.email,
        billingAddress: {
          street: formData.billingAddress.street,
          city: formData.billingAddress.city,
          state: formData.billingAddress.state,
          country: formData.billingAddress.country,
          zipCode: formData.billingAddress.zipCode,
        },
      };

      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/user/update-restaurant-owner`,
        updateData,
        { withCredentials: true }
      );

      toast.success("Profile updated successfully!");
      await fetchUserDetails(); // Refresh user data
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating user data:", err);
      toast.error(err?.response?.data?.message || "Failed to update profile");
      throw err;
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handlePayment = async (plan_id) => {
    // Check if user data is complete before allowing payment
    if (!checkUserDataComplete()) {
      setIsModalOpen(true);
      return;
    }

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

      await loadRazorpay();

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
          // Refresh user data to get updated subscription
          fetchUserDetails();
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
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isPlanActive = (planId) => {
    return currentPlan && currentPlan.planId === planId;
  };

  // Prepare initial form data for the modal
  const getInitialFormData = () => {
    if (!userData) return undefined;

    const nameParts = userData.ownerName
      ? userData.ownerName.split(" ")
      : ["", ""];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    return {
      billingAddress: {
        street: userData.billingAddress?.street || "",
        city: userData.billingAddress?.city || "",
        state: userData.billingAddress?.state || "",
        zipCode: userData.billingAddress?.zipCode || "",
        country: userData.billingAddress?.country || "India",
      },
      userData: {
        firstName,
        lastName,
        email: userData.email || "",
        phone: userData.phone || "",
      },
    };
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 shadow-lg rounded-xl p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <>
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

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-6"
        >
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
                    {currentPlan ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold">
                            {currentPlan.planName || "Active Plan"}
                          </h3>
                          <p className="text-gray-600">
                            ₹{currentPlan.amount || 0}/
                            {currentPlan.interval || "month"}
                          </p>
                        </div>
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800"
                        >
                          {currentPlan.status || "Active"}
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">
                          No active subscription
                        </p>
                        <Button onClick={() => setActiveTab("plans")}>
                          Choose a Plan
                        </Button>
                      </div>
                    )}
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
                  <p className="text-center text-gray-500 py-8">
                    No payment history available
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {planData.items &&
                planData.items.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`relative ${
                      isPlanActive(plan.id)
                        ? "border-green-500 shadow-lg"
                        : "border-blue-500 shadow-lg"
                    }`}
                  >
                    {isPlanActive(plan.id) && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500">
                        Current Plan
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle>{plan.item.name}</CardTitle>
                      <div className="text-3xl font-bold">
                        ₹{Math.round(plan.item.amount / 100)}
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
                      </div>
                      <Button
                        className="w-full cursor-pointer"
                        variant={isPlanActive(plan.id) ? "outline" : "default"}
                        onClick={() => handlePayment(plan.id)}
                        disabled={isLoading || isPlanActive(plan.id)}
                      >
                        {isPlanActive(plan.id)
                          ? "Current Plan"
                          : isLoading
                          ? "Processing..."
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
                  {["UPI", "Credit Card", "Debit Card", "Net Banking"].map(
                    (method) => (
                      <div
                        key={method}
                        className="flex items-center justify-center p-4 border rounded-lg"
                      >
                        <span className="text-sm font-medium">{method}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <UserDataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={updateUserData}
        userData={{ status: userStatus }}
        initialData={getInitialFormData()}
      />
    </>
  );
}
