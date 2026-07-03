// schemas/dataProtectionPage.ts
interface Rule {
  required(): Rule;
}

interface SlugOptions {
  parent: {
    title: string;
  };
}

const dataProtectionPageSchema = {
  name: 'dataProtectionPage',
  title: 'Data Protection Policy Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Data Protection Policy',
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
          name: 'policySection',
          title: 'Policy Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'e.g., Policy Statement, Scope of Policy',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'slug',
              title: 'Anchor Slug ID',
              type: 'slug',
              description: 'Used for sidebar navigation scrolling targets (e.g., policy-statement)',
              options: {
                source: (_doc: unknown, options: SlugOptions) => options.parent.title,
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

export default dataProtectionPageSchema;