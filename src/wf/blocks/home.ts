// Renderers for the Home block group.
import { esc, lines } from '../html'
import { homeIntroStats, homeMeatCutsItems, homeMeatCutsTabs } from '../nodeIds'
import { btnPrimary, headingWrap, mediaImg, wfImg } from '../parts'
import { richInline } from '../rich'
import type { BlockOf, RenderContext } from './types'

// Interaction targets in the export (hero image, image wrapper, text block).
const HERO_IMAGE_ID = '0990e5b0-801f-cb62-9485-9788873bd8e3'
const HERO_FRAME_ID = '28ede2aa-914b-6b9b-f6c7-dde7d74a5b08'
const HERO_TEXT_ID = '437d5d44-bf2d-4bca-519c-f9555fcab3da'

export const homeHero = (block: BlockOf<'homeHero'>, { path }: RenderContext) => {
  // One element per letter, numbered by position; a space leaves its number unused.
  const letters = [...(block.subtitle ?? '')]
    .map((letter, i) =>
      letter === ' '
        ? '<div class="space"></div>'
        : `<div class="herosubtitle _${i + 1}">${esc(letter)}</div>`,
    )
    .join('\n')
  return `<div class="herosection">
<div class="wrap-imghero">${mediaImg(block.image1, 'img1-hero', {
    dataWId: HERO_IMAGE_ID,
    sizes: '(max-width: 721px) 100vw, 721px',
  })}
<div data-w-id="${HERO_FRAME_ID}" class="img2-hero">${mediaImg(block.image2, 'img2-heroimg')}</div>
</div>
<div data-w-id="${HERO_TEXT_ID}" style="opacity:0" class="descriptiontxthero">
<div class="wrap-herosubtitle">
${letters}
</div>
<div class="wraptexthero">${wfImg('Pathern-1.png', 'path1')}
<div class="conttexthero">
<h1 class="herotitle">${esc(block.title)}</h1>
</div>${wfImg('Pathern-1.png', 'path1')}
</div>
<p class="heroparargraph">${richInline(block.text)}</p>
${btnPrimary(block.button, path)}
</div>
</div>`
}

const counterClasses = ['first', 'second', 'third', 'fourth']

export const homeIntro = (block: BlockOf<'homeIntro'>, { path }: RenderContext) => {
  const stats = (block.stats ?? [])
    .slice(0, counterClasses.length)
    .map((stat, i) => {
      const ids = homeIntroStats[i]
      return `<div id="${ids.box}" class="countnumberhome">${mediaImg(stat.icon, 'countimghome', { id: ids.image })}
<div id="${ids.number}" class="countnumber ${counterClasses[i]}">${esc(stat.number)}</div>
<div id="${ids.label}" class="countdescriphome">${esc(stat.label)}</div>
</div>`
    })
    .join('\n')
  return `<div class="stc-home2">
<div class="stc2-divleft">
<h3 class="heading3 beigecolor">${lines(block.communityHeading)}</h3>
<div class="w-layout-grid counthomegrid">
${stats}
</div>
</div>
<div class="stc2-divright">
<div class="heading2-wrap">
<h3 class="heading3">${esc(block.aboutHeading?.line1)}<br><span class="text-span">${esc(block.aboutHeading?.line2)}</span></h3>${wfImg('Path4.png', 'path4')}
</div>
<p class="paragraph-midhome">${esc(block.leadText)}</p>
<p class="paragraph justify">${esc(block.text)}</p>
${btnPrimary(block.button, path)}
</div>
</div>`
}

// The export opens on the Lamb tab (Webflow's editor left it selected).
const DEFAULT_TAB = 'Lamb'

export const homeMeatCuts = (block: BlockOf<'homeMeatCuts'>, { path }: RenderContext) => {
  const tabs = block.tabs ?? []
  const current = tabs.find((tab) => tab.label === DEFAULT_TAB) ?? tabs[0]
  const menu = tabs
    .map((tab) => {
      const i = tabs.indexOf(tab)
      const id = homeMeatCutsTabs[i] ? ` id="${homeMeatCutsTabs[i]}"` : ''
      return `<a data-w-tab="${esc(tab.label)}"${id} class="tablink w-inline-block w-tab-link${tab === current ? ' w--current' : ''}">
<div>${esc(tab.label)}</div>${mediaImg(tab.icon, 'imgtab')}
</a>`
    })
    .join('\n')
  const panes = tabs
    .map((tab, t) => {
      const items = (tab.items ?? [])
        .map((item, i) => {
          const id = homeMeatCutsItems[t]?.[i] ? ` id="${homeMeatCutsItems[t][i]}"` : ''
          return `<a${id} href="${esc(item.url)}" class="homeproduct w-inline-block">${mediaImg(item.image, 'homeprod-img', { sizes: '100vw' })}
<div class="overlay"></div>
<div class="homeprod-info">
<div class="txtprodhome">${esc(item.title)}</div>
</div>
</a>`
        })
        .join('\n')
      return `<div data-w-tab="${esc(tab.label)}" class="w-tab-pane${tab === current ? ' w--tab-active' : ''}">
<div class="w-layout-grid producthomegrid">
${items}
</div>
</div>`
    })
    .join('\n')
  return `<div id="products" class="section-galleryprodhome">
<div class="container">
${headingWrap(block.heading)}
<p class="paragraph center">${richInline(block.intro)}</p>
<div data-current="${esc(current?.label)}" data-easing="ease" data-duration-in="300" data-duration-out="100" class="w-tabs">
<div class="tabs-menu w-tab-menu">
${menu}
</div>
<div class="w-tab-content">
${panes}
</div>
</div>
<div class="contbtn">
${btnPrimary(block.button, path)}
</div>
</div>
</div>`
}
