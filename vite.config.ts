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
        coverage: {
            all: true,
            provider: 'v8',
            reporter: ['text'],
            include: ['src/**/*.ts'],
            exclude: ['node_modules/', 'dist/'],
        },
    }
})
