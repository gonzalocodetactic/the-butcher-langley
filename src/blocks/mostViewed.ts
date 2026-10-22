import type { Block } from 'payload'

import { image, sectionHeading } from '../fields/common'
import { linkFields } from '../fields/link'

// Webflow .mostviewed-section.
export const MostViewed: Block = {
  slug: 'mostViewed',
  labels: { singular: 'Most viewed', plural: 'Most viewed' },
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
        ...linkFields(false),
      ],
    },
  ],
}
