// components/Layout/BackgroundLayout.tsx
"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

interface BackgroundLayoutProps {
  children: ReactNode;
  imagePath: string;
  overlayOpacity?: number;
}

export default function BackgroundLayout({
  children,
  imagePath,
  overlayOpacity = 0.7,
}: BackgroundLayoutProps) {
  return (
    <div className="relative min-h-screen">
      {/* Background Image Container */}
      <div className="fixed inset-0 -z-20">
        <Image
          src={imagePath}
          alt="Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay with adjustable opacity */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
