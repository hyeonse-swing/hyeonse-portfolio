'use client';

import type { ReactNode } from 'react';
import { PreferencesProvider as DesignSystemProvider } from '@hyeonse/design-system/react';
import { preferenceDefaults, preferencesKey } from '../lib/site-preferences';

export { ThemeToggle, PreferencesPanel, usePreferences } from '@hyeonse/design-system/react';

// Keep the badge's existing preference event and persisted browser settings.
export function PreferencesProvider({ children }: { children: ReactNode }) {
  return <DesignSystemProvider storageKey={preferencesKey} defaults={preferenceDefaults} eventName="portfolio:preferences">{children}</DesignSystemProvider>;
}
