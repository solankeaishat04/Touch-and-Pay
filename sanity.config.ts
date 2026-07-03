// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input'; 

import heroSection from '@/sanity/schemaTypes/heroSection';
import solutionsSection from '@/sanity/schemaTypes/solutionSection';
import trustSection from '@/sanity/schemaTypes/trustSection';
import investorCtaSection from '@/sanity/schemaTypes/investorCtaSection';
import aboutPage from "@/sanity/schemaTypes/aboutPage";
import careersPage from "@/sanity/schemaTypes/careersPage";
import whyChooseTapPage from "@/sanity/schemaTypes/whyChooseTap";
import termsPage from "@/sanity/schemaTypes/termsPage";
import privacyPage from "@/sanity/schemaTypes/privacyPage";
import securityPolicyPage from "@/sanity/schemaTypes/securityPolicyPage";
import dataProtectionPage from "@/sanity/schemaTypes/dataProtectionPage";
import qmsPolicyPage from "@/sanity/schemaTypes/qmsPolicyPage";


const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio", 
  name: "TOUCH-AND-PAY",
  title: "TOUCH-AND-PAY",

  projectId,
  dataset,

  plugins: [
    structureTool(), 
    visionTool(), 
    inlineSvgInput() 
  ],

  schema: {
    types: [heroSection, solutionsSection, trustSection, investorCtaSection, aboutPage, whyChooseTapPage, careersPage, termsPage, privacyPage, securityPolicyPage,dataProtectionPage, qmsPolicyPage], 
  },
});