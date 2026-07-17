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

interface InvestorCtaSectionSchema {
  name: string;
  title: string;
  type: 'document';
  fields: SchemaField[];
}

const investorCtaSection: InvestorCtaSectionSchema = {
  name: 'investorCtaSection',
  title: 'Investors Section',
  type: 'document',
  fields: [
    { 
      name: 'investorHeading', 
      title: 'Investors Title', 
      type: 'string', 
      initialValue: 'Our Investors' 
    },
    { 
      name: 'investorSubheading', 
      title: 'Investors Subtext', 
      type: 'string', 
      initialValue: 'We are proud to be supported by world-class investors who believe in our mission...' 
    },
    {
      name: 'investorLogos',
      title: 'Investor Logos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Investor Name (Alt Text)',
              type: 'string',
              description: 'e.g., Y Combinator, LoftyInc'
            }
          ]
        }
      ]
    }
  ]
};

export default investorCtaSection;