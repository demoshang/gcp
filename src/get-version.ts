import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

async function pathExists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function getPackageJsonPath() {
  const DIR = dirname(fileURLToPath(import.meta.url));

  const list = [
    resolve(DIR, './package.json'),
    resolve(DIR, '../package.json'),
  ];

  for (const p of list) {
    if (await pathExists(p)) {
      return p;
    }
  }
}

async function getVersion(): Promise<string> {
  const path = await getPackageJsonPath();
  if (!path) {
    return 'unknown';
  }

  const content = await readFile(path, 'utf8');

  try {
    const pkg = JSON.parse(content);
    return pkg.version;
  } catch {
    return 'unknown';
  }
}

export { getVersion };
