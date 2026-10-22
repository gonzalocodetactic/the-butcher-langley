import type { Block } from 'payload'

import { button, image, sectionHeading } from '../fields/common'

// Webflow .stc1-specials slider, 3 specials per slide.
export const WeeklySpecials: Block = {
  slug: 'weeklySpecials',
  labels: { singular: 'Weekly specials', plural: 'Weekly specials' },
  admin: { group: 'Specials' },
  fields: [
    sectionHeading(),
    { name: 'notice', type: 'text' },
    {
      name: 'items',
      type: 'array',
      fields: [
        image(),
        { name: 'title', type: 'text' },
        {
          type: 'row',
          fields: [
            { name: 'dollars', type: 'text', admin: { description: 'e.g. 15' } },
            { name: 'cents', type: 'text', admin: { description: 'e.g. .80' } },
            { name: 'unit', type: 'text', admin: { description: 'e.g. each' } },
          ],
        },
        { name: 'text', type: 'textarea' },
      ],
    },
    button('callButton', 'Call button'),
  ],
}
