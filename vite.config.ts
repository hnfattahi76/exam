import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from "rollup-plugin-visualizer"

// https://vite.dev/config/

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(),
    visualizer({ open: true, filename: "dist/stats.html", gzipSize: true, brotliSize: true })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'src')
    }
  },
  build: {
    target: 'es2015',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    rollupOptions: {
      preserveEntrySignatures: "exports-only",
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
      output: {
        compact: true,
        hoistTransitiveImports: false,
        inlineDynamicImports: false,
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
              return "react"
            }
            return "vendor"
          }
        },
      }
    }
  }
})
