// Seeds the site-wide globals with the values from the Webflow export.
// Run from the app folder: npx payload run src/seed/globals.ts
// Images are read from WEBFLOW_IMAGES (default ../webflow-export/site/images).
// Safe to re-run: globals are overwritten, images are reused by filename.
// Email addresses are left empty on purpose (set manually in the admin).
import path from 'path'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const imagesDir = path.resolve(process.env.WEBFLOW_IMAGES || '../webflow-export/site/images')

async function media(filename: string, alt: string): Promise<number> {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs[0]) return existing.docs[0].id
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: path.join(imagesDir, filename),
  })
  return doc.id
}

const logo = await media('Logo-TheButcherLangley.svg', 'The Butcher Langley')
const meatImage = await media('Meat4.png', 'Meat cutting')

await payload.updateGlobal({
  slug: 'navigation',
  data: {
    _status: 'published',
    logo,
    desktopLeft: [
      { type: 'link', label: 'About us', url: '/about-us' },
      {
        type: 'dropdown',
        label: 'Products',
        links: [
          { label: 'Gourmet Meats', url: '/products/gourmet-meats' },
          { label: 'Deli and Take Home Meals', url: '/products/deli-and-take-home-meals' },
          { label: 'Freezer Packs', url: '/products/freezer-packs' },
        ],
      },
      { type: 'link', label: 'Charcuterie', url: '/charcuterie' },
    ],
    desktopRight: [
      {
        type: 'dropdown',
        label: 'Custom Cutting',
        links: [
          { label: 'Custom Cutting', url: '/custom-cutting' },
          { label: 'FARM KILL', url: '/custom-cutting/farm-slaughter' },
          { label: 'Game Cutting', url: '/custom-cutting/game-cutting' },
        ],
      },
      { type: 'link', label: 'Contact', url: '/contact' },
      { type: 'link', label: 'Specials', url: '/specials' },
    ],
    mobileLinks: [
      { label: 'About us', url: '/about-us' },
      { label: 'Products', url: '/products' },
      { label: 'Charcuterie', url: '/charcuterie' },
      { label: 'Cutting', url: '/custom-cutting' },
      { label: 'Contact', url: '/contact' },
      { label: 'Specials', url: '/specials' },
    ],
  },
})

await payload.updateGlobal({
  slug: 'footer',
  data: {
    _status: 'published',
    logo,
    contactHeading: 'Contact Us',
    columns: [
      {
        heading: 'Products',
        homeHeading: 'Our Products',
        links: [
          { label: 'Gourmet Meats', url: '/products/gourmet-meats' },
          { label: 'Deli & Take Home Meals', url: '/products/deli-and-take-home-meals' },
          { label: 'Freezer Packs', url: '/products/freezer-packs' },
          { label: 'Charcuterie', url: '/charcuterie' },
        ],
      },
      {
        heading: 'Cutting',
        links: [
          { label: 'Custom Cutting', url: '/custom-cutting' },
          { label: 'Farm Slaughter', url: '/custom-cutting/farm-slaughter' },
          { label: 'Beef Cutting', url: '/custom-cutting/beef-cutting' },
          { label: 'Pork Cutting', url: '/custom-cutting/pork-cutting' },
          { label: 'Game Cutting', url: '/custom-cutting/game-cutting' },
          { label: 'Lamb & Goat', url: '/custom-cutting/lamb-and-goat' },
        ],
      },
      {
        heading: 'Company',
        homeHeading: 'Navigation',
        links: [
          { label: 'About Us', url: '/about-us' },
          { label: 'Contact Us', url: '/contact' },
          { label: 'Specials', url: '/specials' },
        ],
      },
    ],
    copyright: '© 2023 The Butcher Langley',
    credit: { label: 'Web Design by CodeTactic Media Inc', url: 'https://www.codetactic.com/' },
  },
})

await payload.updateGlobal({
  slug: 'contact-details',
  data: {
    _status: 'published',
    address: 'Unit D115 8045 204th Street\nLangley, BC Canada',
    phone: '(778) 705 - 1046',
    phoneLink: '+17787051046',
    hours: { times: '10am - 6pm', days: '7 days a week' },
    facebookUrl: 'https://www.facebook.com',
    instagramUrl: 'https://www.instagram.com',
  },
})

const lorem = { number: '100', label: 'Lorem ipsum' }
await payload.updateGlobal({
  slug: 'meat-cutting',
  data: {
    _status: 'published',
    feature: { image: meatImage, ...lorem },
    subtitle: 'custom',
    title: 'Meat Cutting',
    backgroundText: 'Meat Cutting',
    text: 'Lorem ipsum dolor sit amet consectetur. Quam facilisis ac risus nunc id elit arcu arcu. Non morbi eget vitae vitae erat amet aliquam porta.',
    stats: [lorem, lorem, lorem],
    callButton: { label: 'Call: (000) 000 000', url: '#' },
    inquiryButton: { label: 'Inquiry Now', url: '/contact' },
  },
})

payload.logger.info('Seeded navigation, footer, contact-details, meat-cutting')
process.exit(0)
