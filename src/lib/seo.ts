// Create a new file: src/lib/seo.ts
export const defaultMetadata = {
  title: "Kollabs Premium KOL Marketing Solutions",
  description: "Connecting projects with top-tier KOLs and influencers through organic approaches for maximum growth and market impact in the blockchain and Web3 space.",
  keywords: "KOL marketing, crypto influencers, blockchain marketing, Web3 promotion, influencer strategy, crypto growth, DeFi marketing",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kollabs.tech',
    siteName: 'Kollabs',
    images: [
      {
        url: '/Image/og-image.png',
        width: 1000,
        height: 525,
        alt: 'Kollabs - Premium KOL Marketing Solutions',
      },
    ],
  },

}

// Function to generate page-specific metadata
export function generateMetadata(pageTitle: string, pageDescription?: string) {
  return {
    ...defaultMetadata,
    title: `${pageTitle} | Kollabs`,
    description: pageDescription || defaultMetadata.description,
  }
}