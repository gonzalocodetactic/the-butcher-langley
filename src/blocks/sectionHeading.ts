import type { Block } from 'payload'

import { sectionHeading } from '../fields/common'

// A heading on its own (e.g. Farm Slaughter intro).
export const SectionHeading: Block = {
  slug: 'sectionHeading',
  labels: { singular: 'Section heading', plural: 'Section heading' },
  admin: { group: 'Shared' },
  fields: [sectionHeading()],
}
