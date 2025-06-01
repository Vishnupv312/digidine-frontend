"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Pricing() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const plans = [
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
        "Mobile-friendly design",
        "Basic analytics",
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
        "Menu scheduling",
        "Custom branding",
        "Social media integration",
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
        "Multiple user accounts",
        "Priority feature updates",
        "Custom integrations",
        "Training sessions",
      ],
    },
  ];

  const faqs = [
    {
      question: "Can I try DigiDine before committing to a paid plan?",
      answer:
        "Yes! We offer a 14-day free trial on all our plans. You can explore all features and see how DigiDine works for your restaurant before making a decision.",
    },
    {
      question: "How do I create a QR code for my menu?",
      answer:
        "Once you've set up your menu in our easy-to-use dashboard, you can generate a QR code with just one click. You can customize the design, download it in various formats, and print it for your restaurant.",
    },
    {
      question: "Can I update my menu after creating it?",
      answer:
        "One of the biggest benefits of DigiDine is the ability to update your menu in real-time. When you make changes in your dashboard, they're instantly reflected in your digital menu that customers see.",
    },
    {
      question: "Do I need technical skills to use DigiDine?",
      answer:
        "Not at all. DigiDine is designed to be user-friendly for restaurant owners with any level of technical expertise. Our intuitive interface makes it easy to create and manage your digital menu.",
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer:
        "Yes, you can change your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, the new rate will apply at the start of your next billing cycle.",
    },
    {
      question: "Is there a limit to how many times I can update my menu?",
      answer:
        "No, you can update your menu as often as you need, across all our plans. Whether it's changing prices, adding seasonal items, or marking items as sold out, you have unlimited updates.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-digibg">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose the plan that works best for your restaurant. All plans
              include a 14-day free trial.
            </p>
            <div className="inline-flex items-center bg-white p-1 rounded-lg border mb-8">
              <button className="px-4 py-2 rounded-md bg-primary text-white">
                Monthly
              </button>
              <button className="px-4 py-2 rounded-md text-gray-700">
                Annually (Save 20%)
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.2, duration: 0.6 },
                  },
                }}
                className={`bg-white p-8 rounded-lg shadow-md border ${
                  plan.popular ? "border-secondary border-2" : "border-gray-200"
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
                  <span className="text-4xl font-bold text-primary">
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
                    Start Free Trial
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
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
              Compare Plans
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect plan for your restaurant's needs
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left border-b">Features</th>
                  <th className="p-4 text-center border-b">Starter</th>
                  <th className="p-4 text-center border-b bg-secondary/10">
                    Professional
                  </th>
                  <th className="p-4 text-center border-b">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "QR Code Menus",
                    starter: "1",
                    professional: "3",
                    enterprise: "10",
                  },
                  {
                    feature: "Menu Items",
                    starter: "Up to 50",
                    professional: "Unlimited",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "Menu Categories",
                    starter: "Up to 5",
                    professional: "Unlimited",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "Real-time Updates",
                    starter: "✓",
                    professional: "✓",
                    enterprise: "✓",
                  },
                  {
                    feature: "Mobile-friendly Design",
                    starter: "✓",
                    professional: "✓",
                    enterprise: "✓",
                  },
                  {
                    feature: "Custom Branding",
                    starter: "Basic",
                    professional: "Advanced",
                    enterprise: "Premium",
                  },
                  {
                    feature: "Analytics",
                    starter: "Basic",
                    professional: "Advanced",
                    enterprise: "Comprehensive",
                  },
                  {
                    feature: "Support",
                    starter: "Email",
                    professional: "Priority",
                    enterprise: "Dedicated",
                  },
                  {
                    feature: "Menu Scheduling",
                    starter: "✗",
                    professional: "✓",
                    enterprise: "✓",
                  },
                  {
                    feature: "Multiple User Accounts",
                    starter: "✗",
                    professional: "Up to 3",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "API Access",
                    starter: "✗",
                    professional: "✗",
                    enterprise: "✓",
                  },
                  {
                    feature: "White-label Option",
                    starter: "✗",
                    professional: "✗",
                    enterprise: "✓",
                  },
                  {
                    feature: "Custom Integrations",
                    starter: "✗",
                    professional: "✗",
                    enterprise: "✓",
                  },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-4 border-b font-medium">{row.feature}</td>
                    <td className="p-4 text-center border-b">{row.starter}</td>
                    <td className="p-4 text-center border-b bg-secondary/5">
                      {row.professional}
                    </td>
                    <td className="p-4 text-center border-b">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Have questions about our pricing? Find answers to common questions
              below
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-lg shadow-xs"
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-medium text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mt-12 max-w-2xl mx-auto"
          >
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <HelpCircle className="h-6 w-6 text-secondary shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-bold text-primary mb-1">
                    Still have questions?
                  </h3>
                  <p className="text-gray-600">
                    Contact our team for more information about our plans and
                    pricing.
                  </p>
                </div>
              </div>
              <Link href="/contact" className="shrink-0">
                <Button className="bg-secondary hover:bg-secondary/90">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
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
              Ready to Elevate Your Restaurant Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your 14-day free trial today. No credit card required.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-accent text-primary hover:bg-accent/90  border py-3 px-2 font-medium"
              >
                Start Your Free Trial
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
