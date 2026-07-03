import { type SchemaTypeDefinition } from 'sanity';
import heroSection from './schemaTypes/heroSection';
import solutionsSection from './schemaTypes/solutionSection';
import trustSection from './schemaTypes/trustSection';
import investorCtaSection from './schemaTypes/investorCtaSection';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSection, solutionsSection, trustSection, investorCtaSection],
};