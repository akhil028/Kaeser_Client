import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))

function readBackendPort() {
  const backendEnvPath = path.resolve(currentDir, '../Kaeser_Server/.env')

  if (!fs.existsSync(backendEnvPath)) {
    return '3001'
  }

  const portLine = fs
    .readFileSync(backendEnvPath, 'utf8')
    .split(/\r?\n/)
    .find((line) => line.trim().startsWith('PORT='))

  return portLine?.split('=').slice(1).join('=').trim() || '3001'
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, currentDir, '')
  const apiProxyTarget = env.VITE_API_PROXY_TARGET || `http://localhost:${readBackendPort()}`

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
