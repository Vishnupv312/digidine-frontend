"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account with DigiDine?",
          answer:
            "Creating an account is simple. Click the 'Sign Up' button on our homepage, enter your email address and create a password. You'll then be guided through a quick setup process to create your first digital menu.",
        },
        {
          question: "Is there a free trial available?",
          answer:
            "Yes! We offer a 14-day free trial on all our plans. You can explore all features and see how DigiDine works for your restaurant before making a decision.",
        },
        {
          question: "What information do I need to get started?",
          answer:
            "To get started, you'll need your restaurant name, logo (optional), and your menu items with descriptions and prices. You can always add more details and customize your menu later.",
        },
        {
          question: "How long does it take to set up a digital menu?",
          answer:
            "Most restaurants can set up their basic menu in under an hour. If you have an existing menu document, you can upload it and our system will help you convert it to a digital format, making the process even faster.",
        },
      ],
    },
    {
      category: "QR Codes",
      questions: [
        {
          question: "How do I create a QR code for my menu?",
          answer:
            "Once you've set up your menu in our dashboard, you can generate a QR code with just one click. Navigate to the 'QR Codes' section, customize the design if desired, and click 'Generate QR Code'.",
        },
        {
          question: "Can I customize the appearance of my QR code?",
          answer:
            "Yes! You can customize the colors of your QR code to match your brand, add your logo to the center, and choose different styles. All QR codes remain fully scannable while reflecting your restaurant's unique identity.",
        },
        {
          question: "How do I display QR codes in my restaurant?",
          answer:
            "After generating your QR code, you can download it in various formats (PNG, SVG, PDF) for printing. Most restaurants place QR codes on table tents, directly on tables, at the entrance, or include them on printed materials.",
        },
        {
          question: "Do QR codes expire or need to be updated?",
          answer:
            "No, your QR codes don't expire. They will continue to direct customers to your latest menu even as you make updates. You only need to generate new QR codes if you want to create separate menus (like for special events or different sections of your restaurant).",
        },
      ],
    },
    {
      category: "Menu Management",
      questions: [
        {
          question: "Can I update my menu after creating it?",
          answer:
            "One of the biggest benefits of DigiDine is the ability to update your menu in real-time. When you make changes in your dashboard, they're instantly reflected in your digital menu that customers see.",
        },
        {
          question: "How do I organize my menu into categories?",
          answer:
            "In your dashboard, you can create categories (like Appetizers, Main Courses, Desserts) and then add menu items to each category. You can also rearrange the order of categories and items by simple drag-and-drop.",
        },
        {
          question: "Can I mark items as 'sold out' or 'special'?",
          answer:
            "Yes, you can mark items as 'Sold Out', 'Chef's Special', 'New', 'Spicy', or create custom labels. These will be displayed prominently on your digital menu to inform customers.",
        },
        {
          question:
            "Is it possible to show different menus at different times?",
          answer:
            "Yes, with our Professional and Enterprise plans, you can schedule different menus to appear automatically at specific times. This is perfect for breakfast, lunch, and dinner menus, or for special event menus.",
        },
      ],
    },
    {
      category: "Customization",
      questions: [
        {
          question: "Can I add my restaurant's branding to the menu?",
          answer:
            "Yes, you can customize your digital menu with your logo, brand colors, fonts, and even background images. Our design tools make it easy to create a menu that matches your restaurant's identity.",
        },
        {
          question: "Is it possible to add photos of my dishes?",
          answer:
            "You can add high-quality photos to any menu item. Visual menus have been shown to increase sales, as customers are more likely to order items they can see.",
        },
        {
          question: "Can I create multiple menus for my restaurant?",
          answer:
            "Yes, depending on your plan, you can create multiple menus. This is useful for different meal times (breakfast, lunch, dinner), special events, or different sections of your restaurant.",
        },
        {
          question: "Do you offer menu templates to choose from?",
          answer:
            "Yes, we offer a variety of professionally designed templates that you can use as a starting point. You can then customize these templates to match your restaurant's style and needs.",
        },
      ],
    },
    {
      category: "Technical & Support",
      questions: [
        {
          question: "Do I need technical skills to use DigiDine?",
          answer:
            "Not at all. DigiDine is designed to be user-friendly for restaurant owners with any level of technical expertise. Our intuitive interface makes it easy to create and manage your digital menu.",
        },
        {
          question: "What devices can customers use to view my digital menu?",
          answer:
            "Customers can view your digital menu on any device with a camera and internet access. This includes smartphones, tablets, and laptops. Our menus are responsive and will look great on any screen size.",
        },
        {
          question: "What kind of support do you offer?",
          answer:
            "We offer email support for all plans, with priority support for Professional plans and dedicated support for Enterprise plans. Our help center also contains detailed guides and tutorials.",
        },
        {
          question: "Can I get help migrating my existing menu to DigiDine?",
          answer:
            "Yes, our team can assist with migrating your existing menu to our platform. For larger menus or special requirements, we offer professional setup services to ensure a smooth transition.",
        },
      ],
    },
    {
      category: "Billing & Plans",
      questions: [
        {
          question: "Can I upgrade or downgrade my plan later?",
          answer:
            "Yes, you can change your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, the new rate will apply at the start of your next billing cycle.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as PayPal for payment.",
        },
        {
          question: "Is there a contract or commitment?",
          answer:
            "No, all our plans are month-to-month with no long-term commitment required. You can cancel at any time without penalty.",
        },
        {
          question: "Do you offer discounts for annual payments?",
          answer:
            "Yes, we offer a 20% discount when you choose annual billing instead of monthly billing.",
        },
      ],
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions about DigiDine and our digital
              menu solutions
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="bg-white pl-10 py-6 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {faqCategories.map((category, index) => (
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
                    transition: { delay: index * 0.1, duration: 0.5 },
                  },
                }}
              >
                <Link
                  href={`#${category.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 h-full">
                    <h3 className="text-xl font-bold mb-2 text-primary">
                      {category.category}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.questions.length} questions
                    </p>
                    <Button
                      variant="ghost"
                      className="text-secondary hover:text-secondary/80 p-0"
                    >
                      View questions
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {faqCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              id={category.category.toLowerCase().replace(/\s+/g, "-")}
              className="mb-16 scroll-mt-20"
            >
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="text-2xl md:text-3xl font-bold mb-6 text-primary"
              >
                {category.category}
              </motion.h2>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <motion.div
                    key={faqIndex}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: faqIndex * 0.1, duration: 0.5 },
                      },
                    }}
                  >
                    <AccordionItem
                      value={`item-${categoryIndex}-${faqIndex}`}
                      className="bg-white rounded-lg shadow-sm"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left font-medium text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          ))}

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
                    Our support team is here to help with any questions you may
                    have.
                  </p>
                </div>
              </div>
              <Link href="/contact" className="shrink-0">
                <Button className="bg-secondary hover:bg-secondary/90">
                  Contact Support
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
