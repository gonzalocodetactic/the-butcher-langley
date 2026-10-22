import type { Block } from 'payload'

// Webflow .stc3-contact Google map.
export const ContactMap: Block = {
  slug: 'contactMap',
  labels: { singular: 'Map', plural: 'Map' },
  admin: { group: 'Contact' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'latitude', type: 'number' },
        { name: 'longitude', type: 'number' },
        { name: 'zoom', type: 'number', defaultValue: 12 },
      ],
    },
    { name: 'title', type: 'text', admin: { description: 'Map pin tooltip' } },
  ],
}
