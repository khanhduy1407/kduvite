import { createServer as createViteServer, ServerOptions } from 'vite'
import { resolveConfig } from './config'
import { createKduVitePlugin } from './plugin'

export async function createServer(
  root: string = process.cwd(),
  serverOptions: ServerOptions = {}
) {
  const config = await resolveConfig(root)

  return createViteServer({
    root,
    // logLevel: 'warn',
    plugins: createKduVitePlugin(root, config),
    server: serverOptions
  })
}
