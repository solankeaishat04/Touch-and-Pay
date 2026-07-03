import AboutTeamContent from "@/components/sections/AboutTeamContent"; 

export const metadata = {
  title: "About Us | Touch and Pay",
  description: "Learn about our mission, our impact metrics, and the team driving digital micro-transactions across Africa.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
    
      <AboutTeamContent />
    </main>
  );
}