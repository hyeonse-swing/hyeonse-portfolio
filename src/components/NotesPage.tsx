import Link from 'next/link';
import { getNoteProjects } from '../data/note-projects';
import { localizedPath, type Locale } from '../lib/locale';
import type { Note } from '../lib/notes';
import NoteActivityDate from './NoteActivityDate';
import styles from './Notes.module.css';

export default function NotesPage({ locale, notes }: { locale: Locale; notes: Note[] }) {
  const en = locale === 'en';
  const projects = new Map(getNoteProjects(locale).map(project => [project.id, project.name]));
  return <section className={styles.page} id="top" aria-labelledby="notes-title">
    <header className={styles.intro}>
      <p className="eyebrow">FIELD NOTES / PROJECTS & WORK</p>
      <h1 id="notes-title">{en ? 'Project notes' : '프로젝트 기록'}<span aria-hidden="true">.</span></h1>
      <p>{en ? 'Problems, decisions, and verification from my work and personal projects.' : '프로젝트와 업무에서 마주한 문제, 선택, 검증 과정을 기록해요.'}</p>
    </header>
    {notes.length ? <ol className={styles.list}>{notes.map(note => <li key={note.slug}>
      <article className={styles.card}>
        <div className={styles.cardMeta}>
          {note.activity ? <NoteActivityDate activity={note.activity} locale={locale} /> : <span>{en ? 'Published' : '게시'} <time dateTime={note.date}>{note.date}</time></span>}
          <span>{note.readingMinutes} {en ? 'min read' : '분 읽기'}</span>
        </div>
        <h2><Link href={localizedPath(locale, `/notes/${note.slug}/`)}>{note.title}<span aria-hidden="true"> ↗</span></Link></h2>
        <p>{note.description}</p>
        <div className={styles.labels} aria-label={en ? 'Tags and projects' : '태그와 프로젝트'}>
          {note.tags.map(tag => <span key={`tag-${tag}`}>#{tag}</span>)}
          {note.projects.map(id => <span className={styles.projectLabel} key={`project-${id}`}>{projects.get(id)}</span>)}
        </div>
      </article>
    </li>)}</ol> : <p className={styles.empty}>{en ? 'No published notes yet. Check back soon.' : '아직 공개한 기록이 없습니다. 곧 이곳에 작업 과정을 남길게요.'}</p>}
  </section>;
}
