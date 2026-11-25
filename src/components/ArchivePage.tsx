import ArchiveExplorer from './ArchiveExplorer';
import { getPortfolio } from '../data/localized';
import { localizedPath, type Locale } from '../lib/locale';
import { getNotes } from '../lib/notes';
import styles from './ArchivePage.module.css';

export default function ArchivePage({ locale }: { locale: Locale }) {
  const { profile, projectDetails } = getPortfolio(locale);
  const notes = getNotes(locale);
  const en = locale === 'en';

  return (
    <article className={styles.page} id="top">
      <header className={styles.header}>
        <a className={styles.backLink} href={localizedPath(locale, '/#work')}>
          ← {en ? 'Selected work' : '대표 작업'}
        </a>
        <h1>{en ? 'Work archive' : '작업 아카이브'}</h1>
        <p>{en ? 'More projects and contributions from my frontend work.' : '프론트엔드로 참여한 다른 작업과 기여를 모았어요.'}</p>
      </header>

      <section className="archive-section" aria-label={en ? 'More work' : '다른 작업'}>
        <ArchiveExplorer locale={locale} total={profile.otherWork.length}>
          <div className="archive-list">
            {profile.otherWork.map((item, i) => {
              const detail = projectDetails[item.id];
              return (
                <details id={`archive-${item.id}`} data-search-target className="archive-item" key={item.id}>
                  <summary>
                    <span className="archive-number">{String(i + 1).padStart(2, '0')}</span>
                    <h2>{item.title}</h2>
                    <span className="archive-scope">{item.scope}</span>
                    <span className="archive-plus" aria-hidden="true">+</span>
                  </summary>
                  <div className="archive-body">
                    <span className="eyebrow">{item.period}</span>
                    <p>{detail?.lead ?? item.summary}</p>
                    {detail && <>
                      <dl className="archive-contributions">
                        {detail.contributions.map(contribution => <div key={contribution.title}>
                          <dt>{contribution.title}</dt><dd>{contribution.detail}</dd>
                        </div>)}
                      </dl>
                      <ul className="project-tags">{detail.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                    </>}
                    {detail?.publicLink && <a className="text-link" href={detail.publicLink.href} target="_blank" rel="noopener noreferrer">{detail.publicLink.label} ↗</a>}
                    {notes.filter(note => note.projects.includes(item.id)).map(note => <p key={note.slug}>
                      <a className="text-link" href={localizedPath(locale, `/notes/${note.slug}/`)}>{note.title} →</a>
                    </p>)}
                  </div>
                </details>
              );
            })}
          </div>
        </ArchiveExplorer>
      </section>
    </article>
  );
}
