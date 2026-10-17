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

type MediaRef = { url?: string | null; alt?: string | null } | number | null | undefined

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
