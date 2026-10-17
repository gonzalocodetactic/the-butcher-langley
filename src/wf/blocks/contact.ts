// Renderers for the Contact block group.
import { esc, lines } from '../html'
import { btnSecondary, headingWrap } from '../parts'
import type { BlockOf, RenderContext } from './types'

const RECAPTCHA_SITE_KEY = '6Lf4GNUnAAAAAD-o2_zos9yX3mtwBLkkvbeb1rUn'

// The form's fields are fixed (Webflow form markup, submitted by webflow.js for now).
const field = (label: string, name: string, dataName: string, type: string, required = true) =>
  `<label for="${name}" class="label">${label}</label><input class="input w-input" maxlength="256" name="${name}" data-name="${dataName}" placeholder="" type="${type}" id="${name}"${required ? ' required=""' : ''}>`

export const contactIntro = (
  block: BlockOf<'contactIntro'>,
  { path }: RenderContext,
) => `<div class="section">
<div class="container">
<div class="w-row">
<div class="w-col w-col-5">
${headingWrap(block.heading, { left: true })}
<p class="paragraph">${esc(block.text)}</p>
<div class="div-block-2">
${btnSecondary(block.callButton, path)}
</div>
</div>
<div class="w-col w-col-7">
<div class="form-block w-form">
<form id="email-form" name="email-form" data-name="Email Form" method="get" data-wf-page-id="63d7f28652386dba89e2c00d" data-wf-element-id="62ef32d6-9189-7f58-48c5-4d5b00dffdb0">
<div class="col-form">
<div class="col1-form">${field('First Name', 'First-Name', 'First Name', 'text')}</div>
<div class="col2-form">${field('Last Name', 'Last-Name', 'Last Name', 'text')}</div>
</div>
<div class="col-form">
<div class="col1-form">${field('E-mail', 'email', 'Email', 'email')}</div>
<div class="col2-form">${field('Phone', 'Phone', 'Phone', 'tel')}</div>
</div>${field('Message', 'Message', 'Message', 'text', false).replace('input w-input', 'input textarea w-input')}
<div data-sitekey="${RECAPTCHA_SITE_KEY}" class="w-form-formrecaptcha g-recaptcha g-recaptcha-error g-recaptcha-disabled"></div><input type="submit" data-wait="Please wait..." class="submit-button w-button" value="Submit">
</form>
<div class="w-form-done">
<div>${esc(block.successMessage)}</div>
</div>
<div class="w-form-fail">
<div>${esc(block.errorMessage)}</div>
</div>
</div>
</div>
</div>
</div>
</div>`

// "204th" is set with a raised "th" in the address on this page.
const address = (value?: string | null) =>
  lines(value).replace(/(\d+)(st|nd|rd|th)\b/, '$1<sup>$2</sup>')

export const contactDetails = (_block: BlockOf<'contactDetails'>, { contact }: RenderContext) => {
  if (!contact) return ''
  return `<div class="stc2-contact">
<div class="hourswrapper">
<div class="hours">
<div class="hours-title">Hours:</div>
<p class="hours-p">${esc(contact.hours?.times)} <br><strong>${esc(contact.hours?.days)}</strong></p>
<div class="hours-title">Location:</div>
<p class="hours-p">${address(contact.address)}</p>
<div class="hours-title">Phone:</div>
<a href="#" class="hours-link">${esc(contact.phone)}</a>
<div class="hours-title">Email:</div>
<a href="mailto:${esc(contact.email)}" class="hours-link">${esc(contact.email)}</a>
</div>
</div>
<div class="container"></div>
</div>`
}

export const contactMap = (block: BlockOf<'contactMap'>) => `<div class="stc3-contact">
<div class="container"></div>
<div class="map w-widget w-widget-map" data-widget-style="roadmap" data-widget-latlng="${block.latitude},${block.longitude}" aria-label="${esc(block.title)}" data-enable-scroll="true" role="region" title="${esc(block.title)}" data-enable-touch="true" data-widget-zoom="${block.zoom ?? 12}" data-widget-tooltip="${esc(block.title)}"></div>
</div>`
