// Renderers for the About block group.
import { esc } from '../html'
import { btnPrimary, headingWrap, mediaImg } from '../parts'
import { richText } from '../rich'
import type { BlockOf, RenderContext } from './types'

export const aboutIntro = (
  block: BlockOf<'aboutIntro'>,
  { path }: RenderContext,
) => `<div class="stc1-about">
<div class="container">
<div class="w-row">
<div class="column-9 w-col w-col-4 w-col-medium-6">
<div class="about-title">${esc(block.title)}</div>
${btnPrimary(block.button, path)}
</div>
<div class="w-col w-col-8 w-col-medium-6">
${richText(block.text, { paragraph: 'paragraph-mid color-black' })}
</div>
</div>
</div>
</div>`

export const aboutText = (block: BlockOf<'aboutText'>) => `<div class="stc2-about">
<div class="container">
<div class="w-row">
<div class="column-9 w-col w-col-6">
${richText(block.left, { paragraph: 'paragraph' })}
</div>
<div class="w-col w-col-6">
${richText(block.right, { paragraph: 'paragraph' })}
</div>
</div>
</div>
</div>`

// People alternate: odd rows have the image on the other side.
export const aboutCore = (block: BlockOf<'aboutCore'>, { path }: RenderContext) => {
  const people = (block.people ?? [])
    .map((person, i) => {
      const reverse = i % 2 === 1
      return `<div class="core-wrap${reverse ? ' reverse' : ''}">
<div class="core-col1">
<div class="about-maskimg">
<div class="overlay"></div>${mediaImg(person.image, 'about-img', {
        sizes: '(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 94vw, 600px',
      })}
</div>
</div>
<div class="core-col2${reverse ? ' reverse' : ''}">
<div class="text-block">${esc(person.role)}</div>
<div class="core-title">${esc(person.name)}</div>
<p class="core-paragraph">${esc(person.text)}</p>
${btnPrimary(person.button, path)}
</div>
</div>`
    })
    .join('\n')
  return `<div class="section">
<div class="container">
${headingWrap(block.heading)}
${people}
</div>
</div>`
}

const promoColumns = ['column', 'column-2', 'column-3']

export const farmSlaughterPromo = (
  block: BlockOf<'farmSlaughterPromo'>,
  { path }: RenderContext,
) => {
  const items = (block.items ?? [])
    .map(
      (item, i) => `<div class="${promoColumns[i] ?? 'column'} w-col w-col-4">
<div class="item-wrap">${mediaImg(item.image, 'item-image', {
        sizes: '(max-width: 479px) 67vw, (max-width: 767px) 49vw, (max-width: 991px) 23vw, 190px',
      })}
<div class="item-number">${esc(item.number)}</div>
<div class="item-text"><strong>${esc(item.title)}</strong></div>
<p class="item-paragraph">${esc(item.text)}</p>
</div>
</div>`,
    )
    .join('\n')
  return `<div class="section4-home">
${headingWrap(block.heading)}
<div class="item-section">
<div class="container">
<div class="columns w-row">
${items}
</div>
<div class="contbtn">
${btnPrimary(block.button, path)}
</div>
</div>
</div>
</div>`
}

const awardColumns = ['column-10', 'column-11', 'column-12', 'column-13']

export const awards = (block: BlockOf<'awards'>, { path }: RenderContext) => {
  const logos = (block.logos ?? [])
    .map(
      (logo, i) =>
        `<div class="${awardColumns[i] ?? 'column-10'} w-col w-col-3">${mediaImg(logo.image, 'logo-award')}</div>`,
    )
    .join('\n')
  return `<div class="stcawards-about">
<div class="container cont-awards">
${headingWrap(block.heading, { left: true })}
</div>
<div class="stc-grayawards">
<div class="container">
<div class="columns-3 w-row">
${logos}
</div>
</div>
${btnPrimary(block.button, path)}
</div>
</div>`
}
