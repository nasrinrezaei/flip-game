import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


const pathSrc = path.resolve(__dirname, './src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/global/mixins.scss";',
      },
    },
  },
})