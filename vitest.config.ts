import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    exclude: ['**/node_modules/**', '.claude/**'],
  },
  define: {
    __PKG_VERSION__: JSON.stringify('test'),
    __FULL_BUILD__: JSON.stringify(true),
  },
});
