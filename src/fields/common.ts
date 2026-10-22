import type { Field } from 'payload'

import { linkFields } from './link'

// Webflow "heading-wrap": small subtitle, main title, large faded text behind it.
export const sectionHeading = (name = 'heading'): Field => ({
  name,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'subtitle', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'backgroundText', type: 'text' },
      ],
    },
  ],
})

export const button = (name = 'button', label?: string): Field => ({
  name,
  label,
  type: 'group',
  fields: linkFields(false),
})

export const image = (name = 'image', label?: string): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
})
