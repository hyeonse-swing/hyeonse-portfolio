import type { PersonalProject } from '../data/personal-projects';
import { localizedPath, type Locale } from '../lib/locale';
import styles from './PersonalProjects.module.css';

type Props = {
  locale: Locale;
  projects: readonly PersonalProject[];
  detailed?: boolean;
};

function ProjectLink({ label, href }: { label: string; href: string }) {
  const external = /^https?:\/\//.test(href);
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{label} <span aria-hidden="true">↗</span></a>;
}

export default function PersonalProjects({ locale, projects, detailed = false }: Props) {
  const en = locale === 'en';

  if (detailed) {
    return <div className={styles.details}>
      {projects.map((project, index) => <article className={styles.detail} id={project.id} key={project.id}>
        <div className={styles.detailIntro}>
          <span className={styles.index}>{String(index + 1).padStart(2, '0')} / {project.category}</span>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          <div className={styles.problem}><span>{en ? 'WHY I BUILT IT' : '만든 이유'}</span><p>{project.problem}</p></div>
        </div>
        <div className={styles.detailBody}>
          <ul className={styles.highlights}>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
          <div className={styles.decisions} aria-label={en ? 'Design decisions' : '설계에서 선택한 것'}>{project.decisions.map((decision, decisionIndex) => <div key={decision.title}>
            <span>{String(decisionIndex + 1).padStart(2, '0')} / {en ? 'DECISION' : '설계 판단'}</span><h4>{decision.title}</h4><p>{decision.detail}</p>
          </div>)}</div>
          <div className={styles.verification}><span>{en ? 'VERIFICATION & SCOPE' : '검증과 범위'}</span><p>{project.verification}</p></div>
          {project.stack.length > 0 && <ul className={styles.stack} aria-label={en ? 'Technology stack' : '기술 스택'}>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>}
          <div className={styles.detailFooter}>
            <p className={styles.release}><span>{en ? 'RELEASE' : '배포'}</span>{project.release}</p>
            <div className={styles.links}>{project.links.map(link => <ProjectLink key={link.href} {...link} />)}</div>
          </div>
        </div>
      </article>)}
    </div>;
  }

  return <div className={styles.overview}>
    {projects.map((project, index) => <article className={styles.card} key={project.id}>
      <span className={styles.index}>{String(index + 1).padStart(2, '0')} / {project.category}</span>
      <h3>{project.name}</h3>
      <p className={styles.summary}>{project.summary}</p>
      <ul className={styles.stack} aria-label={en ? 'Technology stack' : '기술 스택'}>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
      <p className={styles.release}><span>{en ? 'RELEASE' : '배포'}</span>{project.release}</p>
      <div className={styles.cardLinks}>
        {project.links[0] && <ProjectLink {...project.links[0]} />}
        <a href={localizedPath(locale, `/about/#${project.id}`)}>{en ? 'Project details' : '자세히 보기'} <span aria-hidden="true">→</span></a>
      </div>
    </article>)}
  </div>;
}
