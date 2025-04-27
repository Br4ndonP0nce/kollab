"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

// Responsive breakpoints configuration for the carousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

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

const ClientsMultiCarousel: React.FC = () => {
  const { t } = useLanguage();
  const carouselRef = useRef<any>(null);

  // Create a larger array for smoother infinite scrolling
  // This ensures we have enough items when the carousel is on a wide screen
  const extendedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  // Custom styling for the arrows if needed
  const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute right-0 bg-black/50 p-2 rounded-full text-white z-10 opacity-0"
      aria-label="Next"
    >
      <span className="sr-only">Next</span>
    </button>
  );

  const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute left-0 bg-black/50 p-2 rounded-full text-white z-10 opacity-0"
      aria-label="Previous"
    >
      <span className="sr-only">Previous</span>
    </button>
  );

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
        {/* react-multi-carousel implementation */}
        <div className="relative">
          <Carousel
            ref={carouselRef}
            additionalTransfrom={0}
            arrows={false}
            autoPlay
            autoPlaySpeed={2000}
            centerMode={false}
            className="pb-6"
            containerClass="carousel-container"
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass="carousel-item px-4"
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {extendedLogos.map((client, index) => (
              <div key={`client-${index}`} className="px-2">
                <div
                  className={cn(
                    "glass-effect p-6 rounded-lg",
                    "h-28 w-full",
                    "flex items-center justify-center mx-auto"
                  )}
                >
                  <ClientLogo client={client} />
                </div>
              </div>
            ))}
          </Carousel>

          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Custom CSS to maintain design consistency */}
      <style jsx global>{`
        /* Ensure the carousel container has the right styling */
        .carousel-container {
          padding-bottom: 24px;
        }

        /* Hide scrollbar */
        .react-multi-carousel-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .react-multi-carousel-track::-webkit-scrollbar {
          display: none;
        }

        /* Custom cursor for dragging */
        .react-multi-carousel-list {
          cursor: grab;
        }

        .react-multi-carousel-list:active {
          cursor: grabbing;
        }
      `}</style>
    </section>
  );
};

export default ClientsMultiCarousel;
