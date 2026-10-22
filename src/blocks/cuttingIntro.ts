import type { Block } from 'payload'

import { image, sectionHeading } from '../fields/common'
import { linkFields } from '../fields/link'

// Webflow .stc1-cutting: category cards.
export const CuttingIntro: Block = {
  slug: 'cuttingIntro',
  labels: { singular: 'Cutting categories', plural: 'Cutting categories' },
  admin: { group: 'Cutting' },
  fields: [
    sectionHeading(),
    {
      name: 'cards',
      type: 'array',
      fields: [image(), { name: 'title', type: 'text' }, ...linkFields(false)],
    },
  ],
}
