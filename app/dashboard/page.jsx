"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  QrCode,
  ShoppingBag,
  Eye,
  TrendingUp,
  Users,
  Clock,
  Plus,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import toast from "react-hot-toast";

export default function Dashboard() {
  // Sample data for charts

  const visitData = [
    { name: "Mon", visits: 120 },
    { name: "Tue", visits: 150 },
    { name: "Wed", visits: 180 },
    { name: "Thu", visits: 145 },
    { name: "Fri", visits: 260 },
    { name: "Sat", visits: 320 },
    { name: "Sun", visits: 290 },
  ];

  const categoryData = [
    { name: "Main Course", value: 45 },
    { name: "Appetizers", value: 25 },
    { name: "Desserts", value: 15 },
    { name: "Beverages", value: 15 },
  ];

  const COLORS = ["#205781", "#4f959d", "#98d2c0", "#f6f8d5"];

  const popularItems = [
    {
      name: "Grilled Salmon",
      category: "Main Course",
      views: 245,
      orders: 120,
    },
    {
      name: "Chocolate Lava Cake",
      category: "Desserts",
      views: 210,
      orders: 95,
    },
    { name: "Caesar Salad", category: "Appetizers", views: 180, orders: 85 },
    { name: "Beef Burger", category: "Main Course", views: 165, orders: 78 },
    { name: "Mojito", category: "Beverages", views: 150, orders: 72 },
  ];

  const recentActivities = [
    {
      action: "Menu updated",
      item: "Added 3 new seasonal items",
      time: "2 hours ago",
    },
    {
      action: "QR code generated",
      item: "Summer Special Menu",
      time: "Yesterday",
    },
    {
      action: "Price updated",
      item: "Adjusted prices for 5 items",
      time: "2 days ago",
    },
    {
      action: "Category added",
      item: "Created 'Vegan Options' category",
      time: "3 days ago",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const router = useRouter();
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
  } = useAuth();
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/me`,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.authenticated) {
          setIsAuthenticated(true);
          setUser(res.data.userData);
        } else {
          setIsAuthenticated(false);
          toast.error(" couldn't authenticate the user ", {
            icon: "❌",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);

        setUser(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Loading user data</p>;

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your restaurant's performance.
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Link href="/dashboard/menu/new">
            <Button>
              <Plus className="mr-2 h-4 w-4 text-white" />{" "}
              <p className="text-white">Add Menu Item</p>
            </Button>
          </Link>
          <Link href="/dashboard/qr-codes/new">
            <Button variant="outline">
              <QrCode className="mr-2 h-4 w-4" /> Generate QR
            </Button>
          </Link>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {[
          {
            title: "Total Menu Views",
            value: "2,345",
            icon: Eye,
            change: "+12.5%",
            color: "text-primary",
          },
          {
            title: "Menu Items",
            value: "48",
            icon: ShoppingBag,
            change: "+3",
            color: "text-secondary",
          },
          {
            title: "QR Scans Today",
            value: "156",
            icon: QrCode,
            change: "+24.3%",
            color: "text-accent",
          },
          {
            title: "Unique Visitors",
            value: "1,024",
            icon: Users,
            change: "+10.1%",
            color: "text-primary",
          },
        ].map((item, index) => (
          <motion.div key={index} variants={fadeIn}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  <span className="text-green-600 font-medium">
                    {item.change}
                  </span>
                  <span className="ml-1">from last week</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="col-span-4"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Menu Views</CardTitle>
              <CardDescription>
                Daily views of your digital menu over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={visitData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="visits"
                      fill="#205781"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="col-span-3"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Menu Categories</CardTitle>
              <CardDescription>
                Distribution of views by menu category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Card>
            <CardHeader>
              <CardTitle>Popular Menu Items</CardTitle>
              <CardDescription>
                Your most viewed and ordered items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularItems.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {item.orders} orders
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.views} views
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/dashboard/analytics">
                  <Button variant="ghost" className="w-full justify-between">
                    View All Analytics
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates to your menu and QR codes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.item}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/dashboard/activity">
                  <Button variant="ghost" className="w-full justify-between">
                    View All Activity
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mt-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks you might want to perform
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  title: "Add Menu Item",
                  icon: Plus,
                  href: "/dashboard/menu/new",
                  color: "bg-primary",
                },
                {
                  title: "Generate QR Code",
                  icon: QrCode,
                  href: "/dashboard/qr-codes/new",
                  color: "bg-secondary",
                },
                {
                  title: "View Analytics",
                  icon: BarChart,
                  href: "/dashboard/analytics",
                  color: "bg-accent",
                },
                {
                  title: "Edit Profile",
                  icon: Users,
                  href: "/dashboard/settings",
                  color: "bg-primary",
                },
              ].map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer h-full flex flex-col items-center justify-center text-center">
                    <div
                      className={`${action.color} text-white p-3 rounded-full mb-3`}
                    >
                      <action.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium text-sm">{action.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
