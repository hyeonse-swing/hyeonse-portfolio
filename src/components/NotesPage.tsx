import Link from 'next/link';
import { localizedPath, type Locale } from '../lib/locale';
import { NOTES_PER_PAGE, notePagePath, paginationItems, type NotePagination } from '../lib/note-pagination';
import type { Note } from '../lib/notes';
import NoteActivityDate from './NoteActivityDate';
import styles from './Notes.module.css';

export default function NotesPage({ locale, pagination }: { locale: Locale; pagination: NotePagination<Note> }) {
  const en = locale === 'en';
  const { notes, page, totalPages, totalNotes } = pagination;
  const firstNote = (page - 1) * NOTES_PER_PAGE + 1;
  const lastNote = firstNote + notes.length - 1;
  return <section className={styles.page} id="top" aria-labelledby="notes-title">
    <header className={styles.intro}>
      <p className="eyebrow">NOTES</p>
      <h1 id="notes-title">{en ? 'Notes' : '기록'}<span aria-hidden="true">.</span></h1>
      <p>{en ? 'Things I have built, problems I have worked through, and notes along the way.' : '만들어 본 것, 막혔던 문제, 그 과정에서 배운 것을 적어요.'}</p>
    </header>
    {totalNotes > 0 && <p className={styles.count}>{en ? `${totalNotes} notes` : `전체 ${totalNotes}개`} · {firstNote}–{lastNote}</p>}
    {notes.length ? <ol className={styles.list} start={firstNote}>{notes.map(note => <li key={note.slug}>
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
    {totalPages > 1 && <nav className={styles.pagination} aria-label={en ? 'Notes pagination' : '기록 페이지'}>
      {page > 1
        ? <Link href={localizedPath(locale, notePagePath(page - 1))} rel="prev" className={styles.pageControl}>{en ? 'Previous' : '이전'}</Link>
        : <span className={`${styles.pageControl} ${styles.pageDisabled}`} aria-hidden="true">{en ? 'Previous' : '이전'}</span>}
      <div className={styles.pageNumbers}>
        {paginationItems(page, totalPages).map((item, index) => item === 'ellipsis'
          ? <span key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">…</span>
          : item === page
            ? <span key={item} className={`${styles.pageNumber} ${styles.pageCurrent}`} aria-current="page" aria-label={en ? `Current page, ${item}` : `현재 ${item}페이지`}>{item}</span>
            : <Link key={item} href={localizedPath(locale, notePagePath(item))} className={styles.pageNumber} aria-label={en ? `Page ${item}` : `${item}페이지`}>{item}</Link>)}
      </div>
      {page < totalPages
        ? <Link href={localizedPath(locale, notePagePath(page + 1))} rel="next" className={styles.pageControl}>{en ? 'Next' : '다음'}</Link>
        : <span className={`${styles.pageControl} ${styles.pageDisabled}`} aria-hidden="true">{en ? 'Next' : '다음'}</span>}
    </nav>}
  </section>;
}
