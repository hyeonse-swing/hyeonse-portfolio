import { getPortfolio } from './localized';
import { getPersonalProjects } from './personal-projects';
import { localizedPath, type Locale } from '../lib/locale';

/** Public project destinations shared by note validation, labels and related links. */
export function getNoteProjects(locale: Locale) {
  const { works, profile } = getPortfolio(locale);
  return [
    ...getPersonalProjects(locale).map(project => ({
      id: project.id, name: project.name, href: localizedPath(locale, `/about/#${project.id}`),
    })),
    ...works.map(work => ({
      id: work.id, name: work.short, href: localizedPath(locale, `/work/${work.id}/`),
    })),
    ...profile.otherWork.map(work => ({
      id: work.id, name: work.title, href: localizedPath(locale, `/#archive-${work.id}`),
    })),
  ];
}
