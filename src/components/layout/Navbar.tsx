"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavDropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  children: NavDropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: "Product",
    children: [
      { label: "Automated Fare System", href: "/products/automated-fare" },
      { label: "Merchant POS", href: "/products/merchant-pos" },
    ],
  },
  {
    label: "Project",
    children: [
      { label: "Cowry Danfo", href: "/projects/cowry-danfo" },
      { label: "Bus Reform Initiative", href: "/projects/bus-reform" },
      { label: "NIPOST", href: "/projects/nipost" },
      { label: "TAPIS", href: "/projects/tapis" },
      { label: "Health Touch", href: "/projects/health-touch" },
      { label: "NIBOX", href: "/projects/nibox" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blogs", href: "/resources/blogs" },
      { label: "FAQs", href: "/resources/faqs" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/company/about" },
      { label: "Why Choose TAP", href: "/company/why-tap" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
  {
    label: "Legal",
    children: [
      { label: "Terms and Conditions", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Data Protection Policy", href: "/legal/data-protection" },
      { label: "Information Security Policy", href: "/legal/information-security" },
      { label: "Quality Management System Policy", href: "/legal/qms-policy" },
    ],
  },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

  const toggleMobileDropdown = (label: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center z-50">
          <Image 
            src="/logo 3.svg"
            alt="TAP Logo"
            width={100}
            height={36}
            className="object-contain"
            priority
          />
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-neutral-700 transition hover:text-neutral-900">
                {item.label}
                <ChevronDown
                  className={`h-3 w-3 text-neutral-400 transition-transform duration-200 ${
                    activeDropdown === item.label ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Desktop Dropdown Card Grid */}
              {activeDropdown === item.label && (
                <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-2xl border border-neutral-100 bg-[#F4F6F9]/90 p-1 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="rounded-xl bg-white p-2">
                    <ul className="space-y-0.5">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-900"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Button & Mobile Trigger Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-xl bg-[#E87C36] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#d46a27]"
          >
            Partner with us
          </Link>

          {/* Hamburger Trigger Switch */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 md:hidden z-50"
            aria-label="Toggle structural menu view"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE VIEW DRAWER SHEET ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-0 z-40 bg-white border-b border-neutral-100 shadow-xl px-6 pt-24 pb-10 max-h-[100vh] overflow-y-auto md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isDropdownOpen = mobileActiveDropdown === item.label;
                return (
                  <div key={item.label} className="border-b border-neutral-50/60 last:border-none py-1">
                    <button
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="flex w-full items-center justify-between py-3 text-sm font-semibold text-neutral-800"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180 text-[#E87C36]" : ""
                        }`}
                      />
                    </button>

                    {/* Collapsible Children Container */}
                    <AnimatePresence initial={false}>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden bg-neutral-50 rounded-xl"
                        >
                          <ul className="p-2 space-y-1">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block rounded-lg px-4 py-2.5 text-xs font-medium text-neutral-600 active:bg-neutral-100"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Sticky Mobile Menu Footer Action */}
            <div className="mt-8 pt-6 border-t border-neutral-100 sm:hidden">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-[#E87C36] py-3.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#d46a27]"
              >
                Partner with us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}