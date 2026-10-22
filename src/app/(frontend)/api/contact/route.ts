import { getPayload } from 'payload'

import config from '@/payload.config'

// Contact form handler: verifies reCAPTCHA, saves the entry to Form submissions,
// then emails it to CONTACT_NOTIFY_EMAIL (skipped while that is empty).
// Field names match the Webflow form markup in src/wf/blocks/contact.ts.

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX = 256

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const fail = (status: number, error: string) => Response.json({ ok: false, error }, { status })

async function readFields(req: Request): Promise<Record<string, string>> {
  const type = req.headers.get('content-type') || ''
  if (type.includes('application/json')) {
    const body = (await req.json()) as Record<string, unknown>
    return Object.fromEntries(Object.entries(body).map(([k, v]) => [k, String(v ?? '')]))
  }
  const form = await req.formData()
  return Object.fromEntries([...form.entries()].map(([k, v]) => [k, typeof v === 'string' ? v : '']))
}

// Without RECAPTCHA_SECRET_KEY the check is skipped in development and refused in production.
async function verifyRecaptcha(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    if (process.env.NODE_ENV === 'production') return false
    console.warn('[contact] RECAPTCHA_SECRET_KEY not set; skipping reCAPTCHA check (development only)')
    return true
  }
  if (!token) return false
  const params = new URLSearchParams({ secret, response: token })
  if (ip) params.set('remoteip', ip)
  try {
    const res = await fetch(VERIFY_URL, { method: 'POST', body: params })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch (err) {
    console.error('[contact] reCAPTCHA verification failed', err)
    return false
  }
}

export async function POST(req: Request) {
  let fields: Record<string, string>
  try {
    fields = await readFields(req)
  } catch {
    return fail(400, 'Invalid request')
  }

  const data = {
    firstName: (fields['First-Name'] || '').trim(),
    lastName: (fields['Last-Name'] || '').trim(),
    email: (fields['email'] || '').trim(),
    phone: (fields['Phone'] || '').trim(),
    message: (fields['Message'] || '').trim(),
  }

  const required = [data.firstName, data.lastName, data.email, data.phone]
  if (required.some((v) => !v)) return fail(400, 'Missing required fields')
  if (Object.values(data).some((v) => v.length > MAX)) return fail(400, 'Field too long')
  if (!EMAIL_RE.test(data.email)) return fail(400, 'Invalid email')

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null
  if (!(await verifyRecaptcha(fields['g-recaptcha-response'] || '', ip))) {
    return fail(400, 'reCAPTCHA check failed')
  }

  const payload = await getPayload({ config })

  try {
    await payload.create({ collection: 'form-submissions', data })
  } catch (err) {
    payload.logger.error({ err, msg: '[contact] could not save submission' })
    return fail(500, 'Could not save submission')
  }

  // The entry is saved; an email failure is logged but does not fail the request.
  const to = process.env.CONTACT_NOTIFY_EMAIL?.trim()
  if (to) {
    const name = `${data.firstName} ${data.lastName}`
    const rows: [string, string][] = [
      ['First Name', data.firstName],
      ['Last Name', data.lastName],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Message', data.message],
    ]
    try {
      await payload.sendEmail({
        to,
        replyTo: data.email,
        subject: `New contact form submission from ${name}`,
        html: rows
          .map(([k, v]) => `<p><strong>${k}:</strong><br>${esc(v).replace(/\n/g, '<br>')}</p>`)
          .join('\n'),
        text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      })
    } catch (err) {
      payload.logger.error({ err, msg: '[contact] submission saved but email failed' })
    }
  }

  return Response.json({ ok: true })
}
