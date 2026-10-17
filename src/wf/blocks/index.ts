// Section block renderers: each returns the block's markup as in the Webflow export.
import type { BlockOf, RenderContext, Section } from './types'
import { communityTagline, internalHeader, meatCutting, sectionHeading } from './shared'

type Renderers = {
  [T in Section['blockType']]?: (block: BlockOf<T>, context: RenderContext) => string
}

const renderers: Renderers = {
  internalHeader,
  sectionHeading,
  communityTagline,
  meatCutting,
}

export const renderSection = (section: Section, context: RenderContext): string => {
  const render = renderers[section.blockType] as
    ((block: Section, context: RenderContext) => string) | undefined
  // Blocks without a renderer yet leave a marker so the page still builds.
  return render ? render(section, context) : `<!-- section: ${section.blockType} -->`
}

export const usesMeatCutting = (sections: Section[]) =>
  sections.some((section) => section.blockType === 'meatCutting')

export type { RenderContext, Section }
