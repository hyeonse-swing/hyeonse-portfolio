import IdentityBadge from './IdentityBadge';
import ProjectVisual from './ProjectVisual';
import PersonalProjects from './PersonalProjects';
import WorkExplorer from './WorkExplorer';
import WorkContextLink from './WorkContextLink';
import ArchiveExplorer from './ArchiveExplorer';
import { getPortfolio } from '../data/localized';
import { getPersonalProjects } from '../data/personal-projects';
import { localizedPath, type Locale } from '../lib/locale';
import { getNotes } from '../lib/notes';
import NoteActivityDate from './NoteActivityDate';
import styles from './HomePage.module.css';

const lines = (items: readonly string[]) => items.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>);

function Arrow({ down = false }: { down?: boolean }) {
  return <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d={down ? 'M12 4v16M5 13l7 7 7-7' : 'M5 19 19 5M5 5h14v14'} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function HomePage({ locale }: { locale: Locale }) {
  const { works, profile, siteCopy, projectDetails } = getPortfolio(locale);
  const en = locale === 'en';
  const notes = getNotes(locale);
  return <>
    <section className={`hero ${styles.heroStage}`} id="top" data-badge-stage aria-labelledby="hero-name">
      <div className="hero-intro"><p>{lines(siteCopy.hero.intro)}</p><div className={styles.heroLinks}><a href="#work">{en ? 'Explore the work' : '작업 살펴보기'}<Arrow down /></a><a href={localizedPath(locale, '/notes/')}>{en ? 'Project notes' : '작업 기록'}<Arrow /></a></div></div>
      <div className="hero-side">Currently at The Swing<br /><span>{siteCopy.hero.sideNote}</span></div>
      <div className="hero-badge"><IdentityBadge locale={locale} /></div>
      <h1 className="hero-name" id="hero-name"><span>HYEONSE</span><span>IM<span className="name-dot">.</span></span></h1>
      <div className="hero-baseline"><span>{siteCopy.hero.baseline}</span><a href="#work" tabIndex={0}>SELECTED WORK <Arrow down /></a><span>2022 — NOW</span></div>
    </section>

    <section id="work" className={`work-section section-space ${styles.workSection}`} aria-labelledby="work-title">
      <div className={`section-heading ${styles.sectionHeading}`}><div><h2 id="work-title">{lines(siteCopy.work.heading)}<span className="blue">.</span></h2></div><p>{lines(siteCopy.work.intro)}<br /><span className="muted">{siteCopy.work.countLabel}</span></p></div>
      <WorkExplorer locale={locale} cards={works.map((work, i) => ({ id: work.id, content: <article className={`work-card work-${work.figure}`} key={work.id}>
        <WorkContextLink href={localizedPath(locale, `/work/${work.id}/`)} className="work-link">
          <div className="work-visual"><ProjectVisual kind={work.figure} locale={locale} /><span className="work-open" aria-hidden="true">↗</span></div>
          <div className="work-caption"><div className="work-caption-top"><span>{work.number} / {work.brand}</span><span>{work.year}</span></div><h3>{work.short}</h3><p>{siteCopy.work.evidence[i]}</p><span className="work-category">{work.category}</span></div>
        </WorkContextLink>
      </article> }))} />
    </section>

    <section className={`about-section section-space ${styles.aboutSection}`} id="about" aria-labelledby="about-title">
      <div className="about-opening"><h2 id="about-title">{lines(siteCopy.about.heading)}</h2><div className="about-copy"><p className="about-lead">{lines(siteCopy.about.lead)}</p>{siteCopy.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<a className="about-more" href={localizedPath(locale, '/about/')}>{en ? 'My work and how I approach it' : '맡아온 일과 일하는 방식'} <span aria-hidden="true">↗</span></a><div className="about-links"><a href={profile.identity.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={0}>LinkedIn ↗</a><a href={profile.identity.github} target="_blank" rel="noopener noreferrer" tabIndex={0}>GitHub ↗</a></div></div></div>
      <div className="experience-heading"><h3 className={styles.timelineTitle}>{en ? 'Experience' : '걸어온 길'}</h3></div>
      <div className="timeline">{[...profile.timeline].reverse().map(item => <div className="timeline-row" key={item.title}><span>{item.period}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
      <div className="tools-line" id="toolbox"><span className="eyebrow">MY TOOLBOX</span><p>{profile.technology.join(' / ')}</p></div>
    </section>

    <section id="archive" className="archive-section section-space" aria-labelledby="archive-title">
      <div className={`section-heading ${styles.sectionHeading}`}><div><h2 id="archive-title">{lines(siteCopy.archive.heading)}<span className="blue">.</span></h2></div><p>{lines(siteCopy.archive.intro)}</p></div>
      <ArchiveExplorer locale={locale} total={profile.otherWork.length}><div className="archive-list">{profile.otherWork.map((item, i) => {
        const detail = projectDetails[item.id];
        return <details id={`archive-${item.id}`} data-search-target className="archive-item" key={item.id}><summary tabIndex={0}><span className="archive-number">{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3><span className="archive-scope">{item.scope}</span><span className="archive-plus" aria-hidden="true">+</span></summary><div className="archive-body"><span className="eyebrow">{item.period}</span><p>{detail?.lead ?? item.summary}</p>{detail && <><dl className="archive-contributions">{detail.contributions.map(contribution => <div key={contribution.title}><dt>{contribution.title}</dt><dd>{contribution.detail}</dd></div>)}</dl><ul className="project-tags">{detail.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></>}{detail?.publicLink && <a className="text-link" href={detail.publicLink.href} target="_blank" rel="noopener noreferrer">{detail.publicLink.label} ↗</a>}{notes.filter(note => note.projects.includes(item.id)).map(note => <p key={note.slug}><a className="text-link" href={localizedPath(locale, `/notes/${note.slug}/`)}>{note.title} →</a></p>)}</div></details>;
      })}</div></ArchiveExplorer>
    </section>
    <section id="personal-projects" className="section-space" aria-labelledby="personal-projects-title">
      <div className={`section-heading ${styles.sectionHeading}`}><div><h2 id="personal-projects-title">{en ? <>Projects I build<br />and share</> : <>직접 만들고<br />공개한 프로젝트</>}<span className="blue">.</span></h2></div><p>{en ? 'I build tools I use myself, from a design system and browser QA tools to Mac apps for capturing a window or following a song.' : <>디자인 시스템과 브라우저 QA 도구,<br />창을 캡처하고 음악을 듣는 Mac 앱까지.<br />직접 쓰면서 필요했던 도구를 만들었어요.</>}</p></div>
      <PersonalProjects locale={locale} projects={getPersonalProjects(locale)} />
      <a className="toolchain-link" href={localizedPath(locale, '/about/#toolchain')}>{en ? 'Explore how the tools connect' : '도구가 이어지는 과정 살펴보기'} <span aria-hidden="true">→</span></a>
    </section>
    {notes.length > 0 && <section className={`section-space ${styles.notesSection}`} aria-labelledby="home-notes-title">
      <div className={styles.notesHeading}><h2 id="home-notes-title">{en ? 'Behind the work' : '작업 뒤에 남긴 기록'}<span className="blue">.</span></h2><a href={localizedPath(locale, '/notes/')}>{en ? 'All notes' : '기록 모두 보기'}<Arrow /></a></div>
      <ol className={styles.noteList}>{notes.slice(0, 3).map(note => <li key={note.slug}><article>
        <div className={styles.noteMeta}>{note.activity ? <NoteActivityDate activity={note.activity} locale={locale} compact /> : <span>{en ? 'Published' : '게시'} <time dateTime={note.date}>{note.date}</time></span>}<span>{note.readingMinutes}{en ? ' min read' : '분 읽기'}</span></div>
        <h3><a href={localizedPath(locale, `/notes/${note.slug}/`)}>{note.title}<Arrow /></a></h3><p>{note.description}</p>
      </article></li>)}</ol>
    </section>}
    <a className={`studio-invitation ${styles.studioInvitation}`} href={localizedPath(locale, '/studio/')}><div><h2>{en ? 'Frontend, hands on' : '직접 만져보는 프론트엔드'}</h2><p>{en ? 'Resize a component, compare async responses, and make this display your own. Small experiments with real interactions.' : '컴포넌트의 너비를 바꾸고, 늦게 도착한 응답을 비교해 보세요. 화면 설정과 함께 직접 조작하는 작은 실험을 준비했어요.'}</p></div><Arrow /></a>
  </>;
}
