import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: '/',
  preBuild: {
    commands: ['npm ci']
  },
  build: {
    commands: ['npm run build']
  },
  artifacts: {
    baseDirectory: 'dist',
    files: ['**/*']
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode)
  }
}))