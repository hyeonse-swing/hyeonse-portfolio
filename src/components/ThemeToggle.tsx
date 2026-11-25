'use client';

import { usePreferences } from '@hyeonse/design-system/react';
import styles from './ThemeToggle.module.css';

type Theme = 'system' | 'light' | 'dark';
type Locale = 'ko' | 'en';

const labels: Record<Locale, Record<Theme, string>> = {
  ko: { system: '기기 설정', light: '밝게', dark: '어둡게' },
  en: { system: 'System', light: 'Light', dark: 'Dark' },
};

export function ThemeToggle({ locale = 'ko' }: { locale?: Locale }) {
  const { preferences, setPreference } = usePreferences();

  return (
    <label className={styles.themeControl}>
      <span className={styles.label}>{locale === 'ko' ? '테마' : 'Theme'}</span>
      <select
        className={styles.select}
        value={preferences.theme}
        onChange={(event) => setPreference('theme', event.target.value as Theme)}
      >
        {(['system', 'light', 'dark'] as const).map((theme) => (
          <option key={theme} value={theme}>{labels[locale][theme]}</option>
        ))}
      </select>
    </label>
  );
}
