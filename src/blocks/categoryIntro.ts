import type { Block } from 'payload'

import { sectionHeading } from '../fields/common'

// Webflow .stc1-charcuterie (Charcuterie, Deli and Take Home Meals).
export const CategoryIntro: Block = {
  slug: 'categoryIntro',
  labels: { singular: 'Intro text with lists', plural: 'Intro text with lists' },
  admin: { group: 'Products' },
  fields: [
    sectionHeading(),
    { name: 'text', type: 'richText' },
    {
      name: 'listColumns',
      type: 'array',
      maxRows: 2,
      fields: [
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
    { name: 'closingText', type: 'richText' },
  ],
}
