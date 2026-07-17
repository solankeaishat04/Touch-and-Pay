import { Rule } from 'sanity';

interface SchemaField {
  name: string;
  title: string;
  type: string;
  initialValue?: string;
  options?: {
    hotspot?: boolean;
  };
  description?: string;
  of?: Array<{
    type: string;
    fields?: SchemaField[];
    options?: {
      hotspot?: boolean;
    };
  }>;
  validation?: (rule: Rule) => Rule;
}

interface TrustSectionSchema {
  name: string;
  title: string;
  type: 'document';
  fields: SchemaField[];
}

const trustSection: TrustSectionSchema = {
  name: 'trustSection',
  title: 'Why Choose TAP & Brand Trust',
  type: 'document',
  fields: [
    // 1. Why Choose TAP Block
    { 
      name: 'whyHeading', 
      title: 'Why Choose TAP Heading', 
      type: 'string', 
      initialValue: 'Why Choose TAP' 
    },
    { 
      name: 'whySubheading', 
      title: 'Why Choose TAP Subtext', 
      type: 'string', 
      initialValue: "Here's Why Millions Choose TAP Every Day." 
    },
    { 
      name: 'securityImage', 
      title: 'Security Lock Artwork Graphic', 
      type: 'image', 
      options: { hotspot: true } 
    },
    {
      name: 'valueProps',
      title: 'Value Propositions (3 Columns)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'iconImage', 
              title: 'Feature Icon', 
              type: 'image',
              options: { hotspot: true },
              description: 'Upload an SVG or clean PNG icon for this feature.'
            },
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Feature Paragraph Text', type: 'text' }
          ]
        }
      ]
    },

    // 2. Partner Marquee Logos Block
    { 
      name: 'partnerHeading', 
      title: 'Partner Heading', 
      type: 'string', 
      initialValue: 'Powering growth for amazing businesses' 
    },
    { 
      name: 'partnerSubheading', 
      title: 'Partner Subtext', 
      type: 'text', 
      initialValue: 'TAP is a growth engine for a new generation of innovative, forward-looking organizations operating in Africa.' 
    },
    {
      name: 'partnerLogos',
      title: 'Partner Brand Logos Matrix',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },

    // 3. NEW: Brand Partners Feedback Carousel Block
    { 
      name: 'feedbackHeading', 
      title: 'Feedback Section Heading', 
      type: 'string', 
      initialValue: 'Backed by strong global partners' 
    },
    { 
      name: 'feedbackSubheading', 
      title: 'Feedback Section Subtext', 
      type: 'string', 
      initialValue: 'TAP is backed by notable investors as well as some of the best payments companies on the planet.' 
    },
    {
      name: 'feedbacks',
      title: 'Partner Feedbacks List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'companyLogo', title: 'Company Logo Graphic', type: 'image', options: { hotspot: true } },
            { name: 'quote', title: 'Partner Quote', type: 'text' },
            { name: 'authorImage', title: 'Author Profile Photo', type: 'image', options: { hotspot: true } },
            { name: 'authorName', title: 'Author Name', type: 'string' },
            { name: 'authorRole', title: 'Author Role', type: 'string' }
          ]
        }
      ]
    }
  ]
};

export default trustSection;