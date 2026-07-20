/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AnimateIn from "./AnimateIn";

// ================= TYPESCRIPT SCHEMAS =================

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface ValueProp {
  title: string;
  description: string;
  iconImage?: SanityImage;
}

interface FeedbackItem {
  companyLogo?: SanityImage;
  quote: string;
  authorImage?: SanityImage;
  authorName: string;
  authorRole: string;
}

interface TrustData {
  whyHeading: string;
  whySubheading: string;
  securityImage?: SanityImage;
  valueProps: ValueProp[];
  partnerHeading: string;
  partnerSubheading: string;
  partnerLogos: SanityImage[];
  feedbackHeading: string;
  feedbackSubheading: string;
  feedbacks: FeedbackItem[];
}

// ================= DATA FETCHING =================

async function getTrustData(): Promise<TrustData | null> {
  const query = `*[_type == "trustSection"][0]{
    whyHeading, whySubheading, securityImage, 
    valueProps[]{
      title,
      description,
      iconImage
    },
    partnerHeading, partnerSubheading, partnerLogos,
    feedbackHeading, feedbackSubheading,
    feedbacks[]{
      companyLogo,
      quote,
      authorImage,
      authorName,
      authorRole
    }
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default function TrustContent() {
  const [data, setData] = useState<TrustData | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    getTrustData().then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return null;

  const logos: SanityImage[] = data.partnerLogos || [];
  const topRowLogos: SanityImage[] = logos.slice(0, 6);
  const bottomRowLogos: SanityImage[] = logos.slice(6);
  const feedbacks: FeedbackItem[] = data.feedbacks || [];

  // Duplicate the feedbacks array to make the infinite loop completely seamless
  const duplicatedFeedbacks = [...feedbacks, ...feedbacks];

  return (
    <div className="w-full bg-white text-neutral-900 pb-24 font-sans overflow-hidden">
      
      {/* Injecting CSS Keyframes directly so no tailwind.config edits are required */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* ================= SECTION 1: WHY CHOOSE TAP ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8">
          <AnimateIn direction="left">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">{data.whyHeading}</h2>
            <p className="mt-2 text-xs text-neutral-400 font-medium">{data.whySubheading}</p>
          </AnimateIn>
        </div>
        <div className="md:col-span-4 flex md:justify-end justify-start">
          {data.securityImage && (
            <AnimateIn type="zoom" delay={0.2}>
              <Image 
                src={urlFor(data.securityImage).url()} 
                alt="Security Trust Badge Lock" 
                width={300} 
                height={200} 
                className="object-contain max-w-[140px] md:max-w-full"
              />
            </AnimateIn>
          )}
        </div>

        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          {(data.valueProps || []).map((prop: ValueProp, idx: number) => (
            <AnimateIn key={idx} direction="up" delay={idx * 0.15}>
              <div className="flex flex-col space-y-3">
                <div className="h-8 w-8 relative">
                  {prop.iconImage ? (
                    <Image
                      src={urlFor(prop.iconImage).url()}
                      alt={`${prop.title} Icon`}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-lg">🔹</span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-neutral-800 tracking-wide uppercase">{prop.title}</h4>
                <p className="text-[11px] leading-relaxed text-neutral-400 font-normal">{prop.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ================= SECTION 2: BRAND PARTNERS DISPLAY MATRIX ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-10 text-left border-t border-neutral-100/60">
        <div className="max-w-3xl mx-left mb-16">
          <AnimateIn direction="up">
            <h3 className="text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl">{data.partnerHeading}</h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500 font-normal max-w-xl mx-1">{data.partnerSubheading}</p>
          </AnimateIn>
        </div>

        <div className="flex flex-col items-center justify-center space-y-10 mt-12 w-full max-w-5xl mx-auto">
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 w-full">
            {topRowLogos.map((logo: SanityImage, idx: number) => (
              <AnimateIn key={`top-${idx}`} direction="up" delay={idx * 0.1} type="fade">
                <div className="h-16 w-24 md:w-28 relative transform hover:scale-110 hover:rotate-2 transition-all duration-300 ease-out cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                  <Image
                    src={urlFor(logo).url()}
                    alt={`Institutional Crest Node ${idx}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 w-full pt-2">
            {bottomRowLogos.map((logo: SanityImage, idx: number) => (
              <AnimateIn key={`bottom-${idx}`} direction="up" delay={(idx + topRowLogos.length) * 0.08} type="fade">
                <div className="h-12 w-20 md:w-24 relative transform hover:scale-110 hover:-rotate-2 transition-all duration-300 ease-out cursor-pointer drop-shadow-[0_4px_10px_rgba(0,0,0,0.02)]">
                  <Image
                    src={urlFor(logo).url()}
                    alt={`Commercial Partner Node ${idx}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: AUTOPLAY PARTNERS FEEDBACK MARQUEE ================= */}
      <section className="bg-neutral-50/50 py-24 border-t border-b border-neutral-100/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          
          {/* Header Area */}
          <div className="max-w-2xl mb-8">
            <AnimateIn direction="left">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-none">
                {data.feedbackHeading || "Backed by strong global partners"}
              </h2>
              <p className="mt-4 text-sm text-neutral-500 max-w-xl font-normal leading-relaxed">
                {data.feedbackSubheading || "TAP is backed by notable investors as well as some of the best payments companies on the planet."}
              </p>
            </AnimateIn>
          </div>

          {/* Infinite Drifting Wrapper */}
          <div 
            className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div 
              className="animate-marquee-infinite flex gap-6"
              style={{
                animationPlayState: isPaused ? 'paused' : 'running'
              }}
            >
              {duplicatedFeedbacks.map((item: FeedbackItem, idx: number) => (
                <div 
                  key={idx} 
                  className="w-[390px] md:w-[420px] flex-shrink-0 bg-white rounded-3xl p-8 md:p-10 border border-neutral-100/80 shadow-sm flex flex-col justify-between min-h-[400px]"
                >
                  <div className="space-y-8">
                    {/* Brand Logo Header */}
                    <div className="h-8 w-32 relative">
                      {item.companyLogo && (
                        <Image
                          src={urlFor(item.companyLogo).url()}
                          alt="Company Logo"
                          fill
                          className="object-contain object-left"
                        />
                      )}
                    </div>

                    {/* Feedback Quote Text */}
                    <p className="text-neutral-600 text-[14px] md:text-[15px] leading-relaxed font-normal">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Author Meta Footer */}
                  <div className="flex items-center gap-4 mt-4 pt-6 border-t border-neutral-100">
                    <div className="h-12 w-12 rounded-full relative overflow-hidden bg-neutral-100 flex-shrink-0">
                      {item.authorImage ? (
                        <Image
                          src={urlFor(item.authorImage).url()}
                          alt={item.authorName || "Feedback Author"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#f27424] text-white flex items-center justify-center font-bold text-sm">
                          {item.authorName?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-neutral-900 text-sm leading-snug">{item.authorName}</h4>
                      <p className="text-xs text-neutral-400 font-medium">{item.authorRole}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}