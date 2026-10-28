import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Shared controls render Korean text too, even though they live outside src/.
export async function collectFontSources() {
  const local = (await readdir('src', { recursive: true, withFileTypes: true }))
    .filter(entry => entry.isFile() && /\.(?:tsx?|json)$/.test(entry.name))
    .map(entry => ({ name: join(entry.parentPath, entry.name), path: join(entry.parentPath, entry.name) }));
  const shared = ['@hyeonse/design-system/react', '@hyeonse/design-system/preferences']
    .map(name => ({ name, path: new URL(import.meta.resolve(name)) }));
  return Promise.all([...local, ...shared].map(async ({ name, path }) => ({
    name, text: await readFile(path, 'utf8'),
  })));
}
