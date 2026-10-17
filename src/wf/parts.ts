// Markup pieces repeated across section blocks, as written in the Webflow export.
import { esc, link, mediaAlt, mediaUrl, type MediaRef } from './html'

// <img> with attributes in the export's order; undefined attributes are left out.
export const img = (attrs: Record<string, string | undefined>) =>
  `<img ${Object.entries(attrs)
    .filter(([, value]) => value !== undefined)
    .map(([name, value]) => `${name}="${esc(value)}"`)
    .join(' ')}>`

// Fixed template image from public/wf/images.
export const wfImg = (file: string, className?: string, id?: string) =>
  img({ src: `/wf/images/${file}`, loading: 'lazy', id, alt: '', class: className })

// Image uploaded to the media library.
export const mediaImg = (media: MediaRef, className?: string, id?: string) =>
  img({ src: mediaUrl(media), loading: 'lazy', id, alt: mediaAlt(media), class: className })

export type Heading = {
  subtitle?: string | null
  title?: string | null
  backgroundText?: string | null
}

// Webflow "heading-wrap": small subtitle, title with underline image, large faded text.
export const headingWrap = (heading: Heading | undefined, left = false) =>
  `<div class="heading-wrap${left ? ' left-align' : ''}">
<div class="heading-subtitle">${esc(heading?.subtitle)}</div>
<h3 class="heading3-title">${esc(heading?.title)}</h3>${wfImg('Path4.png', 'path4')}
<div class="heading-textback">${esc(heading?.backgroundText)}</div>
</div>`

type Button = { label?: string | null; url?: string | null } | undefined

// Red button with arrow images on both sides.
export const btnPrimary = (button: Button, path: string) =>
  link(
    button?.url,
    'btn-primary w-inline-block',
    `${wfImg('Path2.png', 'iconbtnprimary il')}
<div class="txtbtnprimary">${esc(button?.label)}</div>${wfImg('Path3.png', 'iconbtnprimary id')}
`,
    path,
  )

// Outlined button with an icon before the text.
export const btnSecondary = (
  button: Button,
  path: string,
  {
    className = 'btn-secondary color-red w-inline-block',
    icon = 'tabler_phone-call-1.png',
    iconClass = 'icon-btn-secondary',
  } = {},
) =>
  link(
    button?.url,
    className,
    `${wfImg(icon, iconClass)}
<div class="text-btn-secondary">${esc(button?.label)}</div>
`,
    path,
  )
