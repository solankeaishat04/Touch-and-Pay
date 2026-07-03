/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { ChevronRight, FileText } from "lucide-react";

interface Section {
  title: string;
  slug: { current: string };
  content: any[];
}

interface TermsLayoutClientProps {
  title: string;
  lastUpdated: string;
  sections: Section[];
}

export default function TermsLayoutClient({ title, lastUpdated, sections }: TermsLayoutClientProps) {
  const [activeSlug, setActiveSlug] = useState<string>("");
  const observerRef = useRef<Record<string, IntersectionObserverEntry>>({});

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        observerRef.current[entry.target.id] = entry;
      });

      // Find all sections currently intersecting the viewport
      const visibleSections = Object.values(observerRef.current).filter(
        (entry) => entry.isIntersecting
      );

      if (visibleSections.length > 0) {
        // Target the element highest up on the screen top viewport bounds
        const primarySection = visibleSections.reduce((prev, curr) => 
          curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
        );
        setActiveSlug(primarySection.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-10% 0px -70% 0px", // Focus tracking line near the upper top quadrant
      threshold: 0,
    });

    sections.forEach((section) => {
      const el = document.getElementById(section.slug.current);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (slug: string) => {
    const targetElement = document.getElementById(slug);
    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - 40; // Sweet spot padding offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSlug(slug);
    }
  };

  return (
    <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 py-16 font-sans">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start relative">
        
        {/* ================= SIDEBAR STICKY NAVIGATION ================= */}
        <aside className="lg:col-span-4 sticky top-28 hidden lg:block bg-neutral-50 border border-neutral-100/80 rounded-2xl p-5 max-h-[calc(100vh-10rem)] overflow-y-auto shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-neutral-200/60 pb-4">
            <FileText className="w-5 h-5 text-[#E87C36]" />
            <span className="text-xs font-black uppercase tracking-wider text-neutral-400">Documentation</span>
          </div>
          
          <nav className="flex flex-col gap-1 relative">
            {sections.map((section) => {
              const isActive = activeSlug === section.slug.current;
              return (
                <button
                  key={section.slug.current}
                  onClick={() => scrollToSection(section.slug.current)}
                  className={`group relative text-left py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-between overflow-hidden ${
                    isActive 
                      ? "text-white bg-[#E87C36] shadow-sm" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                >
                  <span className="relative z-10 pr-2 truncate">{section.title}</span>
                  <ChevronRight 
                    className={`w-3.5 h-3.5 object-contain transition-transform duration-300 ${
                      isActive ? "translate-x-0 opacity-100 text-white" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-neutral-400"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ================= SCROLLABLE CONTENT PANELS ================= */}
        <main className="lg:col-span-8 flex flex-col gap-14 text-neutral-800 leading-relaxed text-sm">
          <div className="border-b border-neutral-100 pb-8">
            <h1 className="text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h1>
            {lastUpdated && (
              <p className="mt-2 text-xs text-neutral-400 font-medium">
                Last updated: <span className="text-neutral-600 font-bold">{lastUpdated}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-12">
            {sections.map((section, idx) => (
              <motion.article
                id={section.slug.current}
                key={section.slug.current}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.2) }}
                className="scroll-mt-24 border-b border-neutral-100/60 pb-10 last:border-none"
              >
                {/* Visual Accent Highlighter Badge when Active */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeSlug === section.slug.current ? "w-8 bg-[#E87C36]" : "w-2 bg-neutral-200"
                  }`} />
                  <h2 className="text-xl font-black tracking-tight text-neutral-900">
                    {section.title}
                  </h2>
                </div>

                <div className="prose prose-neutral prose-sm max-w-none text-neutral-500 font-normal space-y-4">
                  <PortableText 
                    value={section.content} 
                    components={{
                      block: {
                        normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
                      }
                    }}
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}