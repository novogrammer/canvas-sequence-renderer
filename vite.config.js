import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  build: {
    minify:false,
    sourcemap:true,
    target:'es2018',
    lib: {
      formats:['es','cjs'],
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'canvas-sequence-renderer',
      // the proper extensions will be added
      fileName: '[name]',
    },
    rollupOptions: {
      treeshake:false,
      output: {
        preserveModules:true,
        preserveModulesRoot:'lib',
        sourcemapExcludeSources:true,
      },
    },
  },
})