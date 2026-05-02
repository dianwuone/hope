import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isBaota = env.VITE_BAOTA === 'true'

  return {
    // 默认适配 GitHub Pages，宝塔使用 VITE_BAOTA=true
    base: isBaota ? '/' : '/hope/',
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
  }
})
