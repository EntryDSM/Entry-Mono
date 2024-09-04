import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: './',
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@entrydsm/design-system': path.resolve(__dirname, '../EntryDesignSystem/src/index.ts'),
    },
  },
  build: {
    outDir: 'build',
  },
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tsconfigPaths from 'vite-tsconfig-paths';
// import path from 'path';

// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   optimizeDeps: {
//     exclude: ['pako'],
//     // esbuildOptions: {
//     //   include: ['pako'],
//     // },
//   },
//   server: {
//     port: 3001,
//   },
//   base: './',
//   resolve: {
//     alias: {
//       '@': '/src',
//       '@entrydsm/design-system': path.resolve(__dirname, '../EntryDesignSystem/src/index.ts'),
//       // pako: path.resolve(__dirname, 'node_modules/pako'),
//     },
//   },
//   build: {
//     commonjsOptions: {
//       include: [/node_modules/],
//     },
//   },
// });
