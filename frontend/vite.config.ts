import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path'; // Corrected import for path

export default defineConfig({
  base: '/', // Ensure correct base path for routing
  plugins: [react()], // Remove the custom history fallback plugin
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
});
