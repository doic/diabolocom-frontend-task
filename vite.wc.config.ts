import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ customElement: true })],
  build: {
    rollupOptions: {
      input: {
        index: './index.wc.html'
      }
      // output: {
      //   entryFileNames: '[name].html'
      // }
    },
    outDir: 'dist-wc',
    lib: {
      entry: './src/main.wc.ts',
      name: 'web-components',
      formats: ['es', 'cjs'],
      fileName: 'lib-wc' //(format) => (format === 'es' ? 'index.js' : 'index.cjs')
    }
    // sourcemap: true,
    // target: 'esnext',
    // minify: false
  },
  define: {
    'process.env': process.env
  }
})
