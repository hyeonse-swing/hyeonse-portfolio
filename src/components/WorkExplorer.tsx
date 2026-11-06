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
    label: '관심 있는 경험부터 살펴보세요',
    filters: ['전체 작업', '운영 화면', '성능 개선', '전환과 이관'],
    descriptions: [
      '문제와 역할, 선택한 방법과 확인한 결과까지. 네 개의 사례에 담았어요.',
      '사용자의 선택과 조회 순서, 변경 후 캐시가 실제 업무 흐름과 맞도록 만들었어요.',
      '첫 화면에 필요한 자원을 구분하고, 같은 로컬 측정 조건에서 전후를 비교했어요.',
      '기존 업무가 이어지는 동안 데이터와 화면을 새 시스템으로 옮겼어요.',
    ],
    count: (n: number) => `${n}개의 사례`,
  },
  en: {
    label: 'Start with the experience you are looking for',
    filters: ['All work', 'Operations', 'Performance', 'Migrations'],
    descriptions: [
      'Four case studies: the problem, my role, the decisions and what I verified.',
      'Keeping selection, dependent queries and cache updates aligned with real workflows.',
      'Separating critical resources and comparing before and after under the same local conditions.',
      'Moving data and interfaces to new systems while existing workflows continued.',
    ],
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
      <span className={styles.label} id={`${id}-label`}>{t.label}</span>
      <div className={styles.filters} role="group" aria-labelledby={`${id}-label`}>
        {focusIds.map((item, index) => <button key={item} type="button" disabled={!ready} aria-pressed={focus === item} aria-controls={`${id}-results`} onClick={() => select(item)}>
          {t.filters[index]}<span aria-hidden="true">{item === 'all' ? cards.length : cards.filter(card => members[item].includes(card.id)).length.toString().padStart(2, '0')}</span>
        </button>)}
      </div>
      <div className={styles.context}>
        <p>{t.descriptions[focusIds.indexOf(focus)]}</p>
        <span role="status" aria-live="polite" aria-atomic="true">{t.count(visible.length)}</span>
      </div>
    </div>
    <div id={`${id}-results`} className={`work-grid ${styles.results}`} data-work-filter={focus}>
      {visible.map(card => card.content)}
    </div>
  </div>;
}
