'use client';

import { useEffect } from 'react';

export default function SearchTargetReveal() {
  useEffect(() => {
    let frame = 0;
    let releaseFocus = () => {};
    const reveal = () => {
      cancelAnimationFrame(frame);
      releaseFocus();
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch { return; }
      const target = document.getElementById(id);
      if (!(target instanceof HTMLElement)) return;
      const isArchive = target instanceof HTMLDetailsElement && target.hasAttribute('data-search-target');
      if (isArchive) target.open = true;
      frame = requestAnimationFrame(() => {
        if (isArchive) {
          target.scrollIntoView({ block: 'start' });
          target.querySelector('summary')?.focus({ preventScroll: true });
          return;
        }
        const labelledHeading = target.getAttribute('aria-labelledby')?.split(/\s+/)
          .map(id => document.getElementById(id)).find(node => node instanceof HTMLElement);
        const focusTarget = target.matches('a[href], button, input, select, textarea, summary, [tabindex]')
          ? target : labelledHeading ?? target.querySelector<HTMLElement>('h1, h2, h3, h4') ?? target;
        const addedTabIndex = !focusTarget.hasAttribute('tabindex');
        if (addedTabIndex) focusTarget.setAttribute('tabindex', '-1');
        releaseFocus = () => {
          focusTarget.removeEventListener('blur', releaseFocus);
          if (addedTabIndex && focusTarget.getAttribute('tabindex') === '-1') focusTarget.removeAttribute('tabindex');
        };
        focusTarget.addEventListener('blur', releaseFocus, { once: true });
        // Native hash navigation owns scrolling; focus should not move it again.
        focusTarget.focus({ preventScroll: true });
      });
    };
    reveal();
    window.addEventListener('hashchange', reveal);
    window.addEventListener('portfolio:reveal-search-target', reveal);
    return () => {
      cancelAnimationFrame(frame);
      releaseFocus();
      window.removeEventListener('hashchange', reveal);
      window.removeEventListener('portfolio:reveal-search-target', reveal);
    };
  }, []);
  return null;
}
