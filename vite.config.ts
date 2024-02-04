import { defineConfig } from "vite";
import { resolve } from "path";
import pluginReact from "@vitejs/plugin-react";
import visualizer from "rollup-plugin-visualizer";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [pluginReact(), dts()],
  build: {
    target: "es2015",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "mugrid",
      formats: ["es", "umd"],
      fileName: (format) => `mugrid.${format}.js`,
    },
    rollupOptions: {
      plugins: [
        visualizer({
          open: true,
          filename: "bundle-analysis.html",
        }),
      ],
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
