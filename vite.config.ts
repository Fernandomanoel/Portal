import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// No `npm run dev`, /api roda aqui mesmo, com os envios gravados em ./dados.
// As variáveis (PROFESSORES, SEGREDO_SESSAO...) vêm de um .env.local.
function apiLocal(): Plugin {
  return {
    name: 'api-local',
    configureServer(servidor) {
      Object.assign(process.env, loadEnv('development', process.cwd(), ''))
      servidor.middlewares.use(async (entrada, saida, proximo) => {
        if (!entrada.url?.startsWith('/api')) return proximo()
        const { atenderDev } = await servidor.ssrLoadModule('/servidor/dev.ts')
        await atenderDev(entrada, saida)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiLocal()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
