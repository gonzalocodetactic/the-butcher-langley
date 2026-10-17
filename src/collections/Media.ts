import type { CollectionConfig } from 'payload'

import { editors, publicRead, superAdminOnly } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: publicRead,
    create: editors,
    update: editors,
    // Deleting a file breaks every page that still uses it, so only Super Admins can.
    delete: superAdminOnly,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
