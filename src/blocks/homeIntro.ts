import type { Block } from 'payload'

import { button, image } from '../fields/common'

// Webflow .stc-home2: community stats on the left, about text on the right.
export const HomeIntro: Block = {
  slug: 'homeIntro',
  labels: { singular: 'Home intro', plural: 'Home intro' },
  admin: { group: 'Home' },
  fields: [
    {
      name: 'communityHeading',
      type: 'textarea',
      admin: { description: 'One line per row' },
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      fields: [
        image('icon'),
        {
          type: 'row',
          fields: [
            { name: 'number', type: 'text' },
            { name: 'label', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'aboutHeading',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'line1', type: 'text' },
            { name: 'line2', type: 'text', admin: { description: 'Highlighted line' } },
          ],
        },
      ],
    },
    { name: 'leadText', type: 'textarea' },
    { name: 'text', type: 'textarea' },
    button(),
  ],
}
