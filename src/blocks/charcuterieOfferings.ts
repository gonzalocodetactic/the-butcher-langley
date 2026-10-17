import type { Block } from 'payload'

import { image, sectionHeading } from '../fields/common'
import { linkFields } from '../fields/link'

// Webflow charcuterie .prodcat-link cards with product lists.
export const CharcuterieOfferings: Block = {
  slug: 'charcuterieOfferings',
  labels: { singular: 'Charcuterie offerings', plural: 'Charcuterie offerings' },
  admin: { group: 'Products' },
  fields: [
    sectionHeading(),
    {
      name: 'cards',
      type: 'array',
      fields: [
        image(),
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'subtitle', type: 'text' },
          ],
        },
        { name: 'items', type: 'textarea', admin: { description: 'One product per line' } },
        ...linkFields(false),
      ],
    },
  ],
}
