import { defineConfig } from 'vite';
import baseConfig from './base.config';

export default defineConfig(({ mode }) => {
  const config = baseConfig(mode);

  return Object.assign(config, {
    server: {
      port: 4040,
      open: true,
      cors: true,
      proxy: {},
    },
  });
});
