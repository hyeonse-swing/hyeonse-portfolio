'use client';

import type { ReactNode } from 'react';
import { PreferencesProvider as DesignSystemProvider } from '@hyeonse/design-system/react';

export { ThemeToggle, PreferencesPanel, usePreferences } from '@hyeonse/design-system/react';

// Keep the badge's existing preference event and persisted browser settings.
export function PreferencesProvider({ children }: { children: ReactNode }) {
  return <DesignSystemProvider storageKey="hyeonse-site-preferences" eventName="portfolio:preferences">{children}</DesignSystemProvider>;
}
