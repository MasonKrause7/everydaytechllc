import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'

type ApiHandler = { fetch: (request: Request) => Response | Promise<Response> }

async function toWebRequest(req: IncomingMessage) {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)

  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (value !== undefined) headers.set(key, Array.isArray(value) ? value.join(', ') : value)
  }

  return new Request(new URL(req.url ?? '/', `http://${req.headers.host}`), {
    method: req.method,
    headers,
    body: chunks.length ? Buffer.concat(chunks) : undefined,
  })
}

async function sendWebResponse(res: ServerResponse, response: Response) {
  res.statusCode = response.status
  response.headers.forEach((value, key) => res.setHeader(key, value))
  res.end(Buffer.from(await response.arrayBuffer()))
}

// Serves the Vercel functions in /api during `vite dev`, which otherwise only run on Vercel.
function apiRoutes(): Plugin {
  return {
    name: 'api-routes',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, server.config.root, ''))

      server.middlewares.use(async (req, res, next) => {
        const name = req.url?.match(/^\/api\/([\w-]+)\/?(?:\?|$)/)?.[1]
        const file = name && path.resolve(server.config.root, 'api', `${name}.ts`)
        if (!file || !existsSync(file)) return next()

        try {
          const { default: handler } = (await server.ssrLoadModule(file)) as { default: ApiHandler }
          await sendWebResponse(res, await handler.fetch(await toWebRequest(req)))
        } catch (error) {
          if (error instanceof Error) server.ssrFixStacktrace(error)
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiRoutes()],
})
