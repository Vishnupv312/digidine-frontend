"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, QrCode, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-background/10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <QrCode className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary accent-font">
              DigiDine
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            FAQ
          </Link>
          <Link
            href="/Contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
          <Link
            href="/Blog"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Blog
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button className="text-white">Sign up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t"
        >
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={toggleMenu}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Link href="/login" onClick={toggleMenu}>
                <Button variant="outline" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" onClick={toggleMenu}>
                <Button className="w-full">Sign up</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
