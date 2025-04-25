"use client";
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
import Preloader from "@/components/Preloader";
import { useEffect, useState } from "react";
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets - can be replaced with actual asset loading logic
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
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
      {loading && <Preloader />}

      {/* All Sections */}
      <div
        className={
          loading ? "opacity-0" : "opacity-100 transition-opacity duration-500"
        }
      >
        <JsonLd data={organizationData} />
        <HeroSection />
        <ClientsSlider />
        <MeetUsSection />

        <StackedHardDataSection />
        <SolutionSection />
        <ImprovedKolsSection />
        <TeamSection />
        <ContactSection />
      </div>
    </>
  );
}
