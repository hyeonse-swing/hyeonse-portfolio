import { getPortfolio } from '../data/localized';
import { getPersonalProjects } from '../data/personal-projects';
import { localizedPath, type Locale } from '../lib/locale';
import PersonalProjects from './PersonalProjects';
import ToolchainExplorer from './ToolchainExplorer';
import styles from './AboutPage.module.css';

export default function AboutPage({ locale }: { locale: Locale }) {
  const { profile, careerIntroduction, workAreas, workingNotes, publicWork, technicalFocus } = getPortfolio(locale);
  const en = locale === 'en';
  return <article className={styles.page} id="top">
    <header className={styles.header}>
      <div><span className="eyebrow">ABOUT / HYEONSE IM</span><h1>A closer<br /><span>look.</span></h1></div>
      <div className={styles.identity}><span className="eyebrow">{en ? 'HYEONSE IM' : '임현세'} / FRONTEND ENGINEER</span><p>{en ? <>Customer screens,<br />operational workflows,<br />and the frontend between.</> : <>고객의 화면,<br />운영자의 업무,<br />그 사이의 프론트엔드.</>}</p><div className={styles.current}><span className="status-dot" />THE SWING · 2022.03 — NOW</div></div>
    </header>

    <section className={styles.introduction} aria-labelledby="introduction-title">
      <div><span className="eyebrow">01 / MY ROLE</span><h2 id="introduction-title">{en ? <>Development and<br />technical decisions.</> : <>기능 개발과<br />기술적 판단</>}</h2></div>
      <div className={styles.prose}>{careerIntroduction.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<div className={styles.links}><a href={profile.identity.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={profile.identity.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></div>
    </section>

    <section className={styles.section} aria-labelledby="scope-title">
      <div className={styles.sectionHeading}><div><span className="eyebrow">02 / ACROSS PRODUCTS</span><h2 id="scope-title">{en ? 'My work across products' : '프로젝트를 오가며 맡은 일'}</h2></div><p>SWING · SWAP · YELLOW BUS</p></div>
      <div className={styles.areas}>{workAreas.map(area => <article className={styles.area} key={area.number}><span className={styles.index}>{area.number}</span><h3>{area.title}</h3><div><p>{area.description}</p><ul>{area.examples.map(example => <li key={example}>{example}</li>)}</ul></div></article>)}</div>
      <a className="text-link" href={localizedPath(locale, '/#archive')}>{en ? 'Explore more projects' : '다른 프로젝트도 살펴보기'} ↗</a>
    </section>

    <section className={styles.section} aria-labelledby="technical-title" id="technical">
      <div className={styles.sectionHeading}><div><span className="eyebrow">03 / ENGINEERING</span><h2 id="technical-title">{en ? 'Technical choices' : '기술 선택과 적용'}</h2></div><p>{en ? 'These examples show how I used each tool to solve a problem.' : <>어떤 문제에 어떤 기술을 썼는지<br />구현 사례와 함께 소개해요.</>}</p></div>
      <div className={styles.technical}>{technicalFocus.map(item => <article key={item.title}><div><span className="eyebrow">{item.subtitle}</span><h3>{item.title}</h3></div><div><p>{item.detail}</p><a className="text-link" href={localizedPath(locale, item.href)}>{item.label} ↗</a></div></article>)}</div>
    </section>

    <section className={styles.section} aria-labelledby="method-title">
      <div className={styles.sectionHeading}><div><span className="eyebrow">04 / HOW I WORK</span><h2 id="method-title">{en ? 'How I work' : '일하는 방식'}</h2></div><p>{en ? 'These examples show the choices I made and how I checked them.' : '실제 작업에서 무엇을 선택하고 어떻게 확인했는지 정리했어요.'}</p></div>
      <div className={styles.notes}>{workingNotes.map((note, index) => <article className={styles.note} key={note.title}><span className="eyebrow">0{index + 1}</span><h3>{note.title}</h3><p>{note.detail}</p><div className={styles.example}><span>{en ? 'In practice' : '작업에서'}</span><p>{note.example}</p></div>{note.href && <a className="text-link" href={localizedPath(locale, note.href)}>{en ? 'Read the case study' : '사례 자세히 보기'} ↗</a>}</article>)}</div>
    </section>

    <section className={styles.section} aria-labelledby="history-title">
      <div className={styles.sectionHeading}><div><span className="eyebrow">05 / EXPERIENCE</span><h2 id="history-title">{en ? 'Experience' : '지금까지의 경력'}</h2></div><p>{en ? 'My frontend career began in March 2022.' : '2022년 3월부터 프론트엔드 엔지니어로 일하고 있어요.'}</p></div>
      <div className={styles.history}>{[...profile.timeline].reverse().map(item => <div key={item.title}><span>{item.period}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
      <div className={styles.background}><div><span className="eyebrow">EDUCATION</span><p>{profile.education.school}<br /><span>{profile.education.major}</span></p></div><div><span className="eyebrow">CERTIFICATE</span><p>{profile.certificate.name}<br /><span>{profile.certificate.earned}</span></p></div></div>
    </section>

    <section className={styles.section} id="personal-projects" aria-labelledby="personal-projects-title">
      <div className={styles.sectionHeading}><div><span className="eyebrow">06 / PERSONAL PROJECTS</span><h2 id="personal-projects-title">{en ? 'Tools I build and share' : '직접 만들고 공개한 도구'}</h2></div><p>{en ? 'Alongside reusable interfaces, I connect error collection to reviewable regression test candidates, browser execution and evidence.' : '반복해서 쓰는 화면을 정리하고, 수집한 오류를 회귀 테스트 후보와 브라우저 실행 근거로 이어가는 도구를 만들었어요.'}</p></div>
      <ToolchainExplorer locale={locale} />
      <PersonalProjects locale={locale} projects={getPersonalProjects(locale)} detailed />
    </section>

    <section className={styles.section} aria-labelledby="public-title">
      <div className={styles.sectionHeading}><div><span className="eyebrow">07 / MORE IN THE OPEN</span><h2 id="public-title">{en ? 'More tools and contributions' : '다른 도구와 오픈소스 기여'}</h2></div><p>{en ? 'Other tools I published and contributions to open source.' : '이 밖에 공개한 도구와 오픈소스 기여도 살펴볼 수 있어요.'}</p></div>
      <div className={styles.publicWorks}>{publicWork.map(work => <a href={work.href} target="_blank" rel="noopener noreferrer" key={work.title}><div><span className="eyebrow">{work.label}</span><h3>{work.title}</h3><p>{work.description}</p></div><span aria-hidden="true">↗</span></a>)}</div>
    </section>
    <a className={styles.selectedLink} href={localizedPath(locale, '/#work')}><div><span className="eyebrow">SELECTED WORK</span><p>{en ? <>Explore four projects<br />in more detail.</> : <>대표 작업 네 개를<br />자세히 소개해요.</>}</p></div><span aria-hidden="true">↗</span></a>
  </article>;
}
