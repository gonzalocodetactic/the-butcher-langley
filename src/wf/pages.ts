// Per-page values from the Webflow export that are not content: the page ID webflow.js
// uses to find each page's interactions, and the scripts at the end of <body>, in the
// export's order. Paths not listed (pages created later) use the defaults.

export const WF_SITE_ID = '63d2ee258b7be2039709f107'

const WEBFONT = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
const RECAPTCHA = 'https://www.google.com/recaptcha/api.js'
export const JQUERY = `https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=${WF_SITE_ID}`
const WEBFLOW = '/wf/js/webflow.js'
// Not in the export: sends the contact form to /api/contact (see the file).
const CONTACT_FORM = '/wf/js/contact-form.js'
const PURECOUNTER = 'https://cdn.jsdelivr.net/npm/@srexi/purecounterjs/dist/purecounter_vanilla.js'

type WfPage = {
  pageId: string
  scripts: string[]
  // Inline script at the end of <body>, run after the DOM is parsed.
  init?: string
}

const withCounters = [WEBFONT, RECAPTCHA, JQUERY, WEBFLOW, PURECOUNTER, CONTACT_FORM]
const counterFirst = [WEBFONT, RECAPTCHA, PURECOUNTER, JQUERY, WEBFLOW, CONTACT_FORM]
const plain = [WEBFONT, RECAPTCHA, JQUERY, WEBFLOW, CONTACT_FORM]
const counters = '/wf/js/init-counters.js'

export const wfPages: Record<string, WfPage> = {
  '/': { pageId: '63d2ee258b7be2099309f108', scripts: withCounters, init: '/wf/js/init-home.js' },
  '/about-us': { pageId: '63d7f26457316b4f98158e4a', scripts: withCounters, init: counters },
  '/charcuterie': { pageId: '644843ae5f7e5d77e5dcdb53', scripts: withCounters, init: counters },
  '/contact': { pageId: '63d7f28652386dba89e2c00d', scripts: plain },
  '/custom-cutting': { pageId: '63d7f27a26cc7e05f1157830', scripts: withCounters, init: counters },
  '/custom-cutting/beef-cutting': {
    pageId: '63fe8658d6de2abebdc8298f',
    scripts: withCounters,
    init: counters,
  },
  '/custom-cutting/farm-slaughter': {
    pageId: '63e57d5210773318062d0bc2',
    scripts: withCounters,
    init: counters,
  },
  '/custom-cutting/game-cutting': { pageId: '63fea28c57c2b727376ef935', scripts: counterFirst },
  '/custom-cutting/lamb-and-goat': {
    pageId: '6408d06c5b28261e845195ba',
    scripts: withCounters,
    init: counters,
  },
  '/custom-cutting/pork-cutting': {
    pageId: '63fe88c347609b0a09be09b4',
    scripts: withCounters,
    init: counters,
  },
  '/products': { pageId: '63d7f26e74fc9a8359d91a41', scripts: counterFirst },
  '/products/deli-and-take-home-meals': {
    pageId: '63fe988ea75a04f69e7e4f71',
    scripts: withCounters,
    init: counters,
  },
  '/products/fine-quality-meats': {
    pageId: '63d9496ebff3c04ebc9ed48d',
    scripts: withCounters,
    init: counters,
  },
  '/products/fine-quality-meats/fresh-meats-dry-aged-beef': {
    pageId: '63d95a225810370cbebc15bb',
    scripts: plain,
  },
  '/products/freezer-packs': {
    pageId: '63fe9b56dc32cb48b6352a61',
    scripts: withCounters,
    init: counters,
  },
  '/products/gourmet-meats': {
    pageId: '63fe97ecf59555127af6a4e4',
    scripts: withCounters,
    init: counters,
  },
  '/specials': { pageId: '63d7f28e8c3bc4673af8ab73', scripts: plain },
}

export const wfPageFor = (path: string): WfPage | undefined => wfPages[path]

export const defaultScripts = plain
