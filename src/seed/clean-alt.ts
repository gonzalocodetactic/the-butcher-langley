// Tidies the alt text that the page seed derived from filenames (dates, stock-site tags, size suffixes).
// Run from the app folder: npx payload run src/seed/clean-alt.ts   (DRY=1 to preview only)
// Only touches media whose alt still equals the filename-derived text, so client edits are kept.
import path from 'path'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const dry = Boolean(process.env.DRY)

const derive = (filename: string) => path.parse(filename).name.replace(/[-_]+/g, ' ')
const clean = (text: string) =>
  text
    .replace(/\b\d{4} \d{2} \d{2} \d{2} \d{2} \d{2} utc\b/gi, '')
    .replace(/\b(utc|min|unsplash|pexels)\b/gi, '')
    .replace(/\b\d+\b/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const { docs } = await payload.find({ collection: 'media', limit: 500, pagination: false })
let changed = 0
for (const doc of docs) {
  if (!doc.filename || doc.alt !== derive(doc.filename)) continue
  const alt = clean(doc.alt)
  if (!alt || alt === doc.alt) continue
  console.log(`${doc.filename}: "${doc.alt}" -> "${alt}"`)
  if (!dry) await payload.update({ collection: 'media', id: doc.id, data: { alt } })
  changed++
}
console.log(`${changed} of ${docs.length} media ${dry ? 'would change' : 'updated'}`)
process.exit(0)
