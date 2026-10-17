import type { Field, GlobalConfig } from 'payload'

import { editors, publicRead } from '../access/roles'
import { linkFields } from '../fields/link'

// Desktop menu item: a plain link, or a dropdown with its own links.
const desktopItems = (name: string, label: string): Field => ({
  name,
  label,
  type: 'array',
  fields: [
    {
      name: 'type',
      type: 'radio',
      defaultValue: 'link',
      options: [
        { label: 'Link', value: 'link' },
        { label: 'Dropdown', value: 'dropdown' },
      ],
    },
    { name: 'label', type: 'text', required: true },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { condition: (_, siblingData) => siblingData?.type !== 'dropdown' },
    },
    {
      name: 'links',
      label: 'Dropdown links',
      type: 'array',
      fields: linkFields(),
      admin: { condition: (_, siblingData) => siblingData?.type === 'dropdown' },
    },
  ],
})

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: { group: 'Site-wide' },
  access: { read: publicRead, update: editors },
  versions: { drafts: true },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    desktopItems('desktopLeft', 'Desktop menu, left of logo'),
    desktopItems('desktopRight', 'Desktop menu, right of logo'),
    {
      name: 'mobileLinks',
      label: 'Mobile menu',
      type: 'array',
      fields: linkFields(),
    },
  ],
}
