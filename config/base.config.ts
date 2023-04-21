import { loadEnv, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { fileToPath } from './util';

export default (mode: string): UserConfig => {
  const envMap = loadEnv(mode, fileToPath('env'));
  console.log(envMap, import.meta.url);

  return {
    envDir: fileToPath('env'),
    resolve: {
      alias: {
        '@': fileToPath('src'), // 设置 `@` 指向 `src` 目录
      },
    },
    plugins: [
      vue(),
      AutoImport({
        dts: fileToPath('types/auto-imports.d.ts'),
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dts: fileToPath('types/components.d.ts'),
        resolvers: [ElementPlusResolver()],
      }),
    ],
  };
};
