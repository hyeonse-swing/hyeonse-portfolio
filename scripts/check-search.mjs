import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

const source = fs.readFileSync(new URL('../src/lib/site-search-engine.ts', import.meta.url), 'utf8');
const javascript = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const { searchDocuments, isSearchIndex } = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`);
const document = (id, title, overrides = {}) => ({
  id, title, category: 'project', href: `/work/${id}/`, summary: '', content: '', keywords: [], featured: false, ...overrides,
});
const documents = [
  document('body', 'Other work', { content: 'React TypeScript Node.js 계약 관리' }),
  document('react', 'React project', { summary: 'TypeScript', featured: true }),
  document('korean', '계약 조회', { content: '직원의 주문과 계약 업무', featured: true }),
  document('constructor', 'JavaScript constructor'),
];

assert.equal(searchDocuments(documents, 'rEaCt')[0].id, 'react', '제목 일치가 본문 일치보다 먼저');
assert.deepEqual(searchDocuments(documents, '   ').map(item => item.id), ['react', 'korean'], '빈 검색은 바로 가기');
assert.deepEqual(searchDocuments(documents, 'react typescript').map(item => item.id), ['react', 'body'], '모든 검색어가 일치해야 함');
assert.equal(searchDocuments(documents, 'react 없는단어').length, 0, '일부 검색어만 일치하면 제외');
assert.equal(searchDocuments(documents, '계약')[0].id, 'korean', '한글 부분 검색');
assert.equal(searchDocuments(documents, '리액트')[0].id, 'react', '기술의 한국어 별칭');
assert.equal(searchDocuments(documents, '노드')[0].id, 'body', 'Node.js 별칭');
assert.equal(searchDocuments(documents, 'ＮＯＤＥ．ＪＳ')[0].id, 'body', '전각·구두점 정규화');
assert.equal(searchDocuments(documents, 'constructor')[0].id, 'constructor', '일반 단어가 객체의 프로토타입 이름과 충돌하지 않아야 함');
assert.deepEqual(searchDocuments(documents, '?!'), [], '구두점만 입력하면 결과 없음');
const duplicate = [documents[0], { ...documents[1], href: documents[0].href }];
assert.deepEqual(searchDocuments(duplicate, 'react').map(item => item.id), ['react'], '같은 목적지는 가장 잘 맞는 결과만 표시');

const index = { locale: 'ko', documents };
assert(isSearchIndex(index, 'ko'));
assert(!isSearchIndex(index, 'en'), '다른 언어 색인 거부');
for (const href of ['//example.com', '/\\example.com', 'javascript:alert(1)', '/en/about/']) {
  assert(!isSearchIndex({ ...index, documents: [{ ...documents[0], href }] }, 'ko'), `안전하지 않거나 언어가 다른 경로 거부: ${href}`);
}
assert(isSearchIndex({ locale: 'en', documents: [{ ...documents[0], href: '/en/work/example/#engineering' }] }, 'en'));
assert(!isSearchIndex({ ...index, documents: [documents[0], documents[0]] }, 'ko'), '중복 식별자 거부');
assert(!isSearchIndex({ ...index, documents: [{ ...documents[0], category: 'unknown' }] }, 'ko'), '정의되지 않은 분류 거부');
assert(!isSearchIndex({ ...index, documents: [{ ...documents[0], keywords: [null] }] }, 'ko'), '잘못된 키워드 거부');
assert(!isSearchIndex({ ...index, documents: [{ ...documents[0], content: {} }] }, 'ko'), '잘못된 본문 거부');
console.log('PASS site search: ranking, all terms, Korean/aliases, punctuation, duplicate destinations, safe localized index validation');
