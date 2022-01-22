import { computed } from 'kdu'
import { resolveSiteDataByRoute } from '/@shared/config'
import { siteDataRef } from './siteData'
import { Route, useRoute } from '../router'

export function useSiteDataByRoute(route?: Route) {
  const r = route || useRoute()

  return computed(() => {
    return resolveSiteDataByRoute(siteDataRef.value, r.path)
  })
}
