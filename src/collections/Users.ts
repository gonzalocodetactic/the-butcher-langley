import type { CollectionConfig } from 'payload'

import {
  isEditor,
  isSuperAdmin,
  roles,
  superAdminOnly,
  superAdminOnlyField,
  superAdminOrSelf,
} from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
    // Clients still reach their own account page; only the Users list is hidden.
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  auth: true,
  access: {
    // Only users with a known role can open the admin panel.
    admin: ({ req }) => isEditor(req.user),
    // The first user is created through Payload's register screen, which skips these checks.
    create: superAdminOnly,
    read: superAdminOrSelf,
    update: superAdminOrSelf,
    delete: superAdminOnly,
  },
  hooks: {
    beforeChange: [
      // The first user ever created becomes Super Admin, so an empty database can't lock everyone out.
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', req })
        if (totalDocs === 0) return { ...data, role: 'superAdmin' }
        return data
      },
    ],
  },
  fields: [
    // Email added by default
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'client',
      options: [...roles],
      saveToJWT: true,
      access: {
        create: superAdminOnlyField,
        update: superAdminOnlyField,
      },
    },
  ],
}
