"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Sample client logos - replace with actual data
const clientLogos = [
  { name: "Client 1", logo: "/api/placeholder/120/60" },
  { name: "Client 2", logo: "/api/placeholder/120/60" },
  { name: "Client 3", logo: "/api/placeholder/120/60" },
  { name: "Client 4", logo: "/api/placeholder/120/60" },
  { name: "Client 5", logo: "/api/placeholder/120/60" },
  { name: "Client 6", logo: "/api/placeholder/120/60" },
  { name: "Client 7", logo: "/api/placeholder/120/60" },
  { name: "Client 8", logo: "/api/placeholder/120/60" },
  { name: "Client 9", logo: "/api/placeholder/120/60" },
  { name: "Client 10", logo: "/api/placeholder/120/60" },
];

// Duplicate for second row
const clientLogos2 = [
  { name: "Client 11", logo: "/api/placeholder/120/60" },
  { name: "Client 12", logo: "/api/placeholder/120/60" },
  { name: "Client 13", logo: "/api/placeholder/120/60" },
  { name: "Client 14", logo: "/api/placeholder/120/60" },
  { name: "Client 15", logo: "/api/placeholder/120/60" },
  { name: "Client 16", logo: "/api/placeholder/120/60" },
  { name: "Client 17", logo: "/api/placeholder/120/60" },
  { name: "Client 18", logo: "/api/placeholder/120/60" },
  { name: "Client 19", logo: "/api/placeholder/120/60" },
  { name: "Client 20", logo: "/api/placeholder/120/60" },
];

const ClientsSlider = () => {
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
          Trusted by Leading Projects
        </h2>
      </div>

      {/* First row - left to right */}
      <div className="relative overflow-hidden mb-8">
        <motion.div ref={slider1Ref} className="flex" animate={controls1}>
          {/* First set of logos */}
          <div className="flex items-center space-x-12 px-6">
            {clientLogos.map((client, index) => (
              <div
                key={`row1-1-${index}`}
                className={cn(
                  "grayscale opacity-70 hover:grayscale-0 hover:opacity-100",
                  "transition-all duration-300",
                  "flex items-center justify-center h-20 w-40"
                )}
              >
                <div className="glass-effect p-4 rounded-lg w-full h-full flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex items-center space-x-12 px-6">
            {clientLogos.map((client, index) => (
              <div
                key={`row1-2-${index}`}
                className={cn(
                  "grayscale opacity-70 hover:grayscale-0 hover:opacity-100",
                  "transition-all duration-300",
                  "flex items-center justify-center h-20 w-40"
                )}
              >
                <div className="glass-effect p-4 rounded-lg w-full h-full flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second row - right to left */}
      <div className="relative overflow-hidden">
        <motion.div ref={slider2Ref} className="flex" animate={controls2}>
          {/* First set of logos */}
          <div className="flex items-center space-x-12 px-6">
            {clientLogos2.map((client, index) => (
              <div
                key={`row2-1-${index}`}
                className={cn(
                  "grayscale opacity-70 hover:grayscale-0 hover:opacity-100",
                  "transition-all duration-300",
                  "flex items-center justify-center h-20 w-40"
                )}
              >
                <div className="glass-effect p-4 rounded-lg w-full h-full flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex items-center space-x-12 px-6">
            {clientLogos2.map((client, index) => (
              <div
                key={`row2-2-${index}`}
                className={cn(
                  "grayscale opacity-70 hover:grayscale-0 hover:opacity-100",
                  "transition-all duration-300",
                  "flex items-center justify-center h-20 w-40"
                )}
              >
                <div className="glass-effect p-4 rounded-lg w-full h-full flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
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
