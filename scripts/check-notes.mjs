import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadNotesModule } from './load-notes.mjs';

const { readNotesDirectory, getAllNotes, getNotes, getNote, getNoteLocales } = loadNotesModule();
const fixture = mkdtempSync(join(tmpdir(), 'portfolio-notes-'));
const dir = locale => join(fixture, locale);
const metadata = (date, extra = '') => `---\ntitle: Example\ndescription: A project note\ndate: '${date}'\ntags: [engineering]\nprojects: [hovershot]\n${extra}---\n\nA short note.\n`;
const write = (locale, file, source) => { mkdirSync(dir(locale), { recursive: true }); writeFileSync(join(dir(locale), file), source); };

try {
  write('ko', 'older.md', metadata('2026-01-01'));
  write('ko', 'newer.md', metadata('2026-02-01'));
  write('ko', 'draft.md', metadata('2026-03-01', 'draft: true\n'));
  write('en', 'english-only.md', metadata('2026-01-15'));
  let notes = readNotesDirectory(fixture);
  assert.deepEqual(notes.map(note => `${note.locale}/${note.slug}`), ['ko/newer', 'en/english-only', 'ko/older']);
  assert.ok(notes.every(note => !('draft' in note)));
  assert.equal(notes.find(note => note.slug === 'older').readingMinutes, 1);
  assert.equal(notes.filter(note => note.slug === 'english-only').length, 1, 'unpaired translation is published');

  write('ko', 'work-case.md', metadata('2026-02-01').replace('hovershot', 'swap-admin-v2'));
  write('en', 'archive-case.md', metadata('2026-02-01').replace('hovershot', 'ai-development'));
  const projectNotes = readNotesDirectory(fixture);
  assert.ok(projectNotes.some(note => note.projects.includes('swap-admin-v2')), 'featured work can have a note');
  assert.ok(projectNotes.some(note => note.projects.includes('ai-development')), 'archive work can have a note');

  write('ko', 'bad-date.md', metadata('2026-02-30'));
  assert.throws(() => readNotesDirectory(fixture), /date must be/);
  rmSync(join(dir('ko'), 'bad-date.md'));
  write('ko', 'bad-project.md', metadata('2026-02-01').replace('hovershot', 'unknown-project'));
  assert.throws(() => readNotesDirectory(fixture), /unknown project/);
  rmSync(join(dir('ko'), 'bad-project.md'));
  write('ko', 'bad-slug!.md', metadata('2026-02-01'));
  assert.throws(() => readNotesDirectory(fixture), /invalid slug/);
  rmSync(join(dir('ko'), 'bad-slug!.md'));
  write('ko', 'bad-draft.md', metadata('2026-02-01', 'draft: yes\n'));
  assert.throws(() => readNotesDirectory(fixture), /draft must be/);
  rmSync(join(dir('ko'), 'bad-draft.md'));
  write('ko', 'unquoted.md', metadata('2026-02-01').replace("'2026-02-01'", '2026-02-01'));
  assert.throws(() => readNotesDirectory(fixture), /date must be/);
  rmSync(join(dir('ko'), 'unquoted.md'));

  notes = getAllNotes();
  assert.equal(notes.length, getNotes('ko').length + getNotes('en').length);
  assert.ok(notes.every(note => getNote(note.locale, note.slug)?.title === note.title));
  assert.ok(notes.every(note => getNoteLocales(note.slug).includes(note.locale)));
  assert.ok(notes.every(note => !('draft' in note)));
  console.log(`check-notes: passed (${notes.length} published real notes, fixture validation passed)`);
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
