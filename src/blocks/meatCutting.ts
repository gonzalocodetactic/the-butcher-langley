import type { Block } from 'payload'

// Shows the Meat Cutting Callout global. Edit its content under Site-wide.
export const MeatCutting: Block = {
  slug: 'meatCutting',
  labels: {
    singular: 'Meat Cutting callout (edit under Site-wide)',
    plural: 'Meat Cutting callout (edit under Site-wide)',
  },
  admin: { group: 'Shared' },
  fields: [],
}
