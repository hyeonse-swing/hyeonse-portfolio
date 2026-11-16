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

  const timelineRoot = join(fixture, 'timeline');
  const timelineDir = join(timelineRoot, 'ko');
  mkdirSync(timelineDir, { recursive: true });
  const timelineNote = (slug, activity = '', date = '2026-11-16') => {
    writeFileSync(join(timelineDir, `${slug}.md`), metadata(date, activity));
  };
  timelineNote('older-work', "activity:\n  label: Work period\n  start: '2024'\n  end: '2025-08'\n");
  timelineNote('newer-work', "activity:\n  label: Measurement\n  start: '2026-07'\n");
  timelineNote('merged', "activity:\n  label: PR merged\n  start: '2025-06-30'\n");
  timelineNote('ongoing', "activity:\n  label: Work period\n  start: '2026-04'\n  ongoing: true\n");
  timelineNote('unknown', "activity:\n  label: Work period\n  text: During employment\n");
  timelineNote('new-publication', '', '2026-11-15');
  const timeline = readNotesDirectory(timelineRoot);
  assert.deepEqual(timeline.map(note => note.slug), ['ongoing', 'new-publication', 'newer-work', 'older-work', 'merged', 'unknown']);
  assert.equal(timeline.find(note => note.slug === 'older-work').date, '2026-11-16', 'work periods never rewrite publication dates');
  assert.equal(timeline.find(note => note.slug === 'older-work').activity.start, '2024', 'source year precision is preserved');
  assert.equal(timeline.find(note => note.slug === 'merged').activity.start, '2025-06-30');
  for (const [fields, error] of [
    ["start: '2026-02-29'", /activity.start/],
    ["start: '2026-07'\n  end: '2025-08'", /must not precede/],
    ["start: '2026-04'\n  end: '2026-11'\n  ongoing: true", /cannot have an end/],
    ["start: '2026-04'\n  text: Uncertain", /cannot be combined/],
    ["start: 2026-11-16", /activity.start/],
  ]) {
    timelineNote('invalid', `activity:\n  label: Work period\n  ${fields}\n`);
    assert.throws(() => readNotesDirectory(timelineRoot), error);
  }
  rmSync(join(timelineDir, 'invalid.md'));

  notes = getAllNotes();
  assert.equal(notes.length, getNotes('ko').length + getNotes('en').length);
  assert.ok(notes.every(note => getNote(note.locale, note.slug)?.title === note.title));
  assert.ok(notes.every(note => getNoteLocales(note.slug).includes(note.locale)));
  assert.ok(notes.every(note => !('draft' in note)));
  console.log(`check-notes: passed (${notes.length} published real notes, fixture validation passed)`);
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
