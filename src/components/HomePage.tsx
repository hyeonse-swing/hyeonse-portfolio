import IdentityBadge from './IdentityBadge';
import ProjectVisual from './ProjectVisual';
import PersonalProjects from './PersonalProjects';
import { getPortfolio } from '../data/localized';
import { getPersonalProjects } from '../data/personal-projects';
import { localizedPath, type Locale } from '../lib/locale';

const lines = (items: readonly string[]) => items.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>);

export default function HomePage({ locale }: { locale: Locale }) {
  const { works, profile, siteCopy, projectDetails } = getPortfolio(locale);
  const en = locale === 'en';
  return <>
    <section className="hero" id="top" data-badge-stage aria-labelledby="hero-name">
      <div className="hero-intro"><span className="eyebrow">FRONTEND ENGINEER</span><p>{lines(siteCopy.hero.intro)}</p></div>
      <div className="hero-side"><span className="status-dot" />CURRENTLY AT THE SWING<br /><span>{siteCopy.hero.sideNote}</span></div>
      <div className="hero-badge"><IdentityBadge locale={locale} /></div>
      <h1 className="hero-name" id="hero-name"><span>HYEONSE</span><span>IM<span className="name-dot">.</span></span></h1>
      <div className="hero-baseline"><span>{siteCopy.hero.baseline}</span><a href="#work" tabIndex={0}>SELECTED WORK <span aria-hidden="true">↓</span></a><span>2022 — NOW</span></div>
    </section>

    <section id="work" className="work-section section-space" aria-labelledby="work-title">
      <div className="section-heading"><div><span className="eyebrow">01 / SELECTED WORK</span><h2 id="work-title">{lines(siteCopy.work.heading)}<span className="blue">.</span></h2></div><p>{lines(siteCopy.work.intro)}<br /><span className="muted">{siteCopy.work.countLabel}</span></p></div>
      <div className="work-grid">{works.map((work, i) => <article className={`work-card work-${work.figure}`} key={work.id}>
        <a href={localizedPath(locale, `/work/${work.id}/`)} className="work-link" tabIndex={0}>
          <div className="work-visual"><ProjectVisual kind={work.figure} locale={locale} /><span className="work-open" aria-hidden="true">↗</span></div>
          <div className="work-caption"><div className="work-caption-top"><span>{work.number} / {work.brand}</span><span>{work.year}</span></div><h3>{work.short}</h3><p>{siteCopy.work.evidence[i]}</p><span className="work-category">{work.category}</span></div>
        </a>
      </article>)}</div>
    </section>

    <section className="about-section section-space" id="about" aria-labelledby="about-title">
      <div className="about-top"><span className="eyebrow">02 / A LITTLE ABOUT ME</span><span className="eyebrow">{en ? 'HYEONSE IM / FRONTEND ENGINEER' : '임현세 / HYEONSE IM'}</span></div>
      <div className="about-opening"><h2 id="about-title">{lines(siteCopy.about.heading)}</h2><div className="about-copy"><p className="about-lead">{lines(siteCopy.about.lead)}</p>{siteCopy.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<a className="about-more" href={localizedPath(locale, '/about/')}>{en ? 'My work and how I approach it' : '맡아온 일과 일하는 방식'} <span aria-hidden="true">↗</span></a><div className="about-links"><a href={profile.identity.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={0}>LinkedIn ↗</a><a href={profile.identity.github} target="_blank" rel="noopener noreferrer" tabIndex={0}>GitHub ↗</a></div></div></div>
      <div className="experience-heading"><span className="eyebrow">EXPERIENCE</span><span className="eyebrow">THE PATH SO FAR</span></div>
      <div className="timeline">{[...profile.timeline].reverse().map(item => <div className="timeline-row" key={item.title}><span>{item.period}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
      <div className="tools-line"><span className="eyebrow">MY TOOLBOX</span><p>{profile.technology.join(' / ')}</p></div>
    </section>

    <section id="archive" className="archive-section section-space" aria-labelledby="archive-title">
      <div className="section-heading"><div><span className="eyebrow">03 / MORE FROM THE DESK</span><h2 id="archive-title">{lines(siteCopy.archive.heading)}<span className="blue">.</span></h2></div><p>{lines(siteCopy.archive.intro)}</p></div>
      <div className="archive-list">{profile.otherWork.map((item, i) => {
        const detail = projectDetails[item.id];
        return <details className="archive-item" key={item.id}><summary tabIndex={0}><span className="archive-number">{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3><span className="archive-scope">{item.scope}</span><span className="archive-plus" aria-hidden="true">+</span></summary><div className="archive-body"><span className="eyebrow">{item.period}</span><p>{detail?.lead ?? item.summary}</p>{detail && <><dl className="archive-contributions">{detail.contributions.map(contribution => <div key={contribution.title}><dt>{contribution.title}</dt><dd>{contribution.detail}</dd></div>)}</dl><ul className="project-tags">{detail.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></>}{'note' in item && <p className="archive-note">{item.note}</p>}{detail?.publicLink && <a className="text-link" href={detail.publicLink.href} target="_blank" rel="noopener noreferrer">{detail.publicLink.label} ↗</a>}</div></details>;
      })}</div>
    </section>
    <section id="personal-projects" className="section-space" aria-labelledby="personal-projects-title">
      <div className="section-heading"><div><span className="eyebrow">04 / PERSONAL PROJECTS</span><h2 id="personal-projects-title">{en ? <>Tools I build<br />and share</> : <>직접 만들고<br />공개한 도구</>}<span className="blue">.</span></h2></div><p>{en ? 'Design foundations, QA and error logging. Personal projects built around problems I encounter in development.' : <>디자인 시스템부터 QA와 오류 수집까지.<br />개발하며 만난 문제를 개인 프로젝트로 풀었어요.</>}</p></div>
      <PersonalProjects locale={locale} projects={getPersonalProjects(locale)} />
    </section>
    <a className="studio-invitation" href={localizedPath(locale, '/studio/')}><span className="eyebrow">05 / OPEN STUDIO</span><div><h2>{en ? 'Make this space your own.' : '이 화면도, 바꿔볼까요?'}</h2><p>{en ? 'Try different colors, spacing and corners. Take a look at how this site was built, too.' : '색, 간격, 모서리를 직접 골라 보세요. 이 사이트를 만든 방식도 적어 두었습니다.'}</p></div><span aria-hidden="true">↗</span></a>
  </>;
}
