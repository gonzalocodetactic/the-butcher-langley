import type { CollectionConfig } from 'payload'

// One document per site URL. A sections blocks field is added with the first block type
// (an empty blocks field breaks the admin edit view).
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', '_status', 'updatedAt'],
  },
  access: {
    // Public reads only see published versions; logged-in users see drafts.
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'path',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL of the page, same as the Webflow site. Examples: / and /custom-cutting/beef-cutting',
      },
      validate: (value: string | null | undefined) =>
        typeof value === 'string' && /^\/([a-z0-9-]+(\/[a-z0-9-]+)*)?$/.test(value)
          ? true
          : 'Use lowercase letters, numbers and hyphens, starting with / and no trailing slash.',
    },
  ],
}
