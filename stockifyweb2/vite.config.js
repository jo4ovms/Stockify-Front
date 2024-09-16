import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    historyApiFallback: true, // Isso garante que o Vite lide com o roteamento corretamente
  },
  resolve: {
    alias: {
      "@": "/src", // Ajuste para refletir a estrutura do seu projeto
    },
  },
});
