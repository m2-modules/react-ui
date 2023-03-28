const react = require("@vitejs/plugin-react");
const dts = require("vite-plugin-dts");
const packageJson = require("./package.json");

module.exports = {
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: packageJson.name,
      formats: ["cjs", "es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
};
