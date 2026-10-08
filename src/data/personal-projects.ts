import type { Locale } from '../lib/locale';

export type PersonalProject = {
  id: string;
  name: string;
  category: string;
  summary: string;
  highlights: readonly string[];
  stack: readonly string[];
  release: string;
  links: readonly { label: string; href: string }[];
};

const personalProjects: Record<Locale, readonly PersonalProject[]> = {
  ko: [
    {
      id: 'hyeonse-design-system',
      name: 'Hyeonse Design System',
      category: 'DESIGN FOUNDATIONS',
      summary: '포트폴리오에서 쓰던 색과 화면 설정을 다른 개인 프로젝트에서도 쓸 수 있도록 분리한 디자인 시스템이에요.',
      highlights: [
        '색상·서체·간격을 역할별 CSS 토큰으로 정리하고, 테마·강조색·밀도·모서리·움직임 설정을 React UI와 함께 패키지로 제공해요.',
        '이 포트폴리오와 Flow QA에 적용했어요. CSS 토큰 검사 CLI와 화면 제작·이관·리뷰를 위한 재사용 스킬도 함께 만들었어요.',
      ],
      stack: ['TypeScript', 'React', 'CSS tokens'],
      release: 'GitHub 패키지 공개 · 포트폴리오·Flow QA 적용',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/hyeonse-design-system' },
        { label: '통합 검증 기록', href: 'https://github.com/hyeonse-swing/hyeonse-design-system/blob/main/docs/verification.md' },
      ],
    },
    {
      id: 'flow-qa',
      name: 'Flow QA',
      category: 'TESTING & EVIDENCE',
      summary: '서비스 플로우를 검토 가능한 테스트 케이스로 바꾸고, 브라우저 실행 결과와 근거를 리포트로 남기는 로컬 QA 도구예요.',
      highlights: [
        '플로우·케이스 스키마, 모델 연결, 허용된 단계의 컴파일과 CLI·한국어/영어 UI를 구현했어요. 브라우저 실행은 tester-army/e2e를 사용해요.',
        '원본 플로우의 해시로 변경을 감지하고, 모호한 기대 결과는 차단해요. 기대값 불일치와 실행 환경 문제를 구분하고, 실행별 리포트에 시도 내역과 수집된 증거를 연결해요.',
      ],
      stack: ['TypeScript', 'Node.js', 'e2e', 'Zod'],
      release: 'npm 공개 알파 · CLI·로컬 웹 UI',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/flow-qa' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/flow-qa' },
        { label: '알파 릴리스', href: 'https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.1.0-alpha.2' },
      ],
    },
    {
      id: 'browser-error-log',
      name: 'Browser Error Log',
      category: 'ERROR COLLECTION & INSPECTION',
      summary: '브라우저 오류의 수집부터 저장·조회까지 직접 운영할 수 있도록 만든 SDK와 수집기·뷰어예요.',
      highlights: [
        '프레임워크 독립 SDK, React Error Boundary 어댑터와 공유 이벤트 계약을 npm 패키지로 공개했어요. 전역 오류·처리되지 않은 Promise 거부·네트워크 실패를 수집해요.',
        '전송 큐·배치·재시도 한도를 두고, Node.js 수집기에서 SQLite·JSONL로 저장해요. 뷰어는 필터, 스택·요청 정보, JSON 가져오기·내보내기를 제공해요.',
      ],
      stack: ['TypeScript', 'React', 'Node.js', 'SQLite'],
      release: 'npm 패키지 3개 공개 · 자체 호스팅 수집기·뷰어',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/browser-error-log' },
        { label: 'SDK · npm', href: 'https://www.npmjs.com/package/browser-error-log' },
        { label: 'React · npm', href: 'https://www.npmjs.com/package/browser-error-log-react' },
      ],
    },
  ],
  en: [
    {
      id: 'hyeonse-design-system',
      name: 'Hyeonse Design System',
      category: 'DESIGN FOUNDATIONS',
      summary: 'A reusable design system extracted from this portfolio, bringing its visual language and display settings to other personal projects.',
      highlights: [
        'Packaged semantic CSS tokens for color, type and spacing with React controls for theme, accent, density, corners and motion.',
        'Used in this portfolio and Flow QA. Includes a CSS token audit CLI and a reusable agent skill for building, migrating and reviewing interfaces.',
      ],
      stack: ['TypeScript', 'React', 'CSS tokens'],
      release: 'GitHub package · Used in this portfolio and Flow QA',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/hyeonse-design-system' },
        { label: 'Integration checks', href: 'https://github.com/hyeonse-swing/hyeonse-design-system/blob/main/docs/verification.md' },
      ],
    },
    {
      id: 'flow-qa',
      name: 'Flow QA',
      category: 'TESTING & EVIDENCE',
      summary: 'A local QA tool that turns user flows into reviewable test cases and browser execution results into reports linked to evidence.',
      highlights: [
        'Built the flow and case schemas, model integration, compilation of allowed steps, CLI and English/Korean UI. Browser execution uses tester-army/e2e.',
        'Tracks source changes with flow hashes and blocks ambiguous expectations. Separates assertion failures from environment blockers, linking attempts and collected evidence in each run’s report.',
      ],
      stack: ['TypeScript', 'Node.js', 'e2e', 'Zod'],
      release: 'Public npm alpha · CLI and local web UI',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/flow-qa' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/flow-qa' },
        { label: 'Alpha release', href: 'https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.1.0-alpha.2' },
      ],
    },
    {
      id: 'browser-error-log',
      name: 'Browser Error Log',
      category: 'ERROR COLLECTION & INSPECTION',
      summary: 'A self-hostable toolkit for collecting, storing and inspecting browser errors, with an SDK, collector and viewer.',
      highlights: [
        'Published a framework-independent SDK, React Error Boundary adapter and shared event contract on npm. Captures global errors, unhandled rejections and network failures.',
        'Bounded queues, batches and retries feed a Node.js collector with SQLite or JSONL storage. The viewer provides filters, stack and request details, and JSON import/export.',
      ],
      stack: ['TypeScript', 'React', 'Node.js', 'SQLite'],
      release: 'Three npm packages · Self-hosted collector and viewer',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/browser-error-log' },
        { label: 'SDK · npm', href: 'https://www.npmjs.com/package/browser-error-log' },
        { label: 'React · npm', href: 'https://www.npmjs.com/package/browser-error-log-react' },
      ],
    },
  ],
};

export function getPersonalProjects(locale: Locale): readonly PersonalProject[] {
  return personalProjects[locale];
}
