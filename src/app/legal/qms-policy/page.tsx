import { client } from "@/sanity/lib/client";
import QmsPolicyClient from "@/components/sections/QmsPolicyClient";
async function getQmsPolicyData() {
  const query = `*[_type == "qmsPolicyPage"][0]{
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

export default async function QmsPolicyPage() {
  const data = await getQmsPolicyData();

  if (!data || !data.sections) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-xs text-neutral-400 font-bold tracking-wide uppercase">Workspace Notification</p>
        <h2 className="text-xl font-black text-neutral-900 mt-1">QMS Content Uninitialized</h2>
        <p className="text-xs text-neutral-500 max-w-sm mt-2 font-normal leading-relaxed">
          Create and publish an entry under the <code className="bg-neutral-100 px-1 py-0.5 rounded text-[#E87C36]">qmsPolicyPage</code> schema document within Sanity Studio to fill this window.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen pt-20">
      <QmsPolicyClient 
        title={data.title}
        lastUpdated={data.lastUpdated}
        sections={data.sections}
      />
    </div>
  );
}