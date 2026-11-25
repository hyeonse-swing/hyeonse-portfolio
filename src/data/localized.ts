import { works, profile } from './work';
import { siteCopy } from './site-copy';
import { caseStories } from './case-stories';
import { caseEngineering } from './engineering';
import { projectDetails, careerIntroduction, aboutCaseDescriptions, publicWork } from './career';
import profileEn from './en/content.json';
import { presentationEn } from './en/work';
import { siteCopyEn } from './en/site-copy';
import { caseStoriesEn } from './en/case-stories';
import { caseEngineeringEn } from './en/engineering';
import { projectDetailsEn, careerIntroductionEn, aboutCaseDescriptionsEn, publicWorkEn } from './en/career';
import type { Locale } from '../lib/locale';

export const workIds = works.map(work => work.id);
const aboutCaseIds = ['bike-operations', 'swing-home-performance', 'swap-admin-v2'] as const;

export function getPortfolio(locale: Locale) {
  if (locale === 'en') {
    const englishWorks = workIds.map(id => ({
      ...profileEn.featuredCases.find(item => item.id === id)!,
      ...presentationEn[id as keyof typeof presentationEn],
    }));
    const aboutCases = aboutCaseIds.map(id => ({
      id,
      title: englishWorks.find(work => work.id === id)!.short,
      description: aboutCaseDescriptionsEn[id],
    }));
    return { profile: profileEn, works: englishWorks, siteCopy: siteCopyEn, caseStories: caseStoriesEn, caseEngineering: caseEngineeringEn, projectDetails: projectDetailsEn, careerIntroduction: careerIntroductionEn, aboutCases, publicWork: publicWorkEn };
  }
  const aboutCases = aboutCaseIds.map(id => ({
    id,
    title: works.find(work => work.id === id)!.short,
    description: aboutCaseDescriptions[id],
  }));
  return { profile, works, siteCopy, caseStories, caseEngineering, projectDetails, careerIntroduction, aboutCases, publicWork };
}
