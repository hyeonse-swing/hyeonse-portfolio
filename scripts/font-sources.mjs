import { readdir, readFile } from 'node:fs/promises';

// Shared controls render Korean text too, even though they live outside src/.
export async function collectFontSources() {
  const files = (await readdir('src', { recursive: true }))
    .filter(file => /\.(?:tsx?|json)$/.test(file));
  const local = files.map(file => ({ name: `src/${file}`, path: `src/${file}` }));
  const shared = ['@hyeonse/design-system/react', '@hyeonse/design-system/preferences']
    .map(name => ({ name, path: new URL(import.meta.resolve(name)) }));
  return Promise.all([...local, ...shared].map(async ({ name, path }) => ({
    name, text: await readFile(path, 'utf8'),
  })));
}
