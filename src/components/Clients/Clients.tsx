"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// Sample client logos - using your existing data
const clientLogos = [
  { name: "bullx", logo: "/Image/bullx.png" },
  { name: "lemoncash", logo: "/Image/lemon.svg" },
  { name: "altura", logo: "/Image/altura.png" },
  { name: "qfnetwork", logo: "/Image/qfnetwork.svg" },
  { name: "tars", logo: "/Image/tars.svg" },
  { name: "cess", logo: "/Image/cess.png" },
  { name: "ondo", logo: "/Image/ondo.svg" },
  { name: "botify", logo: "/Image/botify.jpg" },
  { name: "bullx", logo: "/Image/bullx.png" },
  { name: "lemoncash", logo: "/Image/lemon.svg" },
  { name: "altura", logo: "/Image/altura.png" },
];

// Component to handle both Image and SVG rendering
const ClientLogo = ({ client }: { client: { name: string; logo: string } }) => {
  // Check if the logo is an SVG
  const isSvg = client.logo.endsWith(".svg");

  if (isSvg) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={client.logo}
          alt={client.name}
          className="w-auto h-auto max-w-full max-h-full object-contain"
        />
      </div>
    );
  }

  return (
    <Image
      src={client.logo}
      alt={client.name}
      width={160}
      height={80}
      className="object-contain"
    />
  );
};

const PureCssClientsSlider = () => {
  const { t } = useLanguage();

  // Create duplicated arrays for the infinite effect
  const duplicatedLogos1 = [...clientLogos, ...clientLogos];

  return (
    <section className="py-16 bg-black relative overflow-hidden pointer-events-none">
      <div className="mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold kanit-text text-white/90">
          {t("clientsTitle")}
        </h2>
      </div>

      {/* First carousel - left to right */}
      <div className="infinite-carousel mb-12">
        <div className="slide-track">
          {duplicatedLogos1.map((client, index) => (
            <div key={`row1-${index}`} className="slide mx-8">
              <div
                className={cn(
                  "grayscale opacity-70 hover:grayscale-0 hover:opacity-100",
                  "transition-all duration-300",
                  "h-28 w-52 md:h-28 md:w-52", // Consistent size across devices
                  "glass-effect p-6 rounded-lg",
                  "flex items-center justify-center pointer-events-none"
                )}
              >
                <ClientLogo client={client} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PureCssClientsSlider;
