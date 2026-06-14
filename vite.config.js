import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Cambia 'preorder-html-instrucciones' por el nombre de tu repositorio en GitHub
  // Si tu repositorio se llama "mi-proyecto", esto debe ser "/mi-proyecto/"
  base: '/preorder-html-instrucciones/'
})
