import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import buildConfig from './build.config';
import { fileToPath } from './util';

export default mergeConfig(
  buildConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileToPath(''),
    },
  }),
);
