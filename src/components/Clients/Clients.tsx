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

  // Animation state refs
  const autoScrollRef = useRef<number | null>(null);
  const fallbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractingRef = useRef(false);
  const isMobileRef = useRef(false);
  const lastTouchTimeRef = useRef(0);

  // Create a multiplied array for more content
  const multipliedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  // Check if device is mobile
  useEffect(() => {
    // Detect if device is mobile
    isMobileRef.current =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // Monitor visibility changes to restart animation when page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startScrolling();
      } else {
        stopScrolling();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Core scrolling functionality
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Set initial scroll position to middle of content to enable infinite scroll in both directions
    carousel.scrollLeft = carousel.scrollWidth / 3;

    // Function to check looping (infinite scroll effect)
    const handleLoopCheck = () => {
      if (!carousel) return;

      const { scrollLeft, scrollWidth } = carousel;
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

    // Handle scroll events
    const handleScroll = () => {
      handleLoopCheck();
      // Reset last touch time on manual scroll to prevent immediate auto-scroll restart
      if (userInteractingRef.current) {
        lastTouchTimeRef.current = Date.now();
      }
    };

    carousel.addEventListener("scroll", handleScroll);

    // Start scrolling immediately
    startScrolling();

    // Cleanup function
    return () => {
      stopScrolling();
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper function to start scrolling with appropriate method for device
  const startScrolling = () => {
    stopScrolling(); // Clear any existing animation

    if (userInteractingRef.current) return;

    const carousel = carouselRef.current;
    if (!carousel) return;

    // Different approach based on device type
    if (isMobileRef.current) {
      // For mobile: use both requestAnimationFrame and setInterval as fallback
      const scrollAmount = 0.5;

      // Primary method using requestAnimationFrame
      const animateScroll = () => {
        // Only scroll if user isn't interacting and enough time has passed since last touch
        const timeSinceLastTouch = Date.now() - lastTouchTimeRef.current;
        if (!userInteractingRef.current && timeSinceLastTouch > 500) {
          if (carousel) carousel.scrollLeft += scrollAmount;
        }
        autoScrollRef.current = requestAnimationFrame(animateScroll);
      };

      // Fallback method using setInterval (more reliable on some mobile browsers)
      fallbackIntervalRef.current = setInterval(() => {
        const timeSinceLastTouch = Date.now() - lastTouchTimeRef.current;
        if (!userInteractingRef.current && timeSinceLastTouch > 500) {
          if (carousel) carousel.scrollLeft += scrollAmount;
        }
      }, 16); // ~60fps

      autoScrollRef.current = requestAnimationFrame(animateScroll);
    } else {
      // For desktop: just use requestAnimationFrame
      const animateScroll = () => {
        if (!userInteractingRef.current && carousel) {
          carousel.scrollLeft += 0.5;
        }
        autoScrollRef.current = requestAnimationFrame(animateScroll);
      };

      autoScrollRef.current = requestAnimationFrame(animateScroll);
    }
  };

  // Helper function to stop all scrolling animations
  const stopScrolling = () => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }

    if (fallbackIntervalRef.current) {
      clearInterval(fallbackIntervalRef.current);
      fallbackIntervalRef.current = null;
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Stop auto-scrolling and mark as interacting
    userInteractingRef.current = true;
    stopScrolling();

    // Record drag start position
    setIsMouseDown(true);
    setStartX(e.pageX - carousel.offsetLeft);
    setScrollLeft(carousel.scrollLeft);
    carousel.style.cursor = "grabbing";
    carousel.style.scrollBehavior = "auto";
  };

  const handleMouseUp = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Reset state
    setIsMouseDown(false);
    carousel.style.cursor = "grab";
    carousel.style.scrollBehavior = "smooth";

    // Record when interaction ended
    lastTouchTimeRef.current = Date.now();

    // Resume auto-scrolling after a short delay
    setTimeout(() => {
      userInteractingRef.current = false;
      startScrolling();
    }, 500);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !carouselRef.current) return;
    e.preventDefault();

    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch event handlers with passive: false to work better on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Stop auto-scrolling and mark as interacting
    userInteractingRef.current = true;
    stopScrolling();

    // Record drag start position
    setIsMouseDown(true);
    setStartX(e.touches[0].pageX - carousel.offsetLeft);
    setScrollLeft(carousel.scrollLeft);
    carousel.style.scrollBehavior = "auto";
  };

  const handleTouchEnd = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Reset state
    setIsMouseDown(false);
    carousel.style.scrollBehavior = "smooth";

    // Record when interaction ended
    lastTouchTimeRef.current = Date.now();

    // Resume auto-scrolling after a short delay
    setTimeout(() => {
      userInteractingRef.current = false;
      startScrolling();
    }, 500);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMouseDown || !carouselRef.current) return;

    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle touch cancel event (important for mobile)
  const handleTouchCancel = () => {
    handleTouchEnd(); // Use same logic as touch end
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
        {/* Mobile-optimized carousel */}
        <div
          ref={carouselRef}
          className="pb-6 flex overflow-x-auto cursor-grab select-none scrollbar-none"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-x",
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
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
