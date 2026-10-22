import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/siteUrl'

export default function robots(): MetadataRoute.Robots {
  // Keep preview deployments out of search results.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/next/'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
