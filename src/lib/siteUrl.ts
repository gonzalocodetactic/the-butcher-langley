// Public base URL for absolute links (sitemap, robots). SITE_URL wins; on Vercel the
// project's production domain is the fallback.
export const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '')
