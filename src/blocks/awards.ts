import type { Block } from 'payload'

import { button, image, sectionHeading } from '../fields/common'

// Webflow .stcawards-about.
export const Awards: Block = {
  slug: 'awards',
  labels: { singular: 'Awards', plural: 'Awards' },
  admin: { group: 'About' },
  fields: [sectionHeading(), { name: 'logos', type: 'array', fields: [image()] }, button()],
}
