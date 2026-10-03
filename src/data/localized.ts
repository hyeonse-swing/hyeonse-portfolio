import { works, profile } from './work';
import { siteCopy } from './site-copy';
import { caseStories } from './case-stories';
import { caseEngineering, technicalFocus } from './engineering';
import { projectDetails, careerIntroduction, workAreas, workingNotes, publicWork } from './career';
import profileEn from './en/content.json';
import { presentationEn } from './en/work';
import { siteCopyEn } from './en/site-copy';
import { caseStoriesEn } from './en/case-stories';
import { caseEngineeringEn, technicalFocusEn } from './en/engineering';
import { projectDetailsEn, careerIntroductionEn, workAreasEn, workingNotesEn, publicWorkEn } from './en/career';
import type { Locale } from '../lib/locale';

export const workIds = works.map(work => work.id);

export function getPortfolio(locale: Locale) {
  if (locale === 'en') {
    const englishWorks = workIds.map(id => ({
      ...profileEn.featuredCases.find(item => item.id === id)!,
      ...presentationEn[id as keyof typeof presentationEn],
    }));
    return { profile: profileEn, works: englishWorks, siteCopy: siteCopyEn, caseStories: caseStoriesEn, caseEngineering: caseEngineeringEn, technicalFocus: technicalFocusEn, projectDetails: projectDetailsEn, careerIntroduction: careerIntroductionEn, workAreas: workAreasEn, workingNotes: workingNotesEn, publicWork: publicWorkEn };
  }
  return { profile, works, siteCopy, caseStories, caseEngineering, technicalFocus, projectDetails, careerIntroduction, workAreas, workingNotes, publicWork };
}
