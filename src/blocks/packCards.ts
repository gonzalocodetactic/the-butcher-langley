import type { Block } from 'payload'

import { image, sectionHeading } from '../fields/common'
import { linkFields } from '../fields/link'

// Webflow .stc1-prodcat (Products, Freezer Packs).
export const PackCards: Block = {
  slug: 'packCards',
  labels: { singular: 'Product packs with prices', plural: 'Product packs with prices' },
  admin: { group: 'Products' },
  fields: [
    sectionHeading(),
    { name: 'notice', type: 'textarea' },
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
