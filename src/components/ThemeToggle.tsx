'use client';

import { usePreferences } from '@hyeonse/design-system/react';
import styles from './ThemeToggle.module.css';

type Theme = 'system' | 'light' | 'dark';
type Locale = 'ko' | 'en';

const themes: Theme[] = ['system', 'light', 'dark'];
const nextTheme: Record<Theme, Theme> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
};
const labels: Record<Locale, Record<Theme, string>> = {
  ko: { system: '기기 설정', light: '밝게', dark: '어둡게' },
  en: { system: 'System', light: 'Light', dark: 'Dark' },
};

function ThemeIcon({ theme }: { theme: Theme }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {theme === 'system' && <><rect x="3" y="4" width="18" height="13" rx="1" /><path d="M8 21h8M12 17v4" /></>}
      {theme === 'light' && <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4" /></>}
      {theme === 'dark' && <path d="M20.3 15.7A8.5 8.5 0 0 1 8.3 3.7a8.5 8.5 0 1 0 12 12Z" />}
    </svg>
  );
}

export function ThemeToggle({ locale = 'ko' }: { locale?: Locale }) {
  const { preferences, setPreference } = usePreferences();

  return (
    <button
      type="button"
      className={`hds-themeToggle ${styles.button}`}
      onClick={() => setPreference('theme', nextTheme[preferences.theme])}
    >
      {themes.map((theme) => (
        <span key={theme} className={`${styles.state} ${styles[theme]}`}>
          <ThemeIcon theme={theme} />
          <span className={styles.visibleLabel} aria-hidden="true">{labels[locale][theme]}</span>
          <span className={styles.srOnly}>
            {locale === 'ko'
              ? `현재 테마 ${labels.ko[theme]}. ${labels.ko[nextTheme[theme]]} 모드로 변경`
              : `Current theme: ${labels.en[theme]}. Switch to ${labels.en[nextTheme[theme]]} mode`}
          </span>
        </span>
      ))}
    </button>
  );
}
