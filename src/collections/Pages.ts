import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
} from 'payload'

import { editors, isEditor, superAdminOnly } from '../access/roles'
import { pageBlocks } from '../blocks'

// Pages are served statically; refresh the cached copy when a published page changes.
// Outside a Next.js request (seed scripts) there is no cache to refresh.
const revalidate = (path?: string | null) => {
  if (!path) return
  try {
    revalidatePath(path)
  } catch {}
}

const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  if (doc._status === 'published') revalidate(doc.path)
  if (
    previousDoc?._status === 'published' &&
    (doc._status !== 'published' || previousDoc.path !== doc.path)
  ) {
    revalidate(previousDoc.path)
  }
  return doc
}

const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidate(doc?.path)
  return doc
}

// Matches the site CSS breakpoints (max 479, 767, 991 px).
const previewBreakpoints = [
  { name: 'mobile', label: 'Mobile portrait', width: 479, height: 800 },
  { name: 'landscape', label: 'Mobile landscape', width: 767, height: 600 },
  { name: 'tablet', label: 'Tablet', width: 991, height: 900 },
]

// One document per site URL. Page content is a list of section blocks.
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => `/next/preview?path=${encodeURIComponent(data?.path || '/')}`,
      breakpoints: previewBreakpoints,
    },
    preview: (data) => `/next/preview?path=${encodeURIComponent(String(data?.path || '/'))}`,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  access: {
    // Public reads only see published versions; editors see drafts.
    read: ({ req }) => (isEditor(req.user) ? true : { _status: { equals: 'published' } }),
    // Clients edit existing pages; adding or removing whole pages is Super Admin only.
    create: superAdminOnly,
    update: editors,
    delete: superAdminOnly,
  },
  versions: {
    // Autosave keeps the live preview in step with the form while editing.
    drafts: { autosave: { interval: 375 } },
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
        description:
          'URL of the page, same as the Webflow site. Examples: / and /custom-cutting/beef-cutting',
      },
      validate: (value: string | null | undefined) =>
        typeof value === 'string' && /^\/([a-z0-9-]+(\/[a-z0-9-]+)*)?$/.test(value)
          ? true
          : 'Use lowercase letters, numbers and hyphens, starting with / and no trailing slash.',
    },
    {
      name: 'sections',
      type: 'blocks',
      blocks: pageBlocks,
    },
  ],
}
