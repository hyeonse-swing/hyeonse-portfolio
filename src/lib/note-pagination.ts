export const NOTES_PER_PAGE = 8;

export type NotePagination<T> = {
  notes: T[];
  page: number;
  totalPages: number;
  totalNotes: number;
};

export function notePageCount(totalNotes: number): number {
  return Math.max(1, Math.ceil(totalNotes / NOTES_PER_PAGE));
}

export function paginateNotes<T>(notes: readonly T[], page = 1): NotePagination<T> | undefined {
  const totalPages = notePageCount(notes.length);
  if (!Number.isSafeInteger(page) || page < 1 || page > totalPages) return undefined;
  const start = (page - 1) * NOTES_PER_PAGE;
  return { notes: notes.slice(start, start + NOTES_PER_PAGE), page, totalPages, totalNotes: notes.length };
}

export function notePagePath(page: number): string {
  return page === 1 ? '/notes/' : `/notes/page/${page}/`;
}

/** Keep first/last and nearby pages reachable without an ever-growing control. */
export function paginationItems(page: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const visible = new Set([1, totalPages]);
  const start = Math.max(2, Math.min(page - 1, totalPages - 3));
  for (let index = start; index <= Math.min(totalPages - 1, start + 2); index++) visible.add(index);
  const pages = [...visible].sort((a, b) => a - b);
  const items: (number | 'ellipsis')[] = [];
  for (const [index, current] of pages.entries()) {
    const previous = pages[index - 1];
    if (previous !== undefined && current - previous === 2) items.push(previous + 1);
    else if (previous !== undefined && current - previous > 2) items.push('ellipsis');
    items.push(current);
  }
  return items;
}
