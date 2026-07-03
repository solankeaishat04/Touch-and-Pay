import InvestorCtaContent from "@/components/sections/InvestorCtaContent";
import LandingContent from "@/components/sections/LandingContent";
import SolutionsContent from "@/components/sections/SolutionsContent";
import TrustContent from "@/components/sections/TrustContent";
export const revalidate = 0; 

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      
    <LandingContent/>
    <SolutionsContent/>
    <TrustContent/>
    <InvestorCtaContent/>
    </main>
  );
}