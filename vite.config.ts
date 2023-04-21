import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://k4g5uwrgk3.execute-api.eu-west-1.amazonaws.com",
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
