// Seeds every page from the Webflow export: media library entries, page documents with
// their section blocks, and the SEO title. Run from the app folder:
//   WEBFLOW_EXPORT=../webflow-export/site npx payload run src/seed/pages.ts
// Safe to re-run: pages are matched by path and overwritten, images are reused by filename.
import fs from 'fs'
import path from 'path'
import * as cheerio from 'cheerio'
import { getPayload } from 'payload'
import config from '@payload-config'

import { blockFor, sectionElements } from './export/extract'
import { exportPages } from './export/pages'

const exportDir = path.resolve(process.env.WEBFLOW_EXPORT || '../webflow-export/site')
const payload = await getPayload({ config })

// Pages that exist in the export but are not linked from the live site.
const drafts = new Set([
  '/products/fine-quality-meats',
  '/products/fine-quality-meats/fresh-meats-dry-aged-beef',
])

const mediaIds = new Map<string, number>()
async function media(src: string, alt: string): Promise<number> {
  const filename = path.basename(src)
  const cached = mediaIds.get(filename)
  if (cached) return cached
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  let id = existing.docs[0]?.id
  if (!id) {
    const doc = await payload.create({
      collection: 'media',
      data: { alt: alt || path.parse(filename).name.replace(/[-_]+/g, ' ') },
      filePath: path.join(exportDir, 'images', filename),
    })
    id = doc.id
  }
  mediaIds.set(filename, id)
  return id
}

// Replaces every { url, alt } image reference with the media document id.
async function resolveMedia(value: unknown): Promise<unknown> {
  if (Array.isArray(value)) {
    const out: unknown[] = []
    for (const item of value) out.push(await resolveMedia(item))
    return out
  }
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    if (typeof obj.url === 'string' && typeof obj.alt === 'string' && /^images\//.test(obj.url)) {
      return media(obj.url, obj.alt)
    }
    const out: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(obj)) out[key] = await resolveMedia(item)
    return out
  }
  return value
}

for (const page of exportPages) {
  const html = fs.readFileSync(path.join(exportDir, page.file), 'utf8')
  const { $, sections } = sectionElements(html)
  const blocks: unknown[] = []
  for (const el of sections) blocks.push(await resolveMedia(blockFor(el, $)))
  const title = cheerio.load(html)('title').first().text().trim() || page.path
  const data = {
    title,
    path: page.path,
    meta: { title },
    sections: blocks as never,
    _status: drafts.has(page.path) ? ('draft' as const) : ('published' as const),
  }
  const existing = await payload.find({
    collection: 'pages',
    where: { path: { equals: page.path } },
    limit: 1,
    draft: true,
  })
  if (existing.docs[0]) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
  } else {
    await payload.create({ collection: 'pages', data })
  }
  console.log(`${page.path}: ${blocks.length} sections, ${data._status}`)
}
process.exit(0)
