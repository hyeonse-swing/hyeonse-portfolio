import WorkExplorer from './WorkExplorer';
import WorkContextLink from './WorkContextLink';
import { getPortfolio } from '../data/localized';
import { localizedPath, type Locale } from '../lib/locale';
import { getNotes } from '../lib/notes';
import styles from './HomePage.module.css';

function Arrow() {
  return <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function HomePage({ locale }: { locale: Locale }) {
  const { works, profile, siteCopy } = getPortfolio(locale);
  const en = locale === 'en';
  const notes = getNotes(locale).slice(0, 3);
  const href = (path: string) => localizedPath(locale, path);

  return (
    <div className={styles.page}>
      <header className={styles.intro} id="top">
        <h1>{profile.identity.name}<span aria-hidden="true">.</span></h1>
        <p>{en ? 'Frontend Engineer' : '프론트엔드 엔지니어'}</p>
      </header>

      <section className={styles.section} id="work" aria-labelledby="work-title">
        <h2 id="work-title">{siteCopy.work.heading}</h2>
        <WorkExplorer locale={locale} cards={works.map((work, index) => ({
          id: work.id,
          content: <article className={styles.work} key={work.id}>
            <WorkContextLink href={href(`/work/${work.id}/`)} className={styles.workLink}>
              <h3>{work.short}</h3>
              <Arrow />
              <p>{siteCopy.work.evidence[index]}</p>
            </WorkContextLink>
          </article>,
        }))} />
      </section>

      {notes.length > 0 && <section className={styles.section} aria-labelledby="home-notes-title">
        <div className={styles.notesHeading}>
          <h2 id="home-notes-title">{en ? 'Recent notes' : '최근 기록'}</h2>
          <a className={styles.textLink} href={href('/notes/')}>{en ? 'All notes' : '모든 기록'} <Arrow /></a>
        </div>
        <ul className={styles.noteList}>
          {notes.map(note => <li key={note.slug}>
            <a href={href(`/notes/${note.slug}/`)}>{note.title}</a>
            <time dateTime={note.updated ?? note.date}>{note.updated ?? note.date}</time>
          </li>)}
        </ul>
      </section>}

      <nav className={styles.more} aria-label={en ? 'More from the portfolio' : '포트폴리오 더 보기'}>
        <a className={styles.textLink} id="about" href={href('/about/')}>{en ? 'About and experience' : '소개와 경력'} <Arrow /></a>
        <a className={styles.textLink} id="toolbox" href={href('/about/#toolbox')}>{en ? 'Technologies' : '사용 기술'} <Arrow /></a>
        <a className={styles.textLink} id="personal-projects" href={href('/about/#personal-projects')}>{en ? 'Personal tools' : '직접 만든 도구'} <Arrow /></a>
        <a className={styles.textLink} href={href('/work/archive/')}>{en ? 'Work archive' : '다른 작업'} <Arrow /></a>
      </nav>

      <details className={styles.archiveLinks} id="archive" data-search-target>
        <summary>{en ? 'Find a specific past project' : '다른 작업 제목으로 찾기'}</summary>
        <ul>
          {profile.otherWork.map(item => <li key={item.id}>
            <a id={`archive-${item.id}`} href={href(`/work/archive/#archive-${item.id}`)}>{item.title}</a>
          </li>)}
        </ul>
      </details>
    </div>
  );
}
