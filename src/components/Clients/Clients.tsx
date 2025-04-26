"use client";

import React, { useRef, useState, useEffect } from "react";
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
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const autoScrollRef = useRef<number | null>(null);
  const userInteractingRef = useRef(false);

  // Create a multiplied array for more content
  const multipliedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  // Handle auto-scrolling
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Set initial scroll position to middle of content to enable infinite scroll in both directions
    carousel.scrollLeft = carousel.scrollWidth / 3;

    // Auto-scroll function
    const autoScroll = () => {
      if (!carousel || userInteractingRef.current || !autoScrollEnabled) return;

      // Scroll by a small amount each frame
      carousel.scrollLeft += 0.5;

      // Request next frame
      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    // Start auto-scrolling
    if (autoScrollEnabled) {
      autoScrollRef.current = requestAnimationFrame(autoScroll);
    }

    // Check if we need to loop back
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      const oneThird = scrollWidth / 3;

      // If scrolled to the end of first set, jump to the middle set
      if (scrollLeft < 50) {
        carousel.scrollLeft = oneThird + scrollLeft;
      }
      // If scrolled to the beginning of third set, jump to the middle set
      else if (scrollLeft > oneThird * 2 - 50) {
        carousel.scrollLeft = oneThird + (scrollLeft - oneThird * 2);
      }
    };

    carousel.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, [autoScrollEnabled]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!carouselRef.current) return;

    // Stop auto-scrolling when user starts interacting
    userInteractingRef.current = true;
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }

    setIsMouseDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = "grabbing";
    carouselRef.current.style.scrollBehavior = "auto";
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
      carouselRef.current.style.scrollBehavior = "smooth";
    }

    // Resume auto-scrolling after user interaction
    userInteractingRef.current = false;

    // Resume auto-scrolling immediately
    if (autoScrollEnabled && !autoScrollRef.current) {
      const autoScroll = () => {
        if (
          !carouselRef.current ||
          userInteractingRef.current ||
          !autoScrollEnabled
        )
          return;

        carouselRef.current.scrollLeft += 0.5;
        autoScrollRef.current = requestAnimationFrame(autoScroll);
      };

      autoScrollRef.current = requestAnimationFrame(autoScroll);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !carouselRef.current) return;
    e.preventDefault();

    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;

    // Stop auto-scrolling when user starts touching
    userInteractingRef.current = true;
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }

    setIsMouseDown(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.scrollBehavior = "auto";
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMouseDown || !carouselRef.current) return;

    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
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
        {/* Simple draggable carousel */}
        <div
          ref={carouselRef}
          className="pb-6 flex overflow-x-auto cursor-grab select-none scrollbar-none"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          <div className="flex">
            {multipliedLogos.map((client, index) => (
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
