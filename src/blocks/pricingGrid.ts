import type { Block } from 'payload'

import { image, sectionHeading } from '../fields/common'
import { linkFields } from '../fields/link'

// Webflow farm slaughter pricing: heading plus price cards in a grid.
export const PricingGrid: Block = {
  slug: 'pricingGrid',
  labels: { singular: 'Pricing grid', plural: 'Pricing grid' },
  admin: { group: 'Cutting' },
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
            { name: 'subtitle', type: 'text' },
            { name: 'title', type: 'text' },
          ],
        },
        {
          name: 'priceNote',
          type: 'text',
          admin: { description: 'Bold line under the title, e.g. $150' },
        },
        {
          name: 'rows',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'value', type: 'text', admin: { description: 'Price or quantity' } },
              ],
            },
          ],
        },
        ...linkFields(false),
      ],
    },
  ],
}
