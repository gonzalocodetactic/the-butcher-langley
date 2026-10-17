// Markup shared by every page: preloader, navigation bar and footer, written as in the
// Webflow export (same classes, attributes and data-w-id values) and filled from globals.
import type { ContactDetail, Footer, Navigation } from '@/payload-types'

import { esc, lines, link, mediaAlt, mediaUrl } from './html'

const img = (src: string, className: string, alt = '') =>
  `<img src="${esc(src)}" loading="lazy" alt="${esc(alt)}" class="${className}">`

// The two halves of the logo are animated separately, so they stay fixed in the template.
export const preloader = () =>
  `<div class="preloader">${img('/wf/images/Logo-TheButcherLangley-part1-01.svg', 'brand-preloader _1')}${img(
    '/wf/images/Logo-TheButcherLangley-part2-01.svg',
    'brand-preloader _2',
  )}</div>`

type DesktopItem = NonNullable<Navigation['desktopLeft']>[number]

const desktopItem = (item: DesktopItem, path: string) => {
  if (item.type !== 'dropdown') return link(item.url, 'nav-link w-nav-link', esc(item.label), path)
  const links = (item.links ?? [])
    .map((l) => link(l.url, 'nav-linkdrop w-dropdown-link', esc(l.label), path))
    .join('\n')
  return `<div data-hover="false" data-delay="0" class="w-dropdown">
<div class="nav-link w-dropdown-toggle">
<div class="icon w-icon-dropdown-toggle"></div>
<div class="dropdown">${esc(item.label)}</div>
</div>
<nav class="w-dropdown-list">
${links}
</nav>
</div>`
}

export const navbar = (nav: Navigation, path: string) => {
  const logo = img(mediaUrl(nav.logo), 'logo', mediaAlt(nav.logo))
  const items = (list: Navigation['desktopLeft']) =>
    (list ?? []).map((item) => desktopItem(item, path)).join('\n')
  const mobile = (nav.mobileLinks ?? [])
    .map((l) => link(l.url, 'nav-link w-nav-link', esc(l.label), path))
    .join('\n')
  return `<div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease-in" data-easing2="ease-in-out" role="banner" class="menunavigation w-nav">
<div class="navcontainer">
<a href="#" class="brand resp-hidd w-nav-brand">${logo}</a>
<nav role="navigation" class="navmenu w-nav-menu">
${mobile}
</nav>
<div class="menu-button w-nav-button">
<div class="w-icon-nav-menu"></div>
</div>
<div class="desktopmenu">
<div class="col-menu">
${items(nav.desktopLeft)}
</div>
${link('/', 'brand bran-desktop w-nav-brand', logo, path)}
<div class="col-menu">
${items(nav.desktopRight)}
</div>
</div>
</div>
</div>`
}

const contactRow = (icon: string, text: string) => `<div class="infofoot">${img(`/wf/images/${icon}`, 'image')}
<div class="infofootlink">${text}</div>
</div>`

const social = (url: string | null | undefined, icon: string) =>
  url
    ? `<a href="${esc(url)}" target="_blank" class="linksocial w-inline-block"><img src="/wf/images/${icon}" loading="lazy" alt=""></a>`
    : ''

// Webflow's footer columns are column-4 to column-7; the first one holds contact details.
export const footer = (data: Footer, contact: ContactDetail, path: string) => {
  const isHome = path === '/'
  const columns = (data.columns ?? [])
    .map((column, i) => {
      const heading = (isHome && column.homeHeading) || column.heading
      const links = (column.links ?? [])
        .map((l) => link(l.url, 'linkfooter', esc(l.label), path))
        .join('\n')
      return `<div class="column-${i + 5} w-col w-col-3 w-col-stack">
<h6 class="heading6">${esc(heading)}</h6>
<div class="ullinkfooter">
${links}
</div>
</div>`
    })
    .join('\n')
  const credit = data.credit?.label
    ? ` | <a href="${esc(data.credit.url)}" target="_blank" class="link-a"><span class="link-a">${esc(
        data.credit.label,
      )}</span>.</a>`
    : ''
  return `<div class="footer">
<div class="container">
<div data-w-id="bc5f98f6-1a98-1e8b-8a1c-61662526f0fb" class="columns-footer w-row">
<div class="column-4 w-col w-col-3 w-col-stack">
<div class="contlogofoot">${img(mediaUrl(data.logo), 'logofooter', mediaAlt(data.logo))}</div>
<div class="hr-footer"></div>
<h6 class="heading6">${esc(data.contactHeading)}</h6>
${contactRow('Mapicon.png', lines(contact.address))}
${contactRow('MailIcon.png', esc(contact.email))}
${contactRow('PhoneIcon.png', esc(contact.phone))}
<div class="contsocialfoot">
${social(contact.facebookUrl, 'Fbicon.png')}
${social(contact.instagramUrl, 'IGicon.png')}
</div>
</div>
${columns}
</div>
<div class="hr-footer reset"></div>
</div>
<div class="copyright">${esc(data.copyright)}${credit}
</div>
</div>`
}
