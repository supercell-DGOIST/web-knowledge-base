import { defineConfig } from 'vite';
import baseConfig from './base.config';

export default defineConfig(() => {
  const config = baseConfig();

  return Object.assign(config, {
    preview: {
      port: 4041,
      open: true,
    },
  });
});
