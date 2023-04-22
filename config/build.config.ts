import { defineConfig } from 'vite';
import gzipPlugin from 'rollup-plugin-gzip';
import { visualizer } from 'rollup-plugin-visualizer';
import baseConfig from './base.config';

export default defineConfig(({ mode }) => {
  const config = baseConfig();
  const plugins = [];

  if (mode === 'visualizer') {
    plugins.push(
      visualizer({
        emitFile: true,
        projectRoot: 'dist',
        filename: 'stats.html',
      }),
    );
  } else {
    plugins.push(gzipPlugin());
  }

  return Object.assign(config, {
    build: {
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash][extname]',
          manualChunks: (id: string): any => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
        plugins,
      },
    },
  });
});
