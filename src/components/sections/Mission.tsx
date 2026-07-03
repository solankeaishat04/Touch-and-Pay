import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface MissionSectionProps {
  data: {
    eyebrow?: string;
    titleLeft?: string;
    accentWord?: string;
    titleRight?: string;
    description?: string;
    showcaseImage?: unknown;
    imageLeft?: boolean;
    style?: {
      backgroundColor?: string;
      accentTextColor?: string;
    };
  };
}

export default function Mission({ data }: MissionSectionProps) {
  if (!data) return null;

  const bgStyle = data.style?.backgroundColor
    ? { backgroundColor: data.style.backgroundColor }
    : { backgroundColor: "#F9FAFB" };
  const accentStyle = data.style?.accentTextColor
    ? { color: data.style.accentTextColor }
    : { color: "#EC7C30" };

  const textOrderClass = data.imageLeft === false ? "lg:order-1" : "lg:order-2";
  const imageOrderClass = data.imageLeft === false ? "lg:order-2" : "lg:order-1";
  const imageSrc = data.showcaseImage ? urlFor(data.showcaseImage as never).url() : null;

  return (
    <section style={bgStyle} className="w-full px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
        {imageSrc && (
          <div className={`relative w-full lg:col-span-5 ${imageOrderClass}`}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-100 shadow-xl">
              <Image src={imageSrc} alt="TAP mission visual" fill className="object-cover" />
            </div>
          </div>
        )}

        <div className={`flex flex-col lg:col-span-7 ${textOrderClass}`}>
          {data.eyebrow && (
            <span className="mb-4 inline-flex rounded-full bg-[#FFF3E8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#EC7C30]">
              {data.eyebrow}
            </span>
          )}

          <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-[#0A192F] md:text-5xl">
            {data.titleLeft || "Why"} {" "}
            <span style={accentStyle} className="font-serif italic">
              {data.accentWord || "TAP"}
            </span>{" "}
            {data.titleRight || "matters"}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
            {data.description ||
              "We build trusted financial infrastructure that helps people, businesses, and institutions transact with confidence every day."}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Secure", value: "99.9%" },
              { label: "Coverage", value: "25+" },
              { label: "Partners", value: "180" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-2xl font-semibold text-[#0A192F]">{item.value}</div>
                <div className="mt-1 text-sm text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
