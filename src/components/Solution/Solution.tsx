"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  TrendingUp,
  Network,
  Database,
  Layers,
  BarChart,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const SolutionSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Define the features with translation keys instead of direct text
  const featureData = [
    {
      icon: <Network className="h-8 w-8" />,
      titleKey: "extensiveNetwork",
      descriptionKey: "blockOneDescription",
    },
    {
      icon: <Database className="h-8 w-8" />,
      titleKey: "blockTwoTitle",
      descriptionKey: "blockTwoDescription",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      titleKey: "blockThreeTitle",
      descriptionKey: "blockThreeDescription",
    },
    {
      icon: <Layers className="h-8 w-8" />,
      titleKey: "blockFourTitle",
      descriptionKey: "blockFourDescription",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      titleKey: "blockFiveTitle",
      descriptionKey: "blockFiveDescription",
    },
    {
      icon: <Users className="h-8 w-8" />,
      titleKey: "blockSixTitle",
      descriptionKey: "blockSixDescription",
    },
  ];

  return (
    <section
      id="services"
      className="py-16 pb-0 bg-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      {/* Dynamic glow effects */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-white/5 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full bg-white/5 blur-[120px] animate-pulse-slow animation-delay-1000"></div>

      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 grid-background opacity-5"
        style={{ y, opacity }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Section header with animated text */}
          <div className="text-center mb-16">
            <motion.span
              className="text-sm font-semibold text-white/60 uppercase tracking-wider kanit-text inline-block"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t("miniTitle")}
            </motion.span>

            <motion.h2
              className="text-4xl md:text-5xl font-bold mt-2 mb-4 kanit-text text-white/90 relative shimmer-title"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Kollabs
              <span className="absolute -inset-1 bg-gradient-radial from-white/10 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
            </motion.h2>

            <motion.p
              className="text-xl text-white/80 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("solutionDescription")}
            </motion.p>
          </div>

          {/* Features grid with staggered animation */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {featureData.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.1,
                  },
                }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 30px -10px rgba(255,255,255,0.1)",
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-8 border border-white/10 transition-all duration-300 group card-glow"
              >
                {/* Icon with shimmer effect */}
                <div className="p-3 bg-gradient-to-br from-white/20 to-white/5 rounded-xl inline-flex mb-6 text-white relative icon-shine overflow-hidden">
                  {feature.icon}
                  <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pulse-animation"></div>
                </div>

                {/* Title with gradient effect on hover */}
                <h3 className="text-xl font-bold mb-3 kanit-text text-white/90 group-hover:text-gradient-gold transition-all duration-500">
                  {t(feature.titleKey)}
                </h3>

                {/* Description with fade-in effect */}
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-500">
                  {t(feature.descriptionKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action with glow effect */}
          <motion.div
            className="mt-16 pb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/40 rounded-full blur-md"></div>
              <a
                href="#contact"
                className={cn(
                  "relative bg-white text-black",
                  "px-8 py-4 rounded-full font-medium",
                  "hover:bg-white/90 transition-colors",
                  "inline-block kanit-text"
                )}
              >
                {t("solutionButton")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
