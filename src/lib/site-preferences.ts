import { createPreferenceScript, type Preferences } from '@hyeonse/design-system/preferences';

export const preferencesKey = 'hyeonse-site-preferences';
export const preferenceDefaults = { corners: 'soft' } satisfies Partial<Preferences>;
export const preferenceScript = createPreferenceScript(preferencesKey, preferenceDefaults);
