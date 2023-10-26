import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodeResolve } from '@rollup/plugin-node-resolve'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
