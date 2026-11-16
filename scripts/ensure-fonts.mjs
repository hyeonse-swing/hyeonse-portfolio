import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { collectFontSources } from './font-sources.mjs';

const coverage = JSON.parse(await readFile('scripts/font-coverage.json', 'utf8')).characters;
const missing = (await collectFontSources()).some(({ text }) => [...text].some(char => char.codePointAt(0) > 0xff && !coverage.includes(char)));
if (missing) {
  const fontPath = 'scripts/.font-cache/NotoSansKR.ttf';
  const expectedHash = '194018e6b2b293a7964f037b25c0249ce1418bc9ab3c971060a03aa57861e252';
  const hash = value => createHash('sha256').update(value).digest('hex');
  let font = await readFile(fontPath).catch(() => null);
  if (!font || hash(font) !== expectedHash) {
    const url = 'https://raw.githubusercontent.com/google/fonts/4efc2774c63917927efe769ca845def6bd6debae/ofl/notosanskr/NotoSansKR%5Bwght%5D.ttf';
    const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`Font download failed: ${response.status}`);
    font = Buffer.from(await response.arrayBuffer());
    if (hash(font) !== expectedHash) throw new Error('Font source integrity check failed');
    await mkdir('scripts/.font-cache', { recursive: true });
    await writeFile(fontPath, font);
  }
  await import('./subset-fonts.mjs');
} else {
  console.log('Font coverage is up to date.');
}
