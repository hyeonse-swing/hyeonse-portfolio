import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getNoteProjects } from '../data/note-projects';
import { localizedPath, type Locale } from '../lib/locale';
import type { Note } from '../lib/notes';
import BlogComments from './BlogComments';
import NoteActivityDate from './NoteActivityDate';
import styles from './Notes.module.css';

export default function NotePage({ note, relatedNotes = [] }: { note: Note; relatedNotes?: Note[] }) {
  const { locale, slug } = note;
  const en = locale === 'en';
  const projects = new Map(getNoteProjects(locale).map(project => [project.id, project]));
  return <article className={styles.page} id="top">
    <Link className={styles.back} href={localizedPath(locale, '/notes/')}>← {en ? 'All notes' : '모든 기록'}</Link>
    <header className={styles.articleHeader}>
      <p className="eyebrow">NOTES</p>
      <h1>{note.title}</h1>
      <p className={styles.summary}>{note.description}</p>
      <div className={styles.articleMeta}>
        {note.activity ? <NoteActivityDate activity={note.activity} locale={locale} compact /> : <span>{en ? 'Published' : '게시'} <time dateTime={note.date}>{note.date}</time></span>}
        <span>{note.readingMinutes} {en ? 'min read' : '분 읽기'}</span>
      </div>
      {note.tags.length > 0 && <div className={styles.labels} aria-label={en ? 'Tags' : '태그'}>{note.tags.map(tag => <span key={tag}>#{tag}</span>)}</div>}
    </header>
    <div className={styles.prose}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={{
        h1: ({ children }) => <h2>{children}</h2>,
        a: ({ href, children, title }) => <a href={href} title={title} {...(/^https?:\/\//.test(href ?? '') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>,
        table: ({ children }) => <div className={styles.tableScroll}><table>{children}</table></div>,
      }}>{note.body}</ReactMarkdown>
    </div>
    <footer className={styles.publicationMeta}>
      {note.activity && <NoteActivityDate activity={note.activity} locale={locale} />}
      <span>{en ? 'Published' : '게시'} <time dateTime={note.date}>{note.date}</time></span>
      {note.updated && <span>{en ? 'Updated' : '수정'} <time dateTime={note.updated}>{note.updated}</time></span>}
    </footer>
    {relatedNotes.length > 0 && <nav className={styles.readNext} aria-labelledby="read-next-title">
      <h2 id="read-next-title">{en ? 'Keep reading' : '함께 읽을 글'}</h2>
      <ul>{relatedNotes.map(related => <li key={related.slug}>
        <Link href={localizedPath(locale, `/notes/${related.slug}/`)} aria-labelledby={`read-next-${related.slug}`}>
          <h3 id={`read-next-${related.slug}`}>{related.title}<span aria-hidden="true">↗</span></h3>
          <p>{related.description}</p>
        </Link>
      </li>)}</ul>
    </nav>}
    {note.projects.length > 0 && <aside className={styles.related} aria-label={en ? 'Related projects' : '관련 프로젝트'}>
      <h2>{en ? 'Related projects' : '관련 프로젝트'}</h2>
      <ul>{note.projects.map(id => <li key={id}><Link href={projects.get(id)!.href}>{projects.get(id)!.name} ↗</Link></li>)}</ul>
    </aside>}
    <BlogComments locale={locale} term={`notes/${slug}`} />
  </article>;
}
