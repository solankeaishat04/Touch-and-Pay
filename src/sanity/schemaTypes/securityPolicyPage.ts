// schemas/securityPolicyPage.ts

type ValidationRule = {
  required(): ValidationRule;
};

type SlugSourceOptions = {
  parent?: {
    title?: string;
  };
};

const securityPolicyPage = {
  name: 'securityPolicyPage',
  title: 'Information Security Policy Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Information Security Policy',
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
          name: 'securitySection',
          title: 'Security Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'e.g., Confidentiality, Purpose, Scope',
              validation: (Rule: ValidationRule) => Rule.required(),
            },
            {
              name: 'slug',
              title: 'Anchor Slug ID',
              type: 'slug',
              description: 'Used for sidebar navigation scrolling targets (e.g., confidentiality)',
              options: {
                source: (_doc: unknown, options: SlugSourceOptions) => options.parent?.title ?? '',
                maxLength: 96,
              },
              validation: (Rule: ValidationRule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule: ValidationRule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};

export default securityPolicyPage;