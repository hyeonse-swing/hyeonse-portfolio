'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { alternatePath, type Locale } from '../lib/locale';

export default function LanguageSwitcher({ locale, notePaths = [] }: { locale: Locale; notePaths?: readonly string[] }) {
  const pathname = usePathname();
  const target = locale === 'ko' ? 'en' : 'ko';
  const [suffix, setSuffix] = useState('');
  const alternate = alternatePath(pathname || '/', target);
  const normalized = `${alternate.replace(/\/+$/, '')}/`;
  const missingTranslation = /^\/(?:en\/)?notes\/(?:[^/]+|page\/[1-9]\d*)\/$/.test(normalized) && !notePaths.includes(normalized);

  useEffect(() => {
    const update = () => {
      const query = new URLSearchParams(window.location.search);
      query.delete('giscus');
      setSuffix((query.size ? `?${query}` : '') + window.location.hash);
    };
    update();
    window.addEventListener('hashchange', update);
    window.addEventListener('popstate', update);
    window.addEventListener('portfolio:locationchange', update);
    return () => {
      window.removeEventListener('hashchange', update);
      window.removeEventListener('popstate', update);
      window.removeEventListener('portfolio:locationchange', update);
    };
  }, [pathname]);

  return <a
    className="language-switch"
    href={missingTranslation ? (target === 'en' ? '/en/notes/' : '/notes/') : alternate + suffix}
    hrefLang={target}
    lang={target}
    aria-label={target === 'en' ? 'EN — Switch to English' : 'KO — 한국어로 전환'}
    title={target === 'en' ? 'English' : '한국어'}
  >{target.toUpperCase()}</a>;
}
