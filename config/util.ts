import { resolve } from 'node:path';

export const fileToPath = (...paths: string[]): string =>
  resolve('.', ...paths);
