import 'server-only';
import { existsSync, lstatSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { getNoteProjects } from '../data/note-projects';
import type { Locale } from './locale';
import { activityDateKey, isActivityDate, noteDateSortKey, type NoteActivity } from './note-dates';

export type Note = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  updated?: string;
  activity?: NoteActivity;
  tags: string[];
  projects: string[];
  body: string;
  readingMinutes: number;
};

const locales: Locale[] = ['ko', 'en'];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function validDate(value: unknown): value is string {
  if (typeof value !== 'string' || !datePattern.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() + 1 === month && date.getUTCDate() === day;
}

function requireText(value: unknown, field: string, source: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${source}: ${field} must be a non-empty string`);
  return value.trim();
}

function requireList(value: unknown, field: string, source: string): string[] {
  if (!Array.isArray(value) || value.some(item => typeof item !== 'string' || !item.trim())) {
    throw new Error(`${source}: ${field} must be an array of non-empty strings`);
  }
  return value.map(item => item.trim());
}

function parseActivity(value: unknown, source: string): NoteActivity | undefined {
  if (value === undefined) return undefined;
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${source}: activity must be an object`);
  const activity = value as Record<string, unknown>;
  const label = requireText(activity.label, 'activity.label', source);
  if (activity.text !== undefined) {
    if (activity.start !== undefined || activity.end !== undefined || activity.ongoing !== undefined) {
      throw new Error(`${source}: activity.text cannot be combined with dates`);
    }
    return { label, text: requireText(activity.text, 'activity.text', source) };
  }
  if (!isActivityDate(activity.start)) throw new Error(`${source}: activity.start must be a quoted, valid YYYY, YYYY-MM or YYYY-MM-DD date`);
  if (activity.end !== undefined && !isActivityDate(activity.end)) throw new Error(`${source}: activity.end must be a quoted, valid YYYY, YYYY-MM or YYYY-MM-DD date`);
  if (activity.ongoing !== undefined && typeof activity.ongoing !== 'boolean') throw new Error(`${source}: activity.ongoing must be a boolean`);
  if (activity.ongoing && activity.end !== undefined) throw new Error(`${source}: an ongoing activity cannot have an end date`);
  if (typeof activity.end === 'string' && activityDateKey(activity.end, 'end') < activityDateKey(activity.start, 'start')) {
    throw new Error(`${source}: activity.end must not precede activity.start`);
  }
  return { label, start: activity.start, end: activity.end as string | undefined, ongoing: activity.ongoing as boolean | undefined };
}

function parseNote(source: string, slug: string, locale: Locale): { note: Note; draft: boolean } {
  const parsed = matter(readFileSync(source, 'utf8'));
  const data = parsed.data;
  const title = requireText(data.title, 'title', source);
  const description = requireText(data.description, 'description', source);
  if (!validDate(data.date)) throw new Error(`${source}: date must be a quoted, valid YYYY-MM-DD date`);
  if (data.updated !== undefined && !validDate(data.updated)) throw new Error(`${source}: updated must be a quoted, valid YYYY-MM-DD date`);
  const activity = parseActivity(data.activity, source);
  const tags = requireList(data.tags, 'tags', source);
  const projects = requireList(data.projects, 'projects', source);
  const projectIds = new Set(getNoteProjects(locale).map(project => project.id));
  for (const project of projects) {
    if (!projectIds.has(project)) throw new Error(`${source}: unknown project ${project}`);
  }
  if (data.draft !== undefined && typeof data.draft !== 'boolean') throw new Error(`${source}: draft must be a boolean`);
  const words = parsed.content.trim().match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  return {
    draft: data.draft === true,
    note: { slug, locale, title, description, date: data.date, updated: data.updated, activity,
      tags, projects, body: parsed.content.trim(), readingMinutes: Math.max(1, Math.ceil(words / 200)) },
  };
}

/** root is the content/notes directory. Validation runs for drafts too. */
export function readNotesDirectory(root: string): Note[] {
  const notes: Note[] = [];
  for (const locale of locales) {
    const directory = join(root, locale);
    if (!existsSync(directory)) continue;
    if (!lstatSync(directory).isDirectory()) throw new Error(`${directory}: expected a directory`);
    const slugs = new Set<string>();
    for (const file of readdirSync(directory).filter(name => name.endsWith('.md')).sort()) {
      const slug = file.slice(0, -3);
      if (!slugPattern.test(slug)) throw new Error(`${join(directory, file)}: invalid slug`);
      if (slugs.has(slug)) throw new Error(`${directory}: duplicate slug ${slug}`);
      slugs.add(slug);
      const source = join(directory, file);
      if (!lstatSync(source).isFile()) throw new Error(`${source}: expected a regular file`);
      const { note, draft } = parseNote(source, slug, locale);
      if (!draft) notes.push(note);
    }
  }
  return notes.sort((a, b) => noteDateSortKey(b) - noteDateSortKey(a) || b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug) || a.locale.localeCompare(b.locale));
}

function allNotes(): Note[] { return readNotesDirectory(join(process.cwd(), 'content', 'notes')); }

export function getNotes(locale: Locale): Note[] { return allNotes().filter(note => note.locale === locale); }
export function getProjectNotes(notes: readonly Note[], projectId: string): Note[] {
  return notes.filter(note => note.projects.includes(projectId))
    .sort((a, b) => Number(b.slug === projectId) - Number(a.slug === projectId));
}
export function getNote(locale: Locale, slug: string): Note | undefined { return getNotes(locale).find(note => note.slug === slug); }
export function getAllNotes(): Note[] { return allNotes(); }
export function getNoteLocales(slug: string): Locale[] { return locales.filter(locale => getNote(locale, slug)); }
