// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = String(env.API_BASE_URL || 'https://sswebsitebackend.ssinfotech.co.in')
    .replace(/\/+$/, '')
    .replace(/\/api$/i, '')
  const apiProxy = {
    '/api': {
      target: apiTarget,
      changeOrigin: true,
      configure(proxy) {
        proxy.on('proxyReq', (proxyReq) => {
          if (env.ADMIN_TOKEN) {
            proxyReq.setHeader('x-admin-token', env.ADMIN_TOKEN)
          }
        })
      },
    },
  }

  return {
    plugins: [react()],
    server: { host: true, port: 5174, strictPort: true, proxy: apiProxy },
    preview: { host: true, port: 5174, strictPort: true, proxy: apiProxy },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    base: '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  }
})
