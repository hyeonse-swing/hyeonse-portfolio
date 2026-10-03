export type ThemePreference = 'system' | 'light' | 'dark';
export type AccentPreference = 'cobalt' | 'forest' | 'coral';
export type DensityPreference = 'comfortable' | 'compact';
export type CornersPreference = 'crisp' | 'soft';
export type MotionPreference = 'full' | 'reduced';

export type Preferences = {
  theme: ThemePreference;
  accent: AccentPreference;
  density: DensityPreference;
  corners: CornersPreference;
  motion: MotionPreference;
};

export const preferencesKey = 'hyeonse-site-preferences';
export const defaultPreferences: Preferences = {
  theme: 'system',
  accent: 'cobalt',
  density: 'comfortable',
  corners: 'crisp',
  motion: 'full',
};

const options = {
  theme: ['system', 'light', 'dark'],
  accent: ['cobalt', 'forest', 'coral'],
  density: ['comfortable', 'compact'],
  corners: ['crisp', 'soft'],
  motion: ['full', 'reduced'],
} as const;

export function validatePreferences(value: unknown): Preferences {
  const input = value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  return {
    theme: options.theme.includes(input.theme as ThemePreference) ? input.theme as ThemePreference : defaultPreferences.theme,
    accent: options.accent.includes(input.accent as AccentPreference) ? input.accent as AccentPreference : defaultPreferences.accent,
    density: options.density.includes(input.density as DensityPreference) ? input.density as DensityPreference : defaultPreferences.density,
    corners: options.corners.includes(input.corners as CornersPreference) ? input.corners as CornersPreference : defaultPreferences.corners,
    motion: options.motion.includes(input.motion as MotionPreference) ? input.motion as MotionPreference : defaultPreferences.motion,
  };
}

export function parsePreferences(raw: string | null): Preferences {
  if (!raw) return { ...defaultPreferences };
  try { return validatePreferences(JSON.parse(raw)); }
  catch { return { ...defaultPreferences }; }
}

export function serializePreferences(value: Preferences): string {
  return JSON.stringify(validatePreferences(value));
}

export function resolvedTheme(theme: ThemePreference, systemDark: boolean): 'light' | 'dark' {
  return theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
}

export function effectiveMotion(motion: MotionPreference, systemReduced: boolean): MotionPreference {
  return systemReduced ? 'reduced' : motion;
}

// Fixed code with a fixed key and enum lists; no stored string is interpolated into HTML.
// Root layout inserts this in <head> before CSS paints and suppresses hydration warnings on <html>.
export const preferenceScript = `(function(){
  var defaults={theme:'system',accent:'cobalt',density:'comfortable',corners:'crisp',motion:'full'};
  var allowed={theme:['system','light','dark'],accent:['cobalt','forest','coral'],density:['comfortable','compact'],corners:['crisp','soft'],motion:['full','reduced']};
  var stored={};
  try { var value=JSON.parse(localStorage.getItem('hyeonse-site-preferences')||'{}'); if(value&&typeof value==='object'&&!Array.isArray(value))stored=value; } catch(e) {}
  var p={};
  for(var key in defaults)p[key]=allowed[key].includes(stored[key])?stored[key]:defaults[key];
  var dark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root=document.documentElement;
  root.dataset.theme=p.theme==='system'?(dark?'dark':'light'):p.theme;
  root.dataset.themePreference=p.theme;
  root.dataset.accent=p.accent;
  root.dataset.density=p.density;
  root.dataset.corners=p.corners;
  root.dataset.motion=reduced?'reduced':p.motion;
})();`;
