import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Export configuration
export default defineConfig({
  plugins: [react()],

  // Build output path -> goes inside backend/dist
  build: {
    outDir: path.resolve(__dirname, '../backend/dist'),
    emptyOutDir: true, // Clean folder before new build
  },

  // Aliases for imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Base path (important for deployment on same domain)
  base: '/',

  // Server config for local dev
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': 'http://localhost:3000', // Connect frontend → backend during dev
    },
  },
});
