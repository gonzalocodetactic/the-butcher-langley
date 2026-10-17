import type { Block } from 'payload'

import { button, image, sectionHeading } from '../fields/common'
import { linkFields } from '../fields/link'

// Webflow .stc1-subprod with .subprod-link rows; image side alternates automatically.
export const SubProducts: Block = {
  slug: 'subProducts',
  labels: { singular: 'Sub-product list', plural: 'Sub-product list' },
  admin: { group: 'Products' },
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
            { name: 'subtitle', type: 'text' },
            { name: 'title', type: 'text' },
          ],
        },
        { name: 'text', type: 'richText' },
        ...linkFields(false),
      ],
    },
    button('backButton', 'Back button'),
  ],
}
