// Renderers for the Products block group, plus the card layouts shared with Cutting.
import { esc, lines } from '../html'
import { priceCardIds } from '../nodeIds'
import { btnPrimary, btnSecondary, headingWrap, mediaImg, wfImg } from '../parts'
import { richText } from '../rich'
import type { BlockOf, RenderContext } from './types'

const PRODCAT_SIZES =
  '(max-width: 479px) 96vw, (max-width: 767px) 97vw, (max-width: 991px) 98vw, (max-width: 1919px) 32vw, 33vw'

type Button = { label?: string | null; url?: string | null } | undefined

// Rows of three linked image cards (prodcat-link), the last row padded to three.
export const cardRows = (cards: string[]) => {
  const rows: string[] = []
  for (let i = 0; i < cards.length; i += 3) {
    const row = cards.slice(i, i + 3)
    while (row.length < 3) row.push('')
    rows.push(
      `<div class="prodcat-column w-row">
${row.map((card) => `<div class="prodcat-col w-col w-col-4 w-col-stack">${card}</div>`).join('\n')}
</div>`,
    )
  }
  return rows.join('\n')
}

type PriceCard = {
  image?: unknown
  subtitle?: string | null
  title?: string | null
  priceNote?: string | null
  rows?: { label?: string | null; value?: string | null }[] | null
  label?: string | null
  url?: string | null
}

// Image card with a list of items and prices (cutting-link).
// `placed` cards sit in a grid and carry its placement IDs; `transparentRows` are the rows
// the live site hides (spacers that keep card heights equal).
export const priceCard = (
  card: PriceCard,
  i: number,
  placed: boolean,
  transparentRows: number[] = [],
) => {
  const sizes = placed
    ? '(max-width: 479px) 100vw, (max-width: 1439px) 49vw, 50vw'
    : '(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 94vw, 1200px'
  const id = placed && priceCardIds[i] ? ` id="${priceCardIds[i]}"` : ''
  const rows = (card.rows ?? [])
    .map(
      (row, r) => `<div class="cutting-col1">
<div class="cutting-p${transparentRows.includes(r) ? ' transparent' : ''}">${esc(row.label)}</div>
<div class="cutting-price">${esc(row.value)}</div>
</div>`,
    )
    .join('\n')
  return `<a${id} href="${esc(card.url)}" class="cutting-link w-inline-block">
<div class="cutting-maskimg">
<div class="overlay"></div>${mediaImg(card.image as never, 'cutting-img', { sizes })}
</div>
<div class="cutting-content">
${card.subtitle ? `<div class="cutting-subtitle">${esc(card.subtitle)}</div>` : ''}
${card.title ? `<div class="cutting-title">${esc(card.title)}</div>` : ''}
${card.priceNote ? `<div class="cutting-price2"><strong>${esc(card.priceNote)}</strong></div>` : ''}
${rows}
<div class="btn-primary">${wfImg('Path2.png', 'iconbtnprimary il')}
<div class="txtbtnprimary">${esc(card.label)}</div>${wfImg('Path3.png', 'iconbtnprimary id')}
</div>
</div>
</a>`
}

export const backButton = (button: Button, path: string, className: string) =>
  btnSecondary(button, path, {
    className,
    icon: 'Vector.png',
    iconClass: 'icon-btn-secondary arrow',
  })

export const packCards = (block: BlockOf<'packCards'>) => `<div class="stc1-prodcat">
<div class="container">
<div class="w-layout-grid grid">
${headingWrap(block.heading, {
  left: true,
  boldBack: true,
  after: block.notice ? `\n<div class="specials-notice">${lines(block.notice)}</div>` : '',
})}
${(block.cards ?? []).map((card, i) => priceCard(card, i, true)).join('\n')}
</div>
</div>
</div>`

export const categoryIntro = (block: BlockOf<'categoryIntro'>) => {
  // The full version (with a heading) fades in as you scroll; the plain one does not.
  const animated = Boolean(block.heading?.title)
  const fade = (id: string) => (animated ? ` data-w-id="${id}" style="opacity:0"` : '')
  const columns = (block.listColumns ?? [])
    .map(
      (
        column,
        i,
      ) => `<div${fade(i === 0 ? 'b2f7e669-e821-8a2a-180e-f38f2b95a430' : 'b2f7e669-e821-8a2a-180e-f38f2b95a431')} class="w-col w-col-6">
<ul role="list" class="list">
${(column.items ?? []).map((item) => `<li class="list-item">\n<div class="list black">${esc(item.text)}</div>\n</li>`).join('\n')}
</ul>
</div>`,
    )
    .join('\n')
  const paragraph = (data: BlockOf<'categoryIntro'>['text'], id: string) =>
    richText(data, { paragraph: 'paragraph-mid color-black center' }).replace(
      '<p ',
      `<p${fade(id)} `,
    )
  return `<div class="stc1-charcuterie">
<div class="container">
${block.heading?.title ? headingWrap(block.heading) : ''}
${paragraph(block.text, '2dac5032-5ea2-1c52-1798-e3e17cb8f506')}
${columns ? `<div class="columns-5 w-row">\n${columns}\n</div>` : ''}
${block.closingText ? paragraph(block.closingText, 'cfe55105-98f7-52e7-a760-8c043a6f64e5') : ''}
</div>
</div>`
}

export const subProducts = (block: BlockOf<'subProducts'>, { path, quirk }: RenderContext) => {
  const items = (block.items ?? [])
    .map((item, i) => {
      const imageClass = quirk?.imageClasses?.[i] ?? 'subprod-img'
      return `<a href="${esc(item.url)}" class="subprod-link${i % 2 === 1 ? ' reverse' : ''} w-inline-block">
<div class="subprod-col1">${mediaImg(item.image, imageClass || undefined, {
        sizes: '(max-width: 1919px) 100vw, 1920px',
      })}
<div class="overlay"></div>
</div>
<div class="subprod-col2">
<div class="subprod-subtitle">${esc(item.subtitle)}</div>
<div class="subprod-title">${esc(item.title)}<br></div>
${richText(item.text, { paragraph: 'subprod-p' })}
<div class="btn-primary">${wfImg('Path2.png', 'iconbtnprimary il')}
<div class="txtbtnprimary">${esc(item.label)}</div>${wfImg('Path3.png', 'iconbtnprimary id')}
</div>
</div>
</a>`
    })
    .join('\n')
  return `<div class="stc1-subprod">
<div class="container">${block.heading?.title ? `\n${headingWrap(block.heading)}\n` : ''}</div>
<div class="subprod-wrap">
${items}
${backButton(block.backButton, path, 'btn-secondary color-red w-inline-block')}
</div>
</div>`
}

export const charcuterieOfferings = (block: BlockOf<'charcuterieOfferings'>) => {
  const cards = (block.cards ?? []).map(
    (card) => `<a href="${esc(card.url)}" class="prodcat-link w-inline-block">
<div class="overlay"></div>
<div class="prodcat-charc-content">
<div class="prodcat-title"><strong>${esc(card.title)}</strong></div>
<p class="prodcat-p">${lines(card.items)}</p>
<div class="prodcat-btn">${esc(card.label)}</div>
</div>${mediaImg(card.image, 'prodcat-img', { sizes: PRODCAT_SIZES })}
</a>`,
  )
  return `<div class="section">
<div class="container">
${headingWrap(block.heading)}
${cardRows(cards)}
</div>
</div>`
}

const SLIDER_ATTRS =
  'data-delay="4000" data-animation="slide" class="slider w-slider" data-autoplay="false" data-easing="ease" data-hide-arrows="false" data-disable-swipe="false" data-autoplay-limit="0" data-nav-spacing="3" data-duration="500" data-infinite="true"'

export const detailPage = (block: BlockOf<'detailPage'>, { path }: RenderContext) => {
  // The first two slides take their pictures from the Webflow CSS (slide1, slide2);
  // a slide with an uploaded image overrides it.
  const slides = (block.slides ?? [])
    .map((slide, i) => {
      const image = slide.image && typeof slide.image === 'object' ? slide.image.url : undefined
      const style = image ? ` style="background-image:url('${esc(image)}')"` : ''
      return `<div class="slide${i + 1} w-slide"${style}></div>`
    })
    .join('\n')
  return `<div data-w-id="acc9f5de-e989-56fb-5eb3-a1caae3f0550" style="opacity:0" class="intpage-section">
<div class="container">
<div ${SLIDER_ATTRS}>
<div class="mask w-slider-mask">
${slides}
</div>
<div class="w-slider-arrow-left">
<div class="w-icon-slider-left"></div>
</div>
<div class="w-slider-arrow-right">
<div class="w-icon-slider-right"></div>
</div>
<div class="w-slider-nav w-round"></div>
</div>
<h3 class="intpage-title">${esc(block.title)}</h3>
${richText(block.text, { paragraph: 'paragraph' })}
<div class="intpage-wrap">
${backButton(block.backButton, path, 'btn-secondary color-red w-inline-block')}
${btnPrimary(block.inquiryButton, path)}
</div>
</div>
</div>`
}

type LinkCard = {
  image?: unknown
  title?: string | null
  subtitle?: string | null
  label?: string | null
  url?: string | null
}

// Linked image card with a title and a button label (prodcat-link).
export const linkCard = (
  card: LinkCard,
) => `<a href="${esc(card.url)}" class="prodcat-link w-inline-block">
<div class="overlay"></div>
<div class="prodcat-content">
<div class="prodcat-title">${esc(card.title)}</div>
${card.subtitle ? `<div class="prodcat-subtitle">${esc(card.subtitle)}</div>` : ''}
<div class="prodcat-btn">${esc(card.label)}</div>
</div>${mediaImg(card.image as never, 'prodcat-img', { sizes: PRODCAT_SIZES })}
</a>`

export const mostViewed = (block: BlockOf<'mostViewed'>) => `<div class="mostviewed-section">
<div class="container">
${headingWrap(block.heading, { left: true })}
${cardRows((block.cards ?? []).map(linkCard))}
</div>
</div>`
