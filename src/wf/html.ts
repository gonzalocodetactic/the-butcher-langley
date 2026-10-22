// Tiny HTML string helpers. Page markup is built as strings (not JSX) so it matches the
// Webflow export exactly and React never touches the DOM that webflow.js manages.

export const esc = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Multi-line text with each line break written as <br>, as in the Webflow export.
export const lines = (value?: string | null): string =>
  (value ?? '').split('\n').map(esc).join('<br>')

type MediaSize = { url?: string | null; width?: number | null }

export type MediaRef =
  | {
      url?: string | null
      alt?: string | null
      width?: number | null
      sizes?: Record<string, MediaSize | undefined> | null
    }
  | number
  | null
  | undefined

export const mediaUrl = (media: MediaRef): string =>
  media && typeof media === 'object' ? (media.url ?? '') : ''

export const mediaAlt = (media: MediaRef): string =>
  media && typeof media === 'object' ? (media.alt ?? '') : ''

// Webflow marks links to the current page with aria-current and w--current.
// `attrs` is everything between href and class, e.g. ' target="_blank"'.
export const link = (
  href: string | null | undefined,
  className: string,
  inner: string,
  currentPath: string,
  attrs = '',
): string => {
  const url = href ?? ''
  const current = url === currentPath
  return `<a href="${esc(url)}"${attrs}${current ? ' aria-current="page"' : ''} class="${className}${
    current ? ' w--current' : ''
  }">${inner}</a>`
}

// "url 500w, url 800w, ..." from the resized copies Payload made, plus the original.
export const mediaSrcset = (media: MediaRef): string | undefined => {
  if (!media || typeof media !== 'object') return undefined
  const copies = Object.values(media.sizes ?? {}).filter(
    (size): size is { url: string; width: number } =>
      // Copies as wide as the original add nothing; the original is listed below.
      !!size?.url && !!size.width && (!media.width || size.width < media.width),
  )
  if (!copies.length) return undefined
  if (media.url && media.width) copies.push({ url: media.url, width: media.width })
  // Small images get the same copy for every size; list each file once.
  const unique = [...new Map(copies.map((size) => [size.url, size])).values()]
  if (unique.length < 2) return undefined
  return unique
    .sort((a, b) => a.width - b.width)
    .map((size) => `${size.url} ${size.width}w`)
    .join(', ')
}
