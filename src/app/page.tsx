import Image from "next/image";
import HeroSection from "@/components/Hero/Hero";
import ClientsSlider from "@/components/Clients/Clients";
import HardDataSection from "@/components/HardData/HardData";
import SolutionSection from "@/components/Solution/Solution";
import ImprovedKolsSection from "@/components/Kol/Kols";
import TeamSection from "@/components/Team/Team";
import ContactSection from "@/components/Contact/Contact";
import MeetUsSection from "@/components/MeetUs/MeetUs";
import EnhancedHeroSection from "@/components/Hero/Herov2";
import EpicHardDataSection from "@/components/HardData/HardDatav2";
export default function Home() {
  return (
    <>
      <HeroSection />
      <MeetUsSection />
      <ClientsSlider />
      <EpicHardDataSection />
      <SolutionSection />
      <ImprovedKolsSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
