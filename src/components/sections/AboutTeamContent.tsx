/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AnimateIn from "./AnimateIn";

async function getAboutPageData() {
  const query = `*[_type == "aboutPage"][0]{
    pageTitle, 
    pageSubheading, 
    heroVector{
      ...,
      asset->{ _id, url }
    },
    historyTitle, 
    historyBody, 
    workTitle, 
    workBody,
    stat1Number, 
    stat1Label, 
    stat2Number, 
    stat2Label, 
    stat3Number, 
    stat3Label, 
    stat4Number, 
    stat4Label,
    ctaHeading, 
    teamMembers[]{
      name,
      role,
      image{
        ...,
        asset->{ _id, url }
      }
    }
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

export default async function AboutTeamContent() {
  const data = await getAboutPageData();
  if (!data) return null;

  const team = data.teamMembers || [];
  
  // Safe image string extractor helper logic
  const getImageUrl = (imageField: any) => {
    if (!imageField) return null;
    if (imageField.asset?.url) return imageField.asset.url;
    try { return urlFor(imageField).url(); } catch { return null; }
  };

  const vectorUrl = getImageUrl(data.heroVector);

  return (
    <div className="w-full bg-white text-neutral-900 overflow-x-hidden font-sans">
      
      {/* ================= SECTION 1: HERO HEADER WITH RIGHT WAVE ELEMENT ================= */}
      <header className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-16 relative min-h-[260px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-8 relative z-10">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 text-left">
            <AnimateIn direction="up" delay={0.1}>
              <h1 className="text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
                {data.pageTitle}
              </h1>
              <p className="mt-5 text-sm sm:text-base text-neutral-500 max-w-xl font-normal leading-relaxed">
                {data.pageSubheading}
              </p>
            </AnimateIn>
          </div>

          {/* Right Vector Illustration Container Asset */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] pointer-events-none select-none z-0 hidden sm:block">
            {vectorUrl && (
              <AnimateIn type="zoom" delay={0.25}>
                <Image
                  src={vectorUrl}
                  alt="TAP corporate design graphic illustration"
                  fill
                  priority
                  className="object-contain object-right"
                />
              </AnimateIn>
            )}
          </div>

        </div>
      </header>

      {/* ================= SECTION 2: HISTORY & STATS SPLIT LAYOUT ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid grid-cols-1 gap-12 lg:grid-cols-12 items-start relative border-t border-neutral-100">
        
        {/* Left Column: Text Copy blocks */}
        <div className="lg:col-span-6 flex flex-col gap-12">
          <AnimateIn direction="left" delay={0.2}>
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight sm:text-3xl">{data.historyTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500 font-normal">{data.historyBody}</p>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.3}>
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight sm:text-3xl">{data.workTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500 font-normal">{data.workBody}</p>
          </AnimateIn>
        </div>

        {/* Right Column: 4-Card Grid Arrangement Layout */}
        <div className="lg:col-span-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:pt-4">
          {[
            { num: data.stat1Number, lbl: data.stat1Label },
            { num: data.stat2Number, lbl: data.stat2Label },
            { num: data.stat3Number, lbl: data.stat3Label },
            { num: data.stat4Number, lbl: data.stat4Label }
          ].map((stat, i) => (
            <AnimateIn key={i} type="zoom" delay={0.1 * i}>
              <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-neutral-100/60 shadow-sm transition-transform duration-300 hover:scale-[1.03]">
                <span className="block text-3xl font-black tracking-tight text-neutral-900">{stat.num}</span>
                <span className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mt-2">{stat.lbl}</span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ================= SECTION 3: CORE VALUES BAR ================= */}
      <section className="w-full bg-black text-white py-12 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn direction="up">
            <h2 className="text-xl font-bold tracking-tight text-white mb-8 border-b border-neutral-800 pb-4 max-w-xs">What defines us</h2>
          </AnimateIn>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Financial Inclusion", icon: "🌐" },
              { label: "Innovation", icon: "⚡" },
              { label: "Reliability", icon: "🛡️" },
              { label: "Accountability", icon: "✅" }
            ].map((val, i) => (
              <AnimateIn key={i} direction="up" delay={0.1 * i}>
                <div className="flex items-center gap-3 group">
                  <span className="text-lg transition-transform duration-300 group-hover:scale-125">{val.icon}</span>
                  <span className="text-sm font-semibold tracking-wide text-neutral-300 group-hover:text-white transition-colors duration-200">{val.label}</span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: CALL TO ACTION SUBSECTION ================= */}
      <section className="text-center py-20 flex flex-col items-center justify-center bg-neutral-50/50">
        <AnimateIn direction="up">
          <h2 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            {data.ctaHeading}
          </h2>
          <div className="mt-6">
            <Link href="#partner" className="inline-block rounded-xl bg-[#E87C36] px-6 py-3.5 text-xs font-bold text-white shadow-sm transition transform hover:scale-105 hover:bg-[#d46a27]">
              Partner with us
            </Link>
          </div>
        </AnimateIn>
      </section>

      {/* ================= SECTION 5: TEAM MEMBERS GRID ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {team.map((member: any, idx: number) => {
            const memberImgUrl = getImageUrl(member.image);

            return (
              <AnimateIn key={idx} direction="up" delay={(idx % 3) * 0.08}>
                <div className="group flex flex-col items-start w-full">
                  <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-neutral-50 border border-neutral-100 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-neutral-200">
                    {memberImgUrl && (
                      <Image
                        src={memberImgUrl}
                        alt={`${member.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        priority={idx < 3}
                      />
                    )}
                  </div>
                  <div className="mt-5 pl-1">
                    <h3 className="text-lg font-black tracking-tight text-neutral-900 group-hover:text-[#E87C36] transition-colors duration-200">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold tracking-wider text-neutral-400 uppercase mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>

    </div>
  );
}