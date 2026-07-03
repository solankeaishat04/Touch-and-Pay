/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AnimateIn from "./AnimateIn";

async function getPageData() {
  // Fetching both the reference pointer and the dereferenced asset URL
  const query = `*[_type == "whyChooseTapPage"][0]{
    heroTitle, 
    heroSubtitle, 
    topFeatures[]{
      title,
      description,
      featureIcon{
        ...,
        asset->{ _id, url }
      }
    }, 
    detailRows[]{
      title,
      description,
      image{
        ...,
        asset->{ _id, url }
      },
      imagePlacement
    },
    ctaHeading,
    ctaSubtitle,
    ctaButtonLabel,
    ctaBgGraphic{
      ...,
      asset->{ _id, url }
    }
  }`;
  
  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

export default async function WhyChooseTapContent() {
  const data = await getPageData();
  if (!data) return null;

  // Safely extract image URLs from Sanity image structure formats
  const getImageUrl = (imageField: any) => {
    if (!imageField) return null;
    if (imageField.asset?.url) return imageField.asset.url;
    try {
      return urlFor(imageField).url();
    } catch (e) {
      if (imageField.asset) {
        try {
          return urlFor(imageField.asset).url();
        } catch {
          return null;
        }
      }
      return null;
    }
  };

  return (
    <div className="w-full bg-white text-neutral-900 font-sans overflow-x-hidden">
      
      {/* ================= 1. DARK HERO ENVIRONMENT ================= */}
      <section className="w-full bg-black text-white text-center py-24 px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
          <AnimateIn direction="up" delay={0.1}>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl text-white">
              {data.heroTitle}
            </h1>
            <p className="mt-6 text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto">
              {data.heroSubtitle}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ================= 2. 4-COLUMN FEATURE CARDS ROW ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(data.topFeatures || []).map((feat: any, idx: number) => {
            const iconUrl = getImageUrl(feat.featureIcon);

            return (
              <AnimateIn key={idx} direction="up" delay={idx * 0.08}>
                <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-neutral-100/60 shadow-sm flex flex-col items-start h-full transition-transform duration-300 hover:scale-[1.02]">
                  <div className="w-10 h-10 rounded-xl bg-[#FDF2EB] flex items-center justify-center p-2.5 mb-5 shadow-sm relative overflow-hidden">
                    {iconUrl ? (
                      <Image 
                        src={iconUrl}
                        alt={`${feat.title || 'feature'} icon`}
                        width={24}
                        height={24}
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <span className="text-xs text-[#E87C36]">🌐</span>
                    )}
                  </div>
                  <h3 className="text-base font-black tracking-tight text-neutral-900">{feat.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-500 font-normal">{feat.description}</p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      {/* ================= 3. ALTERNATING SPLIT SECTIONS MAPPER ================= */}
      <section className="pb-24 flex flex-col gap-24">
        {(data.detailRows || []).map((row: any, idx: number) => {
          const isImageLeft = row.imagePlacement === "left";
          const rowImageUrl = getImageUrl(row.image);

          return (
            <div key={idx} className="mx-auto max-w-7xl w-full px-6 lg:px-10">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
                
                {/* IMAGE FRAME BLOCK CONTAINER */}
                <div className={`lg:col-span-6 flex justify-center ${isImageLeft ? "order-1" : "order-1 lg:order-2"}`}>
                  <AnimateIn type="zoom" delay={0.1}>
                    {rowImageUrl ? (
                      <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral-50 border border-neutral-100/50 shadow-sm w-full aspect-[4/3] max-w-[540px]">
                        <Image
                          src={rowImageUrl}
                          alt={row.title || "Detail Graphic"}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/3] max-w-[540px] bg-neutral-50 rounded-[2.5rem] flex items-center justify-center border border-dashed border-neutral-200 text-neutral-400 text-xs">
                        No image uploaded for "{row.title || `Row ${idx + 1}`}"
                      </div>
                    )}
                  </AnimateIn>
                </div>

                {/* COPY TEXT ACCENT BLOCK CONTAINER */}
                <div className={`lg:col-span-6 flex flex-col justify-center ${isImageLeft ? "order-2" : "order-2 lg:order-1"}`}>
                  <AnimateIn direction={isImageLeft ? "right" : "left"} delay={0.2}>
                    <div className="w-8 h-8 rounded-lg bg-[#FDF2EB] flex items-center justify-center mb-6 text-[#E87C36] text-sm font-bold">
                      🌐
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl leading-[1.15]">
                      {row.title}
                    </h2>
                    <p className="mt-5 text-sm leading-relaxed text-neutral-500 font-normal max-w-xl">
                      {row.description}
                    </p>
                  </AnimateIn>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* ================= 4. TARGET SYSTEM BRAND CTA BANNER ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24 w-full">
        <AnimateIn type="zoom" delay={0.15}>
          <div className="relative w-full rounded-[2rem] bg-[#0A192F] text-white p-10 md:p-16 overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between border border-neutral-900/40 shadow-xl">
            
            {/* Context Details */}
            <div className="relative z-10 max-w-xl text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                {data.ctaHeading || "Ready to Simplify Your Payments?"}
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed max-w-md">
                {data.ctaSubtitle || "Join MILLIONS of commuters and merchants already using TAP."}
              </p>
              <div className="mt-8">
                <Link 
                  href="/contact" 
                  className="inline-block rounded-xl bg-white px-7 py-3.5 text-xs font-bold text-[#0A192F] shadow-sm transition-all transform hover:scale-[1.03] hover:bg-neutral-100"
                >
                  {data.ctaButtonLabel || "Contact Us"}
                </Link>
              </div>
            </div>

            {/* Right Side Orange Decorative Graphic Asset */}
            {getImageUrl(data.ctaBgGraphic) && (
              <div className="absolute right-0 bottom-0 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 pointer-events-none select-none z-0">
                <Image
                  src={getImageUrl(data.ctaBgGraphic)!}
                  alt="Decorative orange shape"
                  fill
                  priority
                  className="object-contain object-right-bottom translate-x-4 translate-y-4"
                />
              </div>
            )}

          </div>
        </AnimateIn>
      </section>

    </div>
  );
}