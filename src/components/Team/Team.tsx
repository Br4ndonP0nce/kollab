"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { kols } from "@/lib/constants";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
const TeamSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Constants for the carousel
  const ITEM_WIDTH = 280; // Width of each KOL card
  const ITEM_GAP = 16; // Gap between items (equivalent to mx-4)
  const ITEM_TOTAL_WIDTH = ITEM_WIDTH + ITEM_GAP; // Total width including gap

  // Triple the KOLs array for infinite scrolling effect
  const tripleKols = [...kols, ...kols, ...kols];

  useEffect(() => {
    if (!scrollerRef.current) return;

    const totalOriginalWidth = kols.length * ITEM_TOTAL_WIDTH;
    const scrollerElement = scrollerRef.current;

    // Callback to check scroll position and "loop" back if needed
    const handleScroll = () => {
      if (!scrollerElement) return;

      const scrollPos = scrollerElement.scrollLeft;

      // If we've scrolled to the end of the first set, jump to the second set (invisible jump)
      if (scrollPos < 10) {
        // Disable smooth scrolling temporarily
        scrollerElement.style.scrollBehavior = "auto";
        scrollerElement.scrollLeft = totalOriginalWidth + scrollPos;
        // Re-enable smooth scrolling
        setTimeout(() => {
          scrollerElement.style.scrollBehavior = "smooth";
        }, 10);
      }
      // If we've scrolled to the beginning of the third set, jump to the second set
      else if (scrollPos >= totalOriginalWidth * 2 - 10) {
        scrollerElement.style.scrollBehavior = "auto";
        scrollerElement.scrollLeft = scrollPos - totalOriginalWidth;
        setTimeout(() => {
          scrollerElement.style.scrollBehavior = "smooth";
        }, 10);
      }
    };

    // Initialize position to the middle set for better UX
    scrollerElement.scrollLeft = totalOriginalWidth;
    scrollerElement.style.scrollBehavior = "smooth";

    // Add event listeners
    scrollerElement.addEventListener("scroll", handleScroll);

    // Enable mouse drag scrolling
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      scrollerElement.style.cursor = "grabbing";
      startX = e.pageX - scrollerElement.offsetLeft;
      scrollLeft = scrollerElement.scrollLeft;
      scrollerElement.style.scrollBehavior = "auto";
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
    <section
      id="core-team"
      ref={containerRef}
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/95" />

      {/* Background pattern with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"
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

          {/* Improved horizontal scrollable section */}
          <div
            className="relative overflow-hidden mx-auto"
            style={{ maxWidth: "calc(100vw - 40px)" }}
          >
            <div
              ref={scrollerRef}
              className="relative pb-6 flex cursor-grab overflow-x-auto scrollbar-none touch-pan-x"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                width: "100%",
              }}
            >
              {/* Triple the items for true infinite scrolling */}
              <div className="flex gap-4">
                {tripleKols.map((kol, index) => (
                  <motion.div
                    key={`${kol.id}-${index}`}
                    className="flex-shrink-0 w-[280px] mx-2 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative group">
                      {/* Team Member Image */}
                      <div className="relative h-[420px] w-[280px] overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                        <Image
                          src={kol.image}
                          alt={kol.name}
                          fill
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                        {/* LinkedIn icon in top-left corner */}
                        <div className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center text-white">
                          <Linkedin size={20} />
                        </div>

                        {/* Team member info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-2xl font-bold mb-1">
                            {kol.name.toUpperCase()}
                          </h3>
                          <div className="flex flex-col space-y-1 text-sm text-white/80">
                            <span className="uppercase">
                              {kol.specialty} SPECIALIST
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gradient overlays for scroll indication */}
            <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
