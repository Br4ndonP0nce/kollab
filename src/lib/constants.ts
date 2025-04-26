// src/lib/constants.ts

// Client logos - replace URLs with actual client logos
export const clientLogos = [
  { name: 'Client 1', logo: '/clients/client1.svg' },
  { name: 'Client 2', logo: '/clients/client2.svg' },
  { name: 'Client 3', logo: '/clients/client3.svg' },
  { name: 'Client 4', logo: '/clients/client4.svg' },
  { name: 'Client 5', logo: '/clients/client5.svg' },
  { name: 'Client 6', logo: '/clients/client6.svg' },
  { name: 'Client 7', logo: '/clients/client7.svg' },
  { name: 'Client 8', logo: '/clients/client8.svg' },
  { name: 'Client 9', logo: '/clients/client9.svg' },
  { name: 'Client 10', logo: '/clients/client10.svg' },
];

// Duplicate for second row
export const clientLogos2 = [
  { name: 'Client 11', logo: '/clients/client11.svg' },
  { name: 'Client 12', logo: '/clients/client12.svg' },
  { name: 'Client 13', logo: '/clients/client13.svg' },
  { name: 'Client 14', logo: '/clients/client14.svg' },
  { name: 'Client 15', logo: '/clients/client15.svg' },
  { name: 'Client 16', logo: '/clients/client16.svg' },
  { name: 'Client 17', logo: '/clients/client17.svg' },
  { name: 'Client 18', logo: '/clients/client18.svg' },
  { name: 'Client 19', logo: '/clients/client19.svg' },
  { name: 'Client 20', logo: '/clients/client20.svg' },
];

// Case studies data
export const caseStudies = [
  {
    id: 'botify',
    name: 'Botify',
    description: 'Comprehensive KOL campaign',
    metrics: [
      { label: 'KOLs Onboarded', value: 20 },
      { label: 'Price Increase', value: '300%' },
      { label: 'MarketCap Growth', value: 'From $18M to $61M' },
      { label: 'Total Views', value: '1.2M' },
    ],
    image: '/case-studies/botify.jpg',
  },
  {
    id: 'altura',
    name: 'Altura',
    description: 'Targeted tier 1 KOL campaign',
    metrics: [
      { label: 'Tier 1 KOLs', value: 6 },
      { label: 'Price Increase', value: '126% in 10 days' },
      { label: 'Total Views', value: '2.6M' },
    ],
    image: '/case-studies/altura.jpg',
  },
  {
    id: 'project3',
    name: 'Project X',
    description: 'Strategic influencer outreach',
    metrics: [
      { label: 'KOLs Engaged', value: 15 },
      { label: 'User Growth', value: '215%' },
      { label: 'Engagement Rate', value: '38%' },
      { label: 'Total Views', value: '3.7M' },
    ],
    image: '/case-studies/project3.jpg',
  },
];

// KOLs data
export const kols = [
  {
    id: 'Jose',
    name: 'Jose',
    image: '/Image/Team/Jose.jpg',
    followers: '1.2M',
    platform: 'YouTube',
    specialty: 'CEO',
  },
  {
    id: 'Lucho',
    name: 'CryptoLucho',
    image: '/Image/Team/Lucho.jpg',
    followers: '870K',
    platform: 'Twitter',
    specialty: 'Strategic Advisor',
  },
    {
    id: 'Juan',
    name: 'Juan',
    image: '/Image/Team/Juan.jpg',
    followers: '1.5M',
    platform: 'Instagram',
    specialty: 'Head of Growth',
  },
   {
    id: 'Santiago',
    name: 'Santiago',
    image: '/Image/Team/Santiago.jpg',
    followers: '2.1M',
    platform: 'YouTube',
    specialty: 'Business Development',
  },
    {
    id: 'Rodrigo',
    name: 'Rodrigo',
    image: '/Image/Team/Rodrigo.jpg',
    followers: '2.1M',
    platform: 'YouTube',
    specialty: 'Business Development',
  },
  {
    id: 'Lisbeth',
    name: 'Lisbeth',
    image: '/Image/Team/Lisbeth.jpg',
    followers: '1.5M',
    platform: 'Instagram',
    specialty: 'Content Shooter',
  },

  
  {
    id: 'Diego',
    name: 'Diego',
    image: '/Image/Team/Diego.jpg',
    followers: '950K',
    platform: 'TikTok',
    specialty: 'CONTENT DIRECTOR',
  },
  {
    id: 'Joaquin',
    name: 'Joaquin',
    image: '/Image/Team/Joaquin.jpg',
    followers: '780K',
    platform: 'Instagram',
    specialty: 'Lead Developer',
  },
];

// Team members data (based on the image provided)
export const teamMembers = [
  {
    id: 'vlad',
    name: 'VLAD',
    role: 'CO-FOUNDER, CEO',
    image: '/api/placeholder/300/400',
    linkedin: 'https://linkedin.com/in/vlad',
  },
  {
    id: 'gleb',
    name: 'GLEB',
    role: 'CO-FOUNDER, CMO',
    image: '/api/placeholder/300/400',
    linkedin: 'https://linkedin.com/in/gleb',
  },
  {
    id: 'mike',
    name: 'MIKE',
    role: 'HEAD OF GROWTH',
    image: '/api/placeholder/300/400',
    linkedin: 'https://linkedin.com/in/mike',
  },
  {
    id: 'kate',
    name: 'KATE',
    role: 'KOL MANAGER',
    image: '/api/placeholder/300/400',
    linkedin: 'https://linkedin.com/in/kate',
  },
  {
    id: 'tasha',
    name: 'TASHA',
    role: 'ECOSYSTEM LEAD',
    image: '/api/placeholder/300/400',
    linkedin: 'https://linkedin.com/in/tasha',
  },
  {
    id: 'olga',
    name: 'OLGA',
    role: 'HEAD OF PMO',
    image: '/api/placeholder/300/400',
    linkedin: 'https://linkedin.com/in/olga',
  },
  {
    id: 'dima',
    name: 'DIMA',
    role: 'PROJECT MANAGER',
    image: '/api/placeholder/300/400',
    linkedin: 'https://linkedin.com/in/dima',
  },
  {
    id: 'galimian',
    name: 'GALIMIAN',
    role: 'GROWTH MARKETER',
    image: '/api/placeholder/300/400',
    linkedin: 'https://linkedin.com/in/galimian',
  },
  {
    id: 'illia',
    name: 'ILLIA',
    role: 'HEAD OF CM',
    image: '/api/placeholder/300/400',
    linkedin: 'https://linkedin.com/in/illia',
  },
];

// Social media links
export const socialLinks = [
  { platform: 'Twitter', url: 'https://twitter.com/Kollabsagency', icon: 'Twitter' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/Kollabsagency', icon: 'Linkedin' },
  { platform: 'Telegram', url: 'https://t.me/Kollabsagency', icon: 'Send' },
  { platform: 'Discord', url: 'https://discord.gg/Kollabsagency', icon: 'MessageSquare' },
];

// Navigation links
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#about' },
  { label: 'Creators', href: '#kols' },
  { label: 'Services', href: '#services' },
];