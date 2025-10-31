import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      // String syntax: '/api' will be proxied to 'http://localhost:5000/api'
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/r': {
          target: 'http://localhost:3000', // Your backend
          changeOrigin: true,
          secure: false,
        },
    },
    allowedHosts: [
        '.ngrok-free.dev' // Allows all ngrok-free.dev subdomains
      ]
  }
})
