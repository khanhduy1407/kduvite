import { useSiteData, joinPath } from 'kduvite'

export function useUrl() {
  const site = useSiteData()

  function withBase(path: string): string {
    return joinPath(site.value.base, path)
  }

  return {
    withBase
  }
}
