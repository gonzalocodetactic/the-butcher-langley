import type { Block } from 'payload'

import { button } from '../fields/common'

// Webflow .steps-setion (farm slaughter steps).
export const ProcessStep: Block = {
  slug: 'processStep',
  labels: { singular: 'Process step', plural: 'Process step' },
  admin: { group: 'Cutting' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'number', type: 'text' },
        { name: 'title', type: 'text' },
      ],
    },
    { name: 'text', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imageSide',
      type: 'radio',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    button('callButton', 'Call button'),
    button('inquiryButton', 'Inquiry button'),
  ],
}
