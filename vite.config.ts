/// <reference types="vitest/config" />
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
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: ['./src/setup-tests.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,vue}'],
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
      '**/node_modules/**',
      '**/dist/**'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.js'],
      exclude: [
        'src/main.ts',
        'src/constants.ts',
        'src/router/**',
        'src/vite-env.d.ts',
        'src/**/index.ts',
        'src/constants/**',
        'src/types/**',
        'src/components/**/index.vue',
        'src/composables/**/index.ts',
        'src/plugins/**',
        'node_modules/',
        'dist/',
        '**/*.d.ts',
      ],
    },
    css: true,
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
