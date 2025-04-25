"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { kols } from "@/lib/constants";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
const ImprovedKolsSection = () => {
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
      id="creators"
      ref={containerRef}
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/95" />

      {/* Background pattern with parallax effect */}
      <motion.div
        className="absolute inset-0 grid-background bg-repeat opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">
              {t("kolTitle")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white/90 kanit-text">
              Key Opinion Leaders
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {t("kolDescription")}
            </p>
          </div>

          {/* "SWIPE" indicator */}
          <motion.div
            className="mt-16 pb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/40 rounded-full blur-md"></div>
              <a
                href="#contact"
                className={cn(
                  "relative bg-white text-black",
                  "px-8 py-4 rounded-full font-medium",
                  "hover:bg-white/90 transition-colors",
                  "inline-block kanit-text"
                )}
              >
                {t("kolCTA")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImprovedKolsSection;
