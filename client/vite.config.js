import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import mkcert from'vite-plugin-mkcert'

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [react(),/* mkcert()*/],
  resolve: {
    alias: {
       '@': '/src/',
       '@images': '/src/assets/images/',
       '@styles': '/src/assets/stylesheets/',
       '@pages': '/src/pages/',
       '@hooks': '/src/hooks/',
       '@components': '/src/components/',
       '@utilities': '/src/utilities/',
       '@services': '/src/services/'
    }
  }
})
