export type Locale = 'ko' | 'en';

export function localizedPath(locale: Locale, path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return locale === 'en' ? `/en${path}` : path;
}

export function alternatePath(pathname: string, locale: Locale): string {
  const path = pathname === '/en' ? '/' : pathname.startsWith('/en/') ? pathname.slice(3) : pathname;
  return localizedPath(locale, path || '/');
}
