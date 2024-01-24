import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   "process.env": {
  //     OPENAI_API_KEY: JSON.stringify(import.meta.env.OPENAI_API_KEY),
  //   },
  // },
});

