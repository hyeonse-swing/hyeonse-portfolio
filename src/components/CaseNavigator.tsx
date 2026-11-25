'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import styles from './CaseNavigator.module.css';

type CaseSection = { id: string; title: string };

export default function CaseNavigator({ sections, locale }: { sections: readonly CaseSection[]; locale: 'ko' | 'en' }) {
  const [reading, setReading] = useState<{ active: string | null; percent: number }>({ active: null, percent: 0 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nodes = sections.map(({ id }) => document.getElementById(id));
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;

      const probe = window.innerHeight * .35;
      const start = first.getBoundingClientRect().top;
      const end = last.getBoundingClientRect().bottom;
      let active: string | null = null;
      for (const node of nodes) {
        if (node && node.getBoundingClientRect().top <= probe) active = node.id;
      }
      const percent = Math.max(0, Math.min(100, Math.round(100 * (probe - start) / Math.max(1, end - start))));

      setReading(previous => previous.active === active && previous.percent === percent ? previous : { active, percent });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('toggle', schedule, true);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('toggle', schedule, true);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  const title = locale === 'en' ? 'Case study contents' : '사례 목차';
  return (
    <aside className={styles.root}>
      <p className={styles.title}>{title}</p>
      <div
        className={styles.track}
        style={{ '--reading-progress': `${reading.percent}%` } as CSSProperties}
        role="progressbar"
        aria-label={locale === 'en' ? 'Case study reading progress' : '사례 읽기 진행률'}
        aria-valuenow={reading.percent}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      <nav className={styles.nav} aria-label={title}>
        {sections.map(({ id, title: label }) => (
          <a href={`#${id}`} key={id} aria-current={reading.active === id ? 'location' : undefined}>{label}</a>
        ))}
      </nav>
    </aside>
  );
}
