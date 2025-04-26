"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const HeroSection = () => {
  const { t } = useLanguage();

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
      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10  bg-black/80" />
        <Image
          src="/Image/mainbg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-20 relative">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-block">
            <span className="px-4 py-1.5 font-bold text-7xl text-white/90 kanit-text">
              KOLLABS
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 kanit-text text-balance text-white/80"
          >
            Where crypto <span className="text-[#c19a6b]">meets</span> meets
            influence <br />
            real voices real results
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#contact"
              className={cn(
                "inline-flex items-center justify-center",
                " hover:bg-white/90 bg-white text-black",
                "rounded-full px-8 py-4 text-lg font-medium",
                "transition-all duration-300 hover-lift"
              )}
            >
              {t("workWithUs")} <ArrowRight className="ml-2" size={18} />
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
              {t("caseStudies")}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row justify-center gap-8 mt-20 max-w-4xl mx-auto"
          >
            <div className="p-6 rounded-2xl glass-effect">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 kanit-text">
                400
              </h3>
              <p className="text-white/70">{t("kols")}</p>
            </div>
            <div className="p-6 rounded-2xl glass-effect">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 kanit-text">
                110M+
              </h3>
              <p className="text-white/70">{t("views")}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
