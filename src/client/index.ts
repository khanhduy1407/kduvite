// exports in this file are exposed to themes and md files via 'kduvite'
// so the user can do `import { useRoute, useSiteData } from 'kduvite'`

// generic types
export type { Router, Route } from './app/router'

// theme types
export type { Theme, EnhanceAppContext } from './app/theme'

// composables
export { useRouter, useRoute } from './app/router'
export { useSiteData } from './app/composables/siteData'
export { useSiteDataByRoute } from './app/composables/siteDataByRoute'
export { usePageData } from './app/composables/pageData'
export { useFrontmatter } from './app/composables/frontmatter'

// utilities
export { inBrowser, joinPath } from './app/utils'

// components
export { Content } from './app/components/Content'

import { ComponentOptions } from 'kdu'
import _Debug from './app/components/Debug.kdu'
const Debug = _Debug as ComponentOptions
export { Debug }
