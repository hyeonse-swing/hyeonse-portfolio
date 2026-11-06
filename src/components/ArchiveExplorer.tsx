'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './ArchiveExplorer.module.css';

type ArchiveExplorerProps = {
  locale: 'ko' | 'en';
  children: ReactNode;
  total: number;
};

const SEARCH_TARGET_SELECTOR = 'details[data-search-target]';

export default function ArchiveExplorer({ locale, children, total }: ArchiveExplorerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openCount, setOpenCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const isKorean = locale === 'ko';

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const syncOpenCount = () => {
      const details = Array.from(root.querySelectorAll<HTMLDetailsElement>(SEARCH_TARGET_SELECTOR));
      setOpenCount(details.filter((detail) => detail.open).length);
    };

    root.addEventListener('toggle', syncOpenCount, true);
    syncOpenCount();
    setHydrated(true);

    return () => root.removeEventListener('toggle', syncOpenCount, true);
  }, []);

  const setAllOpen = (open: boolean) => {
    const root = rootRef.current;
    if (!root) return;

    const details = Array.from(root.querySelectorAll<HTMLDetailsElement>(SEARCH_TARGET_SELECTOR));
    details.forEach((detail) => { detail.open = open; });
    setOpenCount(details.filter((detail) => detail.open).length);
  };

  const allOpen = openCount >= total;

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.toolbar}>
        <div className={styles.controls} role="group" aria-label={isKorean ? '아카이브 항목 펼침 제어' : 'Archive item expansion controls'}>
          <button type="button" onClick={() => setAllOpen(true)} disabled={!hydrated || allOpen}>
            {isKorean ? '모두 펼치기' : 'Expand all'}
          </button>
          <button type="button" onClick={() => setAllOpen(false)} disabled={!hydrated || openCount === 0}>
            {isKorean ? '모두 접기' : 'Collapse all'}
          </button>
        </div>
        <p className={styles.status} role="status" aria-live="polite" aria-atomic="true">
          {openCount} / {total} {isKorean ? '펼침' : 'open'}
        </p>
      </div>
      {children}
    </div>
  );
}
