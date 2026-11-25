'use client';

import { useEffect, useRef } from 'react';
import { usePreferences } from './SitePreferences';
import styles from './PointerGlow.module.css';

export default function PointerGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const { preferences: { motion } } = usePreferences();

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || motion === 'reduced') return;

    const media = window.matchMedia('(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)');
    const root = document.documentElement;
    let frame: number | undefined;
    let x = 0;
    let y = 0;

    const hide = () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      frame = undefined;
      glow.removeAttribute('data-visible');
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      if (frame !== undefined) return;

      frame = window.requestAnimationFrame(() => {
        frame = undefined;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        glow.setAttribute('data-visible', '');
      });
    };

    function syncPointer() {
      if (media.matches) {
        window.addEventListener('pointermove', move, { passive: true });
      } else {
        window.removeEventListener('pointermove', move);
        hide();
      }
    }

    syncPointer();
    media.addEventListener('change', syncPointer);
    root.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    return () => {
      media.removeEventListener('change', syncPointer);
      root.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      window.removeEventListener('pointermove', move);
      hide();
    };
  }, [motion]);

  return <div ref={glowRef} className={styles.glow} data-pointer-glow aria-hidden="true" />;
}
