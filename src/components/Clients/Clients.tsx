"use client";

import React, { useRef, useEffect } from "react";
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

const PerfectClientsSlider = () => {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Create a sufficient number of duplicates to ensure smooth loops
  // The key insight: we need enough items so that a complete animation cycle
  // finishes before the user notices any reset
  const quadruplicatedLogos = [
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
  ];

  useEffect(() => {
    // Skip this effect when running in SSR
    if (typeof window === "undefined") return;

    const calculateCarouselWidth = () => {
      if (!carouselRef.current) return;

      // Calculate the width of each slide (including margins)
      const slideWidth = 208 + 32; // width(208px) + margins(16px * 2)

      // Calculate the total width of one complete set of logos
      const singleSetWidth = clientLogos.length * slideWidth;

      // Set CSS property that controls the animation distance
      document.documentElement.style.setProperty(
        "--client-carousel-width",
        `${singleSetWidth}px`
      );
    };

    // Calculate initially
    calculateCarouselWidth();

    // Recalculate on window resize
    window.addEventListener("resize", calculateCarouselWidth);

    return () => {
      window.removeEventListener("resize", calculateCarouselWidth);
    };
  }, []);

  return (
    <section className="py-16 bg-black relative overflow-hidden pointer-events-none">
      <div className="mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold kanit-text text-white/90">
          {t("clientsTitle")}
        </h2>
      </div>

      {/* Custom carousel with perfected animation */}
      <div
        ref={carouselRef}
        className="perfect-carousel mb-12 relative overflow-hidden"
      >
        <div className="perfect-slide-track">
          {quadruplicatedLogos.map((client, index) => (
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

      {/* Add custom CSS that works with your existing global styles */}
      <style jsx global>{`
        /* Custom animation for perfect looping */
        @keyframes perfect-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(
              calc(-1 * var(--client-carousel-width, 2500px))
            );
          }
        }

        .perfect-carousel {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .perfect-carousel::before,
        .perfect-carousel::after {
          content: "";
          height: 100%;
          position: absolute;
          width: 100px;
          z-index: 2;
        }

        .perfect-carousel::after {
          right: 0;
          top: 0;
          background: linear-gradient(
            to left,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .perfect-carousel::before {
          left: 0;
          top: 0;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .perfect-slide-track {
          display: flex;
          animation: perfect-scroll 60s linear infinite;
        }

        /* Ensure the animation is smooth on all devices */
        @media (prefers-reduced-motion: no-preference) {
          .perfect-slide-track {
            animation-duration: 60s;
          }
        }

        /* Adjust animation speed for mobile */
        @media (max-width: 768px) {
          .perfect-slide-track {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
};

export default PerfectClientsSlider;
