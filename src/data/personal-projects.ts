import type { Locale } from '../lib/locale';

export type PersonalProject = {
  id: string;
  name: string;
  category: string;
  summary: string;
  problem: string;
  decisions: readonly { title: string; detail: string }[];
  highlights: readonly string[];
  verification: string;
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
      problem: '사이트마다 색과 화면 설정이 달라지지 않도록, 같은 시각 언어를 여러 개인 프로젝트에서 재사용하고 싶었어요.',
      decisions: [
        { title: '역할로 이름 붙인 토큰', detail: '바탕·글자·강조처럼 쓰임을 기준으로 CSS 토큰을 나눠 화면별 색값 복사를 줄였어요.' },
        { title: '첫 화면과 저장 설정의 일치', detail: '사이트별 기본값을 초기 스크립트와 React Provider에 함께 전달하고, 방문자가 저장한 유효한 선택은 우선하도록 했어요.' },
      ],
      highlights: [
        '색상·서체·간격을 역할별 CSS 토큰으로 정리하고, 테마·강조색·밀도·모서리·움직임 설정을 React UI와 함께 패키지로 제공해요.',
        '이 포트폴리오와 Flow QA에 적용했어요. 저장된 선택, 다른 탭 변경, 기기 테마·움직임 감소도 반영해요.',
        'CSS 원시 색상과 공유 토큰 재정의를 검사하는 CLI, 화면 제작·이관·리뷰용 재사용 스킬도 제공해요.',
      ],
      verification: '포트폴리오 통합 기록에서 Chrome 36개 화면과 설정 복원·탭 동기화 등을 확인했어요. 실제 기기·운영 배포 검증과는 구분해요.',
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
      problem: '플로우 문서, 실행할 케이스, 실제 브라우저 결과가 흩어지면 어떤 기대값을 검증했는지 되짚기 어려워요.',
      decisions: [
        { title: '검토와 실행을 분리', detail: '원본 해시와 허용된 단계·명시적 assertion을 검사하고, 질문이 남은 케이스는 실행을 차단해요.' },
        { title: '결과의 범위를 보존', detail: '선택한 케이스만 실행해도 전체 스위트와 선택 범위를 기록해요. 같은 스위트·대상의 두 실행을 비교할 때도 누락을 통과로 해석하지 않아요.' },
      ],
      highlights: [
        '플로우·케이스 스키마와 CLI·한국어/영어 로컬 UI를 만들었어요. 고정 단계는 모델 없이 실행할 수 있고, 브라우저 실행 엔진은 tester-army/e2e를 사용해요.',
        '선택 케이스 실행, 실패·오류 케이스의 안전한 재실행 준비, 시도·증거가 연결된 상세 보고서를 제공해요.',
        '저장된 실행 기록과 보고서 내용을 검색·필터링하고, 호환되는 두 실행의 상태 변화를 비교·내보낼 수 있어요.',
      ],
      verification: '공개 릴리스 기록상 로컬 Chromium 데모, 새 설치의 브라우저 검사와 타입·패키지 검사를 통과했어요. 실제 서비스 인증과 iOS·Android 기기 실행은 별도 확인이 필요해요.',
      stack: ['TypeScript', 'Node.js', 'e2e', 'Zod'],
      release: 'npm 공개 · CLI·로컬 웹 UI',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/flow-qa' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/flow-qa' },
        { label: '릴리스 기록', href: 'https://github.com/hyeonse-swing/flow-qa/blob/main/docs/releases.md' },
      ],
    },
    {
      id: 'browser-error-log',
      name: 'Browser Error Log',
      category: 'ERROR COLLECTION & INSPECTION',
      summary: '브라우저 오류의 수집부터 저장·조회까지 직접 운영할 수 있도록 만든 SDK와 수집기·뷰어예요.',
      problem: '오류가 난 페이지와 직전 맥락을 확인하고 싶어도, 수집 데이터를 외부 서비스에 맡기기 어려운 경우가 있어요.',
      decisions: [
        { title: '선택적으로 맥락 수집', detail: '페이지 이동과 네트워크 breadcrumb는 선택한 앱에서만 켜고, 본문·헤더·쿠키는 모으지 않아요. beforeSend와 URL 정제 훅을 제공해요.' },
        { title: '전송·보관에 상한 두기', detail: 'SDK 전송 큐·재시도를 제한하고, 자체 호스팅 수집기는 SQLite 또는 JSONL로 저장하며 보관량을 제한해요.' },
      ],
      highlights: [
        '브라우저 SDK, 선택적 React Error Boundary 어댑터, 공유 이벤트 계약을 별도의 @ihyeon npm 패키지로 공개했어요.',
        '전역 오류·처리되지 않은 Promise 거부·네트워크 실패를 수집하고, 선택적으로 정제된 페이지 이동·네트워크 맥락을 연결해요.',
        '자체 호스팅 Node.js 수집기와 뷰어에서 SQLite/JSONL 보관, 프로젝트·종류·기간 필터, 스택 확인과 제한된 JSON 입출력을 제공해요.',
      ],
      verification: '공개 저장소의 로컬 패키지·마이크로 서버·브라우저 전송 검사 범위를 확인했어요. 실제 운영 환경의 전달 보장이나 완전한 개인정보 제거를 뜻하지 않아요.',
      stack: ['TypeScript', 'React', 'Node.js', 'SQLite'],
      release: 'npm 패키지 3개 공개 · 자체 호스팅 수집기·뷰어',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/browser-error-log' },
        { label: 'SDK · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log' },
        { label: 'React · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log-react' },
      ],
    },
    {
      id: 'error-to-test',
      name: 'Error to Test',
      category: 'ERRORS TO REGRESSION TESTS',
      summary: '브라우저 오류와 텍스트 제보를 회귀 테스트 후보로 바꾸고, Flow QA 실행 결과까지 원본 오류에 연결하는 로컬 도구예요.',
      problem: '오류 로그만으로는 재현 방법과 정상 기대 동작을 알 수 없어, 곧바로 실행 가능한 테스트라고 볼 수 없어요.',
      decisions: [
        { title: '모르는 것은 질문으로 남기기', detail: '재현 조건·기대 결과의 출처가 없으면 실행을 막고, 사람이 확인한 내용으로 다시 분석하도록 했어요.' },
        { title: '원본과 결과를 대조하기', detail: '여러 입력의 바이트 해시와 순서를 기록하고, 분석 번들·Flow QA 리포트의 스위트 해시와 케이스 ID를 검증해요.' },
      ],
      highlights: [
        'Browser Error Log 내보내기, 직접 입력한 메시지와 JSONL을 같은 로컬 분석 흐름으로 받아 오류를 묶고 회귀 테스트 후보를 만들어요.',
        '여러 파일을 함께 분석하거나 이전 번들과 서명을 비교해, 현재 입력에만 나타난 서명에 집중할 수 있어요. 수집 범위 차이도 함께 표시해요.',
        '검토용 리포트·Flow QA 묶음을 만든 뒤 실행 결과를 원본 오류 묶음에 연결해요. 불명확한 기대값은 질문으로 남아 실행을 차단해요.',
      ],
      verification: '통제된 로컬 Chromium 통합 기록에서 SDK 오류→후보→Flow QA 결과 연결을 확인했어요. 이전 입력에만 있던 오류를 수정 완료로 판정하지 않아요.',
      stack: ['TypeScript', 'Node.js', 'CLI', 'Flow QA'],
      release: 'npm 공개 · CLI·JavaScript API',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/error-to-test' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/error-to-test' },
        { label: '최신 릴리스', href: 'https://github.com/hyeonse-swing/error-to-test/releases/latest' },
      ],
    },
  ],
  en: [
    {
      id: 'hyeonse-design-system',
      name: 'Hyeonse Design System',
      category: 'DESIGN FOUNDATIONS',
      summary: 'A reusable design system extracted from this portfolio, bringing its visual language and display settings to other personal projects.',
      problem: 'I wanted one visual language and set of display controls to stay consistent across my personal projects.',
      decisions: [
        { title: 'Name tokens by role', detail: 'Paper, text and accent roles replace copied color values in individual screens.' },
        { title: 'Align the first paint with saved settings', detail: 'A site passes the same defaults to the initial script and React provider, while a valid saved visitor choice still takes priority.' },
      ],
      highlights: [
        'Packaged semantic CSS tokens for color, type and spacing with React controls for theme, accent, density, corners and motion.',
        'Used in this portfolio and Flow QA, with saved choices, cross-tab changes, system theme and reduced-motion settings.',
        'Includes a CLI that checks raw CSS colors and shared-token overrides, plus a reusable skill for building, migrating and reviewing interfaces.',
      ],
      verification: 'The portfolio integration record covers 36 local Chrome views, preference restoration and cross-tab updates. It does not establish behavior on physical devices or a deployed site.',
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
      problem: 'When a flow description, runnable cases and browser results live apart, it is hard to tell which expectation was actually checked.',
      decisions: [
        { title: 'Separate review from execution', detail: 'Source hashes, allowed steps and explicit assertions are checked before a run; unresolved questions block their cases.' },
        { title: 'Preserve result scope', detail: 'Selected-case runs retain the full suite identity and selection scope. Two-run comparisons do not interpret missing cases as passes.' },
      ],
      highlights: [
        'Built the flow and case schemas, CLI and English/Korean local UI. Fixed steps run without a model; browser execution uses tester-army/e2e.',
        'Supports selected-case runs, safe preparation of failed/error cases, and detailed reports that keep attempts and evidence together.',
        'Searches and filters saved run history and report content, then compares and exports status changes between compatible runs.',
      ],
      verification: 'Public release notes record local Chromium demos, fresh-install browser checks, and type/package checks. Real service authentication and iOS/Android device execution need separate verification.',
      stack: ['TypeScript', 'Node.js', 'e2e', 'Zod'],
      release: 'Published on npm · CLI and local web UI',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/flow-qa' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/flow-qa' },
        { label: 'Release notes', href: 'https://github.com/hyeonse-swing/flow-qa/blob/main/docs/releases.md' },
      ],
    },
    {
      id: 'browser-error-log',
      name: 'Browser Error Log',
      category: 'ERROR COLLECTION & INSPECTION',
      summary: 'A self-hostable toolkit for collecting, storing and inspecting browser errors, with an SDK, collector and viewer.',
      problem: 'I wanted to inspect the page and preceding context of a browser error while keeping collection and storage under the operator’s control.',
      decisions: [
        { title: 'Capture context by choice', detail: 'Navigation and network breadcrumbs are opt-in; request bodies, headers and cookies are omitted. URL sanitization and beforeSend hooks let an app filter further.' },
        { title: 'Bound delivery and retention', detail: 'The SDK limits its queue and retries, while the self-hosted collector stores events in SQLite or JSONL with retention limits.' },
      ],
      highlights: [
        'Published the browser SDK, optional React Error Boundary adapter and event contract as separate @ihyeon npm packages.',
        'Captures global errors, unhandled rejections and network failures, with optional sanitized navigation and network breadcrumbs.',
        'A self-hosted Node.js collector and viewer provide SQLite/JSONL storage, project/type/date filters, stack inspection and bounded JSON import/export.',
      ],
      verification: 'The public repository records local package, micro-server and browser delivery checks. It does not prove delivery guarantees or complete removal of personal data in a production environment.',
      stack: ['TypeScript', 'React', 'Node.js', 'SQLite'],
      release: 'Three npm packages · Self-hosted collector and viewer',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/browser-error-log' },
        { label: 'SDK · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log' },
        { label: 'React · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log-react' },
      ],
    },
    {
      id: 'error-to-test',
      name: 'Error to Test',
      category: 'ERRORS TO REGRESSION TESTS',
      summary: 'A local tool that turns browser errors and pasted reports into regression test candidates, then links Flow QA results back to the original errors.',
      problem: 'An error log alone cannot tell me how to reproduce a problem or what the correct behavior should be.',
      decisions: [
        { title: 'Leave unknowns as questions', detail: 'Missing setup or a source for the expected behavior blocks execution until a reviewer supplies it and analyzes again.' },
        { title: 'Check source against results', detail: 'Input byte hashes and order are recorded; analysis bundles and Flow QA reports are checked against suite hashes and case IDs.' },
      ],
      highlights: [
        'Accepts Browser Error Log exports, pasted errors and JSONL through one local pipeline to group errors and prepare regression test candidates.',
        'Combines multiple files or compares signatures with a previous bundle to focus on signatures seen only in the current input, while showing collection-scope warnings.',
        'Creates review reports and Flow QA suites, then links run results back to the source error groups. Unresolved expectations remain blocked.',
      ],
      verification: 'A controlled local Chromium integration record links SDK events, candidates and Flow QA results. A signature seen only in an earlier input does not prove a fix.',
      stack: ['TypeScript', 'Node.js', 'CLI', 'Flow QA'],
      release: 'Published on npm · CLI and JavaScript API',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/error-to-test' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/error-to-test' },
        { label: 'Latest release', href: 'https://github.com/hyeonse-swing/error-to-test/releases/latest' },
      ],
    },
  ],
};

export function getPersonalProjects(locale: Locale): readonly PersonalProject[] {
  return personalProjects[locale];
}
