import type { Block } from 'payload'

import { button, sectionHeading } from '../fields/common'

// Webflow contact .section. Form fields are fixed.
export const ContactIntro: Block = {
  slug: 'contactIntro',
  labels: { singular: 'Contact intro and form', plural: 'Contact intro and form' },
  admin: { group: 'Contact' },
  fields: [
    sectionHeading(),
    { name: 'text', type: 'textarea' },
    button('callButton', 'Call button'),
    {
      type: 'row',
      fields: [
        { name: 'successMessage', type: 'text' },
        { name: 'errorMessage', type: 'text' },
      ],
    },
  ],
}
