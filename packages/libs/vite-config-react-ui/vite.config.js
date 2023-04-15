const react = require("@vitejs/plugin-react");
const dts = require("vite-plugin-dts");

module.exports = {
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "index",
      formats: ["cjs", "es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
};
