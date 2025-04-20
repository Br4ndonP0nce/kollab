"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Linkedin, Send, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// Navigation links
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#about" },
  { label: "Creators", href: "#kols" },
  { label: "Services", href: "#services" },
];

// Social media links
const socialLinks = [
  {
    platform: "Twitter",
    url: "https://twitter.com/kollabagency",
    icon: <Twitter className="h-5 w-5" />,
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/company/kollabagency",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    platform: "Telegram",
    url: "https://t.me/kollabagency",
    icon: <Send className="h-5 w-5" />,
  },
  {
    platform: "Discord",
    url: "https://discord.gg/kollabagency",
    icon: <MessageSquare className="h-5 w-5" />,
  },
];

// Service links
const serviceLinks = [
  { label: "KOL Marketing", href: "#" },
  { label: "Community Building", href: "#" },
  { label: "Growth Strategy", href: "#" },
  { label: "Campaign Analytics", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-black relative overflow-hidden pt-16 pb-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black to-black/90" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand column */}
            <div>
              <h3 className="text-2xl font-bold mb-6 kanit-text">Kollab</h3>
              <p className="text-white/70 mb-6">
                Connecting projects with influential KOLs to drive authentic
                growth and real market impact.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
                    aria-label={social.platform}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links column */}
            <div>
              <h4 className="text-lg font-semibold mb-6 kanit-text">
                Quick Links
              </h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services column */}
            <div>
              <h4 className="text-lg font-semibold mb-6 kanit-text">
                Services
              </h4>
              <ul className="space-y-4">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h4 className="text-lg font-semibold mb-6 kanit-text">
                Contact Us
              </h4>
              <address className="not-italic text-white/70 space-y-4">
                <p>London, United Kingdom</p>
                <p>
                  <a
                    href="mailto:contact@kollabagency.com"
                    className="hover:text-white transition-colors duration-300"
                  >
                    contact@kollabagency.com
                  </a>
                </p>
              </address>
            </div>
          </div>

          {/* Bottom bar with copyright */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Kollab Agency. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm text-white/50">
              <Link
                href="#"
                className="hover:text-white/80 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-white/80 transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
