import type { Block } from 'payload'

// Webflow .header-internal: page title between two pattern images.
export const InternalHeader: Block = {
  slug: 'internalHeader',
  labels: { singular: 'Page header', plural: 'Page header' },
  admin: { group: 'Shared' },
  fields: [{ name: 'title', type: 'text', required: true }],
}
