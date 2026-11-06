'use client';

import { useEffect, useState, type ComponentProps } from 'react';
import { usePathname } from 'next/navigation';
import { readWorkFocus, withWorkFocus, type WorkFocus } from '../lib/work-focus';

type Props = ComponentProps<'a'> & { href: string; filteredLabel?: string };

export default function WorkContextLink({ href, filteredLabel, children, ...props }: Props) {
  const pathname = usePathname();
  const [focus, setFocus] = useState<WorkFocus>('all');

  useEffect(() => {
    const sync = () => setFocus(readWorkFocus(window.location.search));
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('portfolio:locationchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('portfolio:locationchange', sync);
    };
  }, [pathname]);

  return <a {...props} href={withWorkFocus(href, focus)}>
    {focus !== 'all' && filteredLabel ? filteredLabel : children}
  </a>;
}
