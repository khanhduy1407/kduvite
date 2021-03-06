import { App, Ref, ComponentOptions } from 'kdu'
import { Router } from './router'
import { SiteData } from '../../../types/shared'

export interface EnhanceAppContext {
  app: App
  router: Router
  siteData: Ref<SiteData>
}

export interface Theme {
  Layout: ComponentOptions
  NotFound?: ComponentOptions
  enhanceApp?: (ctx: EnhanceAppContext) => void
}
