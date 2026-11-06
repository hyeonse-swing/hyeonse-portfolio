export const workFocusIds = ['all', 'operations', 'performance', 'migration'] as const;
export type WorkFocus = typeof workFocusIds[number];

export function readWorkFocus(search: string): WorkFocus {
  const value = new URLSearchParams(search).get('work');
  return workFocusIds.find(id => id === value) ?? 'all';
}

/** Only the public work filter follows navigation, not arbitrary query data. */
export function withWorkFocus(href: string, focus: WorkFocus): string {
  if (focus === 'all') return href;
  const url = new URL(href, 'https://portfolio.local');
  url.searchParams.set('work', focus);
  return url.pathname + url.search + url.hash;
}
