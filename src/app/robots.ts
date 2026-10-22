import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/siteUrl'

export default function robots(): MetadataRoute.Robots {
  // Keep preview deployments, and production until SITE_URL names the real domain,
  // out of search results.
  const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'
  if (isPreview || (process.env.VERCEL_ENV && !process.env.SITE_URL)) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/next/'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
