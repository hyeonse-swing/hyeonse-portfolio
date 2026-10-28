'use client';

import { useEffect } from 'react';

export default function SearchTargetReveal() {
  useEffect(() => {
    let frame = 0;
    const reveal = () => {
      cancelAnimationFrame(frame);
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch { return; }
      const target = document.getElementById(id);
      if (!(target instanceof HTMLDetailsElement) || !target.hasAttribute('data-search-target')) return;
      target.open = true;
      frame = requestAnimationFrame(() => {
        target.scrollIntoView({ block: 'start' });
        target.querySelector('summary')?.focus({ preventScroll: true });
      });
    };
    reveal();
    window.addEventListener('hashchange', reveal);
    window.addEventListener('portfolio:reveal-search-target', reveal);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', reveal);
      window.removeEventListener('portfolio:reveal-search-target', reveal);
    };
  }, []);
  return null;
}
