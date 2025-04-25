"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Generate grid items - create a 10x10 grid for more dramatic effect
  const gridItems = Array.from({ length: 100 }, (_, i) => (
    <motion.div
      key={i}
      className="h-8 w-8 bg-white/5 rounded-sm"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: i * 0.01, // Faster ripple effect
      }}
    />
  ));

  if (!loading) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5, delay: 0.2 },
      }}
    >
      {/* Background animated elements */}
      <motion.div
        className="absolute top-1/4 right-[15%] w-64 h-64 rounded-full bg-white/5 blur-3xl"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[10%] w-96 h-96 rounded-full bg-white/5 blur-3xl"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="relative">
        {/* Grid animation */}
        <div className="grid grid-cols-10 gap-1 opacity-20">{gridItems}</div>

        {/* Centered content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Logo animation */}
            <motion.h1
              className="text-6xl font-bold text-white mb-4 kanit-text tracking-wider"
              animate={{
                opacity: [0.8, 1, 0.8],
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 10px rgba(255,255,255,0.5)",
                  "0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              KOLLABS
            </motion.h1>

            {/* Animated tagline */}
            <motion.p
              className="text-white/50 text-sm uppercase tracking-widest mb-6"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              MARKETING SOLUTIONS
            </motion.p>

            {/* Stats animation - bullish indicators */}
            <div className="flex space-x-6 justify-center mb-8">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.span
                  className="text-xl font-bold text-white kanit-text"
                  animate={{
                    scale: [1, 1.1, 1],
                    color: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.span
                    animate={{
                      opacity: [0, 1],
                      y: [10, 0],
                    }}
                    transition={{
                      duration: 2,
                      times: [0, 1],
                      repeat: 0,
                    }}
                  >
                    400+
                  </motion.span>
                </motion.span>
                <span className="text-xs text-white/50 uppercase tracking-wider">
                  KOLs
                </span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span
                  className="text-xl font-bold text-white kanit-text"
                  animate={{
                    scale: [1, 1.1, 1],
                    color: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  <motion.span
                    animate={{
                      opacity: [0, 1],
                      y: [10, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      times: [0, 1],
                      repeat: 0,
                    }}
                  >
                    110M+
                  </motion.span>
                </motion.span>
                <span className="text-xs text-white/50 uppercase tracking-wider">
                  VIEWS
                </span>
              </motion.div>
            </div>

            {/* Loading bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-white/50 via-white to-white/50"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2.2,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="mt-4 text-xs text-white/40 uppercase tracking-wider"
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              LAUNCHING
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Market chart line animation */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 h-20 overflow-hidden opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 C150,20 250,80 350,50 C450,20 550,70 650,40 C750,10 850,50 1000,10"
            stroke="white"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,50 C150,20 250,80 350,50 C450,20 550,70 650,40 C750,10 850,50 1000,10"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.5, 0],
              y: [0, -5],
            }}
            transition={{
              duration: 2,
              times: [0, 1],
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
