export default {
  name: 'trustSection',
  title: 'Why Choose TAP & Brand Trust',
  type: 'document',
  fields: [
    // 1. Why Choose TAP Block
    { name: 'whyHeading', title: 'Why Choose TAP Heading', type: 'string', initialValue: 'Why Choose TAP' },
    { name: 'whySubheading', title: 'Why Choose TAP Subtext', type: 'string', initialValue: 'Here\'s Why Millions Choose TAP Every Day.' },
    { name: 'securityImage', title: 'Security Lock Artwork Graphic', type: 'image', options: { hotspot: true } },
    {
      name: 'valueProps',
      title: 'Value Propositions (3 Columns)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'iconType', title: 'Icon Typology', type: 'string', description: 'e.g., lock, pulse, map' },
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Feature Paragraph Text', type: 'text' }
          ]
        }
      ]
    },

    // 2. Partner Marquee Logos Block
    { name: 'partnerHeading', title: 'Partner Heading', type: 'string', initialValue: 'Powering growth for amazing businesses' },
    { name: 'partnerSubheading', title: 'Partner Subtext', type: 'text', initialValue: 'TAP is a growth engine for a new generation of innovative, forward-looking organizations operating in Africa.' },
    {
      name: 'partnerLogos',
      title: 'Partner Brand Logos Matrix',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },

    // 3. Video Testimonial Environment
    { name: 'videoHeading', title: 'Video Section Heading', type: 'string', initialValue: 'Don\'t just take our word for it' },
    { name: 'videoSubheading', title: 'Video Section Subtext', type: 'string', initialValue: 'See how we impact lives' },
    { name: 'youtubeUrl', title: 'YouTube Testimonial Video Link', type: 'string', initialValue: 'https://youtu.be/kHHTXhiejP8' }
  ]
}