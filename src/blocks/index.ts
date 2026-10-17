import type { Block } from 'payload'

import { InternalHeader } from './internalHeader'
import { SectionHeading } from './sectionHeading'
import { CommunityTagline } from './communityTagline'
import { MeatCutting } from './meatCutting'
import { HomeHero } from './homeHero'
import { HomeIntro } from './homeIntro'
import { HomeMeatCuts } from './homeMeatCuts'
import { AboutIntro } from './aboutIntro'
import { AboutText } from './aboutText'
import { AboutCore } from './aboutCore'
import { FarmSlaughterPromo } from './farmSlaughterPromo'
import { Awards } from './awards'
import { CategoryIntro } from './categoryIntro'
import { PackCards } from './packCards'
import { SubProducts } from './subProducts'
import { CharcuterieOfferings } from './charcuterieOfferings'
import { DetailPage } from './detailPage'
import { MostViewed } from './mostViewed'
import { CuttingIntro } from './cuttingIntro'
import { CuttingPrices } from './cuttingPrices'
import { PricingGrid } from './pricingGrid'
import { ProcessStep } from './processStep'
import { ContactIntro } from './contactIntro'
import { ContactDetails } from './contactDetails'
import { ContactMap } from './contactMap'
import { WeeklySpecials } from './weeklySpecials'
import { SpecialsText } from './specialsText'

// Section blocks available on Pages, in admin menu order.
export const pageBlocks: Block[] = [
  InternalHeader,
  SectionHeading,
  CommunityTagline,
  MeatCutting,
  HomeHero,
  HomeIntro,
  HomeMeatCuts,
  AboutIntro,
  AboutText,
  AboutCore,
  FarmSlaughterPromo,
  Awards,
  CategoryIntro,
  PackCards,
  SubProducts,
  CharcuterieOfferings,
  DetailPage,
  MostViewed,
  CuttingIntro,
  CuttingPrices,
  PricingGrid,
  ProcessStep,
  ContactIntro,
  ContactDetails,
  ContactMap,
  WeeklySpecials,
  SpecialsText,
]
