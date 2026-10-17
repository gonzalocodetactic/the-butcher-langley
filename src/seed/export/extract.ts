// Reads a Webflow export page into section blocks shaped like the Payload `pages.sections`
// field (media as { url, alt }). The same data seeds the CMS (Step 8) and is rendered back
// by src/wf/blocks to check that the templates reproduce the export.
import * as cheerio from 'cheerio'
import type { Element } from 'domhandler'

import {
  button,
  heading,
  imageOf,
  lines,
  richFrom,
  richInlineFrom,
  richParagraphs,
  toPath,
  type El,
} from './dom'

type Block = { blockType: string } & Record<string, unknown>

const classesOf = (el: El) => (el.attr('class') ?? '').split(/\s+/).filter(Boolean)
const has = (el: El, className: string) => classesOf(el).includes(className)

// Top-level elements of <body> between the navigation bar and the footer.
export const sectionElements = (html: string): { $: cheerio.CheerioAPI; sections: El[] } => {
  const $ = cheerio.load(html)
  const sections = $('body')
    .children()
    .toArray()
    .map((node) => $(node as Element))
    .filter((el) => !['preloader', 'footer'].some((c) => has(el, c)) && !has(el, 'menunavigation'))
    .filter((el) => el[0].name !== 'script')
  return { $, sections }
}

const extractors: Record<string, (el: El, $: cheerio.CheerioAPI) => Block> = {}

const first = (el: El, selector: string) => el.find(selector).first()

// --- Shared ---------------------------------------------------------------------------
extractors['header-internal'] = (el) => ({
  blockType: 'internalHeader',
  title: first(el, '.title-headerinternal').text(),
})

extractors['sectiontagline'] = (el) => ({
  blockType: 'communityTagline',
  text: lines(first(el, '.headingtagline')).replace(/\n$/, ''),
})

extractors['meatcutting'] = () => ({ blockType: 'meatCutting' })

// --- Home -----------------------------------------------------------------------------
extractors['herosection'] = (el) => {
  const letters = el
    .find('.wrap-herosubtitle > div')
    .toArray()
    .map((node) => (node.attribs.class?.includes('space') ? ' ' : cheerio.load(node).text()))
    .join('')
  return {
    blockType: 'homeHero',
    image1: imageOf(first(el, '.img1-hero')),
    image2: imageOf(first(el, '.img2-heroimg')),
    subtitle: letters,
    title: first(el, '.herotitle').text(),
    text: richInlineFrom(first(el, '.heroparargraph')),
    button: button(first(el, 'a.btn-primary')),
  }
}

extractors['stc-home2'] = (el) => ({
  blockType: 'homeIntro',
  communityHeading: lines(first(el, '.heading3.beigecolor')),
  stats: el
    .find('.countnumberhome')
    .toArray()
    .map((node) => {
      const stat = el.find(node)
      return {
        icon: imageOf(first(stat, 'img')),
        number: first(stat, '.countnumber').text(),
        label: first(stat, '.countdescriphome').text(),
      }
    }),
  aboutHeading: {
    line1: first(el, '.heading2-wrap .heading3').contents().first().text(),
    line2: first(el, '.heading2-wrap .text-span').text(),
  },
  leadText: first(el, '.paragraph-midhome').text(),
  text: first(el, 'p.paragraph').text(),
  button: button(first(el, 'a.btn-primary')),
})

extractors['section-galleryprodhome'] = (el) => ({
  blockType: 'homeMeatCuts',
  heading: heading(first(el, '.heading-wrap')),
  intro: richFrom(el.find('p.paragraph.center').first().wrap('<div></div>').parent()),
  tabs: el
    .find('.tabs-menu a')
    .toArray()
    .map((tab, i) => {
      const link = el.find(tab)
      const pane = el.find('.w-tab-pane').eq(i)
      return {
        label: first(link, 'div').text(),
        icon: imageOf(first(link, 'img')),
        items: pane
          .find('a.homeproduct')
          .toArray()
          .map((node) => {
            const item = el.find(node)
            return {
              image: imageOf(first(item, 'img')),
              title: first(item, '.txtprodhome').text(),
              url: toPath(item.attr('href') ?? ''),
            }
          }),
      }
    }),
  button: button(first(el, '.contbtn a')),
})

// --- About ----------------------------------------------------------------------------
extractors['stc1-about'] = (el) => ({
  blockType: 'aboutIntro',
  title: first(el, '.about-title').text(),
  button: button(first(el, 'a.btn-primary')),
  text: richInlineFrom(first(el, 'p.paragraph-mid')),
})

extractors['stc2-about'] = (el) => ({
  blockType: 'aboutText',
  left: richFrom(el.find('.w-col').eq(0)),
  right: richFrom(el.find('.w-col').eq(1)),
})

extractors['section4-home'] = (el) => ({
  blockType: 'farmSlaughterPromo',
  heading: heading(first(el, '.heading-wrap')),
  items: el
    .find('.item-wrap')
    .toArray()
    .map((node) => {
      const item = el.find(node)
      return {
        image: imageOf(first(item, 'img')),
        number: first(item, '.item-number').text(),
        title: first(item, '.item-text').text(),
        text: first(item, '.item-paragraph').text(),
      }
    }),
  button: button(first(el, '.contbtn a')),
})

extractors['stcawards-about'] = (el) => ({
  blockType: 'awards',
  heading: heading(first(el, '.heading-wrap')),
  logos: el
    .find('img.logo-award')
    .toArray()
    .map((node) => ({ image: imageOf(el.find(node)) })),
  button: button(first(el, 'a.btn-primary')),
})

const trimEnd = (value: string) => value.replace(/\n$/, '')

const optionalHeading = (el: El) => {
  const wrap = el.find('.heading-wrap').first()
  return wrap.length ? heading(wrap) : undefined
}

const rows = (card: El) =>
  card
    .find('.cutting-col1')
    .toArray()
    .map((node) => ({
      label: first(card.find(node), '.cutting-p').text(),
      value: first(card.find(node), '.cutting-price').text(),
    }))

const priceCards = (el: El) =>
  el
    .find('a.cutting-link')
    .toArray()
    .map((node) => {
      const card = el.find(node)
      return {
        image: imageOf(first(card, 'img.cutting-img')),
        subtitle: first(card, '.cutting-subtitle').text(),
        title: first(card, '.cutting-title').text(),
        priceNote: first(card, '.cutting-price2').text(),
        rows: rows(card),
        label: first(card, '.txtbtnprimary').text(),
        url: toPath(card.attr('href') ?? ''),
      }
    })

const linkCards = (el: El) =>
  el
    .find('a.prodcat-link')
    .toArray()
    .map((node) => {
      const card = el.find(node)
      return {
        image: imageOf(first(card, 'img.prodcat-img')),
        title: first(card, '.prodcat-title').text(),
        subtitle: first(card, '.prodcat-subtitle').text(),
        label: first(card, '.prodcat-btn').text(),
        url: toPath(card.attr('href') ?? ''),
      }
    })

const charcuterieOfferings = (el: El): Block => ({
  blockType: 'charcuterieOfferings',
  heading: heading(first(el, '.heading-wrap')),
  cards: el
    .find('a.prodcat-link')
    .toArray()
    .map((node) => {
      const card = el.find(node)
      return {
        image: imageOf(first(card, 'img.prodcat-img')),
        title: first(card, '.prodcat-title').text(),
        items: trimEnd(lines(first(card, '.prodcat-p'))),
        label: first(card, '.prodcat-btn').text(),
        url: toPath(card.attr('href') ?? ''),
      }
    }),
})

const contactIntro = (el: El): Block => ({
  blockType: 'contactIntro',
  heading: heading(first(el, '.heading-wrap')),
  text: first(el, 'p.paragraph').text(),
  callButton: button(first(el, 'a.btn-secondary')),
  successMessage: first(el, '.w-form-done div').text(),
  errorMessage: first(el, '.w-form-fail div').text(),
})

const pricingGrid = (el: El): Block => ({
  blockType: 'pricingGrid',
  heading: heading(first(el, '.heading-wrap')),
  cards: priceCards(el),
})

// --- Products -------------------------------------------------------------------------
extractors['stc1-charcuterie'] = (el) => {
  const paragraphs = el.find('p.paragraph-mid').toArray()
  const columns = el.find('.columns-5 > .w-col').toArray()
  return {
    blockType: 'categoryIntro',
    heading: optionalHeading(el),
    text: richInlineFrom(el.find(paragraphs[0])),
    listColumns: columns.map((column) => ({
      items: el
        .find(column)
        .find('.list.black')
        .toArray()
        .map((li) => ({ text: el.find(li).text() })),
    })),
    closingText: paragraphs[1] ? richInlineFrom(el.find(paragraphs[1])) : undefined,
  }
}

extractors['stc1-prodcat'] = (el) => ({
  blockType: 'packCards',
  heading: heading(first(el, '.heading-wrap')),
  notice: trimEnd(lines(first(el, '.specials-notice'))),
  cards: priceCards(el),
})

extractors['stc1-subprod'] = (el) => {
  const back = first(el, 'a.btn-secondary')
  if (el.find('a.cutting-link').length) {
    return {
      blockType: 'cuttingPrices',
      heading: heading(first(el, '.heading-wrap')),
      cards: priceCards(el),
      backButton: button(back),
    }
  }
  return {
    blockType: 'subProducts',
    heading: optionalHeading(el),
    items: el
      .find('a.subprod-link')
      .toArray()
      .map((node) => {
        const item = el.find(node)
        return {
          image: imageOf(first(item, '.subprod-col1 img')),
          subtitle: first(item, '.subprod-subtitle').text(),
          title: first(item, '.subprod-title').text(),
          text: richInlineFrom(first(item, 'p.subprod-p')),
          label: first(item, '.txtbtnprimary').text(),
          url: toPath(item.attr('href') ?? ''),
        }
      }),
    backButton: button(back),
  }
}

extractors['intpage-section'] = (el) => ({
  blockType: 'detailPage',
  slides: el
    .find('.w-slide')
    .toArray()
    .map(() => ({})),
  title: first(el, '.intpage-title').text(),
  text: richParagraphs(
    el
      .find('.container > p.paragraph')
      .toArray()
      .map((p) => el.find(p)),
  ),
  backButton: button(first(el, '.intpage-wrap a.btn-secondary')),
  inquiryButton: button(first(el, '.intpage-wrap a.btn-primary')),
})

extractors['mostviewed-section'] = (el) => ({
  blockType: 'mostViewed',
  heading: heading(first(el, '.heading-wrap')),
  cards: linkCards(el),
})

// --- Cutting --------------------------------------------------------------------------
extractors['stc1-cutting'] = (el) => ({
  blockType: 'cuttingIntro',
  heading: heading(first(el, '.heading-wrap')),
  cards: linkCards(el).map(({ image, title, label, url }) => ({ image, title, label, url })),
})

extractors['steps-setion'] = (el) => {
  const content = first(el, '.steps-content')
  const imageFirst = el.children().first().hasClass('steps-image')
  return {
    blockType: 'processStep',
    number: first(content, '.steps-number').text(),
    title: first(content, '.steps-title').text(),
    text: richFrom(content, 'steps-subtitles'),
    image: imageOf(first(el, 'img.step-img')),
    imageSide: imageFirst ? 'left' : 'right',
    callButton: button(first(content, 'a.btn-secondary')),
    inquiryButton: button(first(content, 'a.btn-primary')),
  }
}

// --- Contact --------------------------------------------------------------------------
extractors['stc2-contact'] = () => ({ blockType: 'contactDetails' })

extractors['stc3-contact'] = (el) => {
  const map = first(el, '.map')
  const [latitude, longitude] = (map.attr('data-widget-latlng') ?? '').split(',').map(Number)
  return {
    blockType: 'contactMap',
    latitude,
    longitude,
    zoom: Number(map.attr('data-widget-zoom')),
    title: map.attr('title') ?? '',
  }
}

// --- Specials -------------------------------------------------------------------------
extractors['stc1-specials'] = (el) => ({
  blockType: 'weeklySpecials',
  heading: heading(first(el, '.heading-wrap')),
  notice: first(el, '.specials-notice').text(),
  items: el
    .find('.specials')
    .toArray()
    .map((node) => {
      const item = el.find(node)
      const prices = item.find('.special-price')
      return {
        image: imageOf(first(item, 'img.specials-img')),
        title: first(item, '.specials-title').text(),
        dollars: prices.eq(1).text(),
        cents: prices.eq(2).text(),
        unit: first(item, '.specials-price-desc').text(),
        text: trimEnd(lines(first(item, 'p.specials-p'))),
      }
    }),
  callButton: button(first(el, '.wrap-btn-secondary a')),
})

extractors['stc2-specials'] = (el) => ({
  blockType: 'specialsText',
  text: richInlineFrom(first(el, 'p.paragraph-mid')),
  button: button(first(el, 'a.btn-primary')),
})

// Generic .section wrappers are told apart by what they hold.
const sectionVariants: ((el: El, $: cheerio.CheerioAPI) => Block | undefined)[] = [
  (el) =>
    el.find('.core-wrap').length
      ? {
          blockType: 'aboutCore',
          heading: heading(first(el, '.heading-wrap')),
          people: el
            .find('.core-wrap')
            .toArray()
            .map((node) => {
              const person = el.find(node)
              return {
                image: imageOf(first(person, 'img')),
                role: first(person, '.text-block').text(),
                name: first(person, '.core-title').text(),
                text: first(person, '.core-paragraph').text(),
                button: button(first(person, 'a.btn-primary')),
              }
            }),
        }
      : undefined,
]

extractors['section'] = (el, $) => {
  for (const variant of sectionVariants) {
    const block = variant(el, $)
    if (block) return block
  }
  if (el.find('.prodcat-charc-content').length) return charcuterieOfferings(el)
  if (el.find('form').length) return contactIntro(el)
  if (el.find('.gridcutting').length) return pricingGrid(el)
  // A heading on its own.
  if (!el.find('a, form, img:not(.path4)').length)
    return { blockType: 'sectionHeading', heading: heading(first(el, '.heading-wrap')) }
  throw new Error('Unrecognised generic section')
}

export const blockFor = (el: El, $: cheerio.CheerioAPI): Block => {
  const key = classesOf(el)[0]
  const extract = extractors[key]
  if (!extract) throw new Error(`No extractor for section class "${key}"`)
  return extract(el, $)
}

export { extractors }
