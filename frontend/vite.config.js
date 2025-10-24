import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Matches Netlify publish directory
  },
  resolve: {
    alias: {
      '@': 'src', // Relative to frontend folder
    },
  },
})