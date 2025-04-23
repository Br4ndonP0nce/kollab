// src/app/our-story/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Kollabs Premium KOL Marketing Solutions",
  description:
    "Learn about Kollabs journey from humble beginnings to becoming a leading KOL marketing agency in the blockchain and Web3 space.",
  keywords:
    "Kollabs history, crypto marketing agency, KOL marketing experts, Web3 marketing team, blockchain influencer agency history",
  openGraph: {
    title: "Our Story | Kollabs KOL Marketing Solutions",
    description:
      "From our founding to industry leadership: Learn how Kollabs became the leading KOL marketing agency in the blockchain space.",
    images: [
      {
        url: "/Image/og-image-story.png", // Make sure to create this image
        width: 1000,
        height: 525,
        alt: "Kollabs - Our Story",
      },
    ],
  },
};

export default function OurStoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
