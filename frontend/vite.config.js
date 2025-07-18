import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // لحل مشاكل المسارات بعد النشر
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    host: true,
    hmr: {
      port: 5174,
    },
    watch: {
      usePolling: true
    },
    allowedHosts: [
      '5174-il1771nv9vreko5nwp5k3-7ddb7257.manus.computer'
    ]
  },
});

