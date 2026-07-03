export default {
  name: 'investorCtaSection',
  title: 'Investors & Call to Action Banner',
  type: 'document',
  fields: [
    // Investor Section Fields
    { name: 'investorHeading', title: 'Investors Title', type: 'string', initialValue: 'Our Investors' },
    { name: 'investorSubheading', title: 'Investors Subtext', type: 'string', initialValue: 'We are proud to be supported by world-class investors who believe in our mission...' },
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
    },
    // CTA Banner Fields
    { name: 'ctaHeading', title: 'CTA Banner Title', type: 'string', initialValue: 'Ready to Simplify Your Payments?' },
    { name: 'ctaDescription', title: 'CTA Banner Subtext', type: 'string', initialValue: 'Join MILLIONS of commuters and merchants already using TAP.' },
    { name: 'ctaButtonText', title: 'CTA Button Text', type: 'string', initialValue: 'Contact Us' },
    
{name: 'ctaImage',
  title: 'CTA Corner Image Graphic',
  type: 'image',
  options: { hotspot: true }
}
  ]
}