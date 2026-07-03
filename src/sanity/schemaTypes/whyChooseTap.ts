/* eslint-disable @typescript-eslint/no-explicit-any */
const whyChooseTapPage = {
  name: 'whyChooseTapPage',
  title: 'Why Choose TAP Page Block',
  type: 'document',
  fields: [
    // --- Hero Header Block ---
    { name: 'heroTitle', title: 'Hero Title', type: 'string', initialValue: 'Why Choose TAP?' },
    { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', initialValue: 'The most reliable payment infrastructure for micro-transactions in Africa.' },

    // --- 4-Column Feature Badges Matrix ---
    {
      name: 'topFeatures',
      title: 'Top Feature Cards (4 Columns)',
      type: 'array',
      validation: (Rule: any) => Rule.max(4),
      of: [
        {
          type: 'object',
          name: 'featureCard',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { 
              name: 'featureIcon', 
              title: 'Feature Custom Icon', 
              type: 'image', 
              options: { hotspot: true },
              description: 'Upload an SVG or clean PNG icon asset'
            } 
          ]
        }
      ]
    },

    // --- Alternating Detail Rows System ---
    {
      name: 'detailRows',
      title: 'Alternating Content Rows',
      description: 'Add depth sections with custom image placements here.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'rowItem',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            { name: 'description', title: 'Section Paragraph', type: 'text' },
            { name: 'image', title: 'Side Image Graphic', type: 'image', options: { hotspot: true } },
            {
              name: 'imagePlacement',
              title: 'Image Alignment',
              type: 'string',
              options: {
                list: [
                  { title: 'Left Side Image', value: 'left' },
                  { title: 'Right Side Image', value: 'right' }
                ],
                layout: 'radio'
              },
              initialValue: 'left'
            }
          ]
        }
      ]
    },
    { name: 'ctaHeading', title: 'Bottom CTA Heading', type: 'string', initialValue: 'Ready to Simplify Your Payments?' },
    { name: 'ctaSubtitle', title: 'Bottom CTA Subtitle', type: 'text', initialValue: 'Join MILLIONS of commuters and merchants already using TAP.' },
    { name: 'ctaButtonLabel', title: 'Bottom CTA Button Text', type: 'string', initialValue: 'Contact Us' },
    { name: 'ctaBgGraphic', title: 'Bottom CTA Right Decorative Asset (Orange abstract art)', type: 'image', options: { hotspot: true } }
  ]
};

export default whyChooseTapPage;