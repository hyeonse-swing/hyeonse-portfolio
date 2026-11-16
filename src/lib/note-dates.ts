export type NoteActivity =
  | { label: string; start: string; end?: string; ongoing?: boolean; point?: string; pointLabel?: string }
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

export function activityPoint(activity: Exclude<NoteActivity, { text: string }>): string {
  return activity.point ?? (activity.ongoing ? activity.start : activity.end ?? activity.start);
}

export function noteDateSortKey({ date, activity }: { date: string; activity?: NoteActivity }): number {
  const published = activityDateKey(date, 'end');
  if (!activity) return published;
  if ('text' in activity) return 0;
  // A selected milestone keeps a long-running project out of the publication-day cluster.
  return Math.min(published, activityDateKey(activityPoint(activity), 'end'));
}

export function formatActivityDate(value: string): string { return value.replaceAll('-', '. '); }
