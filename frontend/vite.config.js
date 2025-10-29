// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],

  // -----------------------------------------------------------------
  // 1. Build output
  // -----------------------------------------------------------------
  build: {
    outDir: 'dist',          // Render expects the static files here
    emptyOutDir: true,       // clean the folder on each build
  },

  // -----------------------------------------------------------------
  // 2. Base public path – keep it '/' for Render (root deployment)
  // -----------------------------------------------------------------
  base: '/',

  // -----------------------------------------------------------------
  // 3. Alias for clean imports (@/components/…)
  // -----------------------------------------------------------------
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // -----------------------------------------------------------------
  // 4. SPA fallback – **only needed when you host on a custom server**
  //     (Render does the rewrite for you, but this is harmless)
  // -----------------------------------------------------------------
  server: {
    historyApiFallback: true,   // dev server fallback (optional)
  },
})