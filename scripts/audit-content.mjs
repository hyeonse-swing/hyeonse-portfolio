import { readFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
import { collectFontSources } from './font-sources.mjs';

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
for (const { name: file, text } of await collectFontSources()) {
  const missing = [...new Set([...text].filter(char => char.codePointAt(0) > 0xff && !fontCoverage.includes(char)))];
  assert.equal(missing.length, 0, `${file}: 글꼴 서브셋 재생성 필요: ${missing.join('')}`);
}
let checkedLinks = 0;
const canonicalPages = new Map();
const preview = process.env.VERCEL_ENV === 'preview';
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
    const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
    const pathname = `/${file.replace(/index\.html$/, '')}`;
    assert.equal(new URL(canonical).pathname, pathname, `${file}: canonical 경로 불일치`);
    canonicalPages.set(pathname, canonical);
    const robots = html.match(/<meta\b[^>]*name="robots"[^>]*content="([^"]+)"/)?.[1] || '';
    assert.equal(robots.includes('noindex'), preview, `${file}: 검색 노출 환경 정책 불일치`);
    assert.equal(robots.includes('nofollow'), preview, `${file}: 링크 추적 환경 정책 불일치`);
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
const expectedSite = new URL(process.env.NEXT_PUBLIC_SITE_URL || (preview && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://hyeonse.dev'));
for (const canonical of canonicalPages.values()) {
  const url = new URL(canonical);
  assert.equal(url.origin, expectedSite.origin, '대표 도메인 불일치');
  assert.equal(url.search + url.hash, '', 'canonical에 검색 조건이나 앵커가 포함되면 안 됩니다.');
}
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, body]) => ({
  body,
  url: body.match(/<loc>([^<]+)<\/loc>/)?.[1],
}));
assert.equal(sitemapEntries.length, canonicalPages.size, '사이트맵 페이지 수 불일치');
assert.deepEqual(sitemapEntries.map(entry => entry.url).sort(), [...canonicalPages.values()].sort(), '사이트맵은 공개 페이지의 canonical과 일치해야 합니다.');
for (const { body, url } of sitemapEntries) {
  const pathname = new URL(url).pathname;
  const koPath = pathname.startsWith('/en/') ? pathname.slice(3) : pathname;
  const expected = { ko: canonicalPages.get(koPath), en: canonicalPages.get(`/en${koPath}`), 'x-default': canonicalPages.get(koPath) };
  const alternates = Object.fromEntries([...body.matchAll(/<xhtml:link\b[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"[^>]*\/>/g)].map(([, locale, href]) => [locale, href]));
  assert.deepEqual(alternates, expected, `${pathname}: 사이트맵 언어 대체 링크 불일치`);
}
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
assert.match(robots, /User-Agent: \*/, '기본 크롤러 규칙 누락');
if (preview) {
  assert.match(robots, /^Disallow: \/$/m, '미리보기 검색 차단 누락');
  assert(!robots.includes('Sitemap:'), '미리보기에서는 사이트맵을 광고하지 않습니다.');
} else {
  assert.match(robots, /^Allow: \/$/m, '공개 페이지 검색 허용 누락');
  assert(robots.includes(`Sitemap: ${new URL('/sitemap.xml', expectedSite).href}`), '사이트맵 안내 주소 불일치');
}
const searchCounts = {};
let searchLinks = 0;
let searchIds;
for (const locale of ['ko', 'en']) {
  const text = await readFile(join(root, `search-index/${locale}.json`), 'utf8');
  for (const pattern of forbidden) assert(!pattern.test(text), `${locale}: 검색 자료에 공개 금지 패턴 ${pattern}`);
  const index = JSON.parse(text);
  assert.equal(index.locale, locale, '검색 자료 언어 불일치');
  assert(Array.isArray(index.documents) && index.documents.length > 0, '검색 자료 누락');
  const ids = index.documents.map(document => document.id);
  assert.equal(new Set(ids).size, ids.length, '검색 식별자 중복');
  if (searchIds) assert.deepEqual(ids, searchIds, '언어별 검색 항목 불일치');
  searchIds = ids;
  assert(index.documents.some(document => document.featured), '검색 바로 가기 누락');
  for (const document of index.documents) {
    assert(typeof document.id === 'string' && document.id && typeof document.title === 'string' && document.title, '검색 항목 식별자·제목 누락');
    assert(typeof document.summary === 'string' && typeof document.content === 'string', '검색 본문 형식 불일치');
    assert(['page', 'project', 'experience', 'skill', 'tool'].includes(document.category), '검색 분류 불일치');
    assert(typeof document.featured === 'boolean' && Array.isArray(document.keywords) && document.keywords.every(value => typeof value === 'string'), '검색 키워드·바로 가기 형식 불일치');
    assert(typeof document.href === 'string' && document.href.startsWith('/') && !document.href.startsWith('//') && !document.href.includes('\\'), '검색 결과는 안전한 내부 경로여야 합니다.');
    const url = new URL(document.href, 'https://search.invalid');
    assert.equal(url.origin, 'https://search.invalid');
    assert.equal(url.search, '', '검색 결과 경로에 검색어를 기록하지 않습니다.');
    assert.equal(url.pathname.startsWith('/en/'), locale === 'en', '검색 결과 언어 경로 불일치');
    const target = `${url.pathname.slice(1)}${url.pathname.endsWith('/') ? 'index.html' : ''}`;
    const html = await readFile(join(root, target), 'utf8');
    if (url.hash) assert(html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${document.id}: 없는 검색 결과 앵커 ${document.href}`);
    searchLinks++;
  }
  searchCounts[locale] = index.documents.length;
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
console.log(JSON.stringify({ pages: htmlFiles.length, languages: ['ko', 'en'], localLinks: checkedLinks, sitemapUrls: sitemapEntries.length, robots: preview ? 'preview-noindex' : 'public', searchDocuments: searchCounts, searchLinks, casesPerLanguage: data.featuredCases.length, otherWorkPerLanguage: data.otherWork.length, privateDataScan: 'passed' }, null, 2));
