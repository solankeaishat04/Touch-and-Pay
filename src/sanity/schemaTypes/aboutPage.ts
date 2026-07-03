
const aboutPage = {
  name: 'aboutPage',
  title: 'About Us Page Block',
  type: 'document',
  fields: [
    // --- Header Section ---
    { name: 'pageTitle', title: 'Main Page Title', type: 'string', initialValue: 'Who we are' },
    { name: 'pageSubheading', title: 'Page Subheading Text', type: 'string', initialValue: 'We are a tech company digitalizing micro-transactions.' },
    
    // 👇 ADDED: Dynamic custom upload slot for the right-hand blue vector wave asset
    { 
      name: 'heroVector', 
      title: 'Hero Right Side Vector Graphic', 
      type: 'image', 
      options: { hotspot: true },
      description: 'Upload the blue custom wave asset (SVG or transparent PNG)'
    },
    
    // --- Detailed History & Stats Section ---
    { name: 'historyTitle', title: 'History Section Title', type: 'string', initialValue: 'Who we are' },
    { name: 'historyBody', title: 'History Description', type: 'text', initialValue: 'Touch and Pay Technologies Limited is a passionate new-age IT service...' },
    { name: 'workTitle', title: 'Work Section Title', type: 'string', initialValue: 'How we work' },
    { name: 'workBody', title: 'Work Description', type: 'text', initialValue: "We believe in bringing the right minds together..." },
    
    // --- Stats Matrix (4 Slots) ---
    { name: 'stat1Number', title: 'Stat 1 Number', type: 'string', initialValue: '5 million+' },
    { name: 'stat1Label', title: 'Stat 1 Label', type: 'string', initialValue: 'ACTIVE USERS' },
    { name: 'stat2Number', title: 'Stat 2 Number', type: 'string', initialValue: '500,000+' },
    { name: 'stat2Label', title: 'Stat 2 Label', type: 'string', initialValue: 'DAILY TRANSACTIONS' },
    { name: 'stat3Number', title: 'Stat 3 Number', type: 'string', initialValue: '5+' },
    { name: 'stat3Label', title: 'Stat 3 Label', type: 'string', initialValue: 'PARTNER STATES' },
    { name: 'stat4Number', title: 'Stat 4 Number', type: 'string', initialValue: '5,000+' },
    { name: 'stat4Label', title: 'Stat 4 Label', type: 'string', initialValue: 'AGENTS & PARTNERS' },

    // --- Team & CTA ---
    { name: 'ctaHeading', title: 'CTA Subsection Title', type: 'string', initialValue: "Let's build the future of payments." },
    {
      name: 'teamMembers',
      title: 'Team Members Grid',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Team Member Card',
          fields: [
            { name: 'name', title: 'Full Name', type: 'string' },
            { name: 'role', title: 'Job Position / Role', type: 'string' },
            { name: 'image', title: 'Profile Image Asset', type: 'image', options: { hotspot: true } }
          ],
          preview: { select: { title: 'name', subtitle: 'role', media: 'image' } }
        }
      ]
    }
  ]
};

export default aboutPage;