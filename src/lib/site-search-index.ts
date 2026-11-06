import { getPortfolio } from '../data/localized';
import { getPersonalProjects } from '../data/personal-projects';
import { getToolchainCopy } from '../data/toolchain';
import { performanceEvidence } from '../data/performance-evidence';
import { localizedPath, type Locale } from './locale';
import type { SearchDocument, SearchIndex } from './site-search-engine';

const text = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(' ');

/** Only fields visibly rendered on the public pages are selected here. */
export function buildSearchIndex(locale: Locale): SearchIndex {
  const { profile, works, siteCopy, caseStories, caseEngineering, projectDetails, careerIntroduction, workAreas, technicalFocus, workingNotes } = getPortfolio(locale);
  const projects = getPersonalProjects(locale);
  const en = locale === 'en';
  const href = (path: string) => localizedPath(locale, path);
  const documents: SearchDocument[] = [];
  const add = (document: SearchDocument) => documents.push(document);

  add({ id: 'home', title: en ? 'Selected work' : '대표 작업', category: 'page', href: href('/#work'), summary: siteCopy.work.intro.join(' '), content: text(siteCopy.work.heading.join(' '), ...siteCopy.work.evidence), keywords: [], featured: true });
  add({ id: 'about', title: en ? 'About Hyeonse Im' : '임현세 소개', category: 'page', href: href('/about/#introduction-title'), summary: careerIntroduction[0], content: careerIntroduction.join(' '), keywords: [en ? 'Frontend Engineer' : '프론트엔드 엔지니어'], featured: true });
  add({ id: 'studio', title: en ? 'Display settings' : '화면 설정', category: 'page', href: href('/studio/'), summary: en ? 'Try different colors, spacing and corners.' : '색, 간격, 모서리를 직접 골라 보세요.', content: en ? 'Theme accent density corners motion. About this site and design system.' : '테마 강조색 밀도 모서리 움직임. 사이트 구성과 디자인 시스템.', keywords: [], featured: false });
  add({ id: 'responsive-lab', title: en ? 'Reflow inside a container' : '너비에 따라 다시 배치', category: 'skill', href: href('/studio/#responsive-lab'), summary: en ? 'Resize a live card to explore CSS container queries.' : '카드 너비를 바꾸며 CSS 컨테이너 쿼리에 따른 배치를 살펴보세요.', content: en ? 'Card width. Compact and wide layouts. React CSS Container Queries.' : '카드 너비. 좁게 넓게. 반응형 컴포넌트. React CSS Container Queries.', keywords: ['CSS', 'React', 'ResizeObserver'], featured: false });
  add({ id: 'async-lab', title: en ? 'Handle a late response' : '늦게 온 응답을 다루기', category: 'skill', href: href('/studio/#async-lab'), summary: en ? 'A local simulation comparing arrival order and latest-request updates.' : '로컬 시뮬레이션으로 도착순 반영과 마지막 요청만 반영하는 동작을 비교해 보세요.', content: en ? 'Request timeline. Slow A, fast B. Ignore stale responses. Reset.' : '요청 타임라인. 느린 A와 빠른 B. 오래된 응답 무시. 초기화.', keywords: ['React', '비동기', 'race condition'], featured: false });
  const toolchain = getToolchainCopy(locale);
  add({ id: 'toolchain', title: toolchain.title, category: 'tool', href: href('/about/#toolchain'), summary: toolchain.intro, content: text(toolchain.note, ...toolchain.stages.map(stage => text(stage.name, stage.role, stage.input, stage.output, stage.example, stage.handoff))), keywords: ['Browser Error Log', 'Error to Test', 'Flow QA'], featured: false });
  add({ id: 'performance-evidence', title: en ? 'Results with their measurement conditions' : '측정 조건과 함께 보는 변화', category: 'skill', href: href('/work/swing-home-performance/#performance-evidence'), summary: performanceEvidence.homepage.condition[locale], content: Object.values(performanceEvidence).map(group => text(group.title[locale], group.condition[locale], ...group.metrics.map(metric => `${metric.label[locale]} ${metric.before} ${metric.after} ${metric.unit[locale]}`))).join(' '), keywords: ['Lighthouse', 'Performance', 'WOFF2'], featured: false });

  for (const work of works) {
    const base = `/work/${work.id}/`;
    const story = caseStories[work.id];
    const engineering = caseEngineering[work.id];
    if (!story || !engineering) continue;
    const name = work.short;
    const sharedKeywords = [work.brand, ...work.tags];
    add({ id: `work-${work.id}`, title: name, category: 'project', href: href(base), summary: work.subtitle, content: text(work.period, work.role, work.outcome, work.boundary), keywords: sharedKeywords, featured: true });
    add({ id: `work-${work.id}-context`, title: text(name, siteCopy.case.contextTitle), category: 'project', href: href(`${base}#context`), summary: story.overview[0], content: text(...story.overview, ...story.scope, story.collaboration), keywords: sharedKeywords, featured: false });
    add({ id: `work-${work.id}-decisions`, title: text(name, siteCopy.case.decisionsTitle), category: 'project', href: href(`${base}#decisions`), summary: story.decisions[0]?.title ?? work.subtitle, content: story.decisions.map(item => text(item.title, item.context, item.choice, item.check)).join(' '), keywords: sharedKeywords, featured: false });
    add({ id: `work-${work.id}-engineering`, title: text(name, siteCopy.case.engineeringTitle), category: 'skill', href: href(`${base}#engineering`), summary: engineering.lead, content: text(engineering.flowCaption, ...engineering.flow.map(item => text(item.title, item.detail)), ...engineering.details.map(item => text(item.label, item.title, item.body))), keywords: [...sharedKeywords, ...engineering.stack], featured: false });
    add({ id: `work-${work.id}-verification`, title: text(name, siteCopy.case.verificationTitle), category: 'project', href: href(`${base}#verification`), summary: story.verification[0]?.detail ?? work.outcome, content: text(...story.verification.map(item => text(item.title, item.detail)), work.outcome, work.boundary), keywords: sharedKeywords, featured: false });
    add({ id: `work-${work.id}-reflection`, title: text(name, siteCopy.case.reflectionTitle), category: 'project', href: href(`${base}#reflection`), summary: story.takeaway, content: story.takeaway, keywords: sharedKeywords, featured: false });
  }

  add({ id: 'about-scope', title: en ? 'Work across products' : '프로젝트를 오가며 맡은 일', category: 'experience', href: href('/about/#scope-title'), summary: workAreas[0]?.description ?? '', content: workAreas.map(area => text(area.title, area.description, ...area.examples)).join(' '), keywords: [], featured: false });
  for (const [index, focus] of technicalFocus.entries()) {
    add({ id: `technical-${index}`, title: focus.title, category: 'skill', href: href('/about/#technical'), summary: focus.detail, content: text(focus.subtitle, focus.label), keywords: [], featured: false });
  }
  add({ id: 'about-method', title: en ? 'How I work' : '일하는 방식', category: 'page', href: href('/about/#method-title'), summary: workingNotes[0]?.detail ?? '', content: workingNotes.map(note => text(note.title, note.detail, note.example)).join(' '), keywords: [], featured: false });
  add({ id: 'about-history', title: en ? 'Experience' : '지금까지의 경력', category: 'experience', href: href('/about/#history-title'), summary: profile.timeline.map(item => text(item.period, item.title)).join(' · '), content: text(...profile.timeline.map(item => text(item.period, item.title, item.description)), profile.education.school, profile.education.major, profile.certificate.name, profile.certificate.earned), keywords: [], featured: true });
  add({ id: 'toolbox', title: en ? 'Technology toolbox' : '사용 기술', category: 'skill', href: href('/#toolbox'), summary: profile.technology.join(' · '), content: profile.technology.join(' '), keywords: profile.technology, featured: false });

  for (const project of projects) {
    add({ id: `personal-${project.id}`, title: project.name, category: 'tool', href: href(`/about/#${project.id}`), summary: project.summary, content: text(project.problem, ...project.highlights, ...project.decisions.map(decision => text(decision.title, decision.detail)), project.verification, project.release), keywords: [...project.stack, project.category], featured: project.id === 'flow-qa' });
  }

  for (const item of profile.otherWork) {
    const detail = projectDetails[item.id];
    add({ id: `archive-${item.id}`, title: item.title, category: 'project', href: href(`/#archive-${item.id}`), summary: detail?.lead ?? item.summary, content: text(item.period, item.scope, ...(detail?.contributions.map(part => text(part.title, part.detail)) ?? []), 'note' in item ? item.note : undefined), keywords: detail?.tags ?? [], featured: false });
  }

  return { locale, documents };
}
