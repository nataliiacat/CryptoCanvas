import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base:'/CryptoCanvas/',
  server: {
    open: true,
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://cardano-mainnet.blockfrost.io/api/v0',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
