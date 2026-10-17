import type { Block } from 'payload'

import { button, image, sectionHeading } from '../fields/common'

// Webflow .core-wrap rows; image side alternates automatically.
export const AboutCore: Block = {
  slug: 'aboutCore',
  labels: { singular: 'About team ("The Core")', plural: 'About team ("The Core")' },
  admin: { group: 'About' },
  fields: [
    sectionHeading(),
    {
      name: 'people',
      type: 'array',
      fields: [
        image(),
        {
          type: 'row',
          fields: [
            { name: 'role', type: 'text' },
            { name: 'name', type: 'text' },
          ],
        },
        { name: 'text', type: 'textarea' },
        button(),
      ],
    },
  ],
}
