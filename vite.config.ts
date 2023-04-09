import { fileURLToPath, URL } from 'node:url';
import { defineConfig, type ServerOptions } from 'vite';
import { env } from 'process';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const isTextEnv = env.NODE_ENV === 'test';

const serverOption: ServerOptions = {
  port: 4040,
  open: true,
};

const setServer = (): ServerOptions => {
  const server = {
    cors: true,
  };
  return Object.assign(server, serverOption);
};

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 设置打包路径
  envDir: 'env',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // 设置 `@` 指向 `src` 目录
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  preview: !isTextEnv ? serverOption : {},
  server: !isTextEnv ? setServer() : {},
});
