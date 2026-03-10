import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "JsonformsShadcnVueRenderers",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs")
    },
    rollupOptions: {
      external: ["vue", "@jsonforms/core", "@jsonforms/vue"]
    },
    outDir: "dist",
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../../app"),
      "~": resolve(__dirname, "../../app")
    }
  }
});
