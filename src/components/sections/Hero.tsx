import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface HeroSectionProps {
  data: {
    eyebrow?: string;
    titleLeft?: string;
    accentWord?: string;
    titleRight?: string;
    description?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
    heroImage?: unknown;
    showcaseImage?: unknown;
    style?: {
      backgroundColor?: string;
      accentTextColor?: string;
      actionButtonColor?: string;
    };
  };
}

export default function Hero({ data }: HeroSectionProps) {
  const backgroundStyle = data.style?.backgroundColor
    ? { backgroundColor: data.style.backgroundColor }
    : { backgroundColor: "#F8FAFC" };

  const accentStyle = data.style?.accentTextColor
    ? { color: data.style.accentTextColor }
    : { color: "#1E61EB" };

  const actionStyle = data.style?.actionButtonColor
    ? { backgroundColor: data.style.actionButtonColor }
    : { backgroundColor: "#1E61EB" };

  const imageSrc = data.heroImage ? urlFor(data.heroImage as never).url() : null;
  const showcaseSrc = data.showcaseImage ? urlFor(data.showcaseImage as never).url() : null;

  return (
    <section style={backgroundStyle} className="relative overflow-hidden px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10">
          {data.eyebrow && (
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#1E61EB] shadow-sm">
              {data.eyebrow}
            </span>
          )}

          <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-tight tracking-tight text-[#0A192F] md:text-6xl">
            {data.titleLeft || "Powering"} {" "}
            <span style={accentStyle} className="font-serif italic">
              {data.accentWord || "Africa's"}
            </span>{" "}
            {data.titleRight || "digital payments"}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            {data.description ||
              "Secure, scalable payment products that help businesses move money faster and simplify everyday transactions."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={data.primaryCtaHref || "#contact"}
              style={actionStyle}
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {data.primaryCtaLabel || "Get started"}
            </Link>
            <Link
              href={data.secondaryCtaHref || "/about"}
              className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-[#0A192F] transition hover:bg-white"
            >
              {data.secondaryCtaLabel || "Learn more"}
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-0 -right-8 top-8 rounded-[2rem] bg-gradient-to-br from-[#1E61EB]/10 to-[#EC7C30]/10 blur-2xl" />
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-200">
            {showcaseSrc || imageSrc ? (
              <Image
                src={(showcaseSrc || imageSrc) as string}
                alt="TAP product preview"
                width={900}
                height={700}
                className="h-full w-full object-cover"
                priority
              />
            ) : (
              <div className="flex min-h-[540px] items-center justify-center bg-[radial-gradient(circle_at_top,#dbeafe_0%,#eff6ff_45%,#f8fafc_100%)]">
                <div className="rounded-3xl bg-white p-8 shadow-lg">
                  <div className="h-52 w-72 rounded-2xl bg-[#0A192F]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
