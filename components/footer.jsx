"use client";

import Link from "next/link";
import {
  QrCode,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated && (
        <footer className=" bg-primary text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <QrCode className="h-8 w-8" />
                  <span className="text-xl font-bold accent-font">
                    DigiDine
                  </span>
                </div>
                <p className="text-sm text-gray-300 max-w-xs">
                  Transform your restaurant experience with digital menus and QR
                  code technology.
                </p>
                <div className="flex space-x-4 pt-2">
                  <Link
                    href="#"
                    className="hover:text-accent transition-colors"
                  >
                    <Facebook size={20} />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-accent transition-colors"
                  >
                    <Twitter size={20} />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-accent transition-colors"
                  >
                    <Instagram size={20} />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/features"
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/demo"
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      Demo
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/testimonials"
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      Testimonials
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/pages/privacy-policy"
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pages/privacy-policy"
                      className="text-gray-300  hover:text-accent transition-colors"
                    >
                      Shipping And Delivery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pages/contact-us"
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pages/privacy-policy"
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      Cancellation And Refund
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pages/terms-and-condition"
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      Terms and Condition
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-300">
                    <Mail size={16} />
                    <span>support@digidine.com</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Phone size={16} />
                    <span>+1 (555) 123-4567</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link
                    href="/contact"
                    className="inline-block px-4 py-2 bg-accent text-primary font-medium rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-400">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <p>
                  © {new Date().getFullYear()} DigiDine. All rights reserved.
                </p>
                <div className="flex gap-6">
                  <Link
                    href="/privacy"
                    className="hover:text-accent transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="hover:text-accent transition-colors"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
