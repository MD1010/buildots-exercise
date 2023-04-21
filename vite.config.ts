import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      baseUI: "/src/baseUI",
      components: "/src/components",
      utils: "/src/utils",
      hooks: "/src/hooks",
    },
  },
});
