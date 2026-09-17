import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite dev server config
// -  The React plugin enables JSX transform + Fast Refresh (hot reload).
// -  `server.port` puts the client on port 3000, matching the CORS origin
//    we set in the Socket.io server (http://localhost:3000).
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 3000,
  },
});

