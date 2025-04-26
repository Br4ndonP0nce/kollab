"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "../LanguageSelector";

// Navigation links
const navLinks = [
  { labelKey: "navHome", href: "/" },
  { labelKey: "navOurStory", href: "/our-story" },
  { labelKey: "navCreators", href: "/#creators" },
  { labelKey: "navServices", href: "/#services" },
];

const ClassicNavbar = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants
  const navbarVariants = {
    initial: { y: -100 },
    animate: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const scrolledNavbarVariants = {
    notScrolled: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(8px)",
      height: "80px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    scrolled: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      backdropFilter: "blur(12px)",
      height: "70px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <>
      {/* Desktop Navbar - Classic Sticky Top Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 w-full"
        initial="initial"
        animate="animate"
        variants={navbarVariants}
      >
        <motion.nav
          className="flex items-center justify-between px-6 md:px-12 lg:px-20 transition-all duration-300"
          initial="notScrolled"
          animate={isScrolled ? "scrolled" : "notScrolled"}
          variants={scrolledNavbarVariants}
        >
          {/* Logo */}
          <Link href="/" className="py-4">
            <span className="text-4xl font-bold text-white kanit-text">
              KOLLABS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.labelKey}
                href={link.href}
                className="text-white hover:text-white/80 transition-all duration-300 font-medium kanit-text relative group"
              >
                {t(link.labelKey)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              href="#contact"
              className={cn(
                "bg-white text-black hover:bg-white/90",
                "rounded-full px-5 py-2",
                "font-medium transition-colors duration-300",
                "kanit-text"
              )}
            >
              {t("navContact")}
            </Link>
            {/*<LanguageSelector />*/}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center md:hidden pt-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center space-y-6 w-full px-12">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.labelKey}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.1 * index, duration: 0.3 },
                  }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    className="text-white text-xl hover:text-white/80 transition-colors font-medium kanit-text block py-2"
                    onClick={toggleMenu}
                  >
                    {t(link.labelKey)}
                  </Link>
                  <div className="h-px w-full bg-white/20 mt-6"></div>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.1 * navLinks.length, duration: 0.3 },
                }}
              >
                <Link
                  href="#contact"
                  onClick={toggleMenu}
                  className={cn(
                    "bg-white text-black hover:bg-white/90",
                    "rounded-full px-8 py-3",
                    "font-medium transition-colors duration-300 mt-4 inline-block",
                    "kanit-text"
                  )}
                >
                  {t("navContact")}
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.1 * (navLinks.length + 1),
                    duration: 0.3,
                  },
                }}
              ></motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClassicNavbar;
