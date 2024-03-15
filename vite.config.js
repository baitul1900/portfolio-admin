import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.uploadcare.com/files/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          Authorization: 'Uploadcare.Simple "9fb5ded4b0c019450d16":"32d62563d14298a05e35"',
        },
      },
    },
  },
});
