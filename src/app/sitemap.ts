// src/app/sitemap.ts - Updated version
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kollabs.tech'
  
  // Core pages
  const routes = [
    '',
    '/our-story',
    // Add other static routes here
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
  
  return routes
}