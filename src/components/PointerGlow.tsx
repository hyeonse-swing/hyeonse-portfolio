'use client';

import { useEffect, useRef } from 'react';
import { usePreferences } from './SitePreferences';
import styles from './PointerGlow.module.css';

const backdropPalette = ['cobalt', 'forest', 'coral'] as const;

type ColorRegion = { color: string; x: number; y: number };

function readColorRegions(root: HTMLElement): ColorRegion[] {
  const rootStyle = getComputedStyle(root);
  return backdropPalette.flatMap(name => {
    const [x, y] = rootStyle.getPropertyValue(`--portfolio-backdrop-${name}-center`)
      .trim().split(/\s+/).map(value => Number.parseFloat(value) / 100);
    return Number.isFinite(x) && Number.isFinite(y) ? [{ color: `var(--palette-${name})`, x, y }] : [];
  });
}

function mixNearbyColors(regions: readonly ColorRegion[], x: number, y: number): string {
  // Keep some of the selected accent where the backdrop colors taper off.
  let totalWeight = 0.1;
  let color = 'var(--accent-text)';

  for (const region of regions) {
    const distanceSquared = (x - region.x) ** 2 + (y - region.y) ** 2;
    const weight = Math.exp(-14 * distanceSquared);
    totalWeight += weight;
    const share = (100 * weight / totalWeight).toFixed(2);
    color = `color-mix(in oklab, ${region.color} ${share}%, ${color})`;
  }

  return color;
}

export default function PointerGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const { preferences: { motion } } = usePreferences();

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || motion === 'reduced') return;

    const media = window.matchMedia('(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)');
    const root = document.documentElement;
    const supportsMixing = CSS.supports('color', 'color-mix(in oklab, black, white)');
    let regions: ColorRegion[] = [];
    let frame: number | undefined;
    let x = 0;
    let y = 0;
    let width = 1;
    let height = 1;

    const hide = () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      frame = undefined;
      glow.removeAttribute('data-visible');
    };

    const schedulePaint = () => {
      if (frame !== undefined) return;

      frame = window.requestAnimationFrame(() => {
        frame = undefined;
        if (regions.length > 0) {
          glow.style.setProperty('--portfolio-pointer-glow-color', mixNearbyColors(regions, x / width, y / height));
        }
        glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        glow.setAttribute('data-visible', '');
      });
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      schedulePaint();
    };

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      if (glow.hasAttribute('data-visible')) schedulePaint();
    };

    function syncPointer() {
      if (media.matches) {
        if (supportsMixing) regions = readColorRegions(root);
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', move, { passive: true });
      } else {
        window.removeEventListener('resize', resize);
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
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      hide();
    };
  }, [motion]);

  return <div ref={glowRef} className={styles.glow} data-pointer-glow aria-hidden="true" />;
}
