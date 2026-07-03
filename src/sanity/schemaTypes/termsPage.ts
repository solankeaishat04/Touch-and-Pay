// schemas/termsPage.ts
import type { Rule } from 'sanity'

const termsPage = {
  name: 'termsPage',
  title: 'Terms and Conditions Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Terms and Conditions',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'string',
      description: 'e.g., March 2024',
    },
    {
      name: 'sections',
      title: 'Terms Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'termsSection',
          title: 'Terms Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'e.g., Overview, Governing Law, Prohibited Uses',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'slug',
              title: 'Anchor Slug ID',
              type: 'slug',
              description: 'Used for sidebar navigation anchoring (e.g., governing-law)',
              options: {
                source: (_doc: unknown, options: { parent: { title: string } }) => options.parent.title,
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
}

export default termsPage