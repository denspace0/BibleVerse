// client/vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'client',  // Make sure Vite knows where the root folder is
  build: {
    outDir: 'dist',  // Ensure Vite builds to the dist folder
  },
});
