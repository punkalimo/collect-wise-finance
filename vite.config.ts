import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Routes to prerender
const prerenderRoutes = ["/"];

// Custom prerender plugin
function prerenderPlugin() {
  return {
    name: "prerender-plugin",
    async buildStart() {
      // No-op during dev
    },
    async closeBundle() {
      // Only run in production build
      const fs = await import("fs");
      const pathModule = await import("path");
      const { spawn } = await import("child_process");

      const distDir = pathModule.resolve(__dirname, "dist");
      const indexHtml = pathModule.join(distDir, "index.html");

      if (!fs.existsSync(distDir)) return;

      console.log("Prerendering routes...");

      // Simple prerender: copy index.html to each route
      for (const route of prerenderRoutes) {
        const routePath = route === "/" ? "/" : route.replace(/^\/?$/, "/");
        const outputPath = route === "/" 
          ? indexHtml 
          : pathModule.join(distDir, route, "index.html");

        // Create directory if needed
        const dir = pathModule.dirname(outputPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // For SPA, we keep the same index.html for all routes
        // The actual routing happens client-side
        if (!fs.existsSync(outputPath)) {
          fs.copyFileSync(indexHtml, outputPath);
        }
      }
      console.log("✅ Prerendered routes:", prerenderRoutes.join(", "));
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    mode === "production" && prerenderPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure proper build output
  build: {
    assetsDir: "assets",
    sourcemap: false,
  },
}));
