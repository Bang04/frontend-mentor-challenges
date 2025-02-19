import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/frontend-mentor-challenges/entertainment-webapp/",
  plugins: [react()],
  build: {
    outDir: './dist/entertainment-webapp/'
}
})
