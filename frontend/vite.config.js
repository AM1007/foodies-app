import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      // Включаємо плагін тільки в продакшн-режимі
      mode === 'production'
        ? removeConsole({
            // Опції: залишаємо деякі методи консолі
            drop: false, // якщо true - видаляє всі виклики консолі
            drop_console: true, // видаляє console.*
            include: ['log'], // видаляємо тільки console.log
            exclude: ['error', 'warn'], // не видаляємо console.error та console.warn
          })
        : null,
    ].filter(Boolean),
  };
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
