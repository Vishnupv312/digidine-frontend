"use client";

import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Upload,
  Building,
  CreditCard,
  Shield,
  Trash2,
  LogOut,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
export default function Settings() {
  const [profileData, setProfileData] = useState({
    restaurantName: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    website: "",
    logo: null,
    coverImage: null,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    menuViews: true,
    newReviews: true,
    promotionalEmails: false,
  });

  const [activeTab, setActiveTab] = useState("profile");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const FetchProfileData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}api/settings/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success === true)
          setProfileData({
            restaurantName: "pepito",
            fullName: "",
            email: "",
            phone: "",
            address: "",
            description: "",
            website: "",
            logo: null,
            coverImage: null,
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    FetchProfileData();
  }, []);
  const handleNotificationChange = (name, checked) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("Profile updated:", profileData);
    alert("Profile updated successfully!");
  };

  const handleNotificationsSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("Notification settings updated:", notificationSettings);
    alert("Notification settings updated successfully!");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and restaurant settings
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto mb-6">
          <div className="flex overflow-x-auto">
            <TabsTrigger
              value="profile"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="restaurant"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
            >
              Restaurant
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
            >
              Billing
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
            >
              Security
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="profile">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Restaurant Information</CardTitle>
                      <CardDescription>
                        Update your restaurant details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="restaurantName">Restaurant Name</Label>
                        <Input
                          id="restaurantName"
                          name="restaurantName"
                          value={profileData.restaurantName}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={profileData.address}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          value={profileData.website}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={profileData.description}
                          onChange={handleProfileChange}
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Picture</CardTitle>
                      <CardDescription>
                        Upload your profile picture
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <Avatar className="w-32 h-32 mb-4">
                        <AvatarImage
                          src="/placeholder.svg"
                          alt={profileData.fullName}
                        />
                        <AvatarFallback className="text-2xl">
                          {profileData.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" /> Upload Image
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Restaurant Logo</CardTitle>
                      <CardDescription>
                        Upload your restaurant logo
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                        <Building className="h-12 w-12 text-gray-400" />
                      </div>
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" /> Upload Logo
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Danger Zone</CardTitle>
                      <CardDescription>
                        Irreversible account actions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Delete Account</h3>
                        <p className="text-sm text-gray-500">
                          Permanently delete your account and all associated
                          data
                        </p>
                      </div>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </motion.div>
        </TabsContent>

        <TabsContent value="restaurant">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Settings</CardTitle>
                <CardDescription>
                  Manage your restaurant's appearance and information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  This section allows you to customize how your restaurant
                  appears to customers when they scan your QR code. You can
                  update your restaurant's information, upload images, and set
                  your operating hours.
                </p>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Restaurant Appearance
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Cover Image</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                            <Upload className="h-8 w-8 text-gray-400" />
                          </div>
                          <Button variant="outline" size="sm">
                            Upload Cover Image
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Menu Style</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="border rounded-lg p-2 text-center cursor-pointer hover:border-primary">
                            <div className="h-24 bg-gray-100 rounded-md mb-2"></div>
                            <p className="text-sm font-medium">Classic</p>
                          </div>
                          <div className="border rounded-lg p-2 text-center cursor-pointer hover:border-primary">
                            <div className="h-24 bg-gray-100 rounded-md mb-2"></div>
                            <p className="text-sm font-medium">Modern</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Operating Hours
                    </h3>
                    <div className="space-y-4">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <div
                          key={day}
                          className="flex items-center justify-between"
                        >
                          <p className="font-medium">{day}</p>
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              className="w-32"
                              defaultValue="09:00"
                            />
                            <span>to</span>
                            <Input
                              type="time"
                              className="w-32"
                              defaultValue="21:00"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Restaurant Settings</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="billing">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your subscription and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-primary">
                      Professional Plan
                    </h3>
                    <Badge>Active</Badge>
                  </div>
                  <p className="text-sm mb-4">
                    Your subscription renews on August 15, 2023
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Change Plan
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/24</p>
                        </div>
                      </div>
                      <Badge variant="outline">Default</Badge>
                    </div>

                    <Button variant="outline" className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Billing History</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y">
                        {[
                          {
                            date: "Jul 15, 2023",
                            amount: "$59.00",
                            status: "Paid",
                          },
                          {
                            date: "Jun 15, 2023",
                            amount: "$59.00",
                            status: "Paid",
                          },
                          {
                            date: "May 15, 2023",
                            amount: "$59.00",
                            status: "Paid",
                          },
                        ].map((invoice, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {invoice.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {invoice.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                {invoice.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <form onSubmit={handleNotificationsSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("emailNotifications", checked)
                      }
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Menu Views</p>
                          <p className="text-sm text-gray-500">
                            Get notified when customers view your menu
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.menuViews}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("menuViews", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Reviews</p>
                          <p className="text-sm text-gray-500">
                            Get notified when customers leave reviews
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.newReviews}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("newReviews", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotional Emails</p>
                          <p className="text-sm text-gray-500">
                            Receive updates about new features and offers
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.promotionalEmails}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "promotionalEmails",
                              checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit">Save Notification Settings</Button>
                </CardFooter>
              </Card>
            </form>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Two-Factor Authentication
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          Enable Two-Factor Authentication
                        </p>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                    <Button variant="outline" disabled>
                      <Shield className="mr-2 h-4 w-4" /> Set Up Two-Factor
                      Authentication
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Sessions</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Current Session</p>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Chrome on Windows • New York, USA • Started 2 hours ago
                      </p>
                    </div>
                    <Button variant="outline" className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out of All
                      Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
