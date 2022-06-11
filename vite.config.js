import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import typescript2 from "rollup-plugin-typescript2";
// https://vitejs.dev/config/
// export default ({ mode }) => {
//   const env = loadEnv(mode, process.cwd())
//   return defineConfig({
//     define: {
//       'process.env': { ...env }
//     },
//     plugins: [vue()]
//   })
// }

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    define: {
      'process.env': { ...env }
    },
    plugins: [
      vue(),
      typescript2({
        check: false,
        allowJs: true,
        include: ["src/components/*.vue", "*.js+(|x)", "**/*.js+(|x)"],
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: true,
            declaration: true,
            declarationMap: true,
          },
          exclude: ["vite.config.js", "main.js"],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      cssCodeSplit: false,
      lib: {
        entry: "./src/MessageWindowPlugin.js",
        formats: ["es", "cjs"],
        name: "MessageWindowPlugin",
        fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  })
}
