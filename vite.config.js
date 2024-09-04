import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  build: {
    minify: 'esbuild',
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true, // Optional: enable source maps for debugging
  },
});
