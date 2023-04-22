import { defineConfig } from 'vite';
import baseConfig from './base.config';

export default defineConfig(() => {
  const config = baseConfig();

  return Object.assign(config, {
    server: {
      port: 4040,
      open: true,
      cors: true,
      hmr: true,
      proxy: {},
    },
  });
});
