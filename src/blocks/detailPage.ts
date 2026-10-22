import type { Block } from 'payload'

import { button, image } from '../fields/common'

// Webflow .intpage-section: image slider, title, text, buttons.
export const DetailPage: Block = {
  slug: 'detailPage',
  labels: { singular: 'Product detail', plural: 'Product detail' },
  admin: { group: 'Products' },
  fields: [
    { name: 'slides', type: 'array', fields: [image()] },
    { name: 'title', type: 'text' },
    { name: 'text', type: 'richText' },
    button('backButton', 'Back button'),
    button('inquiryButton', 'Inquiry button'),
  ],
}
