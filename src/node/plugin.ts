import path from 'path'
import { Plugin } from 'vite'
import { SiteConfig, resolveSiteData } from './config'
import { createMarkdownToKduRenderFn } from './markdownToKdu'
import { APP_PATH, SITE_DATA_REQUEST_PATH } from './alias'
import createKduPlugin from '@nkduy/plugin-kdu'
import slash from 'slash'
import { OutputAsset, OutputChunk } from 'rollup'

const hashRE = /\.(\w+)\.js$/
const staticInjectMarkerRE = /\b(const _hoisted_\d+ = \/\*#__PURE__\*\/createStaticVNode)\("(.*)", (\d+)\)/g
const staticStripRE = /__VP_STATIC_START__.*?__VP_STATIC_END__/g
const staticRestoreRE = /__VP_STATIC_(START|END)__/g

const isPageChunk = (
  chunk: OutputAsset | OutputChunk
): chunk is OutputChunk & { facadeModuleId: string } =>
  !!(
    chunk.type === 'chunk' &&
    chunk.isEntry &&
    chunk.facadeModuleId &&
    chunk.facadeModuleId.endsWith('.md')
  )

export function createKduVitePlugin(
  root: string,
  { configPath, alias, markdown, site }: SiteConfig,
  ssr = false,
  pageToHashMap?: Record<string, string>
): Plugin[] {
  const markdownToKdu = createMarkdownToKduRenderFn(root, markdown)

  const kduPlugin = createKduPlugin({
    include: [/\.kdu$/, /\.md$/]
  })

  let siteData = site

  const kduVitePlugin: Plugin = {
    name: 'kduvite',

    config() {
      return {
        alias,
        define: {
          __CARBON__: !!site.themeConfig.carbonAds?.carbon,
          __BSA__: !!site.themeConfig.carbonAds?.custom,
          __ALGOLIA__: !!site.themeConfig.algolia
        },
        optimizeDeps: {
          exclude: ['@docsearch/js']
        }
      }
    },

    resolveId(id) {
      if (id === SITE_DATA_REQUEST_PATH) {
        return SITE_DATA_REQUEST_PATH
      }
    },

    load(id) {
      if (id === SITE_DATA_REQUEST_PATH) {
        return `export default ${JSON.stringify(JSON.stringify(siteData))}`
      }
    },

    transform(code, id) {
      if (id.endsWith('.md')) {
        // transform .md files into kduSrc so plugin-kdu can handle it
        return markdownToKdu(code, id).kduSrc
      }
    },

    configureServer(server) {
      // serve our index.html after vite history fallback
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.url!.endsWith('.html')) {
            res.statusCode = 200
            res.end(
              `<div id="app"></div>\n` +
                `<script type="module" src="/@fs/${APP_PATH}/index.js"></script>`
            )
            return
          }
          next()
        })
      }
    },

    renderChunk(code, chunk) {
      if (!ssr && isPageChunk(chunk as OutputChunk)) {
        // For each page chunk, inject marker for start/end of static strings.
        // we do this here because in generateBundle the chunks would have been
        // minified and we won't be able to safely locate the strings.
        // Using a regexp relies on specific output from Kdu compiler core,
        // which is a reasonable trade-off considering the massive perf win over
        // a full AST parse.
        code = code.replace(
          staticInjectMarkerRE,
          '$1("__VP_STATIC_START__$2__VP_STATIC_END__", $3)'
        )
        return code
      }
      return null
    },

    generateBundle(_options, bundle) {
      if (ssr) {
        // ssr build:
        // delete all asset chunks
        for (const name in bundle) {
          if (bundle[name].type === 'asset') {
            delete bundle[name]
          }
        }
      } else {
        // client build:
        // for each .md entry chunk, adjust its name to its correct path.
        for (const name in bundle) {
          const chunk = bundle[name]
          if (isPageChunk(chunk)) {
            // record page -> hash relations
            const hash = chunk.fileName.match(hashRE)![1]
            pageToHashMap![chunk.name.toLowerCase()] = hash

            // inject another chunk with the content stripped
            bundle[name + '-lean'] = {
              ...chunk,
              fileName: chunk.fileName.replace(/\.js$/, '.lean.js'),
              code: chunk.code.replace(staticStripRE, ``)
            }
            // remove static markers from original code
            chunk.code = chunk.code.replace(staticRestoreRE, '')
          }
        }
      }
    },

    async handleHotUpdate(ctx) {
      // handle config hmr
      const { file, read, server } = ctx
      if (file === configPath) {
        const newData = await resolveSiteData(root)
        if (newData.base !== siteData.base) {
          console.warn(
            `[kduvite]: config.base has changed. Please restart the dev server.`
          )
        }
        siteData = newData
        return [server.moduleGraph.getModuleById(SITE_DATA_REQUEST_PATH)!]
      }

      // hot reload .md files as .kdu files
      if (file.endsWith('.md')) {
        const content = await read()
        const { pageData, kduSrc } = markdownToKdu(content, file)

        // notify the client to update page data
        server.ws.send({
          type: 'custom',
          event: 'kduvite:pageData',
          data: {
            path: `/${slash(path.relative(root, file))}`,
            pageData
          }
        })

        // reload the content component
        return kduPlugin.handleHotUpdate!({
          ...ctx,
          read: () => kduSrc
        })
      }
    }
  }

  return [kduVitePlugin, kduPlugin]
}
