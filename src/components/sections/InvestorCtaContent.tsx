/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AnimateIn from "./AnimateIn";

async function getInvestorData() {
  const query = `*[_type == "investorCtaSection"][0]{
    investorHeading, investorSubheading, investorLogos,
    ctaHeading, ctaDescription, ctaButtonText,
    ctaImage // ◄─ Fetches your dynamic corner asset mapping
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function InvestorCtaContent() {
  const data = await getInvestorData();
  if (!data) return null;

  const logos = data.investorLogos || [];
  
  const row1Logos = logos.slice(0, 4);
  const row2Logos = logos.slice(4, 9);
  const row3Logos = logos.slice(9);

  return (
    <div className="w-full bg-white text-neutral-900 pb-16 font-sans">
      
      {/* ================= INVESTORS LOGO SECTION ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 text-center">
        <div className="max-w-2xl mx-auto mb-16">
          <AnimateIn direction="up">
            <h2 className="text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl">
              {data.investorHeading}
            </h2>
            <p className="mt-4 text-sm text-neutral-500 max-w-xl mx-auto leading-relaxed">
              {data.investorSubheading}
            </p>
          </AnimateIn>
        </div>

        {/* Structured Multi-Tier Logo Grid Wall */}
        <div className="flex flex-col items-center justify-center space-y-12 max-w-5xl mx-auto mt-12 w-full">
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 w-full">
            {row1Logos.map((logo: any, idx: number) => (
              <AnimateIn key={`r1-${idx}`} direction="up" delay={idx * 0.08} type="fade">
                <div className="h-14 w-36 md:w-44 relative transform hover:scale-110 hover:rotate-1 transition-all duration-300 ease-out cursor-pointer drop-shadow-[0_4px_10px_rgba(0,0,0,0.02)]">
                  <Image src={urlFor(logo).url()} alt={logo.alt || "Investor Logo"} fill className="object-contain" priority />
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 w-full pt-2">
            {row2Logos.map((logo: any, idx: number) => (
              <AnimateIn key={`r2-${idx}`} direction="up" delay={(idx + row1Logos.length) * 0.06} type="fade">
                <div className="h-12 w-32 md:w-36 relative transform hover:scale-110 hover:-rotate-1 transition-all duration-300 ease-out cursor-pointer drop-shadow-[0_4px_8px_rgba(0,0,0,0.01)]">
                  <Image src={urlFor(logo).url()} alt={logo.alt || "Investor Logo"} fill className="object-contain" priority />
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Row 3 */}
          {row3Logos.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 w-full pt-2">
              {row3Logos.map((logo: any, idx: number) => (
                <AnimateIn key={`r3-${idx}`} direction="up" delay={(idx + row1Logos.length + row2Logos.length) * 0.06} type="fade">
                  <div className="h-12 w-32 md:w-36 relative transform hover:scale-110 transition-all duration-300 ease-out cursor-pointer">
                    <Image src={urlFor(logo).url()} alt={logo.alt || "Investor Logo"} fill className="object-contain" priority />
                  </div>
                </AnimateIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CALL TO ACTION BANNER ================= */}
      <section className="mx-auto max-w-5xl px-6 mt-12 mb-12">
        <AnimateIn type="zoom" delay={0.2}>
          <div className="relative w-full rounded-[2.5rem] bg-[#051329] px-8 py-16 md:p-20 overflow-hidden flex flex-col items-start justify-center min-h-[280px] shadow-xl">
            
            <div className="z-10 max-w-xl">
              <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                {data.ctaHeading}
              </h3>
              <p className="mt-4 text-sm text-neutral-400 leading-relaxed max-w-sm font-normal">
                {data.ctaDescription}
              </p>
              
              <div className="mt-8">
                <Link 
                  href="#contact" 
                  className="inline-block rounded-xl bg-white px-7 py-4 text-xs font-bold text-neutral-900 shadow-sm transition transform hover:scale-105 hover:bg-neutral-100"
                >
                  {data.ctaButtonText}
                </Link>
              </div>
            </div>

            {/* Dynamic Corner Graphic Rendered directly from Sanity Asset Bucket */}
            {data.ctaImage && (
              <div className="absolute right-0 bottom-0 top-0 w-1/2 md:w-1/3 pointer-events-none select-none hidden sm:block">
                <Image
                  src={urlFor(data.ctaImage).url()}
                  alt="Abstract Decorative Design Corner Layout Asset"
                  fill
                  className="object-contain object-right-bottom"
                  priority
                />
              </div>
            )}

          </div>
        </AnimateIn>
      </section>

    </div>
  );
}