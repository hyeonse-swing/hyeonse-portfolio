import { notFound } from 'next/navigation';
import ProjectVisual from './ProjectVisual';
import { getPortfolio } from '../data/localized';
import TechnicalDetails from './TechnicalDetails';
import { localizedPath, type Locale } from '../lib/locale';

export default function WorkPage({ id, locale }: { id: string; locale: Locale }) {
  const { works, siteCopy, caseStories, caseEngineering } = getPortfolio(locale);
  const en = locale === 'en';
  const work = works.find(item => item.id === id);
  const story = caseStories[id];
  const engineering = caseEngineering[id];
  if (!work || !story || !engineering) notFound();
  const next = works[(works.findIndex(item => item.id === work.id) + 1) % works.length];
  return <article className="case-page" id="top">
    <header className="case-header"><a className="back-link" href={localizedPath(locale, '/#work')} tabIndex={0}>← {en ? 'All work' : '모든 작업'}</a><div className="case-eyebrow"><span>{work.number} / {work.brand}</span><span>{work.category}</span></div><h1>{work.short}</h1><p className="case-subtitle">{work.subtitle}</p><div className="case-meta"><div><span>PERIOD</span><p>{work.period}</p></div><div><span>MY ROLE</span><p>{work.role}</p></div><div><span>TOOLS & CONTEXT</span><p>{work.tags.join(' · ')}</p></div></div></header>
    <div className="case-visual"><ProjectVisual kind={work.figure} locale={locale} large /></div>
    <div className="case-content"><aside className="case-index"><span className="eyebrow">IN THIS STORY</span><nav aria-label={en ? 'Case study contents' : '사례 목차'}><a href="#context" tabIndex={0}>01 {siteCopy.case.contextTitle}</a><a href="#decisions" tabIndex={0}>02 {siteCopy.case.decisionsTitle}</a><a href="#engineering" tabIndex={0}>03 {en ? 'Technical details' : '기술적 구현'}</a><a href="#verification" tabIndex={0}>04 {siteCopy.case.verificationTitle}</a><a href="#reflection" tabIndex={0}>05 {siteCopy.case.reflectionTitle}</a></nav></aside><div className="case-prose">
      <section id="context"><span className="eyebrow">01 / CONTEXT</span><h2>{siteCopy.case.contextTitle}</h2>{story.overview.map((paragraph, index) => <p className={index === 0 ? 'prose-lead' : 'context-paragraph'} key={paragraph}>{paragraph}</p>)}<ul className="project-tags case-scope">{story.scope.map(scope => <li key={scope}>{scope}</li>)}</ul><div className="role-note"><span>{en ? 'My role and collaboration' : '맡은 역할과 협업'}</span><p>{work.id === 'bike-operations' && (en ? 'I handled the frontend, working with around five backend engineers. ' : '백엔드 약 5명과 협업하며 프론트엔드 전반을 담당했습니다. ')}{story.collaboration}</p></div></section>
      <section id="decisions"><span className="eyebrow">02 / DECISIONS</span><h2>{siteCopy.case.decisionsTitle}</h2><ol className="decision-list">{story.decisions.map((decision, i) => <li key={decision.title}><span>0{i + 1}</span><div><h3>{decision.title}</h3><p className="decision-context">{decision.context}</p><p>{decision.choice}</p>{decision.check && <p className="decision-check">{decision.check}</p>}</div></li>)}</ol>
      {work.id === 'swing-home-performance' && <div className="metric-table"><div className="metric-table-head"><span>{en ? 'Compared under the same conditions.' : '같은 조건에서 비교했습니다.'}</span><span>BEFORE → AFTER</span></div><div><span>Performance</span><strong>54 <i>→</i> 95</strong></div><div><span>{en ? 'Initial transfer' : '초기 전송량'}</span><strong>19.805 <i>→</i> 0.488 <small>MB</small></strong></div><p>{en ? <>Local production build · Lighthouse mobile simulation<br />Medians of 3 runs before / 5 after · Measured in July 2026</> : <>로컬 프로덕션 빌드 · Lighthouse 모바일 시뮬레이션<br />이전 3회 / 이후 5회 중앙값 · 2026.07 당시 측정</>}</p></div>}
      {work.id === 'swap-admin-v2' && <div className="flow-note"><span className="eyebrow">{en ? 'Lookup flow in the system at the time' : '당시 시스템의 조회 경로'}</span><p>{en ? 'Open task detail' : '작업 상세 진입'} <span>→</span> {en ? 'Try V2 first' : 'V2 우선 조회'} <span>→</span> {en ? 'Fall back to V1 if the request fails' : '요청 실패 시 V1 fallback'}</p><small>{en ? 'A summary of the task-detail lookup flow during the transition.' : '전환 중 작업 상세에서 사용한 조회 흐름을 정리한 도식입니다.'}</small></div>}
      </section>
      <section id="engineering"><span className="eyebrow">03 / ENGINEERING</span><h2>{siteCopy.case.engineeringTitle}</h2><TechnicalDetails story={engineering} locale={locale} /></section>
      <section id="verification"><span className="eyebrow">04 / VERIFICATION</span><h2>{siteCopy.case.verificationTitle}</h2><dl className="verification-list">{story.verification.map(item => <div key={item.title}><dt>{item.title}</dt><dd><p>{item.detail}</p></dd></div>)}</dl><div className="outcome-note"><span className="eyebrow">OUTCOME</span><p>{work.outcome}</p></div><p className="boundary-note">{work.boundary}</p></section>
      <section id="reflection"><span className="eyebrow">05 / REFLECTION</span><h2>{siteCopy.case.reflectionTitle}</h2><blockquote>{story.takeaway}</blockquote><p className="case-disclosure">{siteCopy.case.disclosure}</p></section>
    </div></div>
    <a className="next-work" href={localizedPath(locale, `/work/${next.id}/`)} tabIndex={0}><div><span className="eyebrow">NEXT / {next.brand}</span><h2>{next.short}</h2></div><span aria-hidden="true">↗</span></a>
  </article>;
}
