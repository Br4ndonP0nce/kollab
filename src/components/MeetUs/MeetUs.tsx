"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Define proper types for gallery items
interface BaseGalleryItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

interface VideoGalleryItem extends BaseGalleryItem {
  video: string;
}

interface GalleryCategory {
  category: string;
  items: (BaseGalleryItem | VideoGalleryItem)[];
}

// Updated gallery categories with video
const galleryCategories: GalleryCategory[] = [
  {
    category: "SIDE EVENTS",
    items: [
      {
        id: "side-events",
        title: "Side Events",
        image: "/api/placeholder/600/400",
        video: "/Video/sideEvent.mp4", // Add your video path here
        description:
          "We organize exclusive side events at major blockchain conferences.",
      },
    ],
  },
  {
    category: "PUBLIC EVENTS",
    items: [
      {
        id: "token2049-dubai",
        title: "Token 2049 Dubai",
        image: "/Image/token2049.webp",
        description: "One of the largest crypto events in the Middle East.",
      },
      {
        id: "token2049-singapore",
        title: "Token 2049 Singapore",
        image: "/Image/singapore2049.webp",
        description: "The flagship crypto event in the Asia-Pacific region.",
      },
      {
        id: "consensus",
        title: "Consensus by Coindesk",
        image: "/Image/consensus1.png",
        description:
          "Annual gathering of the cryptocurrency and blockchain technology world.",
      },
      {
        id: "paris-blockchain",
        title: "Paris Blockchain Week",
        image: "/Image/paris.webp",
        description: "Europe's largest blockchain conference.",
      },
      {
        id: "solana-breakpoint",
        title: "Solana Breakpoint",
        image: "/Image/solana.webp",
        description: "Annual conference for the Solana ecosystem.",
      },
    ],
  },
];

const UpdatedMeetUsSection = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<{
    categoryIndex: number;
    itemIndex: number;
  } | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const expandedVideoRef = useRef<HTMLVideoElement>(null);

  const scrollerRef = useRef<HTMLDivElement>(null);

  // Helper values for the carousel
  const ITEM_WIDTH = 300; // Width of each gallery item
  const ITEM_GAP = 16; // Gap between items
  const ITEM_TOTAL_WIDTH = ITEM_WIDTH + ITEM_GAP; // Total width including gap

  // Setup infinite scroll effect with translating elements for PUBLIC EVENTS only
  useEffect(() => {
    // Get the PUBLIC EVENTS category (index 1)
    const publicEventsCategory = galleryCategories[1];
    const scrollerElement = scrollerRef.current;
    if (!scrollerElement) return;

    const totalOriginalWidth =
      publicEventsCategory.items.length * ITEM_TOTAL_WIDTH;

    // Triple the items for smooth looping
    const tripleItems = [
      ...publicEventsCategory.items,
      ...publicEventsCategory.items,
      ...publicEventsCategory.items,
    ];

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

    // Return cleanup function
    return () => {
      scrollerElement.removeEventListener("scroll", handleScroll);
      scrollerElement.removeEventListener("mousedown", handleMouseDown);
      scrollerElement.removeEventListener("mouseleave", handleMouseLeave);
      scrollerElement.removeEventListener("mouseup", handleMouseUp);
      scrollerElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Function to handle clicking on a video card
  const handleVideoCardClick = (categoryIndex: number, itemIndex: number) => {
    setSelectedImage({ categoryIndex, itemIndex });
    setIsMuted(false); // Start with sound enabled
    // When opening the lightbox, ensure video starts playing
    setTimeout(() => {
      if (expandedVideoRef.current) {
        expandedVideoRef.current
          .play()
          .catch((e) => console.error("Error playing expanded video:", e));
        expandedVideoRef.current.muted = false; // Explicitly set muted to false
      }
    }, 100);
  };

  // Function to handle closing the lightbox
  const handleCloseLightbox = () => {
    // When closing, reset to muted state for next time
    setIsMuted(true);
    setSelectedImage(null);
  };

  // Toggle audio
  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // Get the flat item at the given combined index (used for lightbox)
  const getItemAtCombinedIndex = (categoryIndex: number, itemIndex: number) => {
    const category = galleryCategories[categoryIndex];
    // Handle triple repeating items for the carousel
    const tripleItems = [
      ...category.items,
      ...category.items,
      ...category.items,
    ];
    return tripleItems[itemIndex];
  };

  // Check if an item has a video
  const hasVideo = (
    item: BaseGalleryItem | VideoGalleryItem
  ): item is VideoGalleryItem => {
    return "video" in item;
  };

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 kanit-text text-white/90">
              {t("meetUsTitle")}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {t("meetUsDescription")}
            </p>
          </div>

          {/* Side Events - Video Card Display */}
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl font-bold mb-6 kanit-text text-[#c19a6b]">
              {galleryCategories[0].category}
            </h3>

            <div className="flex justify-center">
              {galleryCategories[0].items.map((item, index) => (
                <motion.div
                  key={`side-${item.id}`}
                  className="w-full max-w-xl overflow-hidden rounded-xl glass-effect cursor-pointer"
                  layoutId={`gallery-0-${item.id}-0`}
                  onClick={() => handleVideoCardClick(0, 0)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-[300px] w-full">
                    {/* Background video (no audio) */}
                    {hasVideo(item) ? (
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src={item.video} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold kanit-text text-white/90">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-white/80">{item.description}</p>
                      {hasVideo(item) && (
                        <p className="mt-2 text-sm text-white/60">
                          Click to expand and enable audio
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Public Events - Carousel */}
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl font-bold mb-6 kanit-text text-[#c19a6b]">
              {galleryCategories[1].category}
            </h3>

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
                  {[
                    ...galleryCategories[1].items,
                    ...galleryCategories[1].items,
                    ...galleryCategories[1].items,
                  ].map((item, itemIndex) => (
                    <motion.div
                      key={`${item.id}-${itemIndex}`}
                      className="flex-shrink-0 w-[300px] overflow-hidden rounded-xl glass-effect"
                      layoutId={`gallery-1-${item.id}-${itemIndex}`}
                      onClick={() =>
                        setSelectedImage({
                          categoryIndex: 1,
                          itemIndex: itemIndex,
                        })
                      }
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
                          <h3 className="text-lg font-bold kanit-text text-white/90">
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
                  onClick={handleCloseLightbox}
                />

                {/* Expanded content */}
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {selectedImage && (
                    <motion.div
                      layoutId={`gallery-${selectedImage.categoryIndex}-${
                        getItemAtCombinedIndex(
                          selectedImage.categoryIndex,
                          selectedImage.itemIndex
                        ).id
                      }-${selectedImage.itemIndex}`}
                      className="relative max-w-4xl w-full bg-black overflow-hidden rounded-xl shadow-2xl"
                    >
                      <div className="relative aspect-video">
                        {/* Get the current item */}
                        {(() => {
                          const currentItem = getItemAtCombinedIndex(
                            selectedImage.categoryIndex,
                            selectedImage.itemIndex
                          );

                          // Check if it has a video
                          return hasVideo(currentItem) ? (
                            <video
                              ref={expandedVideoRef}
                              className="w-full h-full object-cover"
                              autoPlay
                              loop
                              playsInline
                              muted={isMuted}
                            >
                              <source
                                src={currentItem.video}
                                type="video/mp4"
                              />
                            </video>
                          ) : (
                            <Image
                              src={currentItem.image}
                              alt={currentItem.title}
                              fill
                              className="object-cover"
                            />
                          );
                        })()}
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2 kanit-text text-white/90">
                          {
                            getItemAtCombinedIndex(
                              selectedImage.categoryIndex,
                              selectedImage.itemIndex
                            ).title
                          }
                        </h3>
                        <p className="text-white/80">
                          {
                            getItemAtCombinedIndex(
                              selectedImage.categoryIndex,
                              selectedImage.itemIndex
                            ).description
                          }
                        </p>
                      </div>

                      {/* Audio control button - only for videos */}
                      {(() => {
                        const currentItem = getItemAtCombinedIndex(
                          selectedImage.categoryIndex,
                          selectedImage.itemIndex
                        );

                        if (hasVideo(currentItem)) {
                          return (
                            <button
                              className="absolute top-4 left-4 bg-black/50 rounded-full p-2 text-white/90 hover:bg-black/70 transition-colors"
                              onClick={toggleAudio}
                            >
                              {isMuted ? (
                                <VolumeX size={24} />
                              ) : (
                                <Volume2 size={24} />
                              )}
                            </button>
                          );
                        }
                        return null;
                      })()}

                      {/* Close button */}
                      <button
                        className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white/90 hover:bg-black/70 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseLightbox();
                        }}
                      >
                        <X size={24} />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default UpdatedMeetUsSection;
