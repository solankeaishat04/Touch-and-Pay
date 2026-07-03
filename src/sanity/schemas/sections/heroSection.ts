import sectionStyle from "../objects/sectionStyle";

export default {
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    { name: "eyebrow", type: "string", title: "Eyebrow" },
    { name: "titleLeft", type: "string", title: "Title Left" },
    { name: "accentWord", type: "string", title: "Accent Word" },
    { name: "titleRight", type: "string", title: "Title Right" },
    { name: "description", type: "text", title: "Description" },
    { name: "primaryCtaLabel", type: "string", title: "Primary CTA Label" },
    { name: "primaryCtaHref", type: "string", title: "Primary CTA URL" },
    { name: "secondaryCtaLabel", type: "string", title: "Secondary CTA Label" },
    { name: "secondaryCtaHref", type: "string", title: "Secondary CTA URL" },
    { name: "heroImage", type: "image", title: "Hero Image" },
    { name: "showcaseImage", type: "image", title: "Showcase Image" },
    { name: "style", type: "sectionStyle", title: "Section Style" },
  ],
  preview: {
    select: {
      title: "eyebrow",
      subtitle: "titleLeft",
    },
  },
};
