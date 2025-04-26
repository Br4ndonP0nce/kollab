"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// Original client logos array
const clientLogos = [
  { name: "bullx", logo: "/Image/bullx.png" },
  { name: "lemoncash", logo: "/Image/lemon.svg" },
  { name: "altura", logo: "/Image/altura1.png" },
  { name: "qfnetwork", logo: "/Image/ofnetworkWhite.png" },
  { name: "tars", logo: "/Image/tars.svg" },
  { name: "cess", logo: "/Image/cess.png" },
  { name: "ondo", logo: "/Image/ondo.svg" },
  { name: "botify", logo: "/Image/botify.png" },
  { name: "bullx", logo: "/Image/bullx.png" },
  { name: "lemoncash", logo: "/Image/lemon.svg" },
  { name: "altura", logo: "/Image/altura1.png" },
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

const BalancedClientsSlider = () => {
  const { t } = useLanguage();

  // Create a 6x multiplied array - enough to make jumps very infrequent
  // but not so many that we slow down page performance
  const multiplyFactor = 6;
  const extendedLogoArray = Array(multiplyFactor).fill(clientLogos).flat();

  return (
    <section className="py-16 bg-black relative overflow-hidden pointer-events-none">
      <div className="mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold kanit-text text-white/90">
          {t("clientsTitle")}
        </h2>
      </div>

      {/* Balanced carousel */}
      <div className="infinite-carousel mb-12">
        <div className="balanced-track">
          {extendedLogoArray.map((client, index) => (
            <div key={`client-${index}`} className="slide mx-8">
              <div
                className={cn(
                  "glass-effect p-6 rounded-lg",
                  "h-28 w-52 md:h-28 md:w-52", // Consistent size across devices
                  "flex items-center justify-center pointer-events-none"
                )}
              >
                <ClientLogo client={client} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Balanced animation speed */}
      <style jsx global>{`
        .balanced-track {
          display: flex;
          /* 120s gives a good balance between visibility and infrequent jumps */
          animation: scroll 120s linear infinite;
        }

        /* Speed adjustments for different devices */
        @media (max-width: 768px) {
          .balanced-track {
            animation: scroll 100s linear infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default BalancedClientsSlider;
