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
      name: 'filtered-image-generator',
      // the proper extensions will be added
      fileName: '[name]',
    },
    rollupOptions: {
      treeshake:false,
      output: {
        preserveModules:true,
        preserveModulesRoot:'src',
        sourcemapExcludeSources:true,
      },
    },
  },
})