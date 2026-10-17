import type { Block } from 'payload'

// Webflow .sectiontagline. Text differs per page, so it lives on the page.
export const CommunityTagline: Block = {
  slug: 'communityTagline',
  labels: { singular: 'Community tagline', plural: 'Community tagline' },
  admin: { group: 'Shared' },
  fields: [{ name: 'text', type: 'textarea', required: true }],
}
