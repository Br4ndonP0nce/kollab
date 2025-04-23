"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Send,
  MessageSquare,
  ArrowRight,
  Mail,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
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

const ContactSection = () => {
  const { t } = useLanguage();
  // Form submission handler (mock for demo)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log("Form submitted");
    // Show success message or toast notification
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black to-black/95" />

      {/* Animated background pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 grid-background"
      />

      {/* Content container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-semibold text-white/60 uppercase tracking-wider kanit-text">
              {t("contactMiniTitle")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 kanit-text  text-white/90">
              {t("contactTitle")}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {t("contactDescription")}
            </p>
          </motion.div>

          {/* Two-column layout for form and contact info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left column: Contact info and socials */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 kanit-text  text-white/90">
                  {t("modalTitle")}
                </h3>

                {/* Contact details */}
                <div className="space-y-6 mb-10">
                  <div className="flex items-start">
                    <div className="p-2 bg-white/10 rounded-full mr-4 text-white/90">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 kanit-text  text-white/90">
                        Email
                      </h4>
                      <p className="text-white/70">contact@kollabs.tech</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 bg-white/10 rounded-full mr-4  text-white/90">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 kanit-text  text-white/90">
                        Headquarters
                      </h4>
                      <p className="text-white/70">Dubai, UAE</p>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <div>
                  <h4 className="font-medium mb-4 kanit-text  text-white/90">
                    {t("Follow")}
                  </h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300 text-white/90"
                        aria-label={social.platform}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right column: Contact form */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 kanit-text  text-white/90">
                  {t("formTitle")}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-white/80 kanit-text"
                    >
                      {t("formName")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-lg",
                        "bg-white/10 border border-white/20",
                        "text-white placeholder:text-white/40",
                        "focus:outline-none focus:ring-1 focus:ring-white/30",
                        "transition duration-200"
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-white/80 kanit-text"
                    >
                      {t("formEmail")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-lg",
                        "bg-white/10 border border-white/20",
                        "text-white placeholder:text-white/40",
                        "focus:outline-none focus:ring-1 focus:ring-white/30",
                        "transition duration-200"
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="projectName"
                      className="text-sm font-medium text-white/80 kanit-text"
                    >
                      {t("formProject")}
                    </label>
                    <input
                      id="projectName"
                      name="projectName"
                      type="text"
                      placeholder="Enter your project name"
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-lg",
                        "bg-white/10 border border-white/20",
                        "text-white placeholder:text-white/40",
                        "focus:outline-none focus:ring-1 focus:ring-white/30",
                        "transition duration-200"
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-white/80 kanit-text"
                    >
                      {t("formMessageTitle")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder={t("formMessage")}
                      required
                      rows={5}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg",
                        "bg-white/10 border border-white/20",
                        "text-white placeholder:text-white/40",
                        "focus:outline-none focus:ring-1 focus:ring-white/30",
                        "resize-none transition duration-200"
                      )}
                    />
                  </div>

                  <button
                    type="submit"
                    className={cn(
                      "w-full flex items-center justify-center",
                      "bg-white text-black hover:bg-white/90",
                      "rounded-full py-4 px-6",
                      "font-medium text-lg kanit-text",
                      "transition-colors duration-300 hover-lift"
                    )}
                  >
                    {t("formButton")} <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
