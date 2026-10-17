import type { Access, FieldAccess } from 'payload'

export const roles = [
  { label: 'Super Admin', value: 'superAdmin' },
  { label: 'Client', value: 'client' },
] as const

export type Role = (typeof roles)[number]['value']

// Accepts any user shape (server or admin UI), since only the role is read.
export const isSuperAdmin = (user: unknown): boolean =>
  (user as { role?: Role | null } | null | undefined)?.role === 'superAdmin'

export const superAdminOnly: Access = ({ req }) => isSuperAdmin(req.user)

export const superAdminOnlyField: FieldAccess = ({ req }) => isSuperAdmin(req.user)

// Super Admins see every user; anyone else sees only their own account.
export const superAdminOrSelf: Access = ({ req }) => {
  if (isSuperAdmin(req.user)) return true
  if (req.user) return { id: { equals: req.user.id } }
  return false
}
