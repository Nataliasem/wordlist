import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), analyzer({
      analyzerPort: 8889
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
