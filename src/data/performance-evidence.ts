// Values and conditions are transcribed from the SWING homepage case story.
// The font comparison is a separate experiment, not a subset of the page totals.
export const performanceEvidence = {
  homepage: {
    title: { ko: '홈페이지 전체', en: 'Homepage' },
    condition: {
      ko: '2026.07 당시 로컬 프로덕션 빌드 · Lighthouse 모바일 시뮬레이션 · 개선 전 3회 / 후 5회 중앙값',
      en: 'July 2026 local production build · Lighthouse mobile simulation · medians of 3 runs before / 5 after',
    },
    metrics: [
      { id: 'performance', label: { ko: 'Performance 점수', en: 'Performance score' }, before: 54, after: 95, unit: { ko: '점', en: 'points' }, direction: 'higher' },
      { id: 'transfer', label: { ko: '초기 전송량', en: 'Initial transfer' }, before: 19.805, after: 0.488, unit: { ko: 'MB', en: 'MB' }, direction: 'lower' },
    ],
  },
  font: {
    title: { ko: '폰트 선택', en: 'Font choice' },
    condition: {
      ko: '같은 로컬 조건에서 5회 측정한 별도 폰트 비교 · 홈페이지 전체 전후 측정과 다른 실험',
      en: 'Separate font comparison measured 5 times under the same local conditions · distinct from the full-homepage comparison',
    },
    metrics: [
      { id: 'requests', label: { ko: '폰트 요청 수', en: 'Font requests' }, before: 4, after: 1, unit: { ko: '건', en: 'requests' }, direction: 'lower' },
      { id: 'bytes', label: { ko: '폰트 전송량', en: 'Font transfer' }, before: 186.9, after: 109.6, unit: { ko: 'KB', en: 'KB' }, direction: 'lower' },
    ],
  },
} as const;

export type PerformanceGroup = keyof typeof performanceEvidence;
