import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { clear } from 'console';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src',
  build: {
    outDir: '../dist',
  },
  publicDir: '../public',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['../.test/setup.js'],
    include: ['**/*(*.)?{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'templates'],
  },
});
