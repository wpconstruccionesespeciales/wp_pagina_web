import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'

export default defineConfig({
  plugins: [reactRouter()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion')) return 'framer-motion'
          if (id.match(/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/)) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
