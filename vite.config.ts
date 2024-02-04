import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    target: "es2015",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "mugrid",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      plugins: [
        visualizer({
          open: true,
          filename: "bundle-analysis.html",
        }),
      ],
      external: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@emotion/react": "emotion",
          "@emotion/styled": "styled",
        },
      },
    },
  },
});
