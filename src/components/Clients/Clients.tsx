"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
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
          draggable="false"
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
      draggable="false"
    />
  );
};

const SimpleDraggableCarousel = () => {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Clone items for infinite effect - we need enough copies to ensure seamless looping
  const allLogos = [
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
  ];

  // Function to handle the infinite loop logic
  const handleInfiniteScroll = useCallback(() => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const scrollWidth = container.scrollWidth;

    // Calculate the width of one set of items (we have 5 sets)
    const itemSetWidth = scrollWidth / 5;

    // If we've scrolled past the third set, reset to the equivalent position in the second set
    if (container.scrollLeft >= itemSetWidth * 3) {
      // Use direct assignment for immediate effect without animation
      container.style.scrollBehavior = "auto";
      container.scrollLeft =
        itemSetWidth * 2 + (container.scrollLeft - itemSetWidth * 3);
      setTimeout(() => {
        container.style.scrollBehavior = isDragging ? "auto" : "smooth";
      }, 10);
    }
    // If we've scrolled before the second set, reset to the equivalent position in the third set
    else if (container.scrollLeft <= itemSetWidth) {
      container.style.scrollBehavior = "auto";
      container.scrollLeft =
        itemSetWidth * 2 + (container.scrollLeft - itemSetWidth);
      setTimeout(() => {
        container.style.scrollBehavior = isDragging ? "auto" : "smooth";
      }, 10);
    }
  }, [isDragging]);

  // Handle auto-scrolling
  useEffect(() => {
    if (
      !isAutoScrolling ||
      (isHovering && window.matchMedia("(hover: hover)").matches) ||
      isDragging
    ) {
      return;
    }

    let animationId: number;

    const autoScroll = () => {
      if (carouselRef.current) {
        // Increment scroll position by a small amount each frame
        carouselRef.current.scrollLeft += 0.5;

        // Handle infinite loop logic
        handleInfiniteScroll();
      }

      // Continue the animation
      animationId = requestAnimationFrame(autoScroll);
    };

    // Start the animation
    animationId = requestAnimationFrame(autoScroll);

    // Cleanup function to cancel animation when conditions change
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isAutoScrolling, isHovering, isDragging, handleInfiniteScroll]);

  // Initialize scroll position
  useEffect(() => {
    if (carouselRef.current) {
      // Start from the middle set of items
      const itemSetWidth = carouselRef.current.scrollWidth / 5;
      carouselRef.current.scrollLeft = itemSetWidth * 2;
    }
  }, []);

  // Add scroll event listener to handle infinite looping during manual scrolling
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!isDragging) {
        handleInfiniteScroll();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [isDragging, handleInfiniteScroll]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    handleInfiniteScroll();
  };

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold kanit-text text-white/90">
          {t("clientsTitle")}
        </h2>
      </div>

      <div
        className="relative mx-auto"
        style={{ maxWidth: "calc(100vw - 40px)" }}
      >
        {/* Fixed carousel with your logic */}
        <div
          ref={carouselRef}
          className={cn(
            "pb-6 flex overflow-x-auto scrollbar-none select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: isDragging ? "auto" : "smooth",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            handleDragEnd();
          }}
        >
          <div className="flex">
            {allLogos.map((client, index) => (
              <div key={`client-${index}`} className="flex-shrink-0 mx-8">
                <div
                  className={cn(
                    "glass-effect p-6 rounded-lg",
                    "h-28 w-52 md:h-28 md:w-52",
                    "flex items-center justify-center"
                  )}
                >
                  <ClientLogo client={client} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default SimpleDraggableCarousel;
