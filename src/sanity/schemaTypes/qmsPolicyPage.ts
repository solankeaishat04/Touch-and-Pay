// schemas/qmsPolicyPage.ts
import type { Rule } from 'sanity'

const qmsPolicyPage = {
  name: 'qmsPolicyPage',
  title: 'QMS Policy Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Quality Management System Policy',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'string',
      description: 'e.g., March 2024',
    },
    {
      name: 'sections',
      title: 'Policy Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'qmsSection',
          title: 'QMS Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'e.g., Quality Management System Policy',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'slug',
              title: 'Anchor Slug ID',
              type: 'slug',
              description: 'Used for sidebar navigation scrolling targets (e.g., qms-policy)',
              options: {
                source: (_doc: unknown, options: { parent?: { title?: string } }) => options.parent?.title,
                maxLength: 96,
              },
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};

export default qmsPolicyPage;