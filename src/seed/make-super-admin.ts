// One-time: gives an existing user the Super Admin role.
// Run from the app folder: SUPER_ADMIN_EMAIL=you@example.com npx payload run src/seed/make-super-admin.ts
import { getPayload } from 'payload'
import config from '@payload-config'

const email = process.env.SUPER_ADMIN_EMAIL
if (!email) throw new Error('Set SUPER_ADMIN_EMAIL to the email of the user to promote.')

const payload = await getPayload({ config })
const { docs } = await payload.update({
  collection: 'users',
  where: { email: { equals: email } },
  data: { role: 'superAdmin' },
})
if (docs.length === 0) throw new Error(`No user found with email ${email}.`)
payload.logger.info(`${email} is now Super Admin.`)
process.exit(0)
