import type { PersonalProject } from '../data/personal-projects';
import { localizedPath, type Locale } from '../lib/locale';
import styles from './PersonalProjects.module.css';
import { getNotes, getProjectNotes } from '../lib/notes';

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
  const notes = getNotes(locale);
  const notesByProject = new Map(projects.map(project => [project.id, getProjectNotes(notes, project.id)]));

  if (detailed) {
    return <div className={styles.details}>
      {projects.map(project => <article className={styles.detail} id={project.id} key={project.id}>
        <div className={styles.detailIntro}>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          <div className={styles.links}>
            {project.links[0] && <ProjectLink {...project.links[0]} />}
            {notesByProject.get(project.id)?.[0] && <a href={localizedPath(locale, `/notes/${notesByProject.get(project.id)![0].slug}/`)}>{en ? 'Project note' : '프로젝트 기록'} <span aria-hidden="true">↗</span></a>}
          </div>
        </div>
        <details className={styles.expand}>
          <summary>
            <span className={styles.expandLabel}>{en ? 'Design and verification' : '설계와 검증'}</span>
            <span className={styles.expandIcon} aria-hidden="true">＋</span>
          </summary>
          <div className={styles.detailBody}>
            <div className={styles.problem}><h4>{en ? 'Why I built it' : '만든 이유'}</h4><p>{project.problem}</p></div>
            <ul className={styles.highlights}>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
            <div className={styles.decisions} aria-label={en ? 'Design decisions' : '설계에서 선택한 것'}>{project.decisions.map(decision => <div key={decision.title}>
              <h4>{decision.title}</h4><p>{decision.detail}</p>
            </div>)}</div>
            <div className={styles.verification}><h4>{en ? 'Verification and scope' : '검증과 범위'}</h4><p>{project.verification}</p></div>
            {project.stack.length > 0 && <ul className={styles.stack} aria-label={en ? 'Technology stack' : '기술 스택'}>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>}
            <div className={styles.detailFooter}>
              <p className={styles.release}><span>{en ? 'RELEASE' : '배포'}</span>{project.release}</p>
              <div className={styles.links}>{project.links.slice(1).map(link => <ProjectLink key={link.href} {...link} />)}{notesByProject.get(project.id)!.slice(1).map(note => <a key={note.slug} href={localizedPath(locale, `/notes/${note.slug}/`)}>{note.title} →</a>)}</div>
            </div>
          </div>
        </details>
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
        {notesByProject.get(project.id)?.[0] && <a href={localizedPath(locale, `/notes/${notesByProject.get(project.id)![0].slug}/`)}>{en ? 'Project note' : '프로젝트 기록'} <span aria-hidden="true">→</span></a>}
      </div>
    </article>)}
  </div>;
}
