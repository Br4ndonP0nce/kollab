// src/components/home/KolsSection.tsx
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { kols } from "@/lib/constants";
import Image from "next/image";
import { Linkedin } from "lucide-react";

const KolsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="kols"
      ref={containerRef}
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/95" />

      {/* Animated background */}
      <motion.div
        className="absolute inset-0 grid-background bg-repeat opacity-5"
        style={{ y, opacity }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">
              Our Network
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4  text-white/90">
              Key Opinion Leaders
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We partner with high-impact creators across all major platforms to
              amplify your message and drive targeted engagement.
            </p>
          </div>

          {/* "SWIPE" indicator similar to the one in the reference image */}
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

          {/* Horizontal scrollable section */}
          <div className="relative -mx-4 px-4 overflow-hidden">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              {/* Placeholder for left padding to center first item */}
              <div className="flex-shrink-0 w-4 md:w-1/4 lg:w-1/3"></div>

              {/* KOL cards */}
              {kols.map((kol, index) => (
                <motion.div
                  key={kol.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex-shrink-0 w-[280px] mx-4 snap-center"
                >
                  <div className="relative group">
                    {/* KOL Image */}
                    <div className="relative h-[420px] w-[280px] overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                      <Image
                        src={kol.image}
                        alt={kol.name}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                      {/* LinkedIn icon in top-left corner - similar to reference image */}
                      <div className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center text-white">
                        <Linkedin size={20} />
                      </div>

                      {/* KOL info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-1">
                          {kol.name.toUpperCase()}
                        </h3>
                        <div className="flex flex-col space-y-1 text-sm text-white/80">
                          <span className="uppercase">
                            {kol.followers} FOLLOWERS
                          </span>
                          <span className="uppercase">{kol.platform}</span>
                          <span className="uppercase">
                            {kol.specialty} SPECIALIST
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Placeholder for right padding to allow last item to center */}
              <div className="flex-shrink-0 w-4 md:w-1/4 lg:w-1/3"></div>
            </div>

            {/* Gradient overlays for scroll indication */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-2  text-white/90">
                250+
              </h3>
              <p className="text-white/70">KOLs in Network</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-2  text-white/90">
                72M+
              </h3>
              <p className="text-white/70">Cumulative Reach</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-2  text-white/90">
                2.6M+
              </h3>
              <p className="text-white/70">Avg. Views per Post</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KolsSection;
