
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: mode === 'production',
    sourcemap: mode !== 'production',
    rollupOptions: {
      // For SSR
      input: {
        app: './index.html',
      },
    }
  },
  ssr: {
    // SSR options
    noExternal: ['react-router-dom'],
  }
}));
