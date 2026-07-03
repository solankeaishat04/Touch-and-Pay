/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AnimateIn from "./AnimateIn";

async function getTrustData() {
  const query = `*[_type == "trustSection"][0]{
    whyHeading, whySubheading, securityImage, valueProps,
    partnerHeading, partnerSubheading, partnerLogos,
    videoHeading, videoSubheading, youtubeUrl
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

function getEmbedId(url: string) {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : "";
}

export default async function TrustContent() {
  const data = await getTrustData();
  if (!data) return null;

  const embedId = getEmbedId(data.youtubeUrl);
  
  // Clean split allocation to match Figma layout perfectly (Top row gets 6 logos, remaining on row 2)
  const logos = data.partnerLogos || [];
  const topRowLogos = logos.slice(0, 6);
  const bottomRowLogos = logos.slice(6);

  return (
    <div className="w-full bg-white text-neutral-900 pb-24 font-sans">
      
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
                width={160} 
                height={160} 
                className="object-contain max-w-[140px] md:max-w-full"
              />
            </AnimateIn>
          )}
        </div>

        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          {(data.valueProps || []).map((prop: any, idx: number) => (
            <AnimateIn key={idx} direction="up" delay={idx * 0.15}>
              <div className="flex flex-col space-y-3">
                <span className="text-lg">
                  {prop.iconType === "lock" ? "🔹" : "📍"}
                </span>
                <h4 className="text-xs font-bold text-neutral-800 tracking-wide uppercase">{prop.title}</h4>
                <p className="text-[11px] leading-relaxed text-neutral-400 font-normal">{prop.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ================= SECTION 2: BRAND PARTNERS DISPLAY MATRIX ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 text-center border-t border-neutral-100/60">
        <div className="max-w-3xl mx-auto mb-16">
          <AnimateIn direction="up">
            <h3 className="text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl">{data.partnerHeading}</h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500 font-normal max-w-xl mx-auto">{data.partnerSubheading}</p>
          </AnimateIn>
        </div>

        {/* Dynamic Partner Logo Track Grid Area */}
        <div className="flex flex-col items-center justify-center space-y-10 mt-12 w-full max-w-5xl mx-auto">
          
          {/* Row 1: Institutional & Government Logos */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 w-full">
            {topRowLogos.map((logo: any, idx: number) => (
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

          {/* Row 2: Corporate & Strategic Solutions Logos */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 w-full pt-2">
            {bottomRowLogos.map((logo: any, idx: number) => (
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

      {/* ================= SECTION 3: YOUTUBE VIDEO TESTIMONIAL ENVIRONMENT ================= */}
      <section className="bg-neutral-50/50 py-20 border-t border-b border-neutral-100/40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <AnimateIn direction="up">
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">{data.videoHeading}</h2>
            <p className="mt-2 text-xs text-neutral-400 font-medium mb-12">{data.videoSubheading}</p>
          </AnimateIn>

          {embedId && (
            <AnimateIn type="zoom" delay={0.2}>
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-neutral-200">
                <iframe
                  src={`https://www.youtube.com/embed/${embedId}`}
                  title="Touch and Pay Impact Testimonial Video Stream Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

    </div>
  );
}