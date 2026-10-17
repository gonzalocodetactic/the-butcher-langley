import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import config from '@/payload.config'
import type { ContactDetail, Footer, MeatCutting, Navigation } from '@/payload-types'
import { renderSection, usesMeatCutting } from '@/wf/blocks'
import { quirkFor } from '@/wf/quirks'
import { footer, navbar, preloader } from '@/wf/shell'

type Args = { params: Promise<{ slug?: string[] }> }

const toPath = (slug?: string[]) => '/' + (slug ?? []).join('/')

async function getPage(path: string, draft: boolean) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: { path: { equals: path } },
    draft,
    overrideAccess: draft,
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

async function getGlobals(draft: boolean) {
  const payload = await getPayload({ config })
  const get = (slug: 'navigation' | 'footer' | 'contact-details') =>
    payload.findGlobal({ slug, draft, overrideAccess: draft, depth: 1 })
  const [nav, foot, contact] = await Promise.all([
    get('navigation'),
    get('footer'),
    get('contact-details'),
  ])
  return { nav: nav as Navigation, foot: foot as Footer, contact: contact as ContactDetail }
}

async function getMeatCutting(draft: boolean) {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({
    slug: 'meat-cutting',
    draft,
    overrideAccess: draft,
    depth: 1,
  })
  return data as MeatCutting
}

// Published pages are pre-rendered at build time and refreshed on publish.
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    pagination: false,
    select: { path: true },
  })
  return pages.docs.map((page) => ({ slug: page.path.split('/').filter(Boolean) }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const page = await getPage(toPath((await params).slug), draft)
  if (!page) return {}
  const image = typeof page.meta?.image === 'object' ? page.meta?.image?.url : undefined
  const title = page.meta?.title || page.title
  return {
    title,
    description: page.meta?.description ?? undefined,
    openGraph: { title, images: image ? [image] : undefined },
    twitter: { title },
  }
}

export default async function Page({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const path = toPath((await params).slug)
  const page = await getPage(path, draft)
  if (!page) notFound()
  const { nav, foot, contact } = await getGlobals(draft)
  const sections = page.sections ?? []
  const meatCutting = usesMeatCutting(sections) ? await getMeatCutting(draft) : null
  const sectionsHtml = sections
    .map((section, i) =>
      renderSection(section, { path, meatCutting, contact, quirk: quirkFor(path, i) }),
    )
    .join('\n')

  // One wrapper with the whole page markup: React leaves its contents alone, so webflow.js
  // can manage the DOM. display: contents keeps the wrapper out of the layout.
  const body = [preloader(), navbar(nav, path), sectionsHtml, footer(foot, contact, path)].join(
    '\n',
  )

  return (
    <>
      {draft && <LivePreviewListener markup={body} />}
      <div
        style={{ display: 'contents' }}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </>
  )
}
