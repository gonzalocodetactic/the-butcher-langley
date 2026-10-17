import type { Block } from 'payload'

import { button } from '../fields/common'

// Webflow .stc1-about.
export const AboutIntro: Block = {
  slug: 'aboutIntro',
  labels: { singular: 'About intro', plural: 'About intro' },
  admin: { group: 'About' },
  fields: [{ name: 'title', type: 'text' }, button(), { name: 'text', type: 'richText' }],
}
