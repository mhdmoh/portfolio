import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Project Pages URL: https://mhdmoh.github.io/mhdmoh-ai-portfolio/
export default defineConfig({
  base: "/mhdmoh-ai-portfolio/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
