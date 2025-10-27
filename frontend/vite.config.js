import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ✅ Builds to frontend/dist (default)
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: '/', // Important for correct asset paths in production
})
