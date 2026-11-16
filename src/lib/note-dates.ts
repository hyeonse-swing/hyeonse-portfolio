export type NoteActivity =
  | { label: string; start: string; end?: string; ongoing?: boolean }
  | { label: string; text: string };

/** Preserve the precision of the source: year, month or calendar day. */
export function isActivityDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1) return false;
  if (month === undefined) return true;
  if (month < 1 || month > 12) return false;
  if (day === undefined) return true;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= days[month - 1];
}

/** Numeric bounds are sorting keys only; they are never presented as exact dates. */
export function activityDateKey(value: string, edge: 'start' | 'end'): number {
  const [year, month, day] = value.split('-').map(Number);
  return year * 10000 + (month ?? (edge === 'end' ? 12 : 1)) * 100 + (day ?? (edge === 'end' ? 31 : 1));
}

export function noteDateSortKey({ date, activity }: { date: string; activity?: NoteActivity }): number {
  const published = activityDateKey(date, 'end');
  if (!activity) return published;
  if ('text' in activity) return 0;
  // An ongoing or imprecise period is bounded by when this account was published.
  return activity.ongoing ? published : Math.min(published, activityDateKey(activity.end ?? activity.start, 'end'));
}

export function formatActivityDate(value: string): string { return value.replaceAll('-', '.'); }
