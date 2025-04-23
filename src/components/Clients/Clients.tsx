"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
// Sample client logos - replace with actual data
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

// Duplicate for second row
const clientLogos2 = [
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

const ClientsSlider = () => {
  const { t } = useLanguage(); // Assuming you have a translation function in your context
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();
  const slider1Ref = useRef<HTMLDivElement>(null);
  const slider2Ref = useRef<HTMLDivElement>(null);

  // Animation for continuous horizontal scrolling
  useEffect(() => {
    const animateSlider = async (
      control: any,
      direction: "left" | "right",
      duration: number
    ) => {
      // Define the animation based on direction
      const xValue = direction === "left" ? "-100%" : "0%";
      const initialX = direction === "left" ? "0%" : "-100%";

      // Set initial position
      await control.set({ x: initialX });

      // Start the infinite loop animation
      control.start({
        x: xValue,
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    };

    // Animate both sliders in opposite directions
    animateSlider(controls1, "left", 25);
    animateSlider(controls2, "right", 30);
  }, [controls1, controls2]);

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold kanit-text text-white/90">
          {t("clientsTitle")}
        </h2>
      </div>

      {/* First row - left to right */}
      <div className="relative overflow-hidden mb-12">
        <motion.div ref={slider1Ref} className="flex" animate={controls1}>
          {/* First set of logos */}
          <div className="flex items-center space-x-16 px-8">
            {clientLogos.map((client, index) => (
              <div
                key={`row1-1-${index}`}
                className={cn(
                  "grayscale opacity-70 hover:grayscale-0 hover:opacity-100",
                  "transition-all duration-300",
                  "flex items-center justify-center h-28 w-52"
                )}
              >
                <div className="glass-effect p-6 rounded-lg w-full h-full flex items-center justify-center">
                  <ClientLogo client={client} />
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex items-center space-x-16 px-8">
            {clientLogos.map((client, index) => (
              <div
                key={`row1-2-${index}`}
                className={cn(
                  "grayscale opacity-70 hover:grayscale-0 hover:opacity-100",
                  "transition-all duration-300",
                  "flex items-center justify-center h-28 w-52"
                )}
              >
                <div className="glass-effect p-6 rounded-lg w-full h-full flex items-center justify-center">
                  <ClientLogo client={client} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gradient overlays for smooth fade effect at edges */}
      <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10" />
    </section>
  );
};

export default ClientsSlider;
