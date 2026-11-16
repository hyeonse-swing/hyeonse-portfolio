import 'server-only';
import { localizedPath, type Locale } from './locale';
import { pageMetadata } from './metadata';
import { getNoteListPages } from './notes';
import { notePagePath } from './note-pagination';

export function noteListMetadata(locale: Locale, page = 1) {
  const en = locale === 'en';
  const path = notePagePath(page);
  const title = en ? `Notes${page > 1 ? ` · Page ${page}` : ''}` : `기록${page > 1 ? ` · ${page}페이지` : ''}`;
  const description = en ? 'Things I have built, problems I have worked through, and notes along the way.' : '만들어 본 것, 막혔던 문제, 그 과정에서 배운 것을 적어요.';
  const metadata = pageMetadata(locale, path, title, description);
  const languages = Object.fromEntries(getNoteListPages().filter(entry => entry.page === page)
    .map(entry => [entry.locale, localizedPath(entry.locale, path)]));
  return { ...metadata, alternates: { canonical: localizedPath(locale, path), languages: { ...languages, 'x-default': languages.ko ?? languages.en } } };
}
