import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { visualizer } from "rollup-plugin-visualizer";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    visualizer({
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
      open: true, // 빌드 후 자동 오픈
    })
  ],
})
