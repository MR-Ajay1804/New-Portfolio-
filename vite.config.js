import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/ask-ajay": {
        target: "https://ajaykumarsaini.me",
        changeOrigin: true,
        secure: true
      },
      "/.netlify/functions/ask-ajay": {
        target: "https://ajaykumarsaini.me",
        changeOrigin: true,
        secure: true
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        resume: resolve(__dirname, "resume.html")
      },
      output: {
        manualChunks: {
          three: ["three"],
          react: ["react", "react-dom"]
        }
      }
    }
  }
});
