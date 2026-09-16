import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nitro(),
  ],

  nitro: {
    serverDir: ".",
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    // Docker Desktop bind mounts and OneDrive do not always forward native
    // filesystem events. Polling keeps Vite HMR reliable in both environments.
    watch: {
      usePolling: true,
      interval: 300,
    },
  },

  preview: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
});
