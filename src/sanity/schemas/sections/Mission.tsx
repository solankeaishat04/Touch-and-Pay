import sectionStyle from "../objects/sectionStyle";

export default {
  name: "missionSection",
  title: "Mission Section",
  type: "object",
  fields: [
    { name: "eyebrow", type: "string", title: "Eyebrow" },
    { name: "titleLeft", type: "string", title: "Title Left" },
    { name: "accentWord", type: "string", title: "Accent Word" },
    { name: "titleRight", type: "string", title: "Title Right" },
    { name: "description", type: "text", title: "Description" },
    { name: "imageLeft", type: "boolean", title: "Image on left side?" },
    { name: "showcaseImage", type: "image", title: "Showcase Image" },
    { name: "style", type: "sectionStyle", title: "Section Style" },
  ],
};
