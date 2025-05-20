import { defineConfig } from 'cypress';

export default defineConfig({
   component: {
      devServer: {
         framework: 'react',
         bundler: 'vite',
         viteConfig: {
            server: {
               port: 5173,
               host: 'localhost',
               open: false,
            },
         },
      },
   },
   e2e: {
      baseUrl: 'http://localhost:5173',
      setupNodeEvents(on, config) {
         // implement node event listeners here
         console.log('Cypress config:', config);
         console.log('Cypress baseUrl:', config.baseUrl);
         
      }
   }
});
