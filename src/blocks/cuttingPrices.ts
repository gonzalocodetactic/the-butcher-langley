import type { Block } from 'payload'

import { button, image, sectionHeading } from '../fields/common'
import { linkFields } from '../fields/link'

// Webflow .stc1-subprod with .cutting-link cards (Beef, Pork, Game, Lamb and Goat).
export const CuttingPrices: Block = {
  slug: 'cuttingPrices',
  labels: { singular: 'Cutting price list', plural: 'Cutting price list' },
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
    button('backButton', 'Back button'),
  ],
}
