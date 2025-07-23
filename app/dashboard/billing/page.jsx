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
  PauseCircle,
  StopCircle,
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
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [userStatus, setUserStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  useEffect(() => {
    fetchUserDetails();
    FetchPlans();
  }, []);

  useEffect(() => {
    if (
      userData &&
      userData.subscriptions &&
      userData.subscriptions.length > 0
    ) {
      // Find the most recent active subscription first
      const activeSubscription = findActiveSubscription(userData.subscriptions);
      if (activeSubscription) {
        fetchSubscriptionDetails(activeSubscription.razorpay_subscription_id);
        setCurrentPlan(activeSubscription);
      }
      userStatusCheck();
    }
  }, [userData]);

  const findActiveSubscription = (subscriptions) => {
    // Priority order: authenticated > active > created > others > cancelled
    const statusPriority = {
      authenticated: 1,
      active: 2,
      created: 3,
      pending: 4,
      halted: 5,
      completed: 6,
      expired: 7,
      cancelled: 8,
    };

    // Sort subscriptions by status priority and creation date (newest first)
    const sortedSubs = subscriptions.sort((a, b) => {
      const aPriority = statusPriority[a.status] || 99;
      const bPriority = statusPriority[b.status] || 99;

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      // If same priority, prefer newer subscription
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return sortedSubs[0];
  };

  // Check user status when plans tab is clicked
  useEffect(() => {
    if (activeTab === "plans" && userData) {
      const status = checkUserDataComplete();
      if (!status) {
        setIsModalOpen(true);
      }
    }
  }, [activeTab, userData]);

  const canPurchasePlan = () => {
    if (!subscriptionDetails) return true;

    // Allow purchase only if no active subscription exists
    const activeStates = ["authenticated", "active", "created", "pending"];
    return !activeStates.includes(subscriptionDetails.status);
  };

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
        `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/me?payments=true`,
        { withCredentials: true }
      );
      setUserData(response.data.userData);

      // Check if user has active subscription - updated to use subscriptions array
      if (
        response.data.userData.subscriptions &&
        response.data.userData.subscriptions.length > 0
      ) {
        // For now, we'll use the first subscription, but you might want to find the active one
        const activeSubscription = response.data.userData.subscriptions[0];
        setCurrentPlan(activeSubscription);
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

  const fetchSubscriptionDetails = async (sub_id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/payments/fetch-subscription-details?sub_id=${sub_id}`,
        { withCredentials: true }
      );
      setSubscriptionDetails(response.data.data);
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      toast.error("Failed to fetch subscription details");
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
      console.log("Payment failed:", err);
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgradePlan = async (plan_id) => {
    // Check if user data is complete before allowing upgrade
    if (!checkUserDataComplete()) {
      setIsModalOpen(true);
      return;
    }

    // Show confirmation dialog for upgrade
    const confirmUpgrade = window.confirm(
      `Are you sure you want to upgrade to ${getPlanName(
        plan_id
      )}? Your current subscription will be cancelled and a new one will be created.`
    );

    if (!confirmUpgrade) return;

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/payments/upgrade-plan`,
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
        description: "Digidine Subscription Upgrade",
        image: "/logo.png",
        handler: function (response) {
          console.log("Upgrade payment successful:", response);
          toast.success("Plan upgraded successfully!");

          // Send payment response to backend
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
      console.log("Upgrade failed:", err);
      toast.error(err?.response?.data?.message || "Failed to upgrade plan");
    } finally {
      setIsLoading(false);
    }
  };
  const isPlanActive = (planId) => {
    if (!subscriptionDetails) return false;

    // Consider active only if subscription is in active state AND matches plan
    const activeStates = ["authenticated", "active", "created"];
    return (
      activeStates.includes(subscriptionDetails.status) &&
      subscriptionDetails.plan_id === planId
    );
  };

  // Get plan name from planData based on plan_id
  const getPlanName = (planId) => {
    if (!planData.items) return "Unknown Plan";
    const plan = planData.items.find((p) => p.id === planId);
    return plan ? plan.item.name : "Unknown Plan";
  };

  // Get plan amount from planData based on plan_id
  const getPlanAmount = (planId) => {
    if (!planData.items) return 0;
    const plan = planData.items.find((p) => p.id === planId);
    return plan ? Math.round(plan.item.amount / 100) : 0;
  };

  // Get plan period from planData based on plan_id
  const getPlanPeriod = (planId) => {
    if (!planData.items) return "month";
    const plan = planData.items.find((p) => p.id === planId);
    return plan ? plan.period : "month";
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
      case "created":
      case "authenticated":
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "halted":
        return <PauseCircle className="h-4 w-4 text-orange-600" />;
      case "cancelled":
      case "expired":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "completed":
        return <StopCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      created: {
        variant: "secondary",
        label: "Created",
        color: "bg-gray-100 text-gray-800",
      },
      authenticated: {
        variant: "default",
        label: "Active",
        color: "bg-green-100 text-green-800",
      },
      active: {
        variant: "default",
        label: "Active",
        color: "bg-green-100 text-green-800",
      },
      pending: {
        variant: "secondary",
        label: "Pending",
        color: "bg-yellow-100 text-yellow-800",
      },
      halted: {
        variant: "outline",
        label: "Halted",
        color: "bg-orange-100 text-orange-800",
      },
      cancelled: {
        variant: "destructive",
        label: "Cancelled",
        color: "bg-red-100 text-red-800",
      },
      completed: {
        variant: "outline",
        label: "Completed",
        color: "bg-blue-100 text-blue-800",
      },
      expired: {
        variant: "destructive",
        label: "Expired",
        color: "bg-red-100 text-red-800",
      },
    };

    const config = statusConfig[status] || statusConfig.created;

    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const viewInvoice = async (invoiceId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/payments/invoice/view/${invoiceId}`,
        { withCredentials: true }
      );
      setCurrentInvoice(response.data.invoice);
      setIsInvoiceModalOpen(true);
    } catch (err) {
      console.error("Error viewing invoice:", err);
      toast.error("Failed to view invoice");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoice = async (invoiceId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/payments/invoice/${invoiceId}`,
        {
          withCredentials: true,
          responseType: "blob", // Important for file downloads
        }
      );

      // Create a blob URL for the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      toast.success("Invoice downloaded successfully");
    } catch (err) {
      console.error("Error downloading invoice:", err);
      toast.error("Failed to download invoice");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusMessage = (status) => {
    const messages = {
      created:
        "Your subscription has been created and is waiting for authentication.",
      authenticated: "Your subscription is active and running smoothly.",
      active: "Your subscription is active and running smoothly.",
      pending:
        "Your subscription payment is pending. Please complete the payment.",
      halted:
        "Your subscription has been temporarily paused. Contact support if needed.",
      cancelled:
        "Your subscription has been cancelled. You can reactivate by choosing a new plan.",
      completed: "Your subscription has completed its billing cycle.",
      expired:
        "Your subscription has expired. Please renew to continue using our services.",
    };

    return messages[status] || "Unknown subscription status.";
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
                    {subscriptionDetails ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-bold">
                              {getPlanName(subscriptionDetails.plan_id)}
                            </h3>
                            <p className="text-gray-600">
                              ₹{getPlanAmount(subscriptionDetails.plan_id)}/
                              {getPlanPeriod(subscriptionDetails.plan_id)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(subscriptionDetails.status)}
                            {getStatusBadge(subscriptionDetails.status)}
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            {getStatusMessage(subscriptionDetails.status)}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                          <div>
                            <p className="text-sm text-gray-500">
                              Total Billing Cycles
                            </p>
                            <p className="font-semibold">
                              {subscriptionDetails.total_count}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Paid Cycles</p>
                            <p className="font-semibold">
                              {subscriptionDetails.paid_count}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2">
                          <p className="text-sm text-gray-500">
                            Subscription ID
                          </p>
                          <p className="font-mono text-sm">
                            {subscriptionDetails.id}
                          </p>
                        </div>

                        {/* Action buttons based on status */}
                        {subscriptionDetails.status === "pending" && (
                          <Button
                            className="w-full"
                            onClick={() =>
                              handlePayment(subscriptionDetails.plan_id)
                            }
                          >
                            Complete Payment
                          </Button>
                        )}

                        {["cancelled", "expired", "completed"].includes(
                          subscriptionDetails.status
                        ) && (
                          <Button
                            className="w-full"
                            onClick={() => setActiveTab("plans")}
                          >
                            Choose New Plan
                          </Button>
                        )}
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
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() =>
                        downloadInvoice(currentPlan?.razorpay_subscription_id)
                      }
                      disabled={
                        !currentPlan ||
                        !["authenticated", "active"].includes(
                          currentPlan.status
                        )
                      }
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Latest Invoice
                    </Button>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => setActiveTab("history")}
                    >
                      <Receipt className="mr-2 h-4 w-4" />
                      View All Invoices
                    </Button>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => setActiveTab("plans")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {canPurchasePlan() ? "Choose Plan" : "View Plans"}
                    </Button>
                    // In your Quick Actions card, add this debug button
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() =>
                        debugSubscription(currentPlan?.razorpay_subscription_id)
                      }
                      disabled={!currentPlan}
                    >
                      Debug Subscription
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
                  {userData?.subscriptions &&
                  userData.subscriptions.length > 0 ? (
                    <div className="space-y-3">
                      {userData.subscriptions
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt || 0) -
                            new Date(a.createdAt || 0)
                        )
                        .map((subscription, index) => (
                          <div
                            key={subscription._id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(subscription.status)}
                              <div>
                                <p className="font-medium">
                                  {getPlanName(subscriptionDetails?.plan_id)}{" "}
                                  Subscription
                                </p>
                                <p className="text-sm text-gray-500">
                                  Payment ID: {subscription.razorpay_payment_id}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Subscription ID:{" "}
                                  {subscription.razorpay_subscription_id}
                                </p>
                                {subscription.createdAt && (
                                  <p className="text-sm text-gray-500">
                                    Date:{" "}
                                    {new Date(
                                      subscription.createdAt
                                    ).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right flex items-center gap-2">
                              {getStatusBadge(subscription.status)}
                              {subscription.status === "authenticated" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    viewInvoice(subscription.invoiceId)
                                  } // Make sure you have invoiceId in your data
                                >
                                  <Receipt className="h-4 w-4 mr-1" />
                                  View Invoice
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">
                      No payment history available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {planData.items &&
                planData.items.map((plan) => {
                  // Calculate if this is an upgrade option
                  const isUpgrade =
                    subscriptionDetails && !isPlanActive(plan.id);

                  return (
                    <Card
                      key={plan.id}
                      className={`relative ${
                        isPlanActive(plan.id)
                          ? "border-green-500 shadow-lg"
                          : isUpgrade
                          ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
                          : "border-gray-200 shadow-lg"
                      }`}
                    >
                      {isPlanActive(plan.id) && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500">
                          Current Plan
                        </Badge>
                      )}

                      {isUpgrade && (
                        <Badge className="absolute -top-2 right-4 bg-blue-500">
                          <Zap className="h-3 w-3 mr-1" />
                          Upgrade
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
                          variant={
                            isPlanActive(plan.id) ? "outline" : "default"
                          }
                          onClick={() => {
                            // Simple logic: if user has subscription and choosing different plan = upgrade
                            if (subscriptionDetails && !isPlanActive(plan.id)) {
                              handleUpgradePlan(plan.id);
                            } else {
                              handlePayment(plan.id);
                            }
                          }}
                          disabled={
                            isLoading ||
                            (isPlanActive(plan.id) &&
                              subscriptionDetails?.status === "active")
                          }
                        >
                          {isPlanActive(plan.id) &&
                          subscriptionDetails?.status === "active"
                            ? "Current Plan"
                            : isLoading
                            ? "Processing..."
                            : subscriptionDetails && !isPlanActive(plan.id)
                            ? "Upgrade Plan" // Always show "Upgrade Plan" for different plans when user has subscription
                            : "Choose Plan"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
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
      {isInvoiceModalOpen && currentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Invoice #{currentInvoice.id}
              </h2>
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Billed To:</h3>
                <p>{currentInvoice.restaurant.name}</p>
                <p>{currentInvoice.restaurant.owner}</p>
                <p>{currentInvoice.restaurant.address}</p>
              </div>
              <div className="text-right">
                <p>
                  <span className="font-semibold">Invoice Date:</span>{" "}
                  {currentInvoice.date}
                </p>
                <p>
                  <span className="font-semibold">Plan:</span>{" "}
                  {currentInvoice.plan}
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden mb-6">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Description</th>
                    <th className="py-2 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2 px-4">{currentInvoice.plan}</td>
                    <td className="py-2 px-4 text-right">
                      ₹{currentInvoice.amount}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="py-2 px-4">Total</td>
                    <td className="py-2 px-4 text-right">
                      ₹{currentInvoice.amount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setIsInvoiceModalOpen(false)}
              >
                Close
              </Button>
              <Button onClick={() => downloadInvoice(currentInvoice.id)}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
