import type { GlobalConfig } from 'payload'

import { editors, publicRead } from '../access/roles'
import { revalidateSite } from '../hooks/revalidateSite'
import { linkFields } from '../fields/link'

// Address, phone, email and social links come from the Contact Details global.
export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Site-wide' },
  access: { read: publicRead, update: editors },
  versions: { drafts: true },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'contactHeading', type: 'text', defaultValue: 'Contact Us' },
    {
      name: 'columns',
      label: 'Link columns',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'heading', type: 'text', required: true },
            {
              name: 'homeHeading',
              label: 'Heading on home page',
              type: 'text',
              admin: { description: 'Leave empty to use the same heading' },
            },
          ],
        },
        { name: 'links', type: 'array', fields: linkFields() },
      ],
    },
    { name: 'copyright', type: 'text' },
    {
      name: 'credit',
      type: 'group',
      fields: linkFields(false),
    },
  ],
}
