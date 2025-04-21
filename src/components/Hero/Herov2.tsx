"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const EnhancedHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Handle video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      id="home"
      className="h-[50vh] md:h-[60vh] relative overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/75 z-10" />
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Video/test2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Play/Pause Button */}
      {/*  <motion.div
        className="absolute top-6 right-6 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 bg-purple-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-purple-500 transition-all duration-300"
        >
          {isPlaying ? (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 4H6V20H10V4Z" fill="currentColor" />
              <path d="M18 4H14V20H18V4Z" fill="currentColor" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </motion.div>*/}

      {/* Content overlay */}
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="h-full flex flex-col justify-between">
          {/* Top Row: Left side text and Right side stats */}
          <div className="w-full flex justify-between items-start pt-12">
            {/* Left side text - Top */}
            <motion.div
              className="max-w-xs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-sm font-medium uppercase tracking-wider text-kanit text-white/50">
                PAIRING
                <br />
                EPIC PROJECTS
                <br />
                WITH EPIC MARKETING STRATEGIES
              </p>
            </motion.div>

            {/* Stats Section - Top Right */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex space-x-6 md:space-x-10"
            >
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-white/60"
              >
                <span className="text-3xl md:text-4xl font-bold text-kanit">
                  +300
                </span>
                <span className="text-xs md:text-sm uppercase tracking-wider text-kanit">
                  PROJECTS
                </span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-white/60"
              >
                <span className="text-3xl md:text-4xl font-bold text-kanit">
                  +200
                </span>
                <span className="text-xs md:text-sm uppercase tracking-wider text-kanit ">
                  KOLs
                </span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center  text-white/60"
              >
                <span className="text-3xl md:text-4xl font-bold text-kanit">
                  +1M
                </span>
                <span className="text-xs md:text-sm uppercase tracking-wider text-kanit">
                  CONTENT VIEWS{" "}
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Row: Left side text and Right side CTA + H1 */}
          <div className="w-full flex justify-between items-end pb-12">
            {/* Left side text - Bottom */}
            <motion.div
              className="max-w-xs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-sm font-medium uppercase tracking-wider text-kanit text-white/50">
                VISIONARY MARKETERS
                <br />
                DEDICATED TO TRANSFORMING
                <br />
                YOUR PROJECT INTO A SUCCESS STORY
              </p>
            </motion.div>

            {/* CTA and H1 - Bottom Right */}
            <div className="flex flex-col items-end">
              {/* Reach Out with diagonal arrow */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className=""
              >
                <Link
                  href="#contact"
                  className="inline-flex items-center text-purple-500 font-medium text-kanit hover:text-purple-400 transition-colors"
                >
                  <span className="mr-1 mt-4">REACH OUT</span>
                  <ArrowUpRight size={20} />
                </Link>
              </motion.div>

              {/* Very Big H1 */}
              <motion.h1
                className="text-right"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="block text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-kanit text-white/70">
                  KOLLAB
                </span>
                <span className="block text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-kanit  text-white/70">
                  MARKETING
                </span>
                <span className="block text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-kanit  text-white/70">
                  SOLUTIONS
                </span>
              </motion.h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
