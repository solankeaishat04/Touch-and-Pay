"use client";

import { NextStudio } from "next-sanity/studio/client-component";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-[99999] bg-white min-h-screen w-full">
      <NextStudio config={config} />
    </div>
  );
}