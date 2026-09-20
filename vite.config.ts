import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [react()],
    server: {
      // Bloquear accesos externos no autorizados en entorno de desarrollo
      host: '127.0.0.1',
      port: 5173,
      strictPort: false,
    },
    build: {
      // Evitar la exposición de código fuente original sin minificar en producción
      sourcemap: false,
      // Asegurar nombres de archivos con hash criptográfico para invalidación de caché segura
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    esbuild: {
      // En producción, eliminar console.log y debugger para evitar fuga de información en runtime
      drop: isProd ? ['console', 'debugger'] : [],
    },
  };
});
