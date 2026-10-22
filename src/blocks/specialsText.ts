import type { Block } from 'payload'

import { button } from '../fields/common'

// Webflow .stc2-specials.
export const SpecialsText: Block = {
  slug: 'specialsText',
  labels: { singular: 'Specials text', plural: 'Specials text' },
  admin: { group: 'Specials' },
  fields: [{ name: 'text', type: 'richText' }, button()],
}
