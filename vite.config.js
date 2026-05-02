import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 默认适配 GitHub Pages，宝塔使用 VITE_BAOTA=true
const base = process.env.VITE_BAOTA === 'true' ? '/' : '/hope/'

export default defineConfig({
  base,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
})
