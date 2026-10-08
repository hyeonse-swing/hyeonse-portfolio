'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { KeyboardEvent } from 'react';
import type { Locale } from '../lib/locale';
import type { LanyardControls } from './Lanyard';
import BadgePrint from './BadgePrint';
import { badgeIdentity as identity, createBadgeArtwork } from '../lib/badge-artwork';
import { usePreferences } from './SitePreferences';
import styles from './IdentityBadge.module.css';

const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false });

export default function IdentityBadge({ className = '', locale = 'ko' }: { className?: string; locale?: Locale }) {
  const { preferences } = usePreferences();
  const controls = useRef<LanyardControls | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [cardRect, setCardRect] = useState<{ left: number; top: number; width: number; height: number }>();
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [compact, setCompact] = useState(false);
  const [dark, setDark] = useState(false);
  const [image, setImage] = useState<string>();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const hintId = useId();
  const en = locale === 'en';

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const small = matchMedia('(max-width: 700px), (pointer: coarse)');
    const sync = () => {
      const allowed = !motion.matches && document.documentElement.dataset.motion !== 'reduced';
      setMotionAllowed(allowed);
      setCompact(small.matches);
      setDark(document.documentElement.dataset.theme === 'dark');
      if (!allowed) setReady(false);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion', 'data-theme'] });
    motion.addEventListener('change', sync);
    small.addEventListener('change', sync);
    window.addEventListener('portfolio:preferences', sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', sync);
      small.removeEventListener('change', sync);
      window.removeEventListener('portfolio:preferences', sync);
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!card.current || !viewport.current) return;
      const badge = card.current.getBoundingClientRect();
      const frame = viewport.current.getBoundingClientRect();
      const next = { left: badge.left - frame.left, top: badge.top - frame.top, width: badge.width, height: badge.height };
      setCardRect(previous => previous && Object.keys(next).every(key => Math.abs(previous[key as keyof typeof next] - next[key as keyof typeof next]) < .1) ? previous : next);
    };
    const observer = new ResizeObserver(measure);
    if (card.current) observer.observe(card.current);
    if (viewport.current) observer.observe(viewport.current);
    window.addEventListener('resize', measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  useEffect(() => {
    if (!motionAllowed || failed) return;
    let cancelled = false;
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-solid').trim();
    void createBadgeArtwork(locale, accent).then(value => {
      if (!cancelled) setImage(value);
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [locale, preferences.accent, motionAllowed, failed]);

  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => { setFailed(true); setReady(false); }, []);
  const interactive = motionAllowed && ready && !failed;
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive || !controls.current || event.target !== event.currentTarget) return;
    if (event.key === 'Home' || event.key === 'Escape') {
      event.preventDefault(); controls.current.reset(); return;
    }
    const movement: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] };
    const delta = movement[event.key];
    if (delta) { event.preventDefault(); controls.current.nudge(...delta); }
    if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
      event.preventDefault(); controls.current.flip();
    }
  };

  return <div className={`${styles.scene} ${className}`} data-badge-scene data-renderer={interactive ? 'webgl' : 'fallback'} role="group" aria-label={en ? 'Hyeonse Im portfolio badge' : '임현세 포트폴리오 배지'} aria-describedby={interactive ? hintId : undefined} tabIndex={interactive ? 0 : undefined} onKeyDown={onKeyDown}>
    <div className={styles.fallback} aria-hidden="true">
      <div className={styles.strap} />
      <div ref={card} className={styles.card} data-badge-card>
        <BadgePrint locale={locale} />
        <div className={styles.slot} />
      </div>
      <svg className={styles.hardware} viewBox="-.3 -.25 .6 .45" aria-hidden="true">
        <defs><linearGradient id={`${hintId}-metal`}><stop stopColor="#7c8488" /><stop offset=".3" stopColor="#eff2f1" /><stop offset=".6" stopColor="#92999c" /><stop offset="1" stopColor="#d3d8d8" /></linearGradient></defs>
        <rect x="-.08352" y="-.222" width=".16704" height=".15" rx=".016" fill={`url(#${hintId}-metal)`} stroke="#6b7377" strokeWidth=".006" />
        <circle cx="0" cy="-.04" r=".036" fill="none" stroke={`url(#${hintId}-metal)`} strokeWidth=".0105" />
        <ellipse cx="0" cy=".055" rx=".061" ry=".095" fill="none" stroke={`url(#${hintId}-metal)`} strokeWidth=".0135" />
      </svg>
    </div>
    <div ref={viewport} className={styles.viewport}>
      {motionAllowed && image && cardRect && !failed && <Lanyard frontImage={image} cardRect={cardRect} cardColor="#f9faf9" strapColor={dark ? '#586252' : '#30372f'} finish="glossy" cornerRadius={.2} strapWidth={.4} damping={.7} elasticity={.45} breeze={0} intro={false} maxDpr={compact ? 1.25 : 1.5} controlsRef={controls} onReady={onReady} onError={onError} className={styles.renderer} />}
    </div>
    <span className={styles.srOnly}>{identity.name}, {identity.koreanName}. {identity.role}. {identity.location}. {identity.stack}. {identity.period}.</span>
    <p id={hintId} className={styles.hint}>
      {en ? 'Try dragging' : '드래그해 보세요'} <span aria-hidden="true">↙</span>
      {interactive && <span className={styles.srOnly}>{en ? 'Use the arrow keys to move the badge, Enter to flip it, and the Home key to return it to its original position.' : '방향키로 배지를 움직이고 Enter 키로 뒤집으며 Home 키로 제자리에 놓을 수 있어요.'}</span>}
    </p>
  </div>;
}
