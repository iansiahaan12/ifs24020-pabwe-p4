import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
    },
    define: {
      DELCOM_BASEURL: JSON.stringify(env.VITE_DELCOM_BASEURL || 'https://open-api.delcom.org/api/v1'),
    },
    build: {
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('sweetalert2')) {
                return 'sweetalert2'
              }
              if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
                return 'redux-vendor'
              }
              if (id.includes('react-router-dom') || id.includes('react-router')) {
                return 'router-vendor'
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'react-vendor'
              }
              return 'vendor'
            }
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  }
})