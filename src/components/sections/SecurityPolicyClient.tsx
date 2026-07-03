/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { ChevronRight, ShieldAlert } from "lucide-react";

interface Section {
  title: string;
  slug: { current: string };
  content: any[];
}

interface SecurityPolicyClientProps {
  title: string;
  lastUpdated: string;
  sections: Section[];
}

export default function SecurityPolicyClient({ title, lastUpdated, sections }: SecurityPolicyClientProps) {
  const [activeSlug, setActiveSlug] = useState<string>(() => (sections && sections.length ? sections[0].slug.current : ""));
  const observerRef = useRef<Record<string, IntersectionObserverEntry>>({});

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        observerRef.current[entry.target.id] = entry;
      });

      const visibleSections = Object.values(observerRef.current).filter(
        (entry) => entry.isIntersecting
      );

      if (visibleSections.length > 0) {
        const primarySection = visibleSections.reduce((prev, curr) => 
          curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
        );
        setActiveSlug(primarySection.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-12% 0px -68% 0px",
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
      const offsetPosition = targetElement.offsetTop - 50;
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
        
        {/* ================= SIDEBAR NAVIGATION CONTAINER ================= */}
        <aside className="lg:col-span-4 sticky top-28 hidden lg:block max-h-[calc(100vh-12rem)] overflow-y-auto pr-4 scrollbar-thin">
          <div className="flex items-center gap-2 mb-6 border-b border-neutral-100 pb-4">
            <ShieldAlert className="w-4 h-4 text-[#E87C36]" />
            <span className="text-xs font-black uppercase tracking-wider text-neutral-400">InfoSec Governance</span>
          </div>
          
          <nav className="flex flex-col gap-1.5">
            {sections.map((section) => {
              const isActive = activeSlug === section.slug.current;
              return (
                <button
                  key={section.slug.current}
                  onClick={() => scrollToSection(section.slug.current)}
                  className={`group text-left py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-between ${
                    isActive 
                      ? "text-white bg-[#E87C36] shadow-md shadow-orange-600/10" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                  }`}
                >
                  <span className="truncate pr-2">{section.title}</span>
                  <ChevronRight 
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isActive ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-neutral-400"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ================= INFOSEC POLICY TEXT VIEWPORT ================= */}
        <main className="lg:col-span-8 flex flex-col gap-14 text-neutral-800 leading-relaxed text-sm">
          <div className="pb-6 border-b border-neutral-100">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.2) }}
                className="scroll-mt-28 pb-8 border-b border-neutral-100/60 last:border-none"
              >
                <h2 className="text-xl font-black tracking-tight text-neutral-900 mb-4">
                  {section.title}
                </h2>

                <div className="prose prose-neutral prose-sm max-w-none text-neutral-500 font-normal space-y-4">
                  <PortableText 
                    value={section.content} 
                    components={{
                      block: {
                        normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
                      },
                      list: {
                        number: ({ children }) => <ol className="list-decimal pl-5 space-y-2 mt-2 font-normal text-neutral-600">{children}</ol>,
                        bullet: ({ children }) => <ul className="list-disc pl-5 space-y-2 mt-2 font-normal text-neutral-600">{children}</ul>,
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