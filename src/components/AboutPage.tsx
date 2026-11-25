import { getPortfolio } from '../data/localized';
import { getPersonalProjects, isHobbyProject } from '../data/personal-projects';
import { localizedPath, type Locale } from '../lib/locale';
import PersonalProjects from './PersonalProjects';
import ToolchainExplorer from './ToolchainExplorer';
import styles from './AboutPage.module.css';

export default function AboutPage({ locale }: { locale: Locale }) {
  const { profile, careerIntroduction, aboutCases, publicWork } = getPortfolio(locale);
  const en = locale === 'en';
  const personalProjects = getPersonalProjects(locale);

  return (
    <article className={styles.page} id="top">
      <header className={styles.header}>
        <h1 id="introduction-title">{en ? 'About and experience' : '소개와 경력'}</h1>
        <p className={styles.role}>{profile.identity.name} · {en ? 'Frontend Engineer' : '프론트엔드 엔지니어'}</p>
        <p className={styles.intro}>{careerIntroduction}</p>
        <div className={styles.links}>
          <a href={profile.identity.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.identity.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </header>

      <section className={styles.section} id="technical" aria-labelledby="scope-title">
        <h2 id="scope-title">{en ? 'Selected case studies' : '대표 사례'}</h2>
        <ul className={styles.cases} id="method-title" aria-labelledby="scope-title">
          {aboutCases.map(({ id, title, description }) => (
            <li key={id}>
              <h3><a href={localizedPath(locale, `/work/${id}/`)}>{title}</a></h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} id="personal-projects" aria-labelledby="personal-projects-title">
        <h2 id="personal-projects-title">{en ? 'Tools I build' : '직접 만든 도구'}</h2>
        <PersonalProjects locale={locale} projects={personalProjects.filter(project => !isHobbyProject(project.id))} detailed />
        <ToolchainExplorer locale={locale} />
        <h3 className={styles.subheading} id="public-title">{en ? 'More tools and open source' : '다른 도구와 오픈소스 기여'}</h3>
        <ul className={styles.publicWork}>
          {publicWork.map(work => (
            <li key={work.title}>
              <a href={work.href} target="_blank" rel="noopener noreferrer">{work.title}</a>
              <p>{work.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="history-title">
        <h2 id="history-title">{en ? 'Experience' : '경력'}</h2>
        <ul className={styles.history}>
          {[...profile.timeline].reverse().map(item => (
            <li key={item.title}>
              <span className={styles.period}>{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.toolbox} id="toolbox">
          <h3>{en ? 'Tools and technologies' : '사용 기술'}</h3>
          <p>{profile.technology.join(' · ')}</p>
        </div>
        <dl className={styles.background}>
          <div>
            <dt>{en ? 'Education' : '학력'}</dt>
            <dd>{profile.education.school}<span>{profile.education.major}</span></dd>
          </div>
          <div>
            <dt>{en ? 'Certificate' : '자격증'}</dt>
            <dd>{profile.certificate.name}<span>{profile.certificate.earned}</span></dd>
          </div>
        </dl>
      </section>

      <section className={styles.section} id="hobby-projects" aria-labelledby="hobby-projects-title">
        <h2 id="hobby-projects-title">{en ? 'Hobby projects' : '취미 프로젝트'}</h2>
        <PersonalProjects locale={locale} projects={personalProjects.filter(project => isHobbyProject(project.id))} detailed />
      </section>
    </article>
  );
}
