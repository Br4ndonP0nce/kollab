import Image from "next/image";
import HeroSection from "@/components/Hero/Hero";
import ClientsSlider from "@/components/Clients/Clients";
import HardDataSection from "@/components/HardData/HardData";
import SolutionSection from "@/components/Solution/Solution";
import ImprovedKolsSection from "@/components/Kol/Kols";
import TeamSection from "@/components/Team/Team";
import ContactSection from "@/components/Contact/Contact";
import MeetUsSection from "@/components/MeetUs/MeetUs";
export default function Home() {
  return (
    <>
      <HeroSection />
      <MeetUsSection />
      <ClientsSlider />
      <HardDataSection />
      <SolutionSection />
      <ImprovedKolsSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
