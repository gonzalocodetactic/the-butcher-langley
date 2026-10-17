import type { Block } from 'payload'

import { button, image, sectionHeading } from '../fields/common'

// Webflow .section-galleryprodhome: tabs (Beef, Pork...) each with a product grid.
export const HomeMeatCuts: Block = {
  slug: 'homeMeatCuts',
  labels: { singular: 'Home meat cuts gallery', plural: 'Home meat cuts gallery' },
  admin: { group: 'Home' },
  fields: [
    sectionHeading(),
    { name: 'intro', type: 'richText' },
    {
      name: 'tabs',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [{ name: 'label', type: 'text', required: true }, image('icon')],
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            image(),
            {
              type: 'row',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'url', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    button(),
  ],
}
