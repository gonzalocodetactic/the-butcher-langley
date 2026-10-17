// Renderers for the Cutting block group.
import { btnPrimary, btnSecondary, headingWrap, mediaImg } from '../parts'
import { esc } from '../html'
import { richText } from '../rich'
import { backButton, cardRows, linkCard, priceCard } from './products'
import type { BlockOf, RenderContext } from './types'

export const cuttingIntro = (block: BlockOf<'cuttingIntro'>) => `<div class="stc1-cutting">
<div class="container">
${headingWrap(block.heading)}
${cardRows((block.cards ?? []).map(linkCard))}
</div>
</div>`

export const cuttingPrices = (
  block: BlockOf<'cuttingPrices'>,
  { path, quirk }: RenderContext,
) => `<div class="stc1-subprod">
<div class="container">
${headingWrap(block.heading)}
</div>
<div class="subprod-wrap">
${(block.cards ?? []).map((card, i) => priceCard(card, i, false, quirk?.transparentRows?.[i])).join('\n')}
${backButton(block.backButton, path, 'btn-secondary color-red cutting-back w-inline-block')}
</div>
</div>`

export const pricingGrid = (block: BlockOf<'pricingGrid'>) => `<div class="section">
<div class="container">
<div class="w-layout-grid gridcutting">
${headingWrap(block.heading, { left: true, boldBack: true })}
${(block.cards ?? []).map((card, i) => priceCard(card, i, true)).join('\n')}
</div>
</div>
</div>`

export const processStep = (block: BlockOf<'processStep'>, { path }: RenderContext) => {
  const image = `<div class="steps-image">${mediaImg(block.image, 'step-img', { sizes: '(max-width: 1279px) 100vw, 1280px' })}</div>`
  const content = `<div class="steps-content">
<div class="steps-number">${esc(block.number)}</div>
<div class="steps-title">${esc(block.title)}</div>
${richText(block.text, { paragraph: 'steps-p', listItem: 'list', heading: 'steps-subtitles' })}
<div class="meatcut-wrap">
${btnSecondary(block.callButton, path)}
${btnPrimary(block.inquiryButton, path)}
</div>
</div>`
  return `<div class="steps-setion">
${block.imageSide === 'right' ? `${content}\n${image}` : `${image}\n${content}`}
</div>`
}
