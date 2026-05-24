import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // only use for development, in production you should use a real server to serve the API

  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:4000',
  //       changeOrigin: true
  //     }
  //   }
  // }
})