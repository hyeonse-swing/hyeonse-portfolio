import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import subsetFont from 'subset-font';

const files = (await readdir('src', { recursive: true })).filter(file => /\.(?:tsx?|json)$/.test(file));
const source = (await Promise.all(files.map(file => readFile(`src/${file}`, 'utf8')))).join('');
const characters = [...new Set([...source].filter(char => char.codePointAt(0) > 0xff))].sort().join('');
const input = resolve(process.argv[2] || 'scripts/.font-cache/NotoSansKR.ttf');
const output = await subsetFont(await readFile(input), characters, { targetFormat: 'woff2' });
await writeFile('public/fonts/noto-kr-subset.woff2', output);
await writeFile('scripts/font-coverage.json', JSON.stringify({ characters }, null, 2) + '\n');
console.log(`${characters.length} non-Latin characters; ${(output.byteLength/1024).toFixed(1)} KiB WOFF2`);
