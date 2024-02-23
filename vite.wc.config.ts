import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { compilerOptions: { isCustomElement: (tag) => tag.includes('-') } }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        index: './index.wc.html',
        main: './src/main.wc.ts'
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      },
      plugins: [
        copy({
          targets: [{ src: './dist-wc/index.wc.html', dest: 'dist-wc', rename: 'index.html' }],
          hook: 'writeBundle'
        })
      ]
    },

    outDir: 'dist-wc',
    lib: {
      entry: './src/main.wc.ts',
      name: 'web-components',
      formats: ['es'],
      fileName: 'main'
    }
    // sourcemap: true,
    // target: 'esnext',
    // minify: false
  },
  define: {
    'process.env': process.env
  }
})
