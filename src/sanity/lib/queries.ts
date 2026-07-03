// src/sanity/lib/queries.ts
import { groq } from "next-sanity";

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    sections[] {
      _type,
      eyebrow,
      titleLeft,
      accentWord,
      titleRight,
      description,
      primaryCtaLabel,
      primaryCtaHref,
      secondaryCtaLabel,
      secondaryCtaHref,
      heroImage,
      showcaseImage,
      imageLeft,
      ctaLabel,
      ctaHref,
      features[] {
        title,
        description
      },
      style {
        backgroundColor,
        accentTextColor,
        actionButtonColor
      }
    }
  }
`;