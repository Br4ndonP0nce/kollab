import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Footer/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["100", "300", "400", "500", "700"],
});
export const metadata: Metadata = {
  title: "Kollab Agency - Premium KOL Marketing Solutions",
  description:
    "Connecting projects with top-tier KOLs and influencers through organic approaches for maximum growth and market impact.",
  keywords:
    "KOL marketing, influencer marketing, crypto marketing, blockchain marketing, web3 marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
