import type { Quirk } from '../quirks'
import type { ContactDetail, MeatCutting, Page } from '@/payload-types'

export type Section = NonNullable<Page['sections']>[number]
export type BlockOf<T extends Section['blockType']> = Extract<Section, { blockType: T }>

// Page-level data a block may need besides its own fields.
export type RenderContext = {
  path: string
  meatCutting?: MeatCutting | null
  contact?: ContactDetail | null
  quirk?: Quirk
}
