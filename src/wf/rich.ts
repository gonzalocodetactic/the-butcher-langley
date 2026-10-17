// Renders Payload rich text (Lexical JSON) as the plain markup Webflow produced: one
// element per paragraph carrying the template's class, no wrappers or extra attributes.
import { esc } from './html'

type LexicalNode = {
  type: string
  text?: string
  format?: number | string
  tag?: string
  listType?: string
  fields?: { url?: string; newTab?: boolean }
  children?: LexicalNode[]
}

export type RichText = { root: { children: LexicalNode[] } } | null | undefined

// Classes of the elements this text block is made of.
export type RichClasses = {
  paragraph?: string
  list?: string
  listItem?: string
  heading?: string
}

const BOLD = 1
const ITALIC = 2
const UNDERLINE = 8
const SUPERSCRIPT = 64

const inline = (nodes: LexicalNode[] = []): string =>
  nodes
    .map((node) => {
      if (node.type === 'linebreak') return '<br>'
      if (node.type === 'link' || node.type === 'autolink') {
        const target = node.fields?.newTab ? ' target="_blank"' : ''
        return `<a href="${esc(node.fields?.url)}"${target}>${inline(node.children)}</a>`
      }
      if (node.type !== 'text') return inline(node.children)
      const format = Number(node.format ?? 0)
      let html = esc(node.text)
      if (format & SUPERSCRIPT) html = `<sup>${html}</sup>`
      if (format & UNDERLINE) html = `<u>${html}</u>`
      if (format & ITALIC) html = `<em>${html}</em>`
      if (format & BOLD) html = `<strong>${html}</strong>`
      return html
    })
    .join('')

const withClass = (tag: string, className: string | undefined, content: string, attrs = '') =>
  `<${tag}${attrs}${className ? ` class="${className}"` : ''}>${content}</${tag}>`

export const richText = (data: RichText, classes: RichClasses = {}): string =>
  (data?.root.children ?? [])
    .map((node) => {
      if (node.type === 'list') {
        const items = (node.children ?? [])
          .map((item) => withClass('li', classes.listItem, inline(item.children)))
          .join('\n')
        return `<ul role="list">\n${items}\n</ul>`
      }
      if (node.type === 'heading') return withClass('div', classes.heading, inline(node.children))
      return withClass('p', classes.paragraph, inline(node.children))
    })
    .join('\n')

// The inline content of the first paragraph, for elements that hold text directly.
export const richInline = (data: RichText): string => inline(data?.root.children[0]?.children)
