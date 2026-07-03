import sectionStyle from "../objects/sectionStyle";

export default {
  name: "cowrySection",
  title: "Cowry Section",
  type: "object",
  fields: [
    { name: "eyebrow", type: "string", title: "Eyebrow" },
    { name: "titleLeft", type: "string", title: "Title Left" },
    { name: "accentWord", type: "string", title: "Accent Word" },
    { name: "titleRight", type: "string", title: "Title Right" },
    { name: "description", type: "text", title: "Description" },
    { name: "ctaLabel", type: "string", title: "CTA Label" },
    { name: "ctaHref", type: "string", title: "CTA URL" },
    { name: "showcaseImage", type: "image", title: "Showcase Image" },
    {
      name: "features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text" },
          ],
        },
      ],
    },
    { name: "style", type: "sectionStyle", title: "Section Style" },
  ],
};
