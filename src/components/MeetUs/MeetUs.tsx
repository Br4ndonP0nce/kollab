"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

// Sample gallery images - replace with actual images
const galleryItems = [
  {
    id: "office1",
    title: "Our London Office",
    image: "/api/placeholder/600/400",
    description: "Our main headquarters in the heart of London",
  },
  {
    id: "team1",
    title: "Team Building",
    image: "/api/placeholder/600/400",
    description: "Annual team retreat in Barcelona",
  },
  {
    id: "event1",
    title: "Blockchain Summit 2024",
    image: "/api/placeholder/600/400",
    description: "Presenting our KOL strategy at the main stage",
  },
  {
    id: "workspace1",
    title: "Creative Space",
    image: "/api/placeholder/600/400",
    description: "Where ideas come to life",
  },
  {
    id: "meeting1",
    title: "Client Meetings",
    image: "/api/placeholder/600/400",
    description: "Discussing strategy with partners",
  },
  {
    id: "celebration1",
    title: "Launch Party",
    image: "/api/placeholder/600/400",
    description: "Celebrating a successful campaign",
  },
  {
    id: "awards1",
    title: "Industry Awards",
    image: "/api/placeholder/600/400",
    description: "Recognized for excellence in marketing",
  },
  {
    id: "workspace2",
    title: "Collaborative Environment",
    image: "/api/placeholder/600/400",
    description: "Our open-plan working space",
  },
];

const MeetUsSection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Helper values for the carousel
  const ITEM_WIDTH = 300; // Width of each gallery item
  const ITEM_GAP = 16; // Gap between items
  const ITEM_TOTAL_WIDTH = ITEM_WIDTH + ITEM_GAP; // Total width including gap

  // Clone enough items to ensure smooth looping
  const tripleItems = [...galleryItems, ...galleryItems, ...galleryItems];

  // Setup infinite scroll effect with translating elements
  useEffect(() => {
    if (!scrollerRef.current) return;

    const totalOriginalWidth = galleryItems.length * ITEM_TOTAL_WIDTH;
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
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-white/60 uppercase tracking-wider kanit-text">
              Our Space
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 kanit-text text-white/90">
              Meet With Us in Person
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              We love to attend events, Whats more is we also love all the ins
              and outs of events: organizing speaking and connecting with
              people.
            </p>
          </div>

          {/* Infinite scrolling gallery container */}
          <div
            className="relative overflow-hidden mx-auto"
            style={{ maxWidth: "calc(100vw - 40px)" }}
          >
            {/* The actual scrollable container */}
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
                {tripleItems.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    className="flex-shrink-0 w-[300px] overflow-hidden rounded-xl glass-effect"
                    layoutId={`gallery-${item.id}-${index}`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-[200px] w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-lg font-bold kanit-text">
                          {item.title}
                        </h3>
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

          {/* Lightbox for expanded view */}
          <AnimatePresence>
            {selectedImage !== null && (
              <>
                {/* Overlay */}
                <motion.div
                  className="fixed inset-0 bg-black/80 z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImage(null)}
                />

                {/* Expanded image */}
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    layoutId={`gallery-${tripleItems[selectedImage].id}-${selectedImage}`}
                    className="relative max-w-4xl w-full bg-black overflow-hidden rounded-xl shadow-2xl"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={tripleItems[selectedImage].image}
                        alt={tripleItems[selectedImage].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 kanit-text">
                        {tripleItems[selectedImage].title}
                      </h3>
                      <p className="text-white/80">
                        {tripleItems[selectedImage].description}
                      </p>
                    </div>

                    {/* Close button */}
                    <button
                      className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white/90 hover:bg-black/70 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                      }}
                    >
                      <X size={24} />
                    </button>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MeetUsSection;
