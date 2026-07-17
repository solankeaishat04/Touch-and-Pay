import { Rule } from 'sanity';

interface SchemaField {
  name: string;
  title: string;
  type: string;
  initialValue?: string;
  description?: string;
  options?: {
    hotspot?: boolean;
  };
  of?: Array<{
    type: string;
    name?: string;
    options?: {
      hotspot?: boolean;
    };
    fields?: SchemaField[];
  }>;
  fields?: SchemaField[];
  validation?: (rule: Rule) => Rule;
}

interface CareersPageSchema {
  name: string;
  title: string;
  type: 'document';
  fields: SchemaField[];
}

const careersPage: CareersPageSchema = {
  name: 'careersPage',
  title: 'Careers Page Block',
  type: 'document',
  fields: [
    // --- Hero White Header Section ---
    { 
      name: 'heroTitleNormalLeft', 
      title: 'Hero Title (Before Accent)', 
      type: 'string', 
      initialValue: 'Ready to live your ' 
    },
    { 
      name: 'heroTitleAccent', 
      title: 'Hero Title Accent Word', 
      type: 'string', 
      initialValue: 'dream' 
    },
    { 
      name: 'heroTitleNormalRight', 
      title: 'Hero Title (After Accent)', 
      type: 'string', 
      initialValue: '?' 
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle Paragraph',
      type: 'text',
      initialValue: "Come join a team that's redefining the financial experience for millions of people in emerging markets."
    },

    // --- Main Visual Showcase Banner ---
    { 
      name: 'bannerImage', 
      title: 'Main Showcase Banner Image (Build Something Mural)', 
      type: 'image', 
      options: { hotspot: true } 
    },

    // --- Dark Corporate Story Telling Section ---
    {
      name: 'storyDescription',
      title: 'Story Description Block Text',
      type: 'text',
      initialValue: "We are a team of highly effective collaborators who can always get tremendous amount of work done. We seek vibrant and brilliant talents dedicated to our people's success within and outside work to join TAP"
    },
    { 
      name: 'ctaButtonText', 
      title: 'CTA Button Text', 
      type: 'string', 
      initialValue: 'Read our story' 
    },
    
    // --- Perks Section ---
    { 
      name: 'perksTitle', 
      title: 'Perks Section Title', 
      type: 'string', 
      initialValue: 'Enjoy a better work-life balance' 
    },
    {
      name: 'perksList',
      title: 'Company Perks & Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'perkItem',
          fields: [
            { name: 'title', title: 'Perk Title', type: 'string' },
            { name: 'description', title: 'Perk Description', type: 'text' },
            { 
              name: 'perkIcon', 
              title: 'Perk Icon Image', 
              type: 'image', 
              options: { hotspot: true },
              description: 'Upload a clean PNG or SVG icon asset' 
            }
          ]
        }
      ]
    },

    // --- Testimonial Block ---
    { 
      name: 'testimonialHeading', 
      title: 'Testimonial Heading', 
      type: 'string', 
      initialValue: "Working at TAP is great but don’t take our word for it" 
    },
    { 
      name: 'testimonialQuote', 
      title: 'Quote Text', 
      type: 'text', 
      initialValue: "The valuable interactions with my peers have greatly impacted and improved my work at TAP." 
    },
    { 
      name: 'testimonialAuthor', 
      title: 'Author Name', 
      type: 'string', 
      initialValue: 'Abdulhamid werey' 
    },
    { 
      name: 'testimonialRole', 
      title: 'Author Role', 
      type: 'string', 
      initialValue: 'Product Designer' 
    },
    { 
      name: 'testimonialBgImage', 
      title: 'Testimonial Background Image', 
      type: 'image', 
      options: { hotspot: true } 
    }
  ]
};

export default careersPage;