'use client';

import { useEffect, useRef } from 'react';
import { ThemeToggle as DesignSystemThemeToggle, usePreferences } from '@hyeonse/design-system/react';
import styles from './ThemeToggle.module.css';

type Locale = 'ko' | 'en';

export function ThemeToggle({ locale = 'ko' }: { locale?: Locale }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { preferences } = usePreferences();

  useEffect(() => {
    const button = wrapperRef.current?.querySelector('button');
    if (!button) return;
    button.setAttribute('aria-keyshortcuts', 'Alt+Shift+T');
    if (!button.title.endsWith(' · Alt+Shift+T')) {
      button.title = `${button.title} · Alt+Shift+T`;
    }
  }, [locale, preferences.theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.isComposing ||
        event.code !== 'KeyT' || !event.shiftKey || !event.altKey ||
        event.ctrlKey || event.metaKey) return;
      if (event.target instanceof HTMLElement &&
        (event.target.isContentEditable || event.target.closest('input, textarea, select, [role="textbox"]'))) return;
      if (document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]')) return;

      const button = wrapperRef.current?.querySelector('button');
      if (!button || button.disabled) return;
      event.preventDefault();
      button.click();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return <div className={styles.root} ref={wrapperRef}>
    <DesignSystemThemeToggle locale={locale} />
  </div>;
}
