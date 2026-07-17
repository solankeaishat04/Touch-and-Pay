import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AnimateIn from "./AnimateIn";

async function getSolutionsData() {
  const query = `*[_type == "solutionsSection"][0]{
    featureEyebrow, featureTitle, featureDescription, featureImage, featureList,
    solutionsHeading, solutionsSubheading,
    commuterTitle, commuterDescription, commuterImage,
    businessTitle, businessDescription,
    merchantTitle, merchantDescription, merchantImage
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function SolutionsContent() {
  const data = await getSolutionsData();

  if (!data) return null;

  return (
    <div className="w-full bg-white text-neutral-900 pb-24 font-sans">
      
      {/* ================= COWRY FEATURE CONTAINER BLOCK ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 mt-6">
        <AnimateIn type="zoom" delay={0.1}>
          <div className="w-full rounded-[2.5rem] bg-[#EDF5FF] p-8 md:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Column */} 
            <div className="lg:col-span-7 flex flex-col justify-start">
              <span className="inline-block self-start rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#3B82F6] uppercase">
                {data.featureEyebrow}
              </span>

              {/* Title Injection with Styled Secondary Text */}
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl leading-[1.15]">
                Cowry: The Smart & <span className="text-[#3B82F6]">Fastest</span> Way to Pay.
              </h2>

              <p className="mt-6 text-xs leading-relaxed text-neutral-500 max-w-xl font-normal">
                {data.featureDescription || "Our flagship product, Cowry, is a robust NFC-based payment system serving more than 6 million commuters. It eliminates the barriers of poor connectivity by processing secure, instant transactions completely offline..."}
              </p>

              {/* Mini Features List Array */}
              <div className="mt-8 space-y-6">
                {(data.featureList || [
                  { title: "Contactless & Fast", description: "Tap, Pay and Go in under 0.5 seconds at any terminal." },
                  { title: "Offline Capable", description: "The technology solution works without an active internet connection" },
                  { title: "Universal Acceptance", description: "One card for buses, ferries, trains, and other retails." }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ]).map((item: any, idx: number) => (
                  <div key={idx} className="flex flex-col">
                    <h4 className="text-sm font-bold text-neutral-800">{item.title}</h4>
                    <p className="text-xs text-neutral-400 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="#cowry" className="inline-flex rounded-xl bg-[#1D63ED] px-6 py-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#154ec4]">
                  Learn more about Cowry
                </Link>
              </div>
            </div>

            {/* Right Card Graphics Column */}
            <div className="lg:col-span-5 flex justify-center">
              {data.featureImage && (
                <div className="relative transform transition-transform duration-500 hover:rotate-2">
                  <Image
                    src={urlFor(data.featureImage).url()}
                    alt="Lagos State Cowry Travel Wallet Device Card"
                    width={400}
                    height={400}
                    className="object-contain w-full h-auto max-w-[360px]"
                  />
                </div>
              )}
            </div>

          </div>
        </AnimateIn>
      </section>

      {/* ================= OUR SOLUTIONS HUB GRID ENVIRONMENT ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 mt-24">
        
        {/* Header Heading Group */}
        <div className="text-left max-w-xl mx-left mb-16">
          <AnimateIn direction="up">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              {data.solutionsHeading}
            </h2>
            <p className="mt-3 text-xs text-neutral-400">
              {data.solutionsSubheading}
            </p>
          </AnimateIn>
        </div>

        {/* Dynamic Structural Grid Assembly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CARD 1: Full Width Commuter Layout block */}
          <div className="md:col-span-2">
            <AnimateIn direction="up" delay={0.1}>
              <div className="w-full rounded-[2rem] bg-[#E3EFFC] overflow-hidden p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[300px]">
                <div className="md:col-span-7 pr-4">
                  <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900">{data.commuterTitle}</h3>
                  <p className="mt-4 text-xs leading-relaxed text-neutral-500 max-w-md font-normal">
                    {data.commuterDescription || "For Commuters – TAP redefines daily commuting by offering a hassle-free way to pay for buses, trains, and ferries. No queues, no cash—just tap and go."}
                  </p>
                </div>
                <div className="md:col-span-5 flex justify-end items-start">
                  {data.commuterImage && (
                    <Image
                      src={urlFor(data.commuterImage).url()}
                      alt="Commuter Pass Cards"
                      width={300}
                      height={250}
                      className="object-contain max-h-[240px] w-auto"
                    />
                  )}
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* CARD 2: Deep Dark Business Layout block */}
          <AnimateIn direction="left" delay={0.2}>
            <div className="w-full rounded-[2rem] bg-[#071324] p-8 md:p-12 flex flex-col justify-between h-full min-h-[320px] transition-all duration-300 hover:shadow-lg">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white">{data.businessTitle}</h3>
                <p className="mt-6 text-xs leading-relaxed text-neutral-400 font-normal max-w-xs">
                  {data.businessDescription || "Partner with TAP to deliver innovative payment solutions to your customers. From transit systems to retail giants, our partnerships drive revenue, customer satisfaction, and business growth."}
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* CARD 3: Sand/Peach Merchant Layout block */}
          <AnimateIn direction="right" delay={0.2}>
            <div className="w-full rounded-[2rem] bg-[#F5E6DA] overflow-hidden p-8 md:p-12 flex flex-col justify-between h-full min-h-[320px] relative transition-all duration-300 hover:shadow-lg">
              <div className="z-10 max-w-[65%]">
                <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900">{data.merchantTitle}</h3>
                <p className="mt-6 text-xs leading-relaxed text-neutral-600 font-normal">
                  {data.merchantDescription || "TAP enables merchants to accept contactless payments effortlessly with our easy-to-use POS devices. Say goodbye to cash-related challenges..."}
                </p>
              </div>
              
              {/* Floating Absolute Merchant Corner Image Artwork */}
              {data.merchantImage && (
                <div className="absolute right-2 bottom-0 w-[40%] h-[80%] flex items-end justify-end">
                  <Image
                    src={urlFor(data.merchantImage).url()}
                    alt="Merchant Counter Accessories"
                    width={200}
                    height={240}
                    className="object-contain object-bottom max-h-full"
                  />
                </div>
              )}
            </div>
          </AnimateIn>

        </div>
      </section>

    </div>
  );
}