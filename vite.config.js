    // import { defineConfig } from 'vite'
    // import react from '@vitejs/plugin-react'

    // export default defineConfig({
    //   plugins: [react()],
    //   server: {
    //     proxy: {
    //       '/api': {
    //         target: 'https://online-exam-backend.vercel.app',
    //         changeOrigin: true,
    //         secure: true, // Change to true for HTTPS
    //         // Remove the rewrite line
    //       }
    //     },
    //   }
    // })
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
      plugins: [react()],
      // server: {
      //   proxy: {
      //     '/api': {
      //       target:'https://online-exam-backend.vercel.app',
      //       changeOrigin: true,
      //       secure: true,
      //       rewrite: (path) => path.replace(/^\/api/, '') // Keep this if backend has no /api prefix
      //     }
      //   },
      // }
    })