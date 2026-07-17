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
    options?: {
      hotspot?: boolean;
    };
    fields?: SchemaField[];
  }>;
  fields?: SchemaField[];
  validation?: (rule: Rule) => Rule;
}

interface HeroSectionSchema {
  name: string;
  title: string;
  type: 'document';
  fields: SchemaField[];
}

const heroSection: HeroSectionSchema = {
  name: 'heroSection',
  title: 'Hero & Mission Sections Block',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Hero Eyebrow Text',
      type: 'string',
      initialValue: 'MAKING IT POSSIBLE FOR EVERYONE TO PAY DIGITALLY'
    },
    {
      name: 'heroTitleNormalLeft',
      title: 'Hero Title (Before Accent)',
      type: 'string',
      initialValue: 'The Future of'
    },
    {
      name: 'heroTitleAccent',
      title: 'Hero Title Accent Word',
      type: 'string',
      initialValue: 'Payments'
    },
    {
      name: 'heroTitleNormalRight',
      title: 'Hero Title (After Accent)',
      type: 'string',
      initialValue: 'in Africa.'
    },
    {
      name: 'heroDescription',
      title: 'Hero Description Paragraph',
      type: 'text'
    },
    {
      name: 'heroImage',
      title: 'Hero Right Side Image (Terminal & Card)',
      type: 'image',
      options: { hotspot: true }
    },
    // Mission Sub-block Fields
    {
      name: 'missionEyebrow',
      title: 'Mission Section Eyebrow',
      type: 'string',
      initialValue: 'OUR MISSION'
    },
    {
      name: 'missionTitleLeft',
      title: 'Mission Title (Before Accent)',
      type: 'string',
      initialValue: 'We are'
    },
    {
      name: 'missionTitleAccent',
      title: 'Mission Title Accent Word',
      type: 'string',
      initialValue: 'bridging'
    },
    {
      name: 'missionTitleRight',
      title: 'Mission Title (After Accent)',
      type: 'string',
      initialValue: 'the gap between cash and the digital economy'
    },
    {
      name: 'missionDescription',
      title: 'Mission Description Paragraph',
      type: 'text'
    },
    {
      name: 'missionImage',
      title: 'Mission Left Side Image (Turnstiles)',
      type: 'image',
      options: { hotspot: true }
    }
  ]
};

export default heroSection;