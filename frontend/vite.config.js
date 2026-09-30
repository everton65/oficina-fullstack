import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite prepara o ambiente de desenvolvimento e transforma o JSX do React.
export default defineConfig({
  plugins: [react()],
  server: {
    // Fixar a porta evita que o Vite mude para uma origem não permitida no CORS.
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
});
