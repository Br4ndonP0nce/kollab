"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { kols } from "@/lib/constants";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TeamMember {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

const TeamSection: React.FC = () => {
  const { t } = useLanguage();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState<boolean>(false);
  const [showRightGradient, setShowRightGradient] = useState<boolean>(true);

  // Constants for the team section
  const ITEM_WIDTH = 280; // Width of each KOL card

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scrollerElement = scrollerRef.current;
    scrollerElement.style.scrollBehavior = "smooth";

    // Track scroll position to update gradients
    const handleScroll = () => {
      if (!scrollerElement) return;

      const scrollPos = scrollerElement.scrollLeft;
      const maxScroll =
        scrollerElement.scrollWidth - scrollerElement.clientWidth;

      // Show/hide left gradient based on scroll position
      setShowLeftGradient(scrollPos > 10);

      // Show/hide right gradient based on scroll position
      setShowRightGradient(scrollPos < maxScroll - 10);
    };

    // Enable mouse drag scrolling with improved handling
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      scrollerElement.style.cursor = "grabbing";
      startX = e.pageX - scrollerElement.offsetLeft;
      scrollLeft = scrollerElement.scrollLeft;
      scrollerElement.style.scrollBehavior = "auto";

      // Prevent text selection during drag
      e.preventDefault();
      document.getSelection()?.removeAllRanges();
    };

    const handleMouseLeave = () => {
      isDown = false;
      scrollerElement.style.cursor = "grab";
      scrollerElement.style.scrollBehavior = "smooth";
    };

    const handleMouseUp = () => {
      isDown = false;
      scrollerElement.style.cursor = "grab";
      scrollerElement.style.scrollBehavior = "smooth";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollerElement.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      scrollerElement.scrollLeft = scrollLeft - walk;
    };

    // Initialize scroll indicators
    handleScroll();

    // Add event listeners
    scrollerElement.addEventListener("scroll", handleScroll);
    scrollerElement.addEventListener("mousedown", handleMouseDown);
    scrollerElement.addEventListener("mouseleave", handleMouseLeave);
    scrollerElement.addEventListener("mouseup", handleMouseUp);
    scrollerElement.addEventListener("mousemove", handleMouseMove);

    // Clean up
    return () => {
      scrollerElement.removeEventListener("scroll", handleScroll);
      scrollerElement.removeEventListener("mousedown", handleMouseDown);
      scrollerElement.removeEventListener("mouseleave", handleMouseLeave);
      scrollerElement.removeEventListener("mouseup", handleMouseUp);
      scrollerElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section id="core-team" className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/95" />

      {/* Background pattern with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-repeat opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-white/60 uppercase tracking-wider kanit-text">
              {t("teamTitle")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 kanit-text">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
                CORE TEAM
              </span>
            </h2>
          </motion.div>

          {/* "SWIPE" indicator */}
          <div className="relative flex justify-end mb-6 mr-4 md:mr-8">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center"
            >
              <span className="mr-2 text-white/60 text-sm uppercase tracking-wider">
                SWIPE
              </span>
              <div className="w-12 h-px bg-white/40"></div>
            </motion.div>
          </div>

          {/* Bounded horizontal scrollable section */}
          <div
            className="relative overflow-hidden mx-auto"
            style={{ maxWidth: "calc(100vw - 40px)" }}
          >
            <div
              ref={scrollerRef}
              className="relative pb-6 flex cursor-grab overflow-x-auto scrollbar-none touch-pan-x select-none"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                width: "100%",
                userSelect: "none",
              }}
              onDragStart={(e) => e.preventDefault()}
            >
              <div className="flex gap-4">
                {kols.map((kol: TeamMember) => (
                  <motion.div
                    key={kol.id}
                    className="flex-shrink-0 w-[280px] mx-2 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative group">
                      {/* Team Member Image */}
                      <div className="relative h-[420px] w-[280px] overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 pointer-events-none">
                        <div className="absolute inset-0 z-10 bg-black/40" />
                        <Image
                          src={kol.image}
                          alt={kol.name}
                          fill
                          draggable="false"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                        {/* Team member info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-2xl font-bold mb-1">
                            {kol.name.toUpperCase()}
                          </h3>
                          <div className="flex flex-col space-y-1 text-sm text-white/80">
                            <span className="uppercase">{kol.specialty}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gradient overlays for scroll indication - now with conditional rendering */}
            {showLeftGradient && (
              <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            )}
            {showRightGradient && (
              <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black to-transparent pointer-events-none" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
