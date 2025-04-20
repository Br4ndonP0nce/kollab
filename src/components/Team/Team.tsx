"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Sample team members data based on the image provided
const teamMembers = [
  {
    id: "vlad",
    name: "VLAD",
    role: "CO-FOUNDER, CEO",
    image: "/api/placeholder/300/400",
    linkedin: "https://linkedin.com/in/vladceo",
  },
  {
    id: "gleb",
    name: "GLEB",
    role: "CO-FOUNDER, CMO",
    image: "/api/placeholder/300/400",
    linkedin: "https://linkedin.com/in/glebcmo",
  },
  {
    id: "mike",
    name: "MIKE",
    role: "HEAD OF GROWTH",
    image: "/api/placeholder/300/400",
    linkedin: "https://linkedin.com/in/mikegrowth",
  },
  {
    id: "kate",
    name: "KATE",
    role: "KOL MANAGER",
    image: "/api/placeholder/300/400",
    linkedin: "https://linkedin.com/in/katemanager",
  },
  {
    id: "tasha",
    name: "TASHA",
    role: "ECOSYSTEM LEAD",
    image: "/api/placeholder/300/400",
    linkedin: "https://linkedin.com/in/tashaeco",
  },
  {
    id: "olga",
    name: "OLGA",
    role: "HEAD OF PMO",
    image: "/api/placeholder/300/400",
    linkedin: "https://linkedin.com/in/olgapmo",
  },
  {
    id: "dima",
    name: "DIMA",
    role: "PROJECT MANAGER",
    image: "/api/placeholder/300/400",
    linkedin: "https://linkedin.com/in/dimapm",
  },
  {
    id: "galimian",
    name: "GALIMIAN",
    role: "GROWTH MARKETER",
    image: "/api/placeholder/300/400",
    linkedin: "https://linkedin.com/in/galimian",
  },
  {
    id: "illia",
    name: "ILLIA",
    role: "HEAD OF CM",
    image: "/api/placeholder/300/400",
    linkedin: "https://linkedin.com/in/illiacm",
  },
];

const TeamSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect - different direction than KOLs section
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="team"
      ref={containerRef}
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black to-black/95" />

      {/* Animated background - different pattern than KOLs section */}
      <motion.div
        className="absolute inset-0 grid-background opacity-10"
        style={{ y, opacity }}
      />

      {/* Decorative elements to make this section pop differently from KOLs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/2 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-white/3 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header - styled differently than KOLs */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-white/60 uppercase tracking-wider kanit-text">
              Meet The Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 kanit-text">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
                CORE TEAM
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our experienced team of industry experts brings years of knowledge
              in Web3 marketing, community building, and growth strategies.
            </p>
          </motion.div>

          {/* "SWIPE" indicator similar to the reference image */}
          <div className="relative flex justify-end mb-6 mr-4 md:mr-8">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center"
            >
              <span className="mr-2 text-white/60 text-sm uppercase tracking-wider kanit-text">
                SWIPE
              </span>
              <div className="w-12 h-px bg-white/40"></div>
            </motion.div>
          </div>

          {/* Horizontal scrollable section - FIXED FOR SCROLLING */}
          <div className="relative mx-auto max-w-full overflow-hidden">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto py-4 snap-x snap-mandatory scrollbar-none touch-pan-x"
              style={{
                WebkitOverflowScrolling: "touch", // For iOS momentum scrolling
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {/* Placeholder for left padding on larger screens */}

              {/* Team member cards */}
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex-shrink-0 w-[280px] mx-3 snap-center cursor-grab active:cursor-grabbing"
                >
                  <div className="relative group hover-lift">
                    {/* Team Member Image - styled differently than KOLs */}
                    <div className="relative h-[420px] w-[280px] overflow-hidden rounded-lg bg-black border border-white/10">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      />

                      {/* Gradient overlay with different color than KOLs */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70" />

                      {/* LinkedIn icon with interactive functionality */}
                      <Link
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors"
                      >
                        <Linkedin size={20} />
                      </Link>

                      {/* Team member info - styled differently than KOLs */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-1 kanit-text">
                          {member.name}
                        </h3>
                        <p className="text-sm text-white/80 uppercase kanit-text">
                          {member.role}
                        </p>
                      </div>

                      {/* Hover effect - animation different from KOLs */}
                      <motion.div
                        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ opacity: 0.05 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Placeholder for right padding on larger screens */}
              <div className="flex-shrink-0 w-4 md:w-[5%] lg:w-[8%]"></div>
            </div>

            {/* Gradient overlays for scroll indication - different colors than KOLs */}
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>

          {/* Mobile swipe instructions */}
          <div className="mt-4 text-center md:hidden">
            <p className="text-white/60 text-sm italic">
              Swipe cards to see more
            </p>
          </div>

          {/* Additional team highlights - different than KOLs section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Our team combines expertise in digital marketing, blockchain
              technology, community management, and strategic partnerships to
              deliver exceptional results.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 glass-effect rounded-full">
                <span className="text-white/80 kanit-text">
                  8+ Years Crypto Experience
                </span>
              </div>
              <div className="px-6 py-3 glass-effect rounded-full">
                <span className="text-white/80 kanit-text">
                  200+ Projects Launched
                </span>
              </div>
              <div className="px-6 py-3 glass-effect rounded-full">
                <span className="text-white/80 kanit-text">
                  Strategic Partners
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
