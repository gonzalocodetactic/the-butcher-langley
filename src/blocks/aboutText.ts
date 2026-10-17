import type { Block } from 'payload'

// Webflow .stc2-about.
export const AboutText: Block = {
  slug: 'aboutText',
  labels: { singular: 'About two-column text', plural: 'About two-column text' },
  admin: { group: 'About' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'left', type: 'richText' },
        { name: 'right', type: 'richText' },
      ],
    },
  ],
}
