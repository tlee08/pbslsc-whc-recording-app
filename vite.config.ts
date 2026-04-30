import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/pbslsc-whc-recording-app/",
  plugins: [reactRouter()],
});
