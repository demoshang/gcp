import type { GlobOptions } from 'glob';

import debug from 'debug';
import { copy, ensureDir } from 'fs-extra';
import { glob } from 'glob';
import { parse, relative, resolve } from 'node:path';

const log = debug('gcp');

interface GcpOptions extends GlobOptions {
  cwd: string;
  base?: string[];
}

function getDestRelativePath(src: string, base: string[]) {
  for (const item of base) {
    if (src.startsWith(item)) {
      return relative(item, src);
    }
  }

  return parse(src).base;
}

async function globCopy(positionals: string[], options: GcpOptions) {
  if (options.debug) {
    debug.enable('gcp');
  }

  const { cwd, base } = options;

  log('gcp params', { positionals, options });

  const outDir = resolve(cwd, positionals.pop() ?? '');
  await ensureDir(outDir);
  log('gcp outDir', outDir);

  const patterns = [...positionals];

  const globOptions = { ...options, absolute: true, withFileTypes: false as const };
  log('glob params', { patterns, options: globOptions });

  const fileList = await glob(patterns, globOptions);
  log('glob result', fileList);

  const baseList = base?.map((v) => {
    return resolve(cwd, v);
  }) ?? [];

  log('gcp basedir', baseList);

  const copyList = fileList.map((src) => {
    const relativePath = getDestRelativePath(src, baseList);
    const dest = resolve(outDir, relativePath);

    return { src, dest };
  });

  log('gcp copy', copyList);

  await Promise.all(
    copyList.map(({ src, dest }) => {
      return copy(src, dest);
    }),
  );
}

export { globCopy };
