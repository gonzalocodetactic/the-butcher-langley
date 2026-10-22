// Section block renderers: each returns the block's markup as in the Webflow export.
import type { BlockOf, RenderContext, Section } from './types'
import { homeHero, homeIntro, homeMeatCuts } from './home'
import { aboutCore, aboutIntro, aboutText, awards, farmSlaughterPromo } from './about'
import { contactDetails, contactIntro, contactMap } from './contact'
import { cuttingIntro, cuttingPrices, pricingGrid, processStep } from './cutting'
import {
  categoryIntro,
  charcuterieOfferings,
  detailPage,
  mostViewed,
  packCards,
  subProducts,
} from './products'
import { specialsText, weeklySpecials } from './specials'
import { communityTagline, internalHeader, meatCutting, sectionHeading } from './shared'

type Renderers = {
  [T in Section['blockType']]?: (block: BlockOf<T>, context: RenderContext) => string
}

const renderers: Renderers = {
  internalHeader,
  sectionHeading,
  communityTagline,
  meatCutting,
  homeHero,
  homeIntro,
  homeMeatCuts,
  aboutIntro,
  aboutText,
  aboutCore,
  farmSlaughterPromo,
  awards,
  categoryIntro,
  packCards,
  subProducts,
  charcuterieOfferings,
  detailPage,
  mostViewed,
  cuttingIntro,
  cuttingPrices,
  pricingGrid,
  processStep,
  contactIntro,
  contactDetails,
  contactMap,
  weeklySpecials,
  specialsText,
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
