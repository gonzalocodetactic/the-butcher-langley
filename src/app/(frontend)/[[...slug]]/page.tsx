import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { pageBlocks } from '@/blocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import config from '@/payload.config'

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
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description ?? undefined,
    openGraph: image ? { images: [image] } : undefined,
  }
}

const blockLabels = Object.fromEntries(
  pageBlocks.map((block) => [block.slug, block.labels?.singular ?? block.slug]),
)

export default async function Page({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const page = await getPage(toPath((await params).slug), draft)
  if (!page) notFound()

  // Placeholder output until the section templates are built in Step 7.
  return (
    <article>
      {draft && <LivePreviewListener />}
      <h1>{page.title}</h1>
      {page.sections?.map((section) => (
        <section key={section.id} data-block={section.blockType}>
          <h2>{String(blockLabels[section.blockType])}</h2>
          <pre>{JSON.stringify(section, null, 2)}</pre>
        </section>
      ))}
    </article>
  )
}
