/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client"; 
import { urlFor } from "@/sanity/lib/image";   
import AnimateIn from "./AnimateIn";

async function getLandingData() {
  // ─── FIXED: Changed missionImageClean to missionImage to match your schema ───
  const query = `*[_type == "heroSection"][0]{
    eyebrow, heroTitleNormalLeft, heroTitleAccent, heroTitleNormalRight, heroDescription, heroImage,
    missionEyebrow, missionTitleLeft, missionTitleAccent, missionTitleRight, missionDescription, 
    missionImage 
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function LandingContent() {
  const data = await getLandingData();

  if (!data) {
    return (
      <div className="py-20 text-center text-sm text-neutral-400">
        Awaiting CMS Structure Seeding... Populate data fields within /studio
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-neutral-900 overflow-x-hidden">
      
      {/* SECTION 1: HERO ENVIRONMENT */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-20 lg:px-10 lg:py-24 grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimateIn direction="left" delay={0.1}>
            <span className="inline-block rounded-full bg-[#FDF2EB] px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#E87C36] uppercase">
              {data.eyebrow}
            </span>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.2}>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl leading-[1.1]">
              {data.heroTitleNormalLeft}{" "}
              <span className="text-[#E87C36] font-extrabold">{data.heroTitleAccent}</span>{" "}
              {data.heroTitleNormalRight}
            </h1>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.3}>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-500 font-normal">
              {data.heroDescription || "We believe payment is a social solution, not just a technical one. We built a robust, offline-capable NFC infrastructure, we've revolutionized how millions of Nigerians and Africans move and transact daily."}
            </p>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="#solutions" className="rounded-xl bg-[#E87C36] px-6 py-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#d46a27]">
                Explore solutions
              </Link>
              <Link href="#partner" className="rounded-xl bg-[#F4F6F9] px-6 py-3.5 text-xs font-bold text-neutral-700 transition hover:bg-neutral-200">
                Become a Partner
              </Link>
            </div>
          </AnimateIn>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <AnimateIn type="zoom" delay={0.3}>
            {data.heroImage && (
              <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral-50 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src={urlFor(data.heroImage).url()}
                  alt="TAP Terminal Platform Device"
                  width={460}
                  height={560}
                  className="object-cover w-full h-auto aspect-[4/5]"
                  priority
                />
              </div>
            )}
          </AnimateIn>
        </div>
      </section>

      {/* SECTION 2: CORPORATE MISSION ENVIRONMENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-20 lg:px-10 lg:py-24 grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
        
        <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
          <AnimateIn type="zoom" delay={0.2}>
            {/* ─── FIXED: Changed from data.missionImageClean to data.missionImage ─── */}
            {data.missionImage && (
              <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral-50 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src={urlFor(data.missionImage).url()}
                  alt="Transit System Validation Array"
                  width={500}
                  height={660}
                  className="object-cover w-full h-auto aspect-square"
                />
              </div>
            )}
          </AnimateIn>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
          <AnimateIn direction="right" delay={0.1}>
            <span className="inline-block rounded-full bg-[#FDF2EB] px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#E87C36] uppercase">
              {data.missionEyebrow}
            </span>
          </AnimateIn>

          <AnimateIn direction="right" delay={0.2}>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl leading-[1.2]">
              {data.missionTitleLeft}{" "}
              <span className="text-[#E87C36] font-extrabold">{data.missionTitleAccent}</span>{" "}
              {data.missionTitleRight}
            </h2>
          </AnimateIn>

          <AnimateIn direction="right" delay={0.3}>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-500 font-normal">
              {data.missionDescription || "Our Solution is accessible, our technology is offline-ready, we aren't just processing payments we're building a foundation for financial literacy and universal inclusion."}
            </p>
          </AnimateIn>
        </div>
      </section>

    </div>
  );
}