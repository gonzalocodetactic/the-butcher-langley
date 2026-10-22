import type { Field } from 'payload'

// A label plus a URL. Internal pages use the site path (e.g. /products/freezer-packs).
// required=false for optional single links (groups), so an empty one doesn't block saving.
export const linkFields = (required = true): Field[] => [
  {
    type: 'row',
    fields: [
      { name: 'label', type: 'text', required },
      {
        name: 'url',
        type: 'text',
        required,
        admin: { description: 'Site path like /contact, or a full https:// address' },
      },
    ],
  },
]
