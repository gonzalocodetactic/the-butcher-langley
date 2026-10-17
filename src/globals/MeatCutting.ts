import type { GlobalConfig } from 'payload'

import { editors, publicRead } from '../access/roles'
import { revalidateSite } from '../hooks/revalidateSite'
import { linkFields } from '../fields/link'

// The "Meat Cutting" callout, identical on every page that shows it.
export const MeatCutting: GlobalConfig = {
  slug: 'meat-cutting',
  label: 'Meat Cutting Callout',
  admin: { group: 'Site-wide' },
  access: { read: publicRead, update: editors },
  versions: { drafts: true },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      name: 'feature',
      label: 'Image panel',
      type: 'group',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          type: 'row',
          fields: [
            { name: 'number', type: 'text' },
            { name: 'label', type: 'text' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'subtitle', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'backgroundText', type: 'text' },
      ],
    },
    { name: 'text', type: 'textarea' },
    {
      name: 'stats',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'number', type: 'text' },
            { name: 'label', type: 'text' },
          ],
        },
      ],
    },
    { name: 'callButton', type: 'group', fields: linkFields(false) },
    { name: 'inquiryButton', type: 'group', fields: linkFields(false) },
  ],
}
