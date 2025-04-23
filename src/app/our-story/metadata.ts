// src/app/our-story/metadata.ts
import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata(
  "Our Story", 
  "Learn about Kollabs journey from humble beginnings to becoming a leading KOL marketing agency in the blockchain space."
);