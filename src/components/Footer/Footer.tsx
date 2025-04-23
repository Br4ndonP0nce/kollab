"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Linkedin, Send, MessageSquare, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  // Navigation links
  const navLinks = [
    { labelKey: "navHome", href: "#home" },
    { labelKey: "navOurStory", href: "#about" },
    { labelKey: "navCreators", href: "#kols" },
    { labelKey: "navServices", href: "#services" },
  ];

  // Social media links
  const socialLinks = [
    {
      platform: "Telegram",
      url: "https://t.me/Kollabsagency",
      icon: <Send className="h-5 w-5" />,
    },
    {
      platform: "Mail",
      url: "mailto:contact@kollabs.tech",
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  // Service links
  const serviceLinks = [
    { labelKey: "serviceKOL", href: "#" },
    { labelKey: "serviceCommunity", href: "#" },
    { labelKey: "serviceGrowth", href: "#" },
    { labelKey: "serviceAnalytics", href: "#" },
  ];

  return (
    <footer className="bg-black relative overflow-hidden pt-16 pb-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black to-black/90" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand column */}
            <div>
              <h3 className="text-2xl font-bold mb-6 kanit-text text-white/90">
                Kollabs
              </h3>
              <p className="text-white/70 mb-6">{t("footerTagline")}</p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300 text-white/90"
                    aria-label={social.platform}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links column */}
            <div>
              <h4 className="text-lg font-semibold mb-6 kanit-text text-white/90">
                {t("footerQuickLinks")}
              </h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services column */}
            <div>
              <h4 className="text-lg font-semibold mb-6 kanit-text text-white/90">
                {t("footerServices")}
              </h4>
              <ul className="space-y-4">
                {serviceLinks.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h4 className="text-lg font-semibold mb-6 kanit-text text-white/90">
                {t("footerContactUs")}
              </h4>
              <address className="not-italic text-white/70 space-y-4 ">
                <p>{t("footerLocation")}</p>
                <p>
                  <a
                    href="mailto:contact@kollabs.tech"
                    className="hover:text-white transition-colors duration-300"
                  >
                    contact@kollabs.tech
                  </a>
                </p>
              </address>
            </div>
          </div>

          {/* Bottom bar with copyright */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} {t("footerCopyright")}
            </p>
            <div className="flex space-x-6 text-sm text-white/50">
              <Link
                href="#"
                className="hover:text-white/80 transition-colors duration-300"
              >
                {t("footerPrivacy")}
              </Link>
              <Link
                href="#"
                className="hover:text-white/80 transition-colors duration-300"
              >
                {t("footerTerms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
