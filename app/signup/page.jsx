"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
  const [formData, setFormData] = useState({
    restaurantName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/registration`,
          formData,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          router.push("/dashboard");
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err.message);
        });
    } else {
      toast.error("passwords should match");
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <QrCode className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">DigiDine</span>
            </Link>
            <h1 className="text-3xl font-bold mt-6 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Get started with digital menus for your restaurant
            </p>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="google">Google</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="restaurantName">Restaurant Name</Label>
                      <Input
                        id="restaurantName"
                        name="restaurantName"
                        placeholder="Enter your restaurant name"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="bg-white"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button type="submit" className="w-full mb-4 text-white">
                      Create Account
                    </Button>
                    <p className="text-sm text-center text-gray-500">
                      By signing up, you agree to our{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="google">
              <Card>
                <CardContent className="pt-6">
                  <Button variant="outline" className="w-full">
                    <img
                      src="/placeholder.svg?height=20&width=20"
                      alt="Google"
                      className="h-5 w-5 mr-2"
                    />
                    Sign up with Google
                  </Button>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <p className="text-sm text-center text-gray-500 mt-4">
                    By signing up, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Features */}
      <div className="w-full md:w-1/2 bg-primary text-white p-6 md:p-12 flex items-center">
        <div className="max-w-lg mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6">
              Transform Your Restaurant Experience
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of restaurants using DigiDine to create beautiful
              digital menus that customers love
            </p>

            <div className="space-y-6">
              {[
                "Create QR code menus in minutes",
                "Update your menu in real-time",
                "Track menu views and popular items",
                "Customize to match your brand",
                "No technical skills required",
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-white/20 rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-4 w-4" />
                  </div>
                  <p>{feature}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white/10 rounded-lg p-6">
              <p className="italic opacity-90 mb-4">
                "DigiDine has completely transformed how we present our menu.
                Our customers love the easy access and we've seen a 20% increase
                in orders for our featured items."
              </p>
              <div>
                <p className="font-bold">Sarah Johnson</p>
                <p className="text-sm opacity-80">Owner, The Rustic Table</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
