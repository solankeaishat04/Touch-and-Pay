/* eslint-disable @typescript-eslint/no-explicit-any */
// schemas/privacyPage.ts
const privacyPage = {
  name: 'privacyPage',
  title: 'Privacy Policy Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Privacy Policy',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'string',
      description: 'e.g., March 2024',
    },
    {
      name: 'sections',
      title: 'Privacy Policy Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'privacySection',
          title: 'Privacy Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'e.g., Consents, Disclosure of Your Personal Information',
              validation: (Rule: { required: () => { required: () => any } }) => Rule.required(),
            },
            {
              name: 'slug',
              title: 'Anchor Slug ID',
              type: 'slug',
              description: 'Used for sidebar navigation scrolling targets (e.g., consents)',
              options: {
                source: (_doc: unknown, options: { parent: { title: string } }) => options.parent.title,
                maxLength: 96,
              },
              validation: (Rule: { required: () => { required: () => any } }) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule: { required: () => any }) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};

export default privacyPage;