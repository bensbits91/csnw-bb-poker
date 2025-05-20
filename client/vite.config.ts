import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
   plugins: [react(), tailwindcss()],
   server: {
      port: 5173,
      host: '127.0.0.1'
   },
   resolve: {
      alias: {
         '@': '/src' // Map @ to the src/ directory
      }
   }
});
