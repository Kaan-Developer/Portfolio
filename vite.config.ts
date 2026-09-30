import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * GitHub Pages proje sayfaları https://<kullanici>.github.io/<repo>/ altında
 * yayınlanır. Bu yüzden build çıktısındaki asset yolları repo adıyla
 * başlamak zorundadır. Dev sunucusu (pnpm dev) kök dizinden çalışmaya devam
 * etsin diye base sadece build sırasında uygulanır.
 */
const REPO_NAME = "Portfolio";

export default defineConfig(({ command }) => ({
  base: command === "build" ? `/${REPO_NAME}/` : "/",
  plugins: [react(), tailwindcss()],
}));
