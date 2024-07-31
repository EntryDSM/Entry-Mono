import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), reactRefresh()],
  server: {
    port: 3003,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
