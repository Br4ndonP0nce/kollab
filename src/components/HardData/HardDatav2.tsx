"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Zap,
  Award,
  Target,
  ArrowUp,
} from "lucide-react";
import CountUp from "react-countup";

// Campaign data
const campaignData = [
  {
    id: "botify",
    name: "BOTIFY",
    description: "COMPREHENSIVE KOL CAMPAIGN",
    highlight: "18M → 61M MARKETCAP",
    metrics: [
      {
        label: "KOLS ONBOARDED",
        value: 20,
        prefix: "",
        suffix: "",
        icon: <Target className="h-6 w-6" />,
        color: "bg-white/10",
      },
      {
        label: "PRICE INCREASE",
        value: 300,
        prefix: "",
        suffix: "%",
        icon: <TrendingUp className="h-6 w-6" />,
        color: "bg-white/10",
      },
      {
        label: "MARKETCAP GROWTH",
        value: 239,
        prefix: "+",
        suffix: "%",
        icon: <BarChart3 className="h-6 w-6" />,
        color: "bg-white/10",
        calculation: "From $18M to $61M",
      },
      {
        label: "TOTAL VIEWS",
        value: 1.2,
        prefix: "",
        suffix: "M",
        icon: <Zap className="h-6 w-6" />,
        color: "bg-white/10",
      },
    ],
    background: "bg-[url('/gradient-1.webp')]",
  },
  {
    id: "altura",
    name: "ALTURA",
    description: "TIER 1 TARGETED KOL CAMPAIGN",
    highlight: "126% IN JUST 10 DAYS",
    metrics: [
      {
        label: "TIER 1 KOLS",
        value: 6,
        prefix: "",
        suffix: "",
        icon: <Award className="h-6 w-6" />,
        color: "bg-white/10",
      },
      {
        label: "PRICE INCREASE",
        value: 126,
        prefix: "",
        suffix: "%",
        icon: <TrendingUp className="h-6 w-6" />,
        color: "bg-white/10",
        calculation: "In just 10 days",
      },
      {
        label: "TOTAL VIEWS",
        value: 2.6,
        prefix: "",
        suffix: "M",
        icon: <Zap className="h-6 w-6" />,
        color: "bg-white/10",
      },
    ],
    background: "bg-[url('/gradient-2.webp')]",
  },
];

const EpicHardDataSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleCampaignChange = (index: number) => {
    if (index === activeIndex) return;
    setIsChanging(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsChanging(false);
    }, 500); // Match with exit animation duration
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden" id="results">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/95" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5" />

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm inline-block px-3 py-1 rounded-full mb-4 bg-white/5 text-white/80 uppercase tracking-widest kanit-text">
              VERIFIED GROWTH
            </span>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 kanit-text text-white">
              RESULTS THAT <span className="text-white/80">SPEAK VOLUMES</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Our strategies don't just promise growth — they deliver tangible,
              market-moving outcomes that transform projects.
            </p>
          </motion.div>

          {/* Campaign selector */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 mb-12"
          >
            {campaignData.map((campaign, index) => (
              <button
                key={campaign.id}
                onClick={() => handleCampaignChange(index)}
                className={`px-6 py-3 rounded-full transition-all duration-300 kanit-text text-sm md:text-base
                ${
                  activeIndex === index
                    ? "bg-white text-black"
                    : "border border-white/20 text-white/80 hover:bg-white/10"
                }`}
              >
                {campaign.name}
              </button>
            ))}
          </motion.div>

          {/* Main display */}
          <AnimatePresence mode="wait">
            {!isChanging && (
              <motion.div
                key={`campaign-${activeIndex}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`relative rounded-2xl overflow-hidden ${campaignData[activeIndex].background} bg-cover bg-center`}
              >
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />

                <div className="relative z-10 px-6 py-16 md:p-16">
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    {/* Campaign highlight */}
                    <div className="w-full md:w-2/5 text-center md:text-left">
                      <span className="inline-block px-3 py-1 mb-3 rounded-full bg-white/10 text-white/80 text-xs kanit-text tracking-wider">
                        {campaignData[activeIndex].description}
                      </span>

                      <h3 className="text-3xl md:text-5xl font-bold mb-6 kanit-text text-white">
                        {campaignData[activeIndex].highlight}
                      </h3>

                      <p className="text-white/70 mb-8">
                        Unprecedented growth delivered through strategic KOL
                        partnerships and targeted market positioning.
                      </p>

                      <a
                        href="#contact"
                        className="inline-flex items-center px-5 py-3 bg-white text-black rounded-full kanit-text font-medium hover:bg-white/90 transition-all"
                      >
                        GET SIMILAR RESULTS{" "}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>

                    {/* Metrics cards */}
                    <div className="w-full md:w-3/5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {campaignData[activeIndex].metrics.map(
                          (metric, index) => (
                            <motion.div
                              key={`metric-${index}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                              className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/60 transition-all group"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <span className="text-sm text-white/60 kanit-text">
                                  {metric.label}
                                </span>
                                <div
                                  className={`p-2 rounded-full ${metric.color} group-hover:bg-white/20 transition-all`}
                                >
                                  {metric.icon}
                                </div>
                              </div>

                              <div className="flex items-baseline space-x-1">
                                {metric.prefix && (
                                  <span className="text-3xl font-bold kanit-text text-white">
                                    {metric.prefix}
                                  </span>
                                )}
                                <span className="text-4xl md:text-5xl font-bold kanit-text text-white">
                                  <CountUp
                                    end={metric.value}
                                    duration={2.5}
                                    decimals={metric.suffix === "M" ? 1 : 0}
                                    separator=","
                                  />
                                </span>
                                {metric.suffix && (
                                  <span className="text-3xl font-bold kanit-text text-white">
                                    {metric.suffix}
                                  </span>
                                )}
                              </div>

                              {metric.calculation && (
                                <div className="mt-2 text-sm text-white/60 flex items-center">
                                  <ArrowUp className="h-3 w-3 mr-1 text-white/40" />
                                  {metric.calculation}
                                </div>
                              )}
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom testimonial */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl max-w-3xl">
              <p className="text-white/80 italic">
                "The KOL campaign created unprecedented momentum and market
                interest. We saw immediate impact across all our growth
                metrics."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EpicHardDataSection;
