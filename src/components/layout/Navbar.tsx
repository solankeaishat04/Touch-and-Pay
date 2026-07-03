"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo 3.svg" // Replace with your exact local public asset name
            alt="TAP Logo"
            width={100}
            height={36}
            className="object-contain"
            priority
          />
        </Link>

        {/* Navigation Items with Dropdowns */}
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
                <svg
                  className={`h-3 w-3 text-neutral-400 transition-transform duration-200 ${
                    activeDropdown === item.label ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Card Grid Matrix matching image_669458.png */}
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

        {/* Orange Brand CTA Button */}
        <Link
          href="#contact"
          className="inline-flex items-center rounded-xl bg-[#E87C36] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#d46a27]"
        >
          Partner with us
        </Link>
      </nav>
    </header>
  );
}