// Checks that the section templates reproduce the Webflow export.
// Reads every export page into blocks (extract.ts), renders them (src/wf/blocks) and
// compares the markup with the export's own, ignoring differences that have no effect on
// how the page looks or behaves (whitespace, attribute order, image resize copies, ...).
// Run from the app folder: npx tsx src/seed/verify-blocks.ts [path-filter]
import fs from 'fs'
import path from 'path'
import * as cheerio from 'cheerio'
import type { Element } from 'domhandler'

import { renderSection } from '../wf/blocks'
import { quirkFor } from '../wf/quirks'
import { blockFor, sectionElements } from './export/extract'
import { exportPages } from './export/pages'

const exportDir = path.resolve(process.env.WEBFLOW_EXPORT || '../webflow-export/site')
const only = process.argv[2]

// What the Meat Cutting global holds in the export.
const meatCutting = {
  feature: { image: { url: 'images/Meat4.png', alt: '' }, number: '100', label: 'Lorem ipsum' },
  subtitle: 'custom',
  title: 'Meat Cutting',
  backgroundText: 'Meat Cutting',
  text: 'Lorem ipsum dolor sit amet consectetur. Quam facilisis ac risus nunc id elit arcu arcu. Non morbi eget vitae vitae erat amet aliquam porta.',
  stats: [1, 2, 3].map(() => ({ number: '100', label: 'Lorem ipsum' })),
  callButton: { label: 'Call: (000) 000 000', url: '#' },
  inquiryButton: { label: 'Inquiry Now', url: '/contact' },
}
const contact = {
  address: 'Unit D115 8045 204th Street\nLangley, BC Canada',
  phone: '(778) 705 - 1046',
  phoneLink: '+17787051046',
  email: 'thebutcherlangley@gmail.com',
  hours: { times: '10am - 6pm', days: '7 days a week' },
}

// Placement rules (grid-area ...) of the export's w-node IDs. Which ID an item carries does
// not matter, only the rule it gets, so IDs are compared by rule.
const css = fs.readFileSync(path.resolve('public/wf/css/the-butcher-langley.webflow.css'), 'utf8')
const nodeRules = new Map<string, string>()
for (const match of css.matchAll(/((?:#w-node-[^{,]+(?:,\s*)?)+)\s*\{([^}]*)\}/g)) {
  for (const id of match[1].split(',')) {
    const key = id.trim().slice(1)
    nodeRules.set(key, `${nodeRules.get(key) ?? ''}${match[2].replace(/\s+/g, ' ').trim()}|`)
  }
}

// Same markup, whatever the attribute order, whitespace or inert differences.
const normalize = (html: string): string => {
  const $ = cheerio.load(`<body>${html}</body>`)
  $('*').each((_, node) => {
    const el = node as Element
    const attribs: Record<string, string> = {}
    for (const name of Object.keys(el.attribs).sort()) {
      let value = el.attribs[name]
      if (['srcset', 'sizes', 'alt'].includes(name)) continue
      if (name === 'id' && value.startsWith('w-node-'))
        value = `rule:${nodeRules.get(value) ?? value}`
      // The export links the email address to a different one (order@thebutcher.com); the
      // template links the address it shows.
      if (name === 'href')
        value = value.replace('mailto:order@thebutcher.com', `mailto:${contact.email}`)
      if (name === 'href' || name === 'src') {
        value = value.replace(/^(\.\.\/)+/, '').replace(/^\/wf\/images\//, 'images/')
        value = value.replace(/^(?!https?:|tel:|mailto:|#|\/|images\/)(.*)\.html$/, '/$1')
        value = value.replace(/^index\.html$/, '/')
      }
      if (name === 'class') {
        const tokens = value.split(/\s+/).filter(Boolean)
        // il / id on button icons are Webflow leftovers with no styles or interactions.
        value = tokens
          .filter((t) => !(['il', 'id'].includes(t) && tokens.includes('iconbtnprimary')))
          .sort()
          .join(' ')
      }
      attribs[name] = value
    }
    el.attribs = attribs
  })
  // Webflow leftovers that are not reproduced: bold wrapped around step titles (the titles
  // are bold anyway) and an empty placeholder image.
  $('.steps-title strong').each((_, node) => void $(node).replaceWith($(node).contents()))
  $('img[src="placeholder.svg"]').remove()
  $('*')
    .contents()
    .each((_, node) => {
      if (node.type === 'comment') $(node).remove()
      else if (node.type === 'text') node.data = node.data.replace(/\s+/g, ' ')
    })
  return (
    ($('body').html() ?? '')
      // In the export the bold of one charcuterie title starts after its first letter.
      .replace('S<strong>moked Sausages</strong>', '<strong>Smoked Sausages</strong>')
      .replace(/>\s+</g, '><')
      .replace(/\s+</g, '<')
      .replace(/>\s+/g, '>')
      .trim()
  )
}

let checked = 0
let failed = 0
for (const page of exportPages) {
  if (only && !page.path.startsWith(only)) continue
  const html = fs.readFileSync(path.join(exportDir, page.file), 'utf8')
  const { $, sections } = sectionElements(html)
  sections.forEach((el, i) => {
    const expected = normalize($.html(el))
    let got = ''
    let blockType = '?'
    try {
      const block = blockFor(el, $)
      blockType = String(block.blockType)
      got = normalize(
        renderSection(block as never, {
          path: page.path,
          meatCutting: meatCutting as never,
          contact: contact as never,
          quirk: quirkFor(page.path, i),
        }),
      )
    } catch (error) {
      got = `ERROR ${(error as Error).message}`
    }
    checked++
    if (expected === got) return
    failed++
    let k = 0
    while (expected[k] === got[k]) k++
    console.log(`\nDIFF ${page.path} section ${i} (${blockType})`)
    console.log(' exp:', expected.slice(Math.max(0, k - 120), k + 160))
    console.log(' got:', got.slice(Math.max(0, k - 120), k + 160))
  })
}
console.log(`\n${checked} sections checked, ${failed} differ`)
process.exit(failed ? 1 : 0)
