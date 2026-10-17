import type { GlobalConfig } from 'payload'

// Shared by the footer, the contact page and any block that shows contact info.
export const ContactDetails: GlobalConfig = {
  slug: 'contact-details',
  admin: { group: 'Site-wide' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  versions: { drafts: true },
  fields: [
    {
      name: 'address',
      type: 'textarea',
      admin: { description: 'One line per row, as shown on the site' },
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', admin: { description: 'As displayed, e.g. (778) 705 - 1046' } },
        { name: 'phoneLink', type: 'text', admin: { description: 'Dialable number, e.g. +17787051046' } },
      ],
    },
    { name: 'email', type: 'email' },
    {
      name: 'hours',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'times', type: 'text', admin: { description: 'e.g. 10am - 6pm' } },
            { name: 'days', type: 'text', admin: { description: 'Shown in bold, e.g. 7 days a week' } },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'facebookUrl', type: 'text' },
        { name: 'instagramUrl', type: 'text' },
      ],
    },
  ],
}
