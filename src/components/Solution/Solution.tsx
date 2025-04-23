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

const SolutionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: <Network className="h-8 w-8" />,
      title: "Extensive Network",
      description:
        "Access to 250+ vetted KOLs and influencers across major platforms with genuine engaged audiences.",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data-Driven Approach",
      description:
        "Performance analytics and metrics to optimize campaigns and maximize ROI through strategic insights.",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth Strategy",
      description:
        "Tailored marketing solutions designed to boost visibility, engagement, and market capitalization.",
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Industry Expertise",
      description:
        "Specialized knowledge in blockchain, crypto, and Web3 to effectively position your project.",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Performance Tracking",
      description:
        "Real-time campaign monitoring with comprehensive reporting on key performance indicators.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Building",
      description:
        "Strategies to foster loyal communities around your project for sustainable long-term growth.",
    },
  ];

  return (
    <section
      id="services"
      className="py-16 pb-0 bg-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 grid-background opacity-5"
        style={{ y, opacity }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-white/60 uppercase tracking-wider kanit-text">
              Our Approach
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 kanit-text  text-white/90">
              Kollabs
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We combine strategic expertise, data analytics, and an exclusive
              network of influential creators to deliver measurable growth for
              your project.
            </p>
          </div>

          {/* Features grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.1 * index,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover-lift"
              >
                <div className="p-3 bg-white/10 rounded-xl inline-flex mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 kanit-text  text-white/90">
                  {feature.title}
                </h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action */}
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
                Elevate Your Project with Kollabs
              </a>
            </div>
            <p className="text-white/60 mt-6 max-w-lg mx-auto">
              Our unique methodologies have consistently delivered exceptional
              results across various market conditions. Experience the Kollabs
              difference.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
