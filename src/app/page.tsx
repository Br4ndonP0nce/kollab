import Image from "next/image";
import HeroSection from "@/components/Hero/Hero";
import ClientsSlider from "@/components/Clients/Clients";
import HardDataSection from "@/components/HardData/HardData";
import SolutionSection from "@/components/Solution/Solution";
import ImprovedKolsSection from "@/components/Kol/Kols";
import TeamSection from "@/components/Team/Team";
import ContactSection from "@/components/Contact/Contact";
import MeetUsSection from "@/components/MeetUs/MeetUs";
import StackedHardDataSection from "@/components/HardData/HardDatav2";
import JsonLd from "@/components/JsonLd";
export default function Home() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kollabs",
    url: "https://kollabs.tech",
    //logo: "https://kollabs.tech/logo.png",
    description:
      "Connecting projects with top-tier KOLs and influencers through organic approaches for maximum growth and market impact.",
  };
  return (
    <>
      <JsonLd data={organizationData} />
      <HeroSection />
      <ClientsSlider />
      <MeetUsSection />

      <StackedHardDataSection />
      <SolutionSection />
      <ImprovedKolsSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
