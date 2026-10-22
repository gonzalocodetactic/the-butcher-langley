import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import { siteUrl } from '@/lib/siteUrl'
import config from '@/payload.config'

// Rebuilt hourly so newly published pages appear without a redeploy.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    pagination: false,
    select: { path: true, updatedAt: true },
  })
  return pages.docs.map((page) => ({
    url: siteUrl + page.path,
    lastModified: page.updatedAt,
  }))
}
