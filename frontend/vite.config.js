import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // default, but explicit is good
  },
  server: {
    port: 3000,
  },
  // 👇 This is important if you're using React Router
  resolve: {
    alias: {
      '@': '/src', // so you can use "@/components/..." imports
    },
  }
})
