export type SearchDocument = {
  id: string;
  title: string;
  category: 'page' | 'project' | 'experience' | 'skill' | 'tool';
  href: string;
  summary: string;
  content: string;
  keywords: string[];
  featured: boolean;
};

export type SearchIndex = { locale: 'ko' | 'en'; documents: SearchDocument[] };

const categories = new Set<SearchDocument['category']>(['page', 'project', 'experience', 'skill', 'tool']);
const aliases: Record<string, string> = {
  리액트: 'react', react: 'react',
  타입스크립트: 'typescript', typescript: 'typescript',
  플레이라이트: 'playwright', playwright: 'playwright',
  노드: 'nodejs', node: 'nodejs', nodejs: 'nodejs',
  넥스트: 'nextjs', next: 'nextjs', nextjs: 'nextjs',
};

function terms(value: string): string[] {
  const words = value.normalize('NFKC').toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
  return words.map(word => Object.hasOwn(aliases, word) ? aliases[word] : word);
}

function searchable(value: string): string {
  const words = terms(value);
  return ` ${words.join(' ')} ${words.join('')} `;
}

function fieldMatch(field: string, word: string): boolean {
  return field.includes(word);
}

export function searchDocuments(documents: readonly SearchDocument[], query: string): SearchDocument[] {
  const words = terms(query);
  if (!words.length && query.trim()) return [];

  const ranked = documents.flatMap((document, order) => {
    if (!words.length) return document.featured ? [{ document, order, score: 0 }] : [];
    const title = searchable(document.title);
    const keywords = searchable(document.keywords.join(' '));
    const summary = searchable(document.summary);
    const content = searchable(document.content);
    let score = 0;
    for (const word of words) {
      if (fieldMatch(title, word)) score += 100;
      else if (fieldMatch(keywords, word)) score += 65;
      else if (fieldMatch(summary, word)) score += 30;
      else if (fieldMatch(content, word)) score += 10;
      else return [];
    }
    return [{ document, order, score }];
  });
  ranked.sort((a, b) => b.score - a.score || a.order - b.order);

  const seen = new Set<string>();
  return ranked.filter(({ document }) => {
    if (seen.has(document.href)) return false;
    seen.add(document.href);
    return true;
  }).map(({ document }) => document);
}

export function isSearchIndex(value: unknown, locale: 'ko' | 'en'): value is SearchIndex {
  if (typeof value !== 'object' || value === null || !('locale' in value) || value.locale !== locale || !('documents' in value) || !Array.isArray(value.documents)) return false;
  const ids = new Set<string>();
  return value.documents.every((document: unknown) => {
    if (typeof document !== 'object' || document === null) return false;
    const item = document as Record<string, unknown>;
    if (typeof item.id !== 'string' || !item.id || ids.has(item.id)) return false;
    ids.add(item.id);
    if (typeof item.title !== 'string' || typeof item.summary !== 'string' || typeof item.content !== 'string') return false;
    if (!categories.has(item.category as SearchDocument['category'])) return false;
    if (typeof item.featured !== 'boolean' || !Array.isArray(item.keywords) || !item.keywords.every(keyword => typeof keyword === 'string')) return false;
    if (typeof item.href !== 'string' || !item.href.startsWith('/') || item.href.startsWith('//') || item.href.includes('\\')) return false;
    if (locale === 'en' ? !item.href.startsWith('/en/') : item.href.startsWith('/en/')) return false;
    return true;
  });
}
