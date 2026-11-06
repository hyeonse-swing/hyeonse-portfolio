import { notFound } from 'next/navigation';
import ProjectVisual from './ProjectVisual';
import { getPortfolio } from '../data/localized';
import TechnicalDetails from './TechnicalDetails';
import CaseNavigator from './CaseNavigator';
import PerformanceEvidence from './PerformanceEvidence';
import WorkContextLink from './WorkContextLink';
import { localizedPath, type Locale } from '../lib/locale';

export default function WorkPage({ id, locale }: { id: string; locale: Locale }) {
  const { works, siteCopy, caseStories, caseEngineering } = getPortfolio(locale);
  const en = locale === 'en';
  const work = works.find(item => item.id === id);
  const story = caseStories[id];
  const engineering = caseEngineering[id];
  if (!work || !story || !engineering) notFound();
  const next = works[(works.findIndex(item => item.id === work.id) + 1) % works.length];
  const sections = [
    { id: 'context', title: siteCopy.case.contextTitle },
    { id: 'decisions', title: siteCopy.case.decisionsTitle },
    { id: 'engineering', title: en ? 'Technical details' : '기술적 구현' },
    { id: 'verification', title: siteCopy.case.verificationTitle },
    { id: 'reflection', title: siteCopy.case.reflectionTitle },
  ];
  return <article className="case-page" id="top">
    <header className="case-header"><WorkContextLink className="back-link" href={localizedPath(locale, '/#work')} filteredLabel={en ? '← Back to selected work' : '← 선택한 작업 목록'}>← {en ? 'All work' : '모든 작업'}</WorkContextLink><div className="case-eyebrow"><span>{work.number} / {work.brand}</span><span>{work.category}</span></div><h1>{work.short}</h1><p className="case-subtitle">{work.subtitle}</p><div className="case-meta"><div><span>PERIOD</span><p>{work.period}</p></div><div><span>MY ROLE</span><p>{work.role}</p></div><div><span>TOOLS & CONTEXT</span><p>{work.tags.join(' · ')}</p></div></div></header>
    <div className="case-visual"><ProjectVisual kind={work.figure} locale={locale} large /></div>
    <div className="case-content"><CaseNavigator sections={sections} locale={locale} /><div className="case-prose">
      <section id="context"><span className="eyebrow">01 / CONTEXT</span><h2>{siteCopy.case.contextTitle}</h2>{story.overview.map((paragraph, index) => <p className={index === 0 ? 'prose-lead' : 'context-paragraph'} key={paragraph}>{paragraph}</p>)}<ul className="project-tags case-scope">{story.scope.map(scope => <li key={scope}>{scope}</li>)}</ul><div className="role-note"><span>{en ? 'My role and collaboration' : '맡은 역할과 협업'}</span><p>{work.id === 'bike-operations' && (en ? 'I handled the frontend, working with around five backend engineers. ' : '백엔드 약 5명과 협업하며 프론트엔드 전반을 담당했어요. ')}{story.collaboration}</p></div></section>
      <section id="decisions"><span className="eyebrow">02 / DECISIONS</span><h2>{siteCopy.case.decisionsTitle}</h2><ol className="decision-list">{story.decisions.map((decision, i) => <li key={decision.title}><span>0{i + 1}</span><div><h3>{decision.title}</h3><p className="decision-context">{decision.context}</p><p>{decision.choice}</p>{decision.check && <p className="decision-check">{decision.check}</p>}</div></li>)}</ol>
      {work.id === 'swing-home-performance' && <PerformanceEvidence locale={locale} />}
      {work.id === 'swap-admin-v2' && <div className="flow-note"><span className="eyebrow">{en ? 'Lookup flow in the system at the time' : '당시 시스템의 조회 경로'}</span><p>{en ? 'Open task detail' : '작업 상세 진입'} <span>→</span> {en ? 'Try V2 first' : 'V2 우선 조회'} <span>→</span> {en ? 'Fall back to V1 if the request fails' : '요청 실패 시 V1 fallback'}</p><small>{en ? 'A summary of the task-detail lookup flow during the transition.' : '전환 당시 작업 상세에서 사용한 조회 흐름이에요.'}</small></div>}
      </section>
      <section id="engineering"><span className="eyebrow">03 / ENGINEERING</span><h2>{siteCopy.case.engineeringTitle}</h2><TechnicalDetails story={engineering} locale={locale} /></section>
      <section id="verification"><span className="eyebrow">04 / VERIFICATION</span><h2>{siteCopy.case.verificationTitle}</h2><dl className="verification-list">{story.verification.map(item => <div key={item.title}><dt>{item.title}</dt><dd><p>{item.detail}</p></dd></div>)}</dl><div className="outcome-note"><span className="eyebrow">OUTCOME</span><p>{work.outcome}</p></div><p className="boundary-note">{work.boundary}</p></section>
      <section id="reflection"><span className="eyebrow">05 / REFLECTION</span><h2>{siteCopy.case.reflectionTitle}</h2><blockquote>{story.takeaway}</blockquote><p className="case-disclosure">{siteCopy.case.disclosure}</p></section>
    </div></div>
    <WorkContextLink className="next-work" href={localizedPath(locale, `/work/${next.id}/`)}><div><span className="eyebrow">NEXT / {next.brand}</span><h2>{next.short}</h2></div><span aria-hidden="true">↗</span></WorkContextLink>
  </article>;
}
