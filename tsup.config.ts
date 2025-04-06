import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  clean: true,
  dts: false,
  entry: ['src/index.ts'],
  format: ['cjs'],
  sourcemap: true,
  minify: true,
  target: 'esnext',
  outDir: 'dist',
  treeshake: true,
  ...options
}))
