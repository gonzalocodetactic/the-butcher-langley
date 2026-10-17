import { revalidatePath } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

// Globals shown on every page (navigation, footer, contact details): refresh all cached
// pages when a published version is saved. Outside a Next.js request (seed scripts)
// there is no cache to refresh.
export const revalidateSite: GlobalAfterChangeHook = ({ doc }) => {
  if (doc?._status === 'published') {
    try {
      revalidatePath('/', 'layout')
    } catch {}
  }
  return doc
}
