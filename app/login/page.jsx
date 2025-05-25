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
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { ToastAction } from "@/components/ui/toast";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // rememberMe: false,
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = formData;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/login`,
        payload,
        {
          withCredentials: true, // ✅ CRUCIAL: allows the browser to accept and store cookies
        }
      );
      if (response) {
        console.log("success login", response);
        // localStorage.setItem("authToken", res.token);

        toast.success(response?.data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        router.push("/dashboard");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.response.data.message);
    }

    // Redirect to dashboard after successful login
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
            <h1 className="text-3xl font-bold mt-6 mb-2">Welcome Back</h1>
            <p className="text-gray-600">
              Log in to manage your restaurant's digital menu
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
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="bg-white"
                      />
                    </div>
                    {/* <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            rememberMe: checked === true,
                          }))
                        }
                      />
                      <label
                        htmlFor="rememberMe"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div> */}
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full text-white">
                      Log In
                    </Button>
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
                    Log in with Google
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden md:flex w-1/2 bg-primary text-white p-12 items-center">
        <div className="max-w-lg mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6">
              Manage Your Digital Menu
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Log in to update your menu, generate QR codes, and track customer
              engagement
            </p>

            <div className="space-y-6">
              {[
                "Update menu items in real-time",
                "Track menu views and analytics",
                "Generate new QR codes",
                "Manage categories and specials",
                "Customize your digital menu design",
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
                "The ability to update our menu in real-time has been a
                game-changer. When items sell out, we can instantly update the
                digital menu, improving customer satisfaction."
              </p>
              <div>
                <p className="font-bold">Michael Chen</p>
                <p className="text-sm opacity-80">Manager, Fusion Bites</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
