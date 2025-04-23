"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
const OurStorySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  const timelineEvents = [
    {
      year: "2020",
      title: "THE BEGINNING",
      description:
        "Founded with a vision to transform how blockchain projects connect with audiences. Started with a small team of crypto enthusiasts and marketing experts.",
    },
    {
      year: "2021",
      title: "FIRST BREAKTHROUGH",
      description:
        "Onboarded our first major clients and developed our signature KOL strategy framework. Expanded our network to include 50+ key opinion leaders across the industry.",
    },
    {
      year: "2022",
      title: "SCALING OPERATIONS",
      description:
        "Grew our team to 15 specialists and established partnerships with top-tier influencers. Launched our data-driven campaign approach, leading to consistent results.",
    },
    {
      year: "2023",
      title: "GLOBAL EXPANSION",
      description:
        "Expanded operations to serve clients across three continents. Developed proprietary tools for campaign analytics and KOL management. Surpassed 100 successful campaigns.",
    },
    {
      year: "TODAY",
      title: "INDUSTRY LEADERSHIP",
      description:
        "Recognized as the go-to KOL strategy partner for ambitious projects. Our network now includes 250+ influential voices and we've helped our clients achieve over $50M in combined growth.",
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden" id="our-story">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/95" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5" />

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm inline-block px-3 py-1 rounded-full mb-4 bg-white/5 text-white/80 uppercase tracking-widest kanit-text">
              OUR JOURNEY
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 kanit-text text-white">
              THE STORY BEHIND OUR{" "}
              <span className="text-white/80">SUCCESS</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              From humble beginnings to becoming an industry leader, our path
              has been driven by innovation, dedication, and a deep
              understanding of the crypto ecosystem.
            </p>
          </motion.div>

          {/* Main content - Two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left column - Story narrative */}
            <motion.div variants={itemVariants}>
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 kanit-text text-white/90">
                  Our Mission
                </h3>
                <p className="text-white/80 mb-4">
                  We believe that great projects deserve attention. In a crowded
                  and competitive market, connecting with the right audience can
                  mean the difference between obscurity and success.
                </p>
                <p className="text-white/80 mb-4">
                  Our mission is to help innovative blockchain projects build
                  authentic connections with their target communities through
                  strategic KOL partnerships. We don't just drive numbers—we
                  create ecosystems of genuine engagement and sustainable
                  growth.
                </p>
                <p className="text-white/80">
                  What sets us apart is our unique approach: we combine deep
                  industry expertise, data-driven strategy, and genuine
                  relationships with key opinion leaders to deliver results that
                  transcend typical marketing campaigns.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 kanit-text text-white/90">
                  Our Team
                </h3>
                <p className="text-white/80 mb-4">
                  Behind every successful campaign is our diverse team of crypto
                  natives, marketing strategists, data analysts, and creative
                  thinkers. We've brought together specialists who understand
                  both the technical complexities of blockchain and the nuances
                  of effective communication.
                </p>
                <p className="text-white/80">
                  United by our passion for blockchain technology and its
                  potential to transform industries, we approach each project
                  with curiosity, creativity, and a commitment to excellence.
                </p>
              </div>

              <div className="flex space-x-4">
                <a
                  href="#team"
                  className="inline-flex items-center text-sm px-5 py-2.5 bg-white text-black rounded-full kanit-text font-medium hover:bg-white/90 transition-all"
                >
                  MEET OUR TEAM <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center text-sm px-5 py-2.5 border border-white/20 rounded-full kanit-text font-medium hover:bg-white/10 transition-all text-white/90"
                >
                  GET IN TOUCH
                </a>
              </div>
            </motion.div>

            {/* Right column - Timeline */}
            <motion.div variants={itemVariants} className="relative">
              {/* Vertical line */}
              <div className="absolute left-3.5 top-0 bottom-0 w-px bg-white/10" />

              {/* Timeline events */}
              <div className="space-y-10">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={`event-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                    }
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.7 }}
                    className="pl-12 relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 h-7 w-7 rounded-full glass-effect border border-white/20 flex items-center justify-center">
                      <div className="h-2.5 w-2.5 bg-white rounded-full" />
                    </div>

                    <div>
                      <span className="text-sm text-white/50 kanit-text">
                        {event.year}
                      </span>
                      <h4 className="text-xl font-bold mt-1 mb-2 kanit-text text-white/90">
                        {event.title}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Values section */}
          <motion.div variants={itemVariants} className="mt-24">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 kanit-text text-center text-white/90">
              Our Core Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                <h4 className="text-xl font-bold mb-3 kanit-text text-white/90">
                  Authenticity
                </h4>
                <p className="text-white/70">
                  We believe in real relationships and genuine growth. No fake
                  engagement, no inflated metrics – just authentic connections
                  that drive real results.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                <h4 className="text-xl font-bold mb-3 kanit-text text-white/90">
                  Innovation
                </h4>
                <p className="text-white/70">
                  The blockchain space evolves rapidly, and so do we. We
                  constantly refine our strategies and embrace new approaches to
                  stay ahead of the curve.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                <h4 className="text-xl font-bold mb-3 kanit-text text-white/90">
                  Data-Driven
                </h4>
                <p className="text-white/70">
                  While we value intuition, we let data guide our decisions.
                  Every strategy is built on insights, and every campaign is
                  measured with precision.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div variants={itemVariants} className="mt-20 text-center">
            <div className="inline-block max-w-4xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <p className="text-xl text-white/80 italic">
                "Working with this team transformed our approach to community
                building. Their KOL strategy helped us reach audiences we never
                thought possible and created genuine enthusiasm around our
                project."
              </p>
              <div className="mt-6">
                <p className="text-white font-medium kanit-text">
                  Marcelo Cavazzoli{" "}
                </p>
                <p className="text-white/60 text-sm">CEO, Lemoncash</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStorySection;
