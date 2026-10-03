import { readFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('out');
const entries = await readdir(root, { recursive: true });
const htmlFiles = entries.filter(file => file.endsWith('.html') && !file.startsWith('_not-found/') && !file.startsWith('_global-not-found/') && file !== '404/index.html');
assert.equal(htmlFiles.length, 15, '한국어·영어 각 7페이지와 공통 404 페이지가 있어야 합니다.');
const forbidden = [
  /github\.com\/(?:the-swing|reverse-lab-corporation|IHyeon)(?:\/|["<\s])/i,
  /(?:linear\.app|slack\.com|atlassian\.net)/i,
  /(?<!\d)01[016789][- ]?\d{3,4}[- ]?\d{4}(?!\d)/,
  /(?:\/Users\/|private\/evidence|private\/portfolio)/,
  /(?:ghp_|github_pat_|sk-proj-)[A-Za-z0-9_]{10,}/,
];
const fontCoverage = JSON.parse(await readFile('scripts/font-coverage.json', 'utf8')).characters;
const sourceFiles = (await readdir('src', { recursive: true })).filter(file => /\.(?:tsx?|json)$/.test(file));
for (const file of sourceFiles) {
  const text = await readFile(`src/${file}`, 'utf8');
  const missing = [...new Set([...text].filter(char => char.codePointAt(0) > 0xff && !fontCoverage.includes(char)))];
  assert.equal(missing.length, 0, `${file}: 글꼴 서브셋 재생성 필요: ${missing.join('')}`);
}
let checkedLinks = 0;
for (const file of htmlFiles) {
  const html = await readFile(join(root, file), 'utf8');
  for (const pattern of forbidden) assert(!pattern.test(html), `${file}: 공개 금지 패턴 ${pattern}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: h1은 하나여야 합니다.`);
  if (file !== '404.html') {
    const locale = file.startsWith('en/') ? 'en' : 'ko';
    assert(html.includes(`<html lang="${locale}"`), `${file}: 서버 HTML 언어 불일치`);
    assert.match(html, /rel="canonical"/, `${file}: canonical 누락`);
    assert.match(html, /hrefLang="ko"/, `${file}: 한국어 alternate 누락`);
    assert.match(html, /hrefLang="en"/, `${file}: 영어 alternate 누락`);
  }
  for (const [, url] of html.matchAll(/href="([^"]+)"/g)) {
    if (!url.startsWith('/') && !url.startsWith('#')) continue;
    if (url.startsWith('/_next/') || /\.(?:woff2|svg|png)$/.test(url)) continue;
    const [pathname, hash] = url.split('#');
    let target = pathname ? pathname.slice(1) : file;
    if (target === '' || target.endsWith('/')) target += 'index.html';
    const targetText = await readFile(join(root, target), 'utf8');
    if (hash) assert(targetText.includes(`id="${hash}"`), `${file}: 없는 앵커 ${url}`);
    checkedLinks++;
  }
}
const data = JSON.parse(await readFile('src/data/content.json', 'utf8'));
const english = JSON.parse(await readFile('src/data/en/content.json', 'utf8'));
assert.deepEqual(english.featuredCases.map(item => item.id), data.featuredCases.map(item => item.id), '언어별 대표 사례 일치');
assert.deepEqual(english.otherWork.map(item => item.id), data.otherWork.map(item => item.id), '언어별 프로젝트 일치');
for (const key of ['email', 'github', 'linkedin']) assert.equal(english.identity[key], data.identity[key], `공개 연락처 ${key} 유지`);
assert.equal(data.identity.github, 'https://github.com/hyeonse-swing');
assert.equal(data.featuredCases.length, 4);
const performanceCase = data.featuredCases.find(item => item.id === 'swing-home-performance');
assert.match(performanceCase.verification, /로컬.*3회.*5회.*중앙값/);
assert.match(performanceCase.boundary, /실사용자/);
assert.equal(data.otherWork.find(item => item.id === 'opensource').period, '2025.06');
console.log(JSON.stringify({ pages: htmlFiles.length, languages: ['ko', 'en'], localLinks: checkedLinks, casesPerLanguage: data.featuredCases.length, otherWorkPerLanguage: data.otherWork.length, privateDataScan: 'passed' }, null, 2));
