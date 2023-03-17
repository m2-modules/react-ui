import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import packageJson from "./package.json";

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: packageJson.name,
      formats: ["umd"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react/jsx-runtime"],
      output: {
        globals: {
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
});
