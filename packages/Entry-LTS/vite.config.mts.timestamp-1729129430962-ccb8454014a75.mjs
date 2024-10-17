// vite.config.mts
import reactRefresh from "file:///C:/Users/user/AppData/Local/Yarn/Berry/cache/@vitejs-plugin-react-refresh-npm-1.3.6-7c2e86bd71-10c0.zip/node_modules/@vitejs/plugin-react-refresh/index.js";
import path from "path";
import { defineConfig } from "file:///C:/Users/user/Desktop/Entry-Mono/.yarn/__virtual__/vite-virtual-c18071b4e0/3/AppData/Local/Yarn/Berry/cache/vite-npm-5.4.2-65a106d8cf-10c0.zip/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "C:\\Users\\user\\Desktop\\Entry-Mono\\packages\\Entry-LTS";
function removeUseClientPlugin() {
  return {
    name: "remove-use-client",
    transform(code, id) {
      if (id.includes("@tanstack/react-query") || id.includes("@tanstack/react-query-devtools")) {
        return {
          code: code.replace(/^['"]use client['"];?\s*$/m, ""),
          map: null
        };
      }
    }
  };
}
var vite_config_default = defineConfig({
  optimizeDeps: {
    include: ["@tanstack/react-query", "@tanstack/react-query-devtools"]
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" }
  },
  server: {
    port: 3002
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
      "@entrydsm/design-system": path.resolve(__vite_injected_original_dirname, "../EntryDesignSystem/src/index.ts")
    }
  },
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 3500
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     },
    //   },
    // },
  },
  plugins: [reactRefresh(), removeUseClientPlugin()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEZXNrdG9wXFxcXEVudHJ5LU1vbm9cXFxccGFja2FnZXNcXFxcRW50cnktTFRTXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERlc2t0b3BcXFxcRW50cnktTW9ub1xcXFxwYWNrYWdlc1xcXFxFbnRyeS1MVFNcXFxcdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy91c2VyL0Rlc2t0b3AvRW50cnktTW9uby9wYWNrYWdlcy9FbnRyeS1MVFMvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHJlYWN0UmVmcmVzaCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1yZWZyZXNoJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5cclxuZnVuY3Rpb24gcmVtb3ZlVXNlQ2xpZW50UGx1Z2luKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAncmVtb3ZlLXVzZS1jbGllbnQnLFxyXG4gICAgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XHJcbiAgICAgIGlmIChpZC5pbmNsdWRlcygnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JykgfHwgaWQuaW5jbHVkZXMoJ0B0YW5zdGFjay9yZWFjdC1xdWVyeS1kZXZ0b29scycpKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGNvZGU6IGNvZGUucmVwbGFjZSgvXlsnXCJddXNlIGNsaWVudFsnXCJdOz9cXHMqJC9tLCAnJyksXHJcbiAgICAgICAgICBtYXA6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9O1xyXG59XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogWydAdGFuc3RhY2svcmVhY3QtcXVlcnknLCAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5LWRldnRvb2xzJ10sXHJcbiAgfSxcclxuICBlc2J1aWxkOiB7XHJcbiAgICBsb2dPdmVycmlkZTogeyAndGhpcy1pcy11bmRlZmluZWQtaW4tZXNtJzogJ3NpbGVudCcgfSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMixcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICcuL3NyYycpLFxyXG4gICAgICAnQGVudHJ5ZHNtL2Rlc2lnbi1zeXN0ZW0nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vRW50cnlEZXNpZ25TeXN0ZW0vc3JjL2luZGV4LnRzJyksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2J1aWxkJyxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMzUwMCxcclxuICAgIC8vIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgIC8vICAgb3V0cHV0OiB7XHJcbiAgICAvLyAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAvLyAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBpZC50b1N0cmluZygpLnNwbGl0KCdub2RlX21vZHVsZXMvJylbMV0uc3BsaXQoJy8nKVswXS50b1N0cmluZygpO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW3JlYWN0UmVmcmVzaCgpLCByZW1vdmVVc2VDbGllbnRQbHVnaW4oKV0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJWLE9BQU8sa0JBQWtCO0FBQ3BYLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUY3QixJQUFNLG1DQUFtQztBQUl6QyxTQUFTLHdCQUF3QjtBQUMvQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixVQUFVLE1BQU0sSUFBSTtBQUNsQixVQUFJLEdBQUcsU0FBUyx1QkFBdUIsS0FBSyxHQUFHLFNBQVMsZ0NBQWdDLEdBQUc7QUFDekYsZUFBTztBQUFBLFVBQ0wsTUFBTSxLQUFLLFFBQVEsOEJBQThCLEVBQUU7QUFBQSxVQUNuRCxLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLHlCQUF5QixnQ0FBZ0M7QUFBQSxFQUNyRTtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsYUFBYSxFQUFFLDRCQUE0QixTQUFTO0FBQUEsRUFDdEQ7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxPQUFPO0FBQUEsTUFDeEMsMkJBQTJCLEtBQUssUUFBUSxrQ0FBVyxtQ0FBbUM7QUFBQSxJQUN4RjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLHVCQUF1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBVXpCO0FBQUEsRUFDQSxTQUFTLENBQUMsYUFBYSxHQUFHLHNCQUFzQixDQUFDO0FBQ25ELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
