"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Navigation links
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#about" },
  { label: "Creators", href: "#kols" },
  { label: "Services", href: "#services" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.3 },
    }),
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -10 },
    open: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* Desktop Navbar - Floating at bottom right */}
      <motion.nav
        className={cn(
          "fixed z-50 hidden md:flex",
          "backdrop-blur-md bg-black/80 rounded-full px-4 py-3 shadow-lg",
          "bottom-8 right-8 border-[1px] border-white/60"
        )}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <ul className="flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.label}
              custom={index}
              variants={navItemVariants}
            >
              <Link
                href={link.href}
                className="text-white hover:text-white/80 transition-colors duration-300 font-medium kanit-text"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
          <motion.li custom={navLinks.length} variants={navItemVariants}>
            <Link
              href="#contact"
              className={cn(
                "bg-white text-black hover:bg-white/90",
                "rounded-full px-6 py-2",
                "font-medium transition-colors duration-300",
                "kanit-text"
              )}
            >
              Contact Us
            </Link>
          </motion.li>
        </ul>
      </motion.nav>

      {/* Mobile Navbar - Floating at top center with hamburger */}
      <motion.nav
        className={cn(
          "fixed z-50 flex md:hidden justify-between items-center",
          "backdrop-blur-md bg-black/80 rounded-full px-4 py-2.5 shadow-lg",
          "top-4 left-1/2 -translate-x-1/2",
          "min-w-[200px] border-[1px] border-white/60"
        )}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <Link href="/" className="text-lg font-bold kanit-text text-white/90">
          Kollab
        </Link>
        <button
          onClick={toggleMenu}
          className="p-2 text-white hover:text-white/80 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <ul className="flex flex-col items-center space-y-6">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={link.href}
                    className="text-white text-2xl hover:text-white/80 transition-colors font-medium kanit-text"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                custom={navLinks.length}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href="#contact"
                  onClick={toggleMenu}
                  className={cn(
                    "bg-white text-black hover:bg-white/90",
                    "rounded-full px-8 py-4 text-lg",
                    "font-medium transition-colors duration-300 mt-4 inline-block",
                    "kanit-text"
                  )}
                >
                  Contact Us
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
