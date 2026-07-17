import { Rule } from 'sanity';

interface SchemaField {
  name: string;
  title?: string;
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

interface SolutionsSectionSchema {
  name: string;
  title: string;
  type: 'document';
  fields: SchemaField[];
}

const solutionsSection: SolutionsSectionSchema = {
  name: 'solutionsSection',
  title: 'Cowry Showcase & Audience Solutions',
  type: 'document',
  fields: [
    // Feature Block (Light Blue Section)
    { name: 'featureEyebrow', title: 'Feature Eyebrow', type: 'string', initialValue: 'FEATURED PRODUCTS' },
    { name: 'featureTitle', title: 'Feature Block Title', type: 'string', initialValue: 'Cowry: The Smart & Fastest Way to Pay.' },
    { name: 'featureDescription', title: 'Feature Block Description', type: 'text' },
    { name: 'featureImage', title: 'Feature Right Side Image (Wallet Card)', type: 'image', options: { hotspot: true } },
    {
      name: 'featureList',
      title: 'Feature Highlighting Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Item Title', type: 'string' },
            { name: 'description', title: 'Item Description', type: 'string' }
          ]
        }
      ]
    },
    // Solutions Hub Block (Lower Section)
    { name: 'solutionsHeading', title: 'Solutions Heading Title', type: 'string', initialValue: 'Our Solutions' },
    { name: 'solutionsSubheading', title: 'Solutions Description Subtext', type: 'string', initialValue: 'Designed for Commuters, Merchants, and Businesses' },
    
    // Commuter Card Matrix
    { name: 'commuterTitle', title: 'Commuter Title', type: 'string', initialValue: 'FOR COMMUTERS' },
    { name: 'commuterDescription', title: 'Commuter Description', type: 'text' },
    { name: 'commuterImage', title: 'Commuter Image', type: 'image', options: { hotspot: true } },

    // Business Card Matrix
    { name: 'businessTitle', title: 'Business Title', type: 'string', initialValue: 'FOR BUSINESSES' },
    { name: 'businessDescription', title: 'Business Description', type: 'text' },

    // Merchant Card Matrix
    { name: 'merchantTitle', title: 'Merchant Title', type: 'string', initialValue: 'FOR MERCHANTS' },
    { name: 'merchantDescription', title: 'Merchant Description', type: 'text' },
    { name: 'merchantImage', title: 'Merchant Image', type: 'image', options: { hotspot: true } }
  ]
};

export default solutionsSection;