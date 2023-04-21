import { defineConfig } from 'vite';
import baseConfig from './base.config';

export default defineConfig(({ mode }) => {
  const config = baseConfig(mode);

  return Object.assign(config, {});
});
