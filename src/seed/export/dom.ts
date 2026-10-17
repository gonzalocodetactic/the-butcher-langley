// Helpers for reading the Webflow export's HTML with cheerio.
import type { Cheerio } from 'cheerio'
import type { AnyNode, Element } from 'domhandler'

export type El = Cheerio<Element>
type Rich = {
  root: { type: 'root'; version: 1; direction: 'ltr'; format: ''; indent: 0; children: unknown[] }
}

// Image path in the export ("images/Meat4.png", "../images/..." for nested pages).
export const imageOf = (el: El) => {
  const src = (el.attr('src') ?? '').replace(/^(\.\.\/)+/, '')
  return { url: src, alt: el.attr('alt') ?? '' }
}

export const text = (el: El) => el.text()

// Inner HTML with <br> as line breaks.
export const lines = (el: El): string => {
  const copy = el.clone()
  copy.find('br').replaceWith('\n')
  return copy.text()
}

export const button = (a: El): { label: string; url: string } => ({
  label: a.find('.txtbtnprimary, .text-btn-secondary').first().text(),
  url: toPath(a.attr('href') ?? ''),
})

// "about-us.html" -> "/about-us", "index.html" -> "/", "../x.html" -> "/x".
export const toPath = (href: string) => {
  if (!href || href.startsWith('#') || /^(https?:|tel:|mailto:)/.test(href)) return href
  const clean = href.replace(/^(\.\.\/)+/, '').replace(/\.html$/, '')
  return clean === 'index' ? '/' : '/' + clean
}

const FORMAT = { strong: 1, b: 1, em: 2, i: 2, u: 8, sup: 64 } as const

type Format = number
const textNode = (value: string, format: Format) => ({
  type: 'text',
  version: 1,
  text: value,
  format,
  detail: 0,
  mode: 'normal',
  style: '',
})

// Inline HTML (text, <strong>, <em>, <sup>, <br>, <a>) as Lexical nodes.
export const inlineNodes = (nodes: AnyNode[], format: Format = 0): unknown[] => {
  const out: unknown[] = []
  for (const node of nodes) {
    if (node.type === 'text') {
      if (node.data) out.push(textNode(node.data, format))
    } else if (node.type === 'tag') {
      const tag = node.name.toLowerCase()
      if (tag === 'br') out.push({ type: 'linebreak', version: 1 })
      else if (tag === 'a')
        out.push({
          type: 'link',
          version: 1,
          direction: 'ltr',
          format: '',
          indent: 0,
          fields: { url: toPath(node.attribs.href ?? ''), linkType: 'custom', newTab: false },
          children: inlineNodes(node.children, format),
        })
      else
        out.push(...inlineNodes(node.children, format | (FORMAT[tag as keyof typeof FORMAT] ?? 0)))
    }
  }
  return out
}

const block = (type: string, children: unknown[], extra: Record<string, unknown> = {}) => ({
  type,
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children,
  ...extra,
})

// Rich text from an element's children: <p> paragraphs, <ul> lists, and the given
// heading selector (a styled <div> in Webflow). Bare text counts as one paragraph.
export const richFrom = (el: El, headingClass?: string): Rich => {
  const children: unknown[] = []
  let loose: AnyNode[] = []
  const flush = () => {
    if (loose.some((n) => n.type !== 'text' || n.data.trim())) {
      children.push(block('paragraph', inlineNodes(loose), { textFormat: 0, textStyle: '' }))
    }
    loose = []
  }
  for (const node of el.contents().toArray()) {
    if (node.type === 'tag' && node.name === 'p') {
      flush()
      children.push(
        block('paragraph', inlineNodes(node.children), { textFormat: 0, textStyle: '' }),
      )
    } else if (node.type === 'tag' && node.name === 'ul') {
      flush()
      const items = node.children
        .filter((c) => c.type === 'tag' && c.name === 'li')
        .map((li, i) => block('listitem', inlineNodes((li as Element).children), { value: i + 1 }))
      children.push(block('list', items, { listType: 'bullet', start: 1, tag: 'ul' }))
    } else if (
      node.type === 'tag' &&
      node.name === 'div' &&
      headingClass &&
      (node.attribs.class ?? '').split(' ').includes(headingClass)
    ) {
      flush()
      children.push(block('heading', inlineNodes(node.children), { tag: 'h4' }))
    } else if (
      node.type === 'text' ||
      (node.type === 'tag' && ['br', 'strong', 'em', 'a', 'b', 'i', 'u', 'sup'].includes(node.name))
    ) {
      loose.push(node)
    }
  }
  flush()
  return { root: block('root', children) as Rich['root'] }
}

// A single paragraph's inner HTML as rich text (for elements that are the paragraph).
export const richInlineFrom = (el: El): Rich => ({
  root: block('root', [
    block('paragraph', inlineNodes(el.contents().toArray()), { textFormat: 0, textStyle: '' }),
  ]) as Rich['root'],
})

export const heading = (el: El) => ({
  subtitle: el.find('.heading-subtitle').first().text(),
  title: el.find('.heading3-title').first().text(),
  backgroundText: el.find('.heading-textback').first().text(),
})

// Rich text made of the given <p> elements.
export const richParagraphs = (paragraphs: El[]): Rich => ({
  root: block(
    'root',
    paragraphs.map((p) =>
      block('paragraph', inlineNodes(p.contents().toArray()), { textFormat: 0, textStyle: '' }),
    ),
  ) as Rich['root'],
})
