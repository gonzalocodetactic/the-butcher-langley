import type { Block } from 'payload'

import { button, image, sectionHeading } from '../fields/common'

// Webflow .section4-home: numbered items with images.
export const FarmSlaughterPromo: Block = {
  slug: 'farmSlaughterPromo',
  labels: { singular: 'Farm slaughter promo', plural: 'Farm slaughter promo' },
  admin: { group: 'About' },
  fields: [
    sectionHeading(),
    {
      name: 'items',
      type: 'array',
      fields: [
        image(),
        {
          type: 'row',
          fields: [
            { name: 'number', type: 'text' },
            { name: 'title', type: 'text' },
          ],
        },
        { name: 'text', type: 'textarea' },
      ],
    },
    button(),
  ],
}
