import { notFound } from 'next/navigation';
import ProjectVisual from './ProjectVisual';
import { getPortfolio } from '../data/localized';
import TechnicalDetails from './TechnicalDetails';
import CaseNavigator from './CaseNavigator';
import PerformanceEvidence from './PerformanceEvidence';
import WorkContextLink from './WorkContextLink';
import { localizedPath, type Locale } from '../lib/locale';
import { getNotes, getProjectNotes } from '../lib/notes';
import noteStyles from './Notes.module.css';
import styles from './WorkPage.module.css';

export default function WorkPage({ id, locale }: { id: string; locale: Locale }) {
  const { works, siteCopy, caseStories, caseEngineering } = getPortfolio(locale);
  const en = locale === 'en';
  const workIndex = works.findIndex(item => item.id === id);
  const work = works[workIndex];
  const story = caseStories[id];
  const engineering = caseEngineering[id];
  if (!work || !story || !engineering) notFound();

  const next = works[(workIndex + 1) % works.length];
  const notes = getProjectNotes(getNotes(locale), id);
  const copy = siteCopy.case;
  const hasPerformanceEvidence = work.figure === 'performance';
  const hasVerification = story.verification.length > 0 || hasPerformanceEvidence;
  const sections = [
    { id: 'context', title: copy.contextTitle },
    { id: 'decisions', title: copy.decisionsTitle },
    { id: 'engineering', title: copy.engineeringTitle },
    ...(hasVerification ? [{ id: 'verification', title: copy.verificationTitle }] : []),
  ];

  return (
    <article className={styles.page} id="top">
      <header className={styles.header}>
        <WorkContextLink className={styles.back} href={localizedPath(locale, '/#work')} filteredLabel={en ? '← Back to selected work' : '← 선택한 작업 목록'}>
          ← {en ? 'All work' : '모든 작업'}
        </WorkContextLink>
        <h1>{work.short}</h1>
        <p className={styles.period}><span>{copy.periodTitle}</span> {work.period}</p>
        <dl className={styles.summary}>
          <div id="role">
            <dt>{copy.roleTitle}</dt>
            <dd>{story.role}</dd>
          </div>
          <div id="outcome">
            <dt id={hasVerification ? undefined : 'reflection'}>{copy.outcomeTitle}</dt>
            <dd id={hasVerification ? undefined : 'verification'}>{work.outcome}</dd>
          </div>
        </dl>
      </header>

      <div className={styles.layout}>
        <CaseNavigator sections={sections} locale={locale} />
        <div className={styles.body}>
          <section id="context">
            <h2>{copy.contextTitle}</h2>
            <p>{story.overview}</p>
          </section>

          <section id="decisions">
            <h2>{copy.decisionsTitle}</h2>
            <ul className={styles.decisions}>
              {story.decisions.map(decision => (
                <li key={decision.title}>
                  <h3>{decision.title}</h3>
                  <p>{decision.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{copy.engineeringTitle}</h2>
            <details className={styles.implementation} id="engineering" data-search-target>
              <summary>{copy.detailsToggle}</summary>
              {!hasPerformanceEvidence && <div className={styles.diagram}>
                <ProjectVisual kind={work.figure} locale={locale} />
              </div>}
              <TechnicalDetails story={engineering} locale={locale} />
            </details>
          </section>

          {hasVerification && <section id="verification">
            {/* The previous reflection link now lands at the closing verification section. */}
            <h2 id="reflection">{copy.verificationTitle}</h2>
            <dl className={styles.verification}>
              {story.verification.map(item => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{item.detail}</dd>
                </div>
              ))}
            </dl>
            {hasPerformanceEvidence && <PerformanceEvidence locale={locale} />}
          </section>}

          {notes.length > 0 && <aside className={noteStyles.related} aria-labelledby="related-notes-title">
            <h2 id="related-notes-title">{en ? 'Related notes' : '관련 기록'}</h2>
            <ul>{notes.map(note => <li key={note.slug}>
              <a href={localizedPath(locale, `/notes/${note.slug}/`)}>{note.title} →</a>
            </li>)}</ul>
          </aside>}
        </div>
      </div>

      <WorkContextLink className={styles.next} href={localizedPath(locale, `/work/${next.id}/`)}>
        <span>{en ? 'Next project' : '다음 작업'}</span>
        <strong>{next.short} <span aria-hidden="true">→</span></strong>
      </WorkContextLink>
    </article>
  );
}
