/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AnimateIn from "./AnimateIn";
import ContactForm from "./ContactForm";

async function getInvestorData() {
  // Only fetching investor content now that the CTA banner is removed
  const query = `*[_type == "investorCtaSection"][0]{
    investorHeading, investorSubheading, investorLogos
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

      {/* ================= DYNAMIC CONTACT FORM SECTION ("Let's Build Together") ================= */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-12 scroll-mt-24">
        <div className="w-full bg-[#051329] rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 text-white shadow-xl">
          
          {/* Information Column */}
          <div className="flex-1 flex flex-col justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">Let's build together.</h2>
              <p className="text-neutral-400 mt-4 max-w-md font-normal leading-relaxed">
                Ready to digitize your payment infrastructure? Get in touch with our team today.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Email Connection */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#111c2e] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f27424]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-2-5H4a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Email Us</p>
                  <a href="mailto:ask@touchandpay.me" className="text-sm font-semibold hover:text-[#f27424] transition-colors">ask@touchandpay.me</a>
                </div>
              </div>

              {/* Physical Location */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#111c2e] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f27424]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Visit Us</p>
                  <p className="text-sm font-semibold">62, Shipeolu Street, Somolu, Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form Component Column */}
          <div className="flex-1 bg-[#091932] rounded-3xl p-6 md:p-8 border border-neutral-800">
            <ContactForm />
          </div>

        </div>
      </section>

    </div>
  );
}