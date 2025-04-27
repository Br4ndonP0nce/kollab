"use client";

import React from "react";
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
    slidesToSlide: 1, // Number of slides to slide at once
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

const ClientsCarousel = () => {
  const { t } = useLanguage();

  // Triple the logos array for smoother infinite scrolling
  const extendedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

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
        <div className="relative">
          <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlay
            autoPlaySpeed={1}
            centerMode={false}
            className="pb-6"
            containerClass="carousel-container"
            customTransition="all 5s linear"
            draggable
            focusOnSelect={false}
            infinite
            itemClass="carousel-item px-2"
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
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
            transitionDuration={1000}
          >
            {extendedLogos.map((client, index) => (
              <div key={`client-${index}`}>
                <div
                  className={cn(
                    "glass-effect p-6 rounded-lg",
                    "h-28",
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

export default ClientsCarousel;
