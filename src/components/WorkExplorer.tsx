'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import type { Locale } from '../lib/locale';
import { readWorkFocus, workFocusIds as focusIds, type WorkFocus as Focus } from '../lib/work-focus';
import styles from './WorkExplorer.module.css';

const members: Record<Focus, readonly string[]> = {
  all: [],
  operations: ['bike-operations', 'yellow-bus'],
  performance: ['swing-home-performance'],
  migration: ['yellow-bus', 'swap-admin-v2'],
};
const copy = {
  ko: {
    label: '대표 작업 필터',
    filters: ['전체 작업', '운영 화면', '성능 개선', '전환과 이관'],
    count: (n: number) => `${n}개의 사례`,
  },
  en: {
    label: 'Filter selected work',
    filters: ['All work', 'Operations', 'Performance', 'Migrations'],
    count: (n: number) => `${n} ${n === 1 ? 'case study' : 'case studies'}`,
  },
};

export default function WorkExplorer({ locale, cards }: { locale: Locale; cards: readonly { id: string; content: ReactNode }[] }) {
  const [focus, setFocus] = useState<Focus>('all');
  const [ready, setReady] = useState(false);
  const id = useId();
  const t = copy[locale];

  useEffect(() => {
    const sync = () => setFocus(readWorkFocus(window.location.search));
    sync();
    setReady(true);
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const select = (next: Focus) => {
    if (next === focus) return;
    const url = new URL(window.location.href);
    if (next === 'all') url.searchParams.delete('work');
    else url.searchParams.set('work', next);
    url.hash = 'work';
    window.history.pushState(null, '', url);
    window.dispatchEvent(new Event('portfolio:locationchange'));
    setFocus(next);
  };
  const visible = cards.filter(card => focus === 'all' || members[focus].includes(card.id));

  return <div>
    <div className={styles.explorer}>
      <div className={styles.filters} role="group" aria-label={t.label}>
        {focusIds.map((item, index) => <button key={item} type="button" disabled={!ready} aria-pressed={focus === item} aria-controls={`${id}-results`} onClick={() => select(item)}>
          {t.filters[index]}
        </button>)}
      </div>
      <span className={styles.status} role="status" aria-live="polite" aria-atomic="true">{t.count(visible.length)}</span>
    </div>
    <div id={`${id}-results`} className={styles.results} data-work-filter={focus}>
      {visible.map(card => card.content)}
    </div>
  </div>;
}
