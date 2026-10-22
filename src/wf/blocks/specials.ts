// Renderers for the Specials block group.
import { esc, lines } from '../html'
import { btnPrimary, btnSecondary, mediaImg, wfImg } from '../parts'
import { richText } from '../rich'
import type { BlockOf, RenderContext } from './types'

const special = (
  item: NonNullable<BlockOf<'weeklySpecials'>['items']>[number],
) => `<div class="columns-specials w-col w-col-4 w-col-stack">
<div class="specials">
<div class="specials-divprice">
<div class="div-block">
<div class="special-price dollar-cent">$</div>
<div class="special-price">${esc(item.dollars)}</div>
<div class="special-price dollar-cent">${esc(item.cents)}</div>
</div>
<div class="specials-price-desc">${esc(item.unit)}</div>
</div>${mediaImg(item.image, 'specials-img', { sizes: '100vw' })}
<div class="specials-title">${esc(item.title)}</div>${wfImg('Path4.png', 'path4')}
<p class="specials-p">${lines(item.text)}<br></p>
</div>
</div>`

const SLIDER_ATTRS =
  'data-delay="4000" data-animation="over" class="sliderspecials w-slider" data-autoplay="false" data-easing="ease-in" data-hide-arrows="false" data-disable-swipe="false" data-autoplay-limit="0" data-nav-spacing="3" data-duration="500" data-infinite="true"'

// Three specials per slide. Webflow named the first slide's class differently from the
// rest (sliderspecial, then sliderspecials); both are styled.
export const weeklySpecials = (block: BlockOf<'weeklySpecials'>, { path }: RenderContext) => {
  const items = block.items ?? []
  const slides: string[] = []
  for (let i = 0; i < items.length; i += 3) {
    slides.push(`<div class="${i === 0 ? 'sliderspecial' : 'sliderspecials'} w-slide">
<div class="w-row">
${items
  .slice(i, i + 3)
  .map(special)
  .join('\n')}
</div>
</div>`)
  }
  return `<div class="stc1-specials">
<div class="container">
<div class="heading-wrap">
<div class="heading-subtitle">${esc(block.heading?.subtitle)}</div>
<h3 class="heading3-title">${esc(block.heading?.title)}</h3>
<div class="specials-notice">${esc(block.notice)}</div>
<div class="heading-textback">${esc(block.heading?.backgroundText)}</div>
</div>
<div class="wrap-specials">
<div ${SLIDER_ATTRS}>
<div class="sliderspecial-mask w-slider-mask">
${slides.join('\n')}
</div>
<div class="hidden w-slider-arrow-left">
<div class="w-icon-slider-left"></div>
</div>
<div class="hidden w-slider-arrow-right">
<div class="w-icon-slider-right"></div>
</div>
<div class="w-slider-nav w-round"></div>
</div>
<div class="wrap-btn-secondary">
${btnSecondary(block.callButton, path, { className: 'btn-secondary w-inline-block', icon: 'tabler_phone-call.png' })}
</div>
</div>
</div>
</div>`
}

export const specialsText = (
  block: BlockOf<'specialsText'>,
  { path }: RenderContext,
) => `<div class="stc2-specials">
<div class="container">
<div class="w-row">
<div class="w-col w-col-9 w-col-stack">
${richText(block.text, { paragraph: 'paragraph-mid color-black' })}
</div>
<div class="w-col w-col-3 w-col-stack">
${btnPrimary(block.button, path)}
</div>
</div>
</div>
</div>`
