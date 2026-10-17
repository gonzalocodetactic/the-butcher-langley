import type { Block } from 'payload'

import { button, image } from '../fields/common'

// Webflow .herosection.
export const HomeHero: Block = {
  slug: 'homeHero',
  labels: { singular: 'Home hero', plural: 'Home hero' },
  admin: { group: 'Home' },
  fields: [
    {
      type: 'row',
      fields: [image('image1', 'Front image'), image('image2', 'Back image')],
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: { description: 'Animated letter by letter, e.g. "welcome to"' },
    },
    { name: 'title', type: 'text' },
    { name: 'text', type: 'richText' },
    button(),
  ],
}
