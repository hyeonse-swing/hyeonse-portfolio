import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadNotesModule } from './load-notes.mjs';

const { readNotesDirectory, getAllNotes, getNotes, getNote, getNoteLocales, getRelatedNotes, paginateNotes, paginationItems, notePagePath, getNoteListPages } = loadNotesModule();
const fixture = mkdtempSync(join(tmpdir(), 'portfolio-notes-'));
const dir = locale => join(fixture, locale);
const metadata = (date, extra = '') => `---\ntitle: Example\ndescription: A project note\ndate: '${date}'\ntags: [engineering]\nprojects: [hovershot]\n${extra}---\n\nA short note.\n`;
const write = (locale, file, source) => { mkdirSync(dir(locale), { recursive: true }); writeFileSync(join(dir(locale), file), source); };

try {
  const entries = Array.from({ length: 17 }, (_, index) => ({ slug: `note-${index}`, locale: 'ko' }));
  const pages = [1, 2, 3].map(page => paginateNotes(entries, page));
  assert.deepEqual(pages.map(page => page.notes.length), [8, 8, 1], 'last page contains only remaining notes');
  assert.deepEqual(pages.flatMap(page => page.notes), entries, 'pagination preserves order without omissions or duplicates');
  assert.equal(paginateNotes(entries.slice(0, 8)).totalPages, 1);
  assert.equal(paginateNotes(entries.slice(0, 16)).totalPages, 2, 'exact page boundary does not create an empty page');
  assert.deepEqual(paginateNotes([]), { notes: [], page: 1, totalPages: 1, totalNotes: 0 });
  for (const invalid of [0, -1, 1.5, NaN, Infinity, 4]) assert.equal(paginateNotes(entries, invalid), undefined);
  assert.equal(notePagePath(1), '/notes/');
  assert.equal(notePagePath(2), '/notes/page/2/');
  assert.deepEqual(paginationItems(1, 2), [1, 2]);
  assert.deepEqual(paginationItems(10, 20), [1, 'ellipsis', 9, 10, 11, 'ellipsis', 20]);
  assert.deepEqual(paginationItems(1, 20), [1, 2, 3, 4, 'ellipsis', 20]);
  assert.deepEqual(paginationItems(20, 20), [1, 'ellipsis', 17, 18, 19, 20]);
  const uneven = getNoteListPages([...entries, { locale: 'en' }]);
  assert.deepEqual(uneven.map(({ locale, page }) => `${locale}/${page}`), ['ko/1', 'ko/2', 'ko/3', 'en/1'], 'language page counts are independent');

  write('ko', 'older.md', metadata('2026-01-01'));
  write('ko', 'newer.md', metadata('2026-02-01'));
  write('ko', 'draft.md', metadata('2026-03-01', 'draft: true\n'));
  write('en', 'english-only.md', metadata('2026-01-15'));
  let notes = readNotesDirectory(fixture);
  assert.deepEqual(notes.map(note => `${note.locale}/${note.slug}`), ['ko/newer', 'en/english-only', 'ko/older']);
  assert.ok(notes.every(note => !('draft' in note)));
  assert.equal(notes.find(note => note.slug === 'older').readingMinutes, 1);
  assert.equal(notes.filter(note => note.slug === 'english-only').length, 1, 'unpaired translation is published');
  assert.deepEqual(paginateNotes(notes.filter(note => note.locale === 'ko')).notes.map(note => note.slug), ['newer', 'older'], 'pagination uses published locale-specific notes');
  const current = notes.find(note => note.slug === 'older');
  assert.deepEqual(getRelatedNotes(notes, current).map(note => note.slug), ['newer'], 'related notes exclude self, drafts and other languages');
  const candidate = (slug, tags, projects, date = '2026-01-01') => ({ ...current, slug, tags, projects, date });
  const relatedPool = [
    current,
    candidate('unrelated', ['other'], ['flow-qa']),
    candidate('many-tags', ['engineering', 'React', 'React'], ['flow-qa'], '2026-04-01'),
    candidate('shared-project', ['other'], ['hovershot']),
    candidate('recent-topic', ['ENGINEERING'], ['flow-qa'], '2026-03-01'),
    candidate('older-topic', ['engineering'], ['flow-qa'], '2026-02-01'),
  ];
  const related = getRelatedNotes(relatedPool, current);
  assert.deepEqual(related.map(note => note.slug), ['shared-project', 'many-tags', 'recent-topic'], 'same project is first; matching topics follow with a maximum of three');
  assert.deepEqual(relatedPool.map(note => note.slug), ['older', 'unrelated', 'many-tags', 'shared-project', 'recent-topic', 'older-topic'], 'selection does not reorder its input');
  assert.deepEqual(getRelatedNotes([relatedPool[1]], current), [], 'unrelated notes are not used as filler');
  assert.deepEqual(getRelatedNotes([
    candidate('repeated-tag', ['engineering', 'ENGINEERING'], []),
    candidate('recent-tag', ['engineering'], [], '2026-03-01'),
  ], current).map(note => note.slug), ['recent-tag', 'repeated-tag'], 'duplicate tags do not increase relevance');

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
  assert.deepEqual(timeline.map(note => note.slug), ['new-publication', 'newer-work', 'ongoing', 'older-work', 'merged', 'unknown']);
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
  timelineNote('project-milestone', "activity:\n  label: Release\n  start: '2026-05'\n  end: '2026-11'\n  point: '2026-05-15'\n  pointLabel: First release\n");
  assert.deepEqual(readNotesDirectory(timelineRoot).map(note => note.slug), ['new-publication', 'newer-work', 'project-milestone', 'ongoing', 'older-work', 'merged', 'unknown']);
  for (const point of ['2026-02-30', '2026-04-30', '2026-12-01']) {
    timelineNote('invalid', `activity:\n  label: Release\n  start: '2026-05'\n  end: '2026-11'\n  point: '${point}'\n  pointLabel: First release\n`);
    assert.throws(() => readNotesDirectory(timelineRoot), /activity.point/);
  }
  rmSync(join(timelineDir, 'invalid.md'));

  timelineNote('missing-label', "activity:\n  label: Work period\n  start: '2026'\n  point: '2026-05'\n");
  assert.throws(() => readNotesDirectory(timelineRoot), /activity.pointLabel/);
  rmSync(join(timelineDir, 'missing-label.md'));

  notes = getAllNotes();
  assert.equal(notes.length, getNotes('ko').length + getNotes('en').length);
  assert.ok(notes.every(note => getNote(note.locale, note.slug)?.title === note.title));
  assert.ok(notes.every(note => getNoteLocales(note.slug).includes(note.locale)));
  assert.ok(notes.every(note => !('draft' in note)));
  console.log(`check-notes: passed (${notes.length} published real notes, fixture validation passed)`);
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
