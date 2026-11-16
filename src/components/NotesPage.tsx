import Link from 'next/link';
import { localizedPath, type Locale } from '../lib/locale';
import type { Note } from '../lib/notes';
import NoteActivityDate from './NoteActivityDate';
import styles from './Notes.module.css';

export default function NotesPage({ locale, notes }: { locale: Locale; notes: Note[] }) {
  const en = locale === 'en';
  return <section className={styles.page} id="top" aria-labelledby="notes-title">
    <header className={styles.intro}>
      <p className="eyebrow">NOTES</p>
      <h1 id="notes-title">{en ? 'Notes' : '기록'}<span aria-hidden="true">.</span></h1>
      <p>{en ? 'Things I have built, problems I have worked through, and notes along the way.' : '만들어 본 것, 막혔던 문제, 그 과정에서 배운 것을 적어요.'}</p>
    </header>
    {notes.length ? <ol className={styles.list}>{notes.map(note => <li key={note.slug}>
      <article className={styles.card}>
        <div className={styles.cardMeta}>
          {note.activity ? <NoteActivityDate activity={note.activity} locale={locale} compact /> : <span>{en ? 'Published' : '게시'} <time dateTime={note.date}>{note.date}</time></span>}
          <span>{note.readingMinutes} {en ? 'min read' : '분 읽기'}</span>
        </div>
        <h2><Link href={localizedPath(locale, `/notes/${note.slug}/`)}>{note.title}<span aria-hidden="true"> ↗</span></Link></h2>
        <p>{note.description}</p>
        <div className={styles.labels} aria-label={en ? 'Tags' : '태그'}>
          {note.tags.map(tag => <span key={`tag-${tag}`}>#{tag}</span>)}
        </div>
      </article>
    </li>)}</ol> : <p className={styles.empty}>{en ? 'No published notes yet. Check back soon.' : '아직 공개한 기록이 없습니다. 곧 이곳에 작업 과정을 남길게요.'}</p>}
  </section>;
}
