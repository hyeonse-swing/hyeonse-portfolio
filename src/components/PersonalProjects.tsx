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
        </div>
        <div className={styles.detailBody}>
          <ul className={styles.highlights}>{project.highlights.slice(0, 2).map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
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
