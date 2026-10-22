// Class differences between otherwise identical elements in the Webflow export that change
// how the live site behaves, so the templates reproduce them. Keyed by page path, then by
// the section's position on the page (counting from the page header as 0).

export type Quirk = {
  // Class of each item's image in a sub-product list. 'subprod-img' is the one the hover
  // zoom interaction targets; the others keep the item still.
  imageClasses?: string[]
  // Price list rows the live site hides, as card index -> row indexes.
  transparentRows?: Record<number, number[]>
}

export const quirks: Record<string, Record<number, Quirk>> = {
  '/custom-cutting/lamb-and-goat': { 1: { transparentRows: { 0: [1] } } },
  '/products/gourmet-meats': {
    1: { imageClasses: ['gourmetmeats', 'gourmetmeats', 'gourmetmeats', 'gourmetmeats'] },
  },
  '/products/fine-quality-meats': { 1: { imageClasses: ['subprod-img', '', ''] } },
  '/products/deli-and-take-home-meals': { 2: { imageClasses: ['subprod-img', '', ''] } },
}

export const quirkFor = (path: string, index: number): Quirk | undefined => quirks[path]?.[index]
