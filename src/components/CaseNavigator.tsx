'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './CaseNavigator.module.css';

export type CaseSection = { id: string; title: string };

export default function CaseNavigator({ sections, locale }: { sections: readonly CaseSection[]; locale: 'ko' | 'en' }) {
  const [reading, setReading] = useState<{ active: string | null; percent: number }>({ active: null, percent: 0 });
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nodes = sections.map(({ id }) => document.getElementById(id));
      if (nodes.some(node => !node)) return;
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      const probe = window.scrollY + window.innerHeight * .35;
      const start = window.scrollY + first.getBoundingClientRect().top;
      const end = window.scrollY + last.getBoundingClientRect().bottom;
      let active: string | null = null;
      for (const node of nodes) {
        if (node && window.scrollY + node.getBoundingClientRect().top <= probe) active = node.id;
      }
      const percent = Math.max(0, Math.min(100, Math.round(((probe - start) / Math.max(1, end - start)) * 100)));
      setReading(previous => previous.active === active && previous.percent === percent ? previous : { active, percent });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || nav.scrollWidth <= nav.clientWidth) return;
    // Keep manual keyboard navigation in place; scroll only the horizontal rail.
    if (nav.contains(document.activeElement) && document.activeElement?.matches(':focus-visible')) return;
    const active = nav.querySelector('[aria-current]');
    if (!active) return;
    const viewport = nav.getBoundingClientRect();
    const item = active.getBoundingClientRect();
    if (item.left < viewport.left) nav.scrollLeft += item.left - viewport.left - 4;
    else if (item.right > viewport.right) nav.scrollLeft += item.right - viewport.right + 4;
  }, [reading.active]);

  const activeTitle = sections.find(section => section.id === reading.active)?.title;
  return <aside className={`case-index ${styles.root}`} style={{ '--reading-progress': `${reading.percent}%` } as CSSProperties}>
    <div className={styles.heading}>
      <span className="eyebrow">{locale === 'en' ? 'IN THIS STORY' : '사례 목차'}</span>
      <span className={styles.percent} aria-hidden="true">{String(reading.percent).padStart(2, '0')}%</span>
    </div>
    <div className={styles.track} role="progressbar" aria-label={locale === 'en' ? 'Case study reading progress' : '사례 읽기 진행률'} aria-valuenow={reading.percent} aria-valuemin={0} aria-valuemax={100} />
    <p className={styles.current} aria-live="off">{activeTitle ?? (locale === 'en' ? 'Start reading ↓' : '아래에서 읽기 시작 ↓')}</p>
    <nav ref={navRef} className={styles.nav} aria-label={locale === 'en' ? 'Case study contents' : '사례 목차'}>
      {sections.map(({ id, title }, index) => <a href={`#${id}`} key={id} aria-current={reading.active === id ? 'location' : undefined}>
        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{title}
      </a>)}
    </nav>
  </aside>;
}
