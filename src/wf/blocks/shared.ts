// Renderers for the Shared block group.
import { esc, lines } from '../html'
import { btnPrimary, btnSecondary, headingWrap, mediaImg, wfImg } from '../parts'
import type { BlockOf, RenderContext } from './types'

export const internalHeader = ({
  title,
}: BlockOf<'internalHeader'>) => `<div class="header-internal">
<div class="wrap-headerinternal">${wfImg('Pathern-1.png', 'path1')}
<h2 class="title-headerinternal">${esc(title)}</h2>${wfImg('Pathern-1.png', 'path1')}
</div>
</div>`

export const sectionHeading = ({ heading }: BlockOf<'sectionHeading'>) => `<div class="section">
${headingWrap(heading)}
</div>`

export const communityTagline = ({
  text,
}: BlockOf<'communityTagline'>) => `<div class="sectiontagline">
<div class="container align-center">${wfImg('Pathern-1.png', 'path1')}
<h2 class="headingtagline">${lines(text)}<br></h2>
</div>
</div>`

// Webflow grid placement IDs from the export (the callout is a Webflow symbol).
const node = (suffix: string) => `w-node-_5a692dfc-44a5-9c6a-c674-01f9e61cfa${suffix}-e61cfa73`
const statIds = [
  ['8a', '8b', '8c', '8e'],
  ['90', '91', '92', '94'],
  ['96', '97', '98', '9a'],
]
// PureCounter selectors, by position.
const statCounters = ['first', 'second', 'third']

export const meatCutting = (
  _block: BlockOf<'meatCutting'>,
  { path, meatCutting: data }: RenderContext,
) => {
  if (!data) return ''
  const stats = (data.stats ?? [])
    .slice(0, 3)
    .map((stat, i) => {
      const [box, image, number, label] = statIds[i].map(node)
      return `<div id="${box}" class="countnumberhome cuttingnumbers">${wfImg('meat5-02.png', 'countimghome', image)}
<div id="${number}" class="countnumber ${statCounters[i]} simbol">${esc(stat.number)}</div>
<div id="${label}" class="countdescriphome simbol">${esc(stat.label)}</div>
</div>`
    })
    .join('\n')
  return `<div class="meatcutting">
<div class="columns-2 w-row">
<div class="column-8 w-col w-col-5 w-col-stack">
<div class="meatcutting-imgfull">
<div class="meatcut-data">
<div class="countnumberhome">${mediaImg(data.feature?.image, undefined, { id: node('79') })}
<div id="${node('7a')}" class="countnumber white">${esc(data.feature?.number)}</div>
<div id="${node('7c')}" class="countdescriphome white">${esc(data.feature?.label)}</div>
</div>
</div>
</div>
</div>
<div class="meatcut-col w-col w-col-7 w-col-stack">
${headingWrap(data, { left: true })}
<p class="paragraph">${esc(data.text)}</p>
<div class="w-layout-grid meatcutting-grid">
${stats}
</div>
<div class="meatcut-wrap">
${btnSecondary(data.callButton, path)}
${btnPrimary(data.inquiryButton, path)}
</div>
</div>
</div>
</div>`
}
