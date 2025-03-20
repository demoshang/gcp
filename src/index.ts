import process from 'node:process';

import type { GcpOptions } from './glob-copy';

import { globCopy as cp } from './glob-copy';

async function globCopy(patterns: string | string[], outDir: string, options?: GcpOptions) {
  const positionals: string[] = [];

  if (Array.isArray(patterns)) {
    positionals.push(...patterns);
  } else {
    positionals.push(patterns);
  }

  positionals.push(outDir);

  await cp(positionals, {
    cwd: process.cwd(),
    nodir: true,
    debug: false,
    absolute: true,
    withFileTypes: false,

    ...options,
  });
}

export { globCopy };
