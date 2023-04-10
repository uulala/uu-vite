import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    host: '0.0.0.0',
    port: 90,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/scss/var.scss";'
      }
    }
  }
})
