import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { mediapipe } from 'vite-plugin-mediapipe'

export default defineConfig({
  plugins: [mediapipe(), react()],
  server: {
    proxy: {
      '/api/session': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        ws: true
      },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        ws: true
      },
    }
  }
})
