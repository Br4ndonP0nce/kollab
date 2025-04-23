"use client";

import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Zap,
  Award,
  Target,
  ArrowUp,
  Clock,
  DollarSign,
} from "lucide-react";
import CountUp from "react-countup";

// Campaign data
const campaignData = [
  {
    id: "botify",
    name: "BOTIFY",
    description: "COMPREHENSIVE KOL CAMPAIGN",
    highlight: "18M → 61M MARKETCAP",
    narrative:
      "Kollabs stepped in as Botify's strategic advisor to help execute their growth campaign. We handpicked and onboarded 20 key KOLs, alongside designing a tokenomics model that incentivized long-term holding. Through targeted exposure, Botify saw its marketcap surge from $18M to $61M, a 239% increase in just 45 days.",
    metrics: [
      {
        label: "KOLS ONBOARDED",
        value: 20,
        prefix: "",
        suffix: "",
        icon: <Target className="h-5 w-5" />,
        color: "bg-white/10",
      },
      {
        label: "PRICE INCREASE",
        value: 300,
        prefix: "",
        suffix: "%",
        icon: <TrendingUp className="h-5 w-5" />,
        color: "bg-white/10",
      },
      {
        label: "MARKETCAP GROWTH",
        value: 338,
        prefix: "+",
        suffix: "%",
        icon: <BarChart3 className="h-5 w-5" />,
        color: "bg-white/10",
        calculation: "From $18M to $61M",
      },
      {
        label: "TOTAL VIEWS",
        value: 1.2,
        prefix: "",
        suffix: "M",
        icon: <Zap className="h-5 w-5" />,
        color: "bg-white/10",
      },
    ],
    background: "bg-[url('/gradient-1.webp')]",
  },
  {
    id: "altura",
    name: "ALTURA",
    description: "TIER 1 TARGETED KOL CAMPAIGN",
    highlight: "+126M MARKETCAP IN 2 WEEKS",
    narrative:
      "Altura partnered with our team to execute a hyper-targeted Tier 1 KOL campaign. We strategically selected 6 premium influencers with highly engaged communities in the NFT and gaming sectors. The coordinated content rollout drove incredible momentum, resulting in a 126% price increase in just 10 days and 2.6M views across platforms.",
    metrics: [
      {
        label: "TIER 1 KOLS",
        value: 6,
        prefix: "",
        suffix: "",
        icon: <Award className="h-5 w-5" />,
        color: "bg-white/10",
      },
      {
        label: "MARKETCAP INCREASE",
        value: 126,
        prefix: "",
        suffix: "M",
        icon: <TrendingUp className="h-5 w-5" />,
        color: "bg-white/10",
        calculation: "In just 10 days",
      },
      {
        label: "TOTAL VIEWS",
        value: 2.6,
        prefix: "",
        suffix: "M",
        icon: <Zap className="h-5 w-5" />,
        color: "bg-white/10",
      },
    ],
    background: "bg-[url('/gradient-2.webp')]",
  },
  {
    id: "lemoncash",
    name: "LEMON CASH",
    description: "REGIONAL EXPANSION CAMPAIGN",
    highlight: "150K → 400K ACTIVE USERS",
    narrative:
      "Kollabs stepped in as Lemon Cash's strategic advisor for their regional expansion. We handpicked and onboarded 45+ regional KOLs to target specific demographics and communities. Through this systematic approach, we were able to drive 150,000 new users in just two weeks. The campaign's momentum continued, helping Lemon Cash grow to over 400,000 active users in the region.",
    metrics: [
      {
        label: "NEW USERS",
        value: 150,
        prefix: "",
        suffix: "K",
        icon: <Target className="h-5 w-5" />,
        color: "bg-white/10",
        calculation: "In just two weeks",
      },
      {
        label: "REGIONAL KOLS",
        value: 45,
        prefix: "",
        suffix: "+",
        icon: <Award className="h-5 w-5" />,
        color: "bg-white/10",
      },
      {
        label: "CURRENT USERS",
        value: 400,
        prefix: "",
        suffix: "K+",
        icon: <BarChart3 className="h-5 w-5" />,
        color: "bg-white/10",
        calculation: "In the targeted region",
      },
    ],
    background: "bg-[url('/gradient-3.webp')]",
  },
];

const StackedHardDataSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.98, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.15,
      },
    }),
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
          className="max-w-5xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm inline-block px-3 py-1 rounded-full mb-4 bg-white/5 text-white/80 uppercase tracking-widest kanit-text">
              VERIFIED GROWTH
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 kanit-text text-white">
              RESULTS THAT <span className="text-white/80">SPEAK VOLUMES</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Our strategies don't just promise growth — they deliver tangible,
              market-moving outcomes that transform projects.
            </p>
          </motion.div>

          {/* Stacked project cards */}
          <div className="space-y-8">
            {campaignData.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={`relative rounded-xl overflow-hidden ${campaign.background} bg-cover bg-center`}
              >
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />

                <div className="relative z-10 px-5 py-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Campaign highlight and narrative */}
                    <div className="w-full md:w-2/5 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start mb-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs kanit-text tracking-wider">
                          {campaign.name}
                        </span>
                      </div>

                      <span className="text-sm text-white/60 kanit-text">
                        {campaign.description}
                      </span>

                      <h3 className="text-2xl md:text-3xl font-bold my-3 kanit-text text-white">
                        {campaign.highlight}
                      </h3>

                      <p className="text-sm md:text-base text-white/70 mb-4">
                        {campaign.narrative}
                      </p>

                      <a
                        href="#contact"
                        className="inline-flex items-center text-sm px-4 py-2 mt-3 bg-white text-black rounded-full kanit-text font-medium hover:bg-white/90 transition-all"
                      >
                        GET SIMILAR RESULTS{" "}
                        <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                      </a>
                    </div>

                    {/* Metrics cards */}
                    <div className="w-full md:w-3/5">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {campaign.metrics.map((metric, idx) => (
                          <motion.div
                            key={`${campaign.id}-metric-${idx}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="bg-black/50 backdrop-blur-md border border-white/10 rounded-lg p-3 md:p-4 hover:bg-black/60 transition-all group"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs text-white/60 kanit-text">
                                {metric.label}
                              </span>
                              <div
                                className={`p-1.5 rounded-full ${metric.color} group-hover:bg-white/20 transition-all`}
                              >
                                {metric.icon}
                              </div>
                            </div>

                            <div className="flex items-baseline space-x-0.5">
                              {metric.prefix && (
                                <span className="text-xl md:text-2xl font-bold kanit-text text-white">
                                  {metric.prefix}
                                </span>
                              )}
                              <span className="text-2xl md:text-3xl font-bold kanit-text text-white">
                                <CountUp
                                  end={metric.value}
                                  duration={2}
                                  decimals={metric.suffix === "M" ? 1 : 0}
                                  separator=","
                                />
                              </span>
                              {metric.suffix && (
                                <span className="text-xl md:text-2xl font-bold kanit-text text-white">
                                  {metric.suffix}
                                </span>
                              )}
                            </div>

                            {metric.calculation && (
                              <div className="mt-1 text-xs text-white/60 flex items-center">
                                <ArrowUp className="h-2.5 w-2.5 mr-1 text-white/40" />
                                {metric.calculation}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom testimonial */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl max-w-3xl">
              <p className="text-white/80 italic text-sm">
                "The KOL campaigns created unprecedented momentum and market
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

export default StackedHardDataSection;
