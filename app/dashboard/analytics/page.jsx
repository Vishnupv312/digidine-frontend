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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Eye,
  Clock,
  Calendar,
  Smartphone,
  Globe,
  MapPin,
} from "lucide-react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalScans: 2847,
      uniqueVisitors: 1923,
      avgSessionTime: "3m 24s",
      conversionRate: "12.4%",
      growth: {
        scans: 23.5,
        visitors: 18.2,
        sessionTime: -5.3,
        conversion: 8.7,
      },
    },
    scansByDay: [
      { day: "Mon", scans: 245, visitors: 189 },
      { day: "Tue", scans: 312, visitors: 234 },
      { day: "Wed", scans: 189, visitors: 156 },
      { day: "Thu", scans: 423, visitors: 298 },
      { day: "Fri", scans: 567, visitors: 445 },
      { day: "Sat", scans: 634, visitors: 512 },
      { day: "Sun", scans: 477, visitors: 389 },
    ],
    topMenuItems: [
      { name: "Margherita Pizza", views: 456, orders: 89 },
      { name: "Caesar Salad", views: 389, orders: 67 },
      { name: "Grilled Salmon", views: 334, orders: 78 },
      { name: "Pasta Carbonara", views: 298, orders: 45 },
      { name: "Chocolate Cake", views: 267, orders: 34 },
    ],
    deviceStats: {
      mobile: 78.5,
      desktop: 15.2,
      tablet: 6.3,
    },
    locationStats: [
      { city: "Mumbai", scans: 1245, percentage: 43.7 },
      { city: "Delhi", scans: 567, percentage: 19.9 },
      { city: "Bangalore", scans: 423, percentage: 14.9 },
      { city: "Chennai", scans: 312, percentage: 11.0 },
      { city: "Others", scans: 300, percentage: 10.5 },
    ],
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your QR code performance and customer insights.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="menu">Menu Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div variants={fadeIn}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Scans
                    </CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analyticsData.overview.totalScans.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">
                        +{analyticsData.overview.growth.scans}%
                      </span>{" "}
                      from last period
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Unique Visitors
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analyticsData.overview.uniqueVisitors.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">
                        +{analyticsData.overview.growth.visitors}%
                      </span>{" "}
                      from last period
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg. Session Time
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analyticsData.overview.avgSessionTime}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-red-600">
                        {analyticsData.overview.growth.sessionTime}%
                      </span>{" "}
                      from last period
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Conversion Rate
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analyticsData.overview.conversionRate}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">
                        +{analyticsData.overview.growth.conversion}%
                      </span>{" "}
                      from last period
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Daily Scans Chart */}
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Daily Scans Overview</CardTitle>
                  <CardDescription>
                    QR code scans and unique visitors over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between gap-2 p-4">
                    {analyticsData.scansByDay.map((day, index) => (
                      <div
                        key={day.day}
                        className="flex flex-col items-center flex-1"
                      >
                        <div className="flex flex-col items-center gap-1 mb-2">
                          <div
                            className="w-full bg-blue-500 rounded-t"
                            style={{ height: `${(day.scans / 700) * 200}px` }}
                          ></div>
                          <div
                            className="w-full bg-green-500 rounded-b"
                            style={{
                              height: `${(day.visitors / 700) * 200}px`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{day.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm">Scans</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-sm">Visitors</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="menu">
          <motion.div variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Menu Items</CardTitle>
                <CardDescription>
                  Most viewed and ordered items from your menu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topMenuItems.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            {item.views} views
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{item.orders} orders</Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {((item.orders / item.views) * 100).toFixed(1)}%
                          conversion
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="audience">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Device Usage</CardTitle>
                  <CardDescription>
                    How customers access your menu
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <span>Mobile</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{
                              width: `${analyticsData.deviceStats.mobile}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {analyticsData.deviceStats.mobile}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Desktop</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{
                              width: `${analyticsData.deviceStats.desktop}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {analyticsData.deviceStats.desktop}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Tablet</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-purple-500 rounded-full"
                            style={{
                              width: `${analyticsData.deviceStats.tablet}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {analyticsData.deviceStats.tablet}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Peak Hours</CardTitle>
                  <CardDescription>
                    When customers scan your QR code most
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        time: "12:00 PM - 2:00 PM",
                        percentage: 35,
                        label: "Lunch Rush",
                      },
                      {
                        time: "7:00 PM - 9:00 PM",
                        percentage: 42,
                        label: "Dinner Peak",
                      },
                      {
                        time: "6:00 PM - 7:00 PM",
                        percentage: 28,
                        label: "Early Dinner",
                      },
                      {
                        time: "2:00 PM - 5:00 PM",
                        percentage: 15,
                        label: "Afternoon",
                      },
                      {
                        time: "9:00 PM - 11:00 PM",
                        percentage: 22,
                        label: "Late Dinner",
                      },
                    ].map((slot, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <span className="text-sm font-medium">
                            {slot.time}
                          </span>
                          <p className="text-xs text-gray-500">{slot.label}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-orange-500 rounded-full"
                              style={{ width: `${slot.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8">
                            {slot.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="location">
          <motion.div variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>
                  Where your customers are scanning from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.locationStats.map((location, index) => (
                    <div
                      key={location.city}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{location.city}</h4>
                          <p className="text-sm text-gray-500">
                            {location.scans} scans
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-blue-500 rounded-full"
                              style={{ width: `${location.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {location.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
