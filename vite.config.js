import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  base: './', // MUDE PARA './' (com um ponto antes da barra)
})
