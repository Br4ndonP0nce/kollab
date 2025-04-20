"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative py-20 md:py-0"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/80 z-0" />
      <div className="absolute inset-0 grid-background opacity-20 z-0" />

      {/* Animated gradient circles */}
      <motion.div
        className="absolute top-1/4 right-[15%] w-64 h-64 rounded-full bg-white/5 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[10%] w-96 h-96 rounded-full bg-white/5 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-block">
            <span className="px-4 py-1.5 glass-effect rounded-full text-sm font-medium text-white/90 kanit-text">
              The Future of Influencer Marketing
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 kanit-text"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
              Connect. Amplify.{" "}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/70">
              Dominate.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto text-balance"
          >
            We pair your project with top KOLs and influencers to drive
            <span className="text-white font-semibold">
              {" "}
              authentic growth
            </span>{" "}
            and
            <span className="text-white font-semibold">
              {" "}
              real market impact
            </span>
            .
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#contact"
              className={cn(
                "inline-flex items-center justify-center",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "rounded-full px-8 py-4 text-lg font-medium",
                "transition-all duration-300 hover-lift"
              )}
            >
              Work With Us <ArrowRight className="ml-2" size={18} />
            </Link>

            <Link
              href="#case-studies"
              className={cn(
                "inline-flex items-center justify-center",
                "border border-white/30 text-white hover:bg-white/10",
                "rounded-full px-8 py-4 text-lg",
                "transition-all duration-300"
              )}
            >
              View Case Studies
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
          >
            <div className="p-6 rounded-2xl glass-effect">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 kanit-text">
                250+
              </h3>
              <p className="text-white/70">KOLs in our Network</p>
            </div>
            <div className="p-6 rounded-2xl glass-effect">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 kanit-text">
                40M+
              </h3>
              <p className="text-white/70">Average Monthly Views</p>
            </div>
            <div className="p-6 rounded-2xl glass-effect">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 kanit-text">
                180%
              </h3>
              <p className="text-white/70">Average Growth Rate</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
