import type { CollectionConfig } from 'payload'

import { editors, superAdminOnly } from '../access/roles'

// Contact form entries. Fields match the Webflow contact form.
// Submissions are created server-side in Step 9 (local API bypasses access control).
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'phone', 'createdAt'],
  },
  defaultSort: '-createdAt',
  access: {
    create: () => false,
    read: editors,
    update: () => false,
    delete: superAdminOnly,
  },
  fields: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'text', required: true },
    { name: 'message', label: 'Message', type: 'textarea' },
  ],
}
