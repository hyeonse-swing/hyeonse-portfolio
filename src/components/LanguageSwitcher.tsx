'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { alternatePath, type Locale } from '../lib/locale';

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const target = locale === 'ko' ? 'en' : 'ko';
  const [suffix, setSuffix] = useState('');

  useEffect(() => {
    const update = () => setSuffix(window.location.search + window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    window.addEventListener('popstate', update);
    return () => {
      window.removeEventListener('hashchange', update);
      window.removeEventListener('popstate', update);
    };
  }, [pathname]);

  return <a
    className="language-switch"
    href={alternatePath(pathname || '/', target) + suffix}
    hrefLang={target}
    lang={target}
    aria-label={target === 'en' ? 'Switch to English' : '한국어로 전환'}
    title={target === 'en' ? 'English' : '한국어'}
  >{target.toUpperCase()}</a>;
}
