'use client';

import { usePathname } from 'next/navigation';
import { alternatePath, localizedPath, type Locale } from '../lib/locale';
import WorkContextLink from './WorkContextLink';

export default function SiteNavigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const normalizedPath = `${alternatePath(pathname || '/', 'ko').replace(/\/+$/, '')}/`;
  const isWorkDetail = /^\/work\/[^/]+\/$/.test(normalizedPath);

  return <>
    <WorkContextLink href={localizedPath(locale, '/#work')} aria-current={isWorkDetail ? 'location' : undefined}>Work<span>04</span></WorkContextLink>
    <a href={localizedPath(locale, '/about/')} aria-current={normalizedPath === '/about/' ? 'page' : undefined} tabIndex={0}>About</a>
    <a href={localizedPath(locale, '/studio/')} aria-current={normalizedPath === '/studio/' ? 'page' : undefined} tabIndex={0}>Studio</a>
  </>;
}
