"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  QrCode,
  Smartphone,
  Edit,
  BarChart4,
  Clock,
  Zap,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl text-primary lg:text-6xl font-bold leading-tight uppercase">
                Transform Your Menu Into A Digital Experience
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg text-secondary">
                Create QR code menus for your restaurant that customers can scan
                to view your delicious offerings on any device.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-accent text-primary hover:bg-accent/90 py-3 px-2 border font-medium"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white  py-3 px-2 border-2 text-accent hover:bg-white/10"
                  >
                    View Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-sm md:max-w-md">
                <Image
                  src="/placeholder.svg?height=600&width=400"
                  width={400}
                  height={600}
                  alt="DigiDine QR Menu Preview"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-accent p-4 rounded-lg shadow-lg">
                  <QrCode size={80} className="text-primary" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-digibg">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Powerful Features for Restaurant Owners
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to create and manage digital menus that
              impress your customers
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <QrCode className="h-10 w-10 text-primary" />,
                title: "QR Code Generator",
                description:
                  "Create custom QR codes that match your brand and link directly to your digital menu.",
              },
              {
                icon: <Edit className="h-10 w-10 text-primary" />,
                title: "Easy Menu Editor",
                description:
                  "Update your menu items, prices, and descriptions in real-time with our intuitive editor.",
              },
              {
                icon: <Smartphone className="h-10 w-10 text-primary" />,
                title: "Mobile Optimized",
                description:
                  "Menus look great on any device, ensuring a seamless experience for all your customers.",
              },
              {
                icon: <BarChart4 className="h-10 w-10 text-primary" />,
                title: "Analytics Dashboard",
                description:
                  "Track menu views, popular items, and customer behavior to optimize your offerings.",
              },
              {
                icon: <Clock className="h-10 w-10 text-primary" />,
                title: "Real-time Updates",
                description:
                  "Update your menu instantly when items sell out or when you add seasonal specials.",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Fast Performance",
                description:
                  "Lightning-fast loading times ensure customers can browse your menu without waiting.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="feature-card bg-white p-6 rounded-lg shadow-md"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              How DigiDine Works
            </h2>
            <p className="text-lg text-gray-600">
              Get your digital menu up and running in just three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Sign Up & Create",
                description:
                  "Create an account and build your digital menu with our easy-to-use editor.",
              },
              {
                step: "02",
                title: "Customize & Generate",
                description:
                  "Customize your menu design and generate a unique QR code for your restaurant.",
              },
              {
                step: "03",
                title: "Share & Update",
                description:
                  "Place QR codes in your restaurant and update your menu anytime from your dashboard.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.2, duration: 0.6 },
                  },
                }}
                className="text-center relative"
              >
                <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-secondary">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                    <ChevronRight size={30} className="text-secondary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-digibg">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Join hundreds of restaurant owners who have transformed their
              dining experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "DigiDine has completely transformed how we present our menu. Our customers love the easy access and we've seen a 20% increase in orders for our featured items.",
                name: "Sarah Johnson",
                role: "Owner, The Rustic Table",
              },
              {
                quote:
                  "The ability to update our menu in real-time has been a game-changer. When items sell out, we can instantly update the digital menu, improving customer satisfaction.",
                name: "Michael Chen",
                role: "Manager, Fusion Bites",
              },
              {
                quote:
                  "Setting up our digital menu was incredibly easy. The customer support team was helpful throughout the process, and our customers have given us great feedback.",
                name: "Olivia Martinez",
                role: "Owner, Coastal Cuisine",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.2, duration: 0.6 },
                  },
                }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="mb-4 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic accent-font">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that works best for your restaurant
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                description:
                  "Perfect for small restaurants just getting started with digital menus",
                features: [
                  "1 QR code menu",
                  "Up to 50 menu items",
                  "Basic customization",
                  "Email support",
                  "Real-time menu updates",
                ],
              },
              {
                name: "Professional",
                price: "$59",
                period: "/month",
                description:
                  "Ideal for established restaurants looking to enhance their digital presence",
                features: [
                  "3 QR code menus",
                  "Unlimited menu items",
                  "Advanced customization",
                  "Priority support",
                  "Analytics dashboard",
                  "Multiple categories",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "/month",
                description:
                  "For restaurant chains and businesses with multiple locations",
                features: [
                  "10 QR code menus",
                  "Unlimited menu items",
                  "Premium customization",
                  "Dedicated support",
                  "Advanced analytics",
                  "API access",
                  "White-label option",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.2, duration: 0.6 },
                  },
                }}
                className={`bg-white p-8 rounded-lg shadow-md border ${
                  plan.popular ? "border-secondary" : "border-gray-200"
                } relative`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-primary">
                  {plan.name}
                </h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-secondary hover:bg-secondary/90 text-white"
                        : "bg-primary hover:bg-primary/90 text-white"
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Need a custom plan for your specific requirements?
            </p>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Restaurant Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of restaurants already using DigiDine to create
              beautiful digital menus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-accent text-primary hover:bg-accent/90 py-3 px-2 border font-medium"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white py-3 px-2 text-white hover:bg-white/10"
                >
                  Schedule a Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
