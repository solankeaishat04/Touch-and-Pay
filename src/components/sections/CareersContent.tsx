/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AnimateIn from "./AnimateIn";

async function getCareersData() {
  // 1. Updated the GROQ projection to accurately pull your new perkIcon object properties
  const query = `*[_type == "careersPage"][0]{
    heroTitleNormalLeft, heroTitleAccent, heroTitleNormalRight, heroSubtitle, bannerImage,
    storyDescription, ctaButtonText,
    perksTitle, 
    perksList[]{
      title,
      description,
      perkIcon
    },
    testimonialHeading, testimonialQuote, testimonialAuthor, testimonialRole, testimonialBgImage
  }`;
  
  // Set revalidate to 0 during development so your newly uploaded images sync up instantly
  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

export default async function CareersContent() {
  const data = await getCareersData();
  if (!data) return null;

  return (
    <div className="w-full bg-white text-neutral-900 font-sans overflow-x-hidden">
      
      {/* ================= 1. WHITE HERO INTRO ================= */}
      <header className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-16 text-center">
        <AnimateIn direction="up" delay={0.1}>
          <h1 className="text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl md:text-6xl leading-[1.1]">
            {data.heroTitleNormalLeft}
            <span className="text-[#1E70B8]">{data.heroTitleAccent}</span>
            {data.heroTitleNormalRight}
          </h1>
          <p className="mt-6 text-sm text-neutral-500 max-w-xl mx-auto font-normal leading-relaxed">
            {data.heroSubtitle}
          </p>
        </AnimateIn>
      </header>

      {/* ================= 2. FULL WIDTH MURAL BANNER ================= */}
      <section className="w-full px-6 max-w-7xl mx-auto">
        <AnimateIn type="zoom" delay={0.2}>
          {data.bannerImage && (
            <div className="relative w-full aspect-[1440/960] overflow-hidden rounded-[2rem] bg-neutral-50 shadow-sm border border-neutral-100">
              <Image
                src={urlFor(data.bannerImage).url()}
                alt="TAP Team Mural"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          )}
        </AnimateIn>
      </section>

      {/* ================= 3. DARK NAVY STORY SECTION ================= */}
      <section className="w-full bg-[#0B192C] text-white mt-16 py-20 px-6 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 lg:px-10">
          <div className="max-w-2xl flex flex-col items-start text-left">
            <AnimateIn direction="left" delay={0.3}>
              <p className="text-xl sm:text-2xl font-bold leading-relaxed tracking-wide text-neutral-100">
                {data.storyDescription}
              </p>
              <div className="mt-10">
                <Link href="#story-details" className="inline-block rounded-xl bg-[#E87C36] px-8 py-4 text-xs font-bold text-white shadow-sm transition-all transform hover:scale-[1.03] hover:bg-[#d46a27]">
                  {data.ctaButtonText}
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ================= 4. PERKS GRID SECTION (FIXED FOR UPLOADED ICONS) ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <AnimateIn direction="up">
          <h2 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl max-w-md leading-tight">
            {data.perksTitle}
          </h2>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {(data.perksList || []).map((perk: any, idx: number) => (
            <AnimateIn key={idx} direction="up" delay={(idx % 3) * 0.1}>
              <div className="flex flex-col items-start text-left">
                
                {/* 2. Replaced the text emoji container with a clean Next.js image processor container */}
                <div className="w-10 h-10 rounded-xl bg-[#FDF2EB] flex items-center justify-center p-2.5 mb-4 shadow-sm relative overflow-hidden">
                  {perk.perkIcon ? (
                    <Image 
                      src={urlFor(perk.perkIcon).url()} 
                      alt={`${perk.title || 'perk'} icon`}
                      width={24}
                      height={24}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <span className="text-xs text-neutral-400">✨</span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-neutral-900 tracking-tight">{perk.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500 font-normal">{perk.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ================= 5. TESTIMONIAL CAROUSEL SLIDE ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <AnimateIn direction="up">
          <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl max-w-lg mb-12">
            {data.testimonialHeading}
          </h2>
        </AnimateIn>

        <AnimateIn type="zoom" delay={0.1}>
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[560px] overflow-hidden rounded-[2.5rem] bg-neutral-900 text-white flex items-end p-8 md:p-16 border border-neutral-100 shadow-xl">
            
            {/* Background Image Panel */}
            {data.testimonialBgImage && (
              <Image
                src={urlFor(data.testimonialBgImage).url()}
                alt="TAP Employee Workspace"
                fill
                sizes="100vw"
                className="object-cover opacity-60 mix-blend-luminosity transform scale-100 transition-transform duration-700 hover:scale-[1.02]"
              />
            )}

            {/* Linear Dark Vignette overlay shader */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            {/* Testimonial Core Card Details */}
            <div className="relative z-10 max-w-2xl text-left">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                “{data.testimonialQuote}”
              </p>
              <div className="mt-6 border-l-2 border-[#E87C36] pl-4">
                <span className="block text-sm font-black tracking-wide text-white">{data.testimonialAuthor}</span>
                <span className="block text-[10px] font-bold tracking-widest text-neutral-400 uppercase mt-0.5">{data.testimonialRole}</span>
              </div>
            </div>

          </div>
        </AnimateIn>
      </section>

    </div>
  );
}