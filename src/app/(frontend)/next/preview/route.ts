import { draftMode, headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'

// Entry point for the admin's live preview: logged-in users get draft mode, then the page.
export async function GET(request: Request): Promise<Response> {
  const path = new URL(request.url).searchParams.get('path') || '/'
  if (!path.startsWith('/') || path.startsWith('//')) {
    return new Response('Invalid path', { status: 400 })
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await getHeaders() })
  if (!user) {
    return new Response('You must be logged in to preview drafts', { status: 403 })
  }

  ;(await draftMode()).enable()
  redirect(path)
}
