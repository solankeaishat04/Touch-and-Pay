import { client } from "@/sanity/lib/client";
import TermsLayoutClient from "@/components/sections/TermsLayoutClient";

async function getTermsData() {
  const query = `*[_type == "termsPage"][0]{
    title,
    lastUpdated,
    sections[]{
      title,
      slug,
      content
    }
  }`;
  
  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

export default async function TermsPage() {
  const data = await getTermsData();

  // Guard mechanism: returns a fallback warning structure if Sanity workspace is completely empty
  if (!data || !data.sections) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-xs text-neutral-400 font-bold tracking-wide uppercase">Setup Required</p>
        <h2 className="text-xl font-black text-neutral-900 mt-1">No Terms and Conditions Found</h2>
        <p className="text-xs text-neutral-500 max-w-sm mt-2 font-normal leading-relaxed">
          Please open Sanity Studio and deploy a document node under the type identifier <code className="bg-neutral-100 px-1 py-0.5 rounded text-[#E87C36]">termsPage</code> to populate this layout.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen pt-20">
      <TermsLayoutClient 
        title={data.title}
        lastUpdated={data.lastUpdated}
        sections={data.sections}
      />
    </div>
  );
}