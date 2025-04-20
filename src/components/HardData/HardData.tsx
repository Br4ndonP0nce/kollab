"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowUpRight, LineChart, ArrowUp, Users, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample case studies data - replace with actual data
const caseStudies = [
  {
    id: "botify",
    name: "Botify",
    description: "Comprehensive KOL campaign",
    metrics: [
      {
        label: "KOLs Onboarded",
        value: 20,
        icon: <Users className="h-5 w-5" />,
      },
      {
        label: "Price Increase",
        value: "300%",
        icon: <ArrowUp className="h-5 w-5" />,
      },
      {
        label: "MarketCap Growth",
        value: "From $18M to $61M",
        icon: <ArrowUp className="h-5 w-5" />,
      },
      {
        label: "Total Views",
        value: "1.2M",
        icon: <Eye className="h-5 w-5" />,
      },
    ],
    image: "/case-studies/botify.jpg",
  },
  {
    id: "altura",
    name: "Altura",
    description: "Targeted tier 1 KOL campaign",
    metrics: [
      { label: "Tier 1 KOLs", value: 6, icon: <Users className="h-5 w-5" /> },
      {
        label: "Price Increase",
        value: "126% in 10 days",
        icon: <ArrowUp className="h-5 w-5" />,
      },
      {
        label: "Total Views",
        value: "2.6M",
        icon: <Eye className="h-5 w-5" />,
      },
    ],
    image: "/case-studies/altura.jpg",
  },
  {
    id: "project3",
    name: "Project X",
    description: "Strategic influencer outreach",
    metrics: [
      { label: "KOLs Engaged", value: 15, icon: <Users className="h-5 w-5" /> },
      {
        label: "User Growth",
        value: "215%",
        icon: <ArrowUp className="h-5 w-5" />,
      },
      {
        label: "Engagement Rate",
        value: "38%",
        icon: <LineChart className="h-5 w-5" />,
      },
      {
        label: "Total Views",
        value: "3.7M",
        icon: <Eye className="h-5 w-5" />,
      },
    ],
    image: "/case-studies/project3.jpg",
  },
];

const HardDataSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeCase, setActiveCase] = useState(caseStudies[0].id);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const getActiveCaseData = () => {
    return caseStudies.find((cs) => cs.id === activeCase) || caseStudies[0];
  };

  return (
    <section
      id="case-studies"
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black to-black/90" />
      <div className="absolute inset-0 grid-background opacity-5" />

      {/* Content container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-semibold text-white/60 uppercase tracking-wider kanit-text">
              Proven Results
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 kanit-text  text-white/90">
              Hard Data. Real Growth.
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our campaigns deliver measurable outcomes that speak for
              themselves. Navigate through our case studies to see the impact.
            </p>
          </motion.div>

          {/* Case study navigation */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 md:gap-4 justify-center mb-16"
          >
            {caseStudies.map((cs) => (
              <button
                key={cs.id}
                onClick={() => setActiveCase(cs.id)}
                className={cn(
                  "px-6 py-3 rounded-full transition-all duration-300",
                  "kanit-text",
                  activeCase === cs.id
                    ? "bg-white text-black font-medium"
                    : "glass-effect text-white/80 hover:bg-white/20"
                )}
              >
                {cs.name}
              </button>
            ))}
          </motion.div>

          {/* Main content - concept map visualization */}
          <motion.div
            variants={itemVariants}
            className="relative glass-effect rounded-3xl p-6 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side: Project info */}
              <div>
                <h3 className="text-3xl font-bold mb-2 kanit-text">
                  {getActiveCaseData().name}
                </h3>
                <p className="text-white/70 mb-6">
                  {getActiveCaseData().description}
                </p>

                {/* Metric cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getActiveCaseData().metrics.map((metric, index) => (
                    <motion.div
                      key={`${activeCase}-metric-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <div className="glass-effect hover:bg-white/15 transition-all duration-300 rounded-xl">
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white/60 text-sm kanit-text">
                              {metric.label}
                            </span>
                            <span className="p-1 rounded-full bg-white/20">
                              {metric.icon}
                            </span>
                          </div>
                          <div className="text-2xl font-bold kanit-text">
                            {metric.value}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right side: Mind map visualization */}
              <div className="min-h-[400px] relative hidden lg:block">
                {/* Central node */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full glass-effect flex items-center justify-center text-center p-2 z-20 border border-white/20"
                  variants={nodeVariants}
                >
                  <div>
                    <div className="font-bold text-lg kanit-text">
                      {getActiveCaseData().name}
                    </div>
                    <div className="text-xs text-white/60">Campaign Impact</div>
                  </div>
                </motion.div>

                {/* SVG for connections */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 400"
                >
                  {/* Connection lines */}
                  <motion.path
                    d="M200,200 L100,80"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                    variants={lineVariants}
                  />
                  <motion.path
                    d="M200,200 L300,80"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                    variants={lineVariants}
                  />
                  <motion.path
                    d="M200,200 L80,220"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                    variants={lineVariants}
                  />
                  <motion.path
                    d="M200,200 L320,220"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                    variants={lineVariants}
                  />
                  <motion.path
                    d="M200,200 L150,330"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                    variants={lineVariants}
                  />
                  <motion.path
                    d="M200,200 L250,330"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                    variants={lineVariants}
                  />
                </svg>

                {/* Satellite nodes */}
                {getActiveCaseData().metrics.map((metric, index) => {
                  // Calculate position based on index
                  let posX = 0;
                  let posY = 0;

                  switch (index % 6) {
                    case 0:
                      posX = 100;
                      posY = 80;
                      break;
                    case 1:
                      posX = 300;
                      posY = 80;
                      break;
                    case 2:
                      posX = 80;
                      posY = 220;
                      break;
                    case 3:
                      posX = 320;
                      posY = 220;
                      break;
                    case 4:
                      posX = 150;
                      posY = 330;
                      break;
                    case 5:
                      posX = 250;
                      posY = 330;
                      break;
                  }

                  return (
                    <motion.div
                      key={`node-${index}`}
                      className="absolute w-24 h-24 rounded-full glass-effect flex items-center justify-center text-center p-1 shadow-lg border border-white/10"
                      style={{ left: `${posX}px`, top: `${posY}px` }}
                      variants={nodeVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div>
                        <div className="text-sm kanit-text">{metric.label}</div>
                        <div className="font-bold text-base kanit-text">
                          {metric.value}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div className="mt-10 text-center" variants={itemVariants}>
              <a
                href="#contact"
                className="inline-flex items-center text-white font-medium hover:text-white/80 transition-colors kanit-text"
              >
                Ready to achieve similar results?{" "}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HardDataSection;
