import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      port: env.VITE_PORT || 3000, // Dynamically set port from .env file
      strictPort: true, // Prevents random port assignment if 3000 is busy
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
      cors: {
        origin: '*', // Allow requests from all origins (adjust if necessary)
      },
    },
    define: {
      'process.env': env, // Ensure environment variables are available
    },
  };
});
