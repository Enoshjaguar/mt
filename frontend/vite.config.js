import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['jwt-decode'], // Ensure the dependency is bundled properly
  },
  plugins: [react()],
})

