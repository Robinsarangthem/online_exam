import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],  
  server: {
    https: {
      key: './smart-restaurant-privateKey.key',
      cert: './smart-restaurant.crt',
    },
  },
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url)),
  //   },
  // },
})
