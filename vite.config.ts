import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  build: {
    // Ensure production bundles are minified (some deploys accidentally use dev-mode builds).
    minify: "terser",
    sourcemap: false,
    cssMinify: true,
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
  // (esbuild minify options intentionally omitted since we're using terser)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
