import Link from 'next/link';
import { getPersonalProjects } from '../data/personal-projects';
import { localizedPath, type Locale } from '../lib/locale';
import type { Note } from '../lib/notes';
import styles from './Notes.module.css';

export default function NotesPage({ locale, notes }: { locale: Locale; notes: Note[] }) {
  const en = locale === 'en';
  const projects = new Map(getPersonalProjects(locale).map(project => [project.id, project.name]));
  return <section className={styles.page} id="top" aria-labelledby="notes-title">
    <header className={styles.intro}>
      <p className="eyebrow">{en ? 'FIELD NOTES / PERSONAL PROJECTS' : 'FIELD NOTES / PERSONAL PROJECTS'}</p>
      <h1 id="notes-title">{en ? 'Project notes' : '프로젝트 기록'}<span aria-hidden="true">.</span></h1>
      <p>{en ? 'Decisions, experiments, and fixes from projects I build and maintain.' : '직접 만들고 운영하는 프로젝트에서 마주한 문제와 선택을 기록합니다.'}</p>
    </header>
    {notes.length ? <ol className={styles.list}>{notes.map(note => <li key={note.slug}>
      <article className={styles.card}>
        <div className={styles.cardMeta}><time dateTime={note.date}>{note.date}</time><span>{note.readingMinutes} {en ? 'min read' : '분 읽기'}</span></div>
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
