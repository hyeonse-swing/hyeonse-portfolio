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
      summary: '화면 설정과 공통 컴포넌트를 재사용하고, 크기와 간격을 같은 기준으로 맞추는 디자인 시스템이에요.',
      problem: '사이트마다 색과 화면 설정이 달라지지 않도록, 같은 시각 언어를 여러 개인 프로젝트에서 재사용하고 싶었어요.',
      decisions: [
        { title: '역할로 이름 붙인 토큰', detail: '바탕·글자·강조처럼 쓰임을 기준으로 CSS 토큰을 나눠 화면별 색값 복사를 줄였어요.' },
        { title: '첫 화면과 저장 설정의 일치', detail: '사이트별 기본값을 초기 스크립트와 React Provider에 함께 전달하고, 방문자가 저장한 유효한 선택은 우선하도록 했어요.' },
      ],
      highlights: [
        '색상·서체·간격을 역할별 CSS 토큰으로 정리하고, 테마·강조색·밀도·모서리·움직임 설정을 React UI와 함께 패키지로 제공해요.',
        '이 포트폴리오와 Flow QA, 리턴 데스크, 하루코토바에 적용했어요. 저장된 선택, 다른 탭 변경, 기기 테마·움직임 감소도 반영해요.',
        'CSS 원시 색상과 공유 토큰 재정의를 검사하는 CLI, 화면 제작·이관·리뷰용 재사용 스킬도 제공해요.',
        '버튼·입력·메뉴·모달·표와 Stack·Grid를 제공해요. 영역 전체에 xs부터 xl까지 크기를 적용하고, 설치 버전의 API·토큰·예제는 hds CLI로 조회해요.',
      ],
      verification: '로컬 컴포넌트·패키지 소비 검사와 Chromium·Firefox·WebKit의 크기·레이아웃 검사를 거쳤어요. WebKit의 일부 스크린리더 초점 가드는 추가 확인이 필요해요.',
      stack: ['TypeScript', 'React', 'CSS tokens'],
      release: '쇼케이스·설치 패키지 제공 · 포트폴리오 적용',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/hyeonse-design-system' },
        { label: '통합 검증 기록', href: 'https://design-system.hyeonse.dev/docs/code-freeze.md' },
        { label: '쇼케이스', href: 'https://design-system.hyeonse.dev' },
        { label: '적용 예제 · 리턴 데스크', href: 'https://return-desk.hyeonse.dev/?lang=ko' },
        { label: 'AI 사용 안내', href: 'https://design-system.hyeonse.dev/docs/ai.md' },
      ],
    },
    {
      id: 'flow-qa',
      name: 'Flow QA',
      category: 'TESTING & EVIDENCE',
      summary: '플로우를 검토 가능한 테스트 케이스로 만들고, 직접 실행하거나 에이전트에 맡긴 관찰 결과를 근거와 함께 정리하는 로컬 QA 도구예요.',
      problem: '플로우 문서, 실행할 케이스, 실제 브라우저 결과가 흩어지면 어떤 기대값을 검증했는지 되짚기 어려워요.',
      decisions: [
        { title: '검토와 실행을 분리', detail: '원본 해시와 허용된 단계·명시적 assertion을 검사하고, 질문이 남은 케이스는 실행을 차단해요.' },
        { title: '실행 경로와 근거를 구분', detail: '기존 브라우저 실행은 전체 스위트와 선택 범위를 기록해요. 외부 에이전트에 맡긴 경우에는 관찰 결과를 따로 검토하고, 누락된 케이스를 통과로 해석하지 않아요.' },
      ],
      highlights: [
        '플로우·케이스 스키마와 CLI·한국어/영어 로컬 UI를 만들었어요. 기존 브라우저 실행은 tester-army/e2e를 사용하고, 고정 단계는 모델 없이 실행할 수 있어요.',
        '선택 케이스 실행과 실패·오류 케이스 재실행 준비를 제공해요. 웹 케이스는 별도 전달 묶음으로 내보내 이미 사용하는 에이전트의 브라우저 도구로 확인할 수도 있어요.',
        '기존 실행 보고서는 시도와 증거를 연결해 검색·비교해요. 에이전트 결과는 요청·케이스·관찰·증거 파일을 검사해 별도로 표시하며, 실행 여부 자체를 인증하거나 기존 실행 보고서에 합치지 않아요.',
      ],
      verification: 'v0.9.0에서 타입·UI 검사와 테스트 124개, 새 설치 패키지·브라우저 검사를 통과했어요. 외부 에이전트의 관찰 근거는 파일 형식과 참조를 검사하며, 실제 서비스 인증과 기기 실행은 별도 확인이 필요해요.',
      stack: ['TypeScript', 'Node.js', 'e2e', 'Zod'],
      release: 'npm 공개 · CLI·로컬 웹 UI',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/flow-qa' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/flow-qa' },
        { label: '릴리스 기록', href: 'https://github.com/hyeonse-swing/flow-qa/blob/main/docs/releases.md' },
        { label: '검증 예제 · 리턴 데스크', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md' },
      ],
    },
    {
      id: 'browser-error-log',
      name: 'Browser Error Log',
      category: 'ERROR COLLECTION & INSPECTION',
      summary: '브라우저 오류의 수집부터 저장·조회까지 직접 운영할 수 있도록 만든 SDK와 수집기·뷰어예요.',
      problem: '오류가 난 페이지와 직전 맥락을 확인하고 싶어도, 수집 데이터를 외부 서비스에 맡기기 어려운 경우가 있어요.',
      decisions: [
        { title: '필요한 만큼 수집', detail: '수동 기록만 하는 minimal부터 기본 standard, 추가 맥락을 모으는 detailed까지 고르고 개별 수집 옵션으로 조정해요. 요청 본문·헤더·쿠키는 자동 수집하지 않아요.' },
        { title: '전송·보관에 상한 두기', detail: 'SDK 전송 큐·재시도를 제한하고, 자체 호스팅 수집기는 SQLite 또는 JSONL로 저장하며 보관량을 제한해요.' },
      ],
      highlights: [
        '브라우저 SDK, 선택적 React Error Boundary 어댑터, 공유 이벤트 계약을 별도의 @ihyeon npm 패키지로 공개했어요.',
        '수동 오류 수집 ID를 반환해 문의·재현 기록과 연결할 수 있어요. 이 ID는 전송 큐 수락을 뜻하며 서버 저장을 보장하지 않아요.',
        'minimal에서는 자동 오류 감시와 스택 기록을 끄고, standard는 기존 기본값을 유지하며, detailed에서는 진단용 수집을 넓혀요. 세 모드는 같은 SDK 파일의 실행 설정이에요.',
        '자체 호스팅 Node.js 수집기와 뷰어에서 SQLite/JSONL 보관, 프로젝트·종류·기간 필터, 스택 확인을 제공해요. SQLite 로그는 원본을 바꾸지 않고 크기 제한을 둔 내보내기로 옮길 수 있어요.',
      ],
      verification: '로컬 패키지·수집기·브라우저 검사에서 수집 ID와 전송 기록을 확인했어요. 모드는 계측·기록 범위를 바꾸며 별도의 작은 다운로드 파일은 아니에요. 실제 운영 전달 보장이나 완전한 개인정보 제거를 뜻하지 않아요.',
      stack: ['TypeScript', 'React', 'Node.js', 'SQLite'],
      release: 'npm 패키지 3개 공개 · 자체 호스팅 수집기·뷰어',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/browser-error-log' },
        { label: 'SDK · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log' },
        { label: 'React · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log-react' },
        { label: '검증 예제 · 리턴 데스크', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md' },
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
        '관측된 오류 묶음을 미선택·차단·검토 준비로 나눠 후보에서 빠진 범위를 확인해요. 검토 준비는 테스트 통과나 서비스 전체 커버리지를 뜻하지 않아요.',
        '검토한 케이스의 Flow QA 결과를 원본 오류에 연결해요. 대상별 결과 이력을 분리해 다른 대상이나 이전 통과가 현재 실패·미실행을 가리지 않도록 해요.',
      ],
      verification: 'v0.4.0은 로컬 테스트 206개·타입·빌드와 새 설치 패키지 검사를 통과했어요. 관측된 오류 묶음의 후보 상태만 집계하며, 실제 실행·서비스 전체 커버리지로 넓혀 해석하지 않아요.',
      stack: ['TypeScript', 'Node.js', 'CLI', 'Flow QA'],
      release: 'npm 공개 · CLI·JavaScript API',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/error-to-test' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/error-to-test' },
        { label: '최신 릴리스', href: 'https://github.com/hyeonse-swing/error-to-test/releases/latest' },
        { label: '검증 예제 · 리턴 데스크', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md' },
      ],
    },
    {
      id: 'return-review-console',
      name: 'Return Desk · 리턴 데스크',
      category: 'RETURN REVIEW DEMO',
      summary: '합성 반품의 검수와 승인 충돌을 체험할 수 있는 한·영 웹 데모와 설치형 로컬 콘솔이에요.',
      problem: '두 담당자가 같은 반품을 처리할 때 승인 기록이 하나만 남는지, 실패와 재시도 뒤에도 결과를 확인할 수 있는지 보여주고 싶었어요.',
      decisions: [
        { title: '승인 결과를 보존', detail: '로컬 콘솔은 승인과 같은 요청의 재시도 응답을 SQLite에 저장해요. 브라우저 데모의 합성 기록은 방문자의 브라우저에 저장해요.' },
        { title: '검증 도구를 한 흐름에 연결', detail: '로컬 QA에서는 Browser Error Log로 수집한 오류를 Error to Test의 후보로 검토하고, Flow QA로 실패·복구를 실행해요.' },
      ],
      highlights: [
        'Hyeonse Design System으로 만든 한·영 화면에서 반품 목록·처리 내역·두 담당자의 승인 충돌을 체험할 수 있어요.',
        '웹 데모는 합성 데이터로 동작하며 방문자의 브라우저에 기록을 보관해요. 로컬 콘솔은 별도로 SQLite에 승인 기록과 재시도 응답을 보관해요.',
        '로컬 QA 예제는 Browser Error Log → Error to Test → Flow QA에서 같은 오류와 검토된 케이스의 실패·복구 실행을 연결해요.',
      ],
      verification: '공개 npm 0.1.2 설치본에서 Node.js 22.13.0과 Chromium·Firefox·WebKit으로 한·영 승인, 재시작 후 기록과 동시 승인 충돌을 확인했어요. 테스트 데이터는 합성이고 실제 운영자 사용은 확인하지 않았어요.',
      stack: ['TypeScript', 'React', 'Hyeonse Design System', 'SQLite', 'Playwright'],
      release: '웹 데모 · npm CLI · GitHub',
      links: [
        { label: '웹 데모', href: 'https://return-desk.hyeonse.dev/?lang=ko' },
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/return-review-console' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/return-review-console' },
        { label: 'QA 연결 예제', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md' },
      ],
    },
    {
      id: 'hovershot',
      name: 'HoverShot',
      category: 'NATIVE DESKTOP APP',
      summary: '화면 일부나 창을 캡처해 다른 앱 위에 띄우고, 필요한 장면을 찾거나 녹화 파일로 정리하는 macOS 메뉴 막대 앱이에요.',
      problem: '작업 중 참고할 화면을 계속 전환하지 않고 가까이 두면서, 캡처와 짧은 녹화를 다시 찾아 활용하고 싶었어요.',
      decisions: [
        { title: '사용자가 정하는 떠 있는 창', detail: '투명도와 클릭 통과 여부를 조절하고 창 상태를 저장해, 다른 앱에서 작업하는 동안 필요한 장면만 띄울 수 있게 했어요.' },
        { title: '모니터 위치 복원', detail: '전체 화면 좌표로 창 위치를 계산하고 AppKit의 패널 생성이 끝난 뒤 다시 적용해, 캡처한 모니터와 사용자가 옮긴 위치를 유지해요.' },
      ],
      highlights: [
        '영역·창·시간 지연 캡처를 떠 있는 패널로 열고, 주석·OCR 검색·메타데이터 편집·내보내기를 제공해요.',
        '영역·창 녹화를 라이브러리에서 찾아 자르거나 GIF로 내보낼 수 있어요.',
      ],
      verification: '공개 릴리스 기록상 25개 테스트, 연결된 모니터 3대의 합성 이미지 창 표시·위치 복원, Release 빌드·서명·ZIP 검사를 확인했어요. 실제 캡처와 권한 흐름 전체를 검증한 결과는 아니에요.',
      stack: ['Swift', 'SwiftUI', 'AppKit', 'ScreenCaptureKit', 'Vision'],
      release: 'macOS 앱 · GitHub 다운로드 · Apple 미공증',
      links: [
        { label: 'GitHub · v0.2.2 소스', href: 'https://github.com/hyeonse-swing/hovershot-macos/tree/93b8f824ec84eb8d1fc32c257e077d3212784273' },
        { label: '최신 릴리스', href: 'https://github.com/hyeonse-swing/hovershot-macos/releases/latest' },
      ],
    },
  ],
  en: [
    {
      id: 'hyeonse-design-system',
      name: 'Hyeonse Design System',
      category: 'DESIGN FOUNDATIONS',
      summary: 'Reusable display settings and UI components with consistent sizing and spacing across personal projects.',
      problem: 'I wanted one visual language and set of display controls to stay consistent across my personal projects.',
      decisions: [
        { title: 'Name tokens by role', detail: 'Paper, text and accent roles replace copied color values in individual screens.' },
        { title: 'Align the first paint with saved settings', detail: 'A site passes the same defaults to the initial script and React provider, while a valid saved visitor choice still takes priority.' },
      ],
      highlights: [
        'Packaged semantic CSS tokens for color, type and spacing with React controls for theme, accent, density, corners and motion.',
        'Used in this portfolio, Flow QA, Return Desk and Harukotoba, with saved choices, cross-tab changes, system theme and reduced-motion settings.',
        'Includes a CLI that checks raw CSS colors and shared-token overrides, plus a reusable skill for building, migrating and reviewing interfaces.',
        'Includes buttons, fields, menus, dialogs, tables, Stack and Grid, with inherited sizes from xs to xl. The hds CLI reads APIs, tokens and examples from the installed version.',
      ],
      verification: 'Local component and package-consumer checks cover sizing and layout in Chromium, Firefox and WebKit. Some WebKit screen-reader focus guards still require further verification.',
      stack: ['TypeScript', 'React', 'CSS tokens'],
      release: 'Showcase and installable package · Used in this portfolio',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/hyeonse-design-system' },
        { label: 'Integration checks', href: 'https://design-system.hyeonse.dev/docs/code-freeze.md' },
        { label: 'Showcase', href: 'https://design-system.hyeonse.dev' },
        { label: 'Example · Return Desk', href: 'https://return-desk.hyeonse.dev/?lang=en' },
        { label: 'AI usage guide', href: 'https://design-system.hyeonse.dev/docs/ai.md' },
      ],
    },
    {
      id: 'flow-qa',
      name: 'Flow QA',
      category: 'TESTING & EVIDENCE',
      summary: 'A local QA tool that turns flows into reviewable cases and records evidence from its browser runner or an external agent’s observations.',
      problem: 'When a flow description, runnable cases and browser results live apart, it is hard to tell which expectation was actually checked.',
      decisions: [
        { title: 'Separate review from execution', detail: 'Source hashes, allowed steps and explicit assertions are checked before a run; unresolved questions block their cases.' },
        { title: 'Distinguish execution from observation', detail: 'The browser runner records suite and selection scope. Results returned by an external agent are reviewed separately, and omitted cases never become passes.' },
      ],
      highlights: [
        'Built flow and case schemas, a CLI, and an English/Korean local UI. Existing browser runs use tester-army/e2e; fixed steps can run without a model.',
        'Supports selected-case runs and safe preparation of failed/error cases. A separate web handoff lets an agent use browser tools it already has, without installing the e2e runtime to read and execute the bundle.',
        'Runner reports remain searchable and keep attempts linked to evidence. Returned agent results are checked against the request, cases, observations and evidence files, then labeled as external observations rather than runner reports.',
      ],
      verification: 'Version 0.9.0 passed type and UI checks, 124 tests, and fresh-install package and browser checks. File validation cannot authenticate an agent’s visit; real service authentication and device execution need separate verification.',
      stack: ['TypeScript', 'Node.js', 'e2e', 'Zod'],
      release: 'Published on npm · CLI and local web UI',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/flow-qa' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/flow-qa' },
        { label: 'Release notes', href: 'https://github.com/hyeonse-swing/flow-qa/blob/main/docs/releases.md' },
        { label: 'QA example · Return Desk', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md' },
      ],
    },
    {
      id: 'browser-error-log',
      name: 'Browser Error Log',
      category: 'ERROR COLLECTION & INSPECTION',
      summary: 'A self-hostable toolkit for collecting, storing and inspecting browser errors, with an SDK, collector and viewer.',
      problem: 'I wanted to inspect the page and preceding context of a browser error while keeping collection and storage under the operator’s control.',
      decisions: [
        { title: 'Choose collection depth', detail: 'Choose minimal for manual logging, standard for existing defaults, or detailed for more diagnostic context, then override individual switches. Automatic capture omits request bodies, headers and cookies.' },
        { title: 'Bound delivery and retention', detail: 'The SDK limits its queue and retries, while the self-hosted collector stores events in SQLite or JSONL with retention limits.' },
      ],
      highlights: [
        'Published the browser SDK, optional React Error Boundary adapter and event contract as separate @ihyeon npm packages.',
        'Manual capture returns an event ID that can link a report to a recorded error. It confirms queue admission, not collector storage.',
        'Minimal turns off automatic capture and stack recording; standard preserves existing defaults; detailed enables more diagnostic capture. These modes change runtime behavior in the same SDK package.',
        'A self-hosted Node.js collector and viewer provide SQLite/JSONL storage, project/type/date filters and stack inspection. SQLite logs can be exported with a size limit without changing the source database.',
      ],
      verification: 'Local package, collector and browser checks cover captured IDs and delivery records. Modes change instrumentation and event detail, not the downloaded bundle size. They do not prove delivery guarantees or complete removal of personal data in production.',
      stack: ['TypeScript', 'React', 'Node.js', 'SQLite'],
      release: 'Three npm packages · Self-hosted collector and viewer',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/browser-error-log' },
        { label: 'SDK · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log' },
        { label: 'React · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log-react' },
        { label: 'QA example · Return Desk', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md' },
      ],
    },
    {
      id: 'error-to-test',
      name: 'Error to Test',
      category: 'ERRORS TO REGRESSION TESTS',
      summary: 'A local tool that turns browser errors and pasted reports into regression test candidates, then links Flow QA results back to the original errors.',
      problem: 'An error log alone cannot tell me how to reproduce a problem or what the correct behavior should be.',
      decisions: [
        { title: 'Leave unknowns as questions', detail: 'Missing setup or a source for expected behavior blocks the candidate until a reviewer supplies it and analyzes again.' },
        { title: 'Check source against results', detail: 'Input byte hashes and order are recorded; analysis bundles and Flow QA reports are checked against suite hashes and case IDs.' },
      ],
      highlights: [
        'Accepts Browser Error Log exports, pasted errors and JSONL through one local pipeline to group errors and prepare regression test candidates.',
        'Combines multiple files or compares signatures with a previous bundle to focus on signatures seen only in the current input, while showing collection-scope warnings.',
        'Lists every observed error group as unselected, blocked, or review-ready, so excluded groups remain visible. Review-ready does not mean a test passed or that production coverage is complete.',
        'Links reviewed Flow QA results back to source error groups, separating targets by identity so another target or an earlier pass cannot mask a current failure or unrun case.',
      ],
      verification: 'Version 0.4.0 passed 206 local tests, type checking, build, and a fresh-install package check. Its coverage report counts only groups observed in the saved input; it does not certify browser execution or production coverage.',
      stack: ['TypeScript', 'Node.js', 'CLI', 'Flow QA'],
      release: 'Published on npm · CLI and JavaScript API',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/error-to-test' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/error-to-test' },
        { label: 'Latest release', href: 'https://github.com/hyeonse-swing/error-to-test/releases/latest' },
        { label: 'QA example · Return Desk', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md' },
      ],
    },
    {
      id: 'return-review-console',
      name: 'Return Desk',
      category: 'RETURN REVIEW DEMO',
      summary: 'An English/Korean web demo and installable local console for reviewing synthetic returns and trying an approval conflict.',
      problem: 'I wanted to show what happens when two reviewers process the same return, and how a saved approval can be checked after a failed response or retry.',
      decisions: [
        { title: 'Preserve approval results', detail: 'The local console saves approvals and replay responses in SQLite. The browser demo keeps its synthetic history in each visitor’s browser.' },
        { title: 'Connect the QA tools', detail: 'The local QA example collects an error with Browser Error Log, reviews a candidate in Error to Test, and runs failure and recovery cases with Flow QA.' },
      ],
      highlights: [
        'The interface uses Hyeonse Design System and supports English and Korean while showing return lists, history and a two-reviewer conflict.',
        'The web demo runs on synthetic data and keeps history in the visitor’s browser. The separate local console retains approvals and replay responses in SQLite.',
        'The local QA example links one error and a reviewed case through Browser Error Log → Error to Test → Flow QA failure and recovery runs.',
      ],
      verification: 'A fresh install of npm version 0.1.2 was checked on Node.js 22.13.0 in Chromium, Firefox and WebKit for English/Korean approvals, persisted history after a restart, and concurrent approval conflicts. These checks use synthetic data; real operator use is unverified.',
      stack: ['TypeScript', 'React', 'Hyeonse Design System', 'SQLite', 'Playwright'],
      release: 'Web demo · npm CLI · GitHub',
      links: [
        { label: 'Web demo', href: 'https://return-desk.hyeonse.dev/?lang=en' },
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/return-review-console' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/return-review-console' },
        { label: 'QA example', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md' },
      ],
    },
    {
      id: 'hovershot',
      name: 'HoverShot',
      category: 'NATIVE DESKTOP APP',
      summary: 'A macOS menu bar app for keeping screen captures above other apps and finding or preparing saved shots and recordings.',
      problem: 'I wanted to keep a reference on screen while working elsewhere, then find and reuse captures and short recordings later.',
      decisions: [
        { title: 'User-controlled floating panels', detail: 'Opacity and click-through controls, with saved window state, let people keep only the references they need over other apps.' },
        { title: 'Restore positions across monitors', detail: 'Panel positions use global screen coordinates and are reapplied after AppKit creates each window, preserving the captured monitor and user-moved position.' },
      ],
      highlights: [
        'Opens area, window and timed captures in floating panels, with annotations, OCR search, metadata editing and export.',
        'Find area and window recordings in the library, trim them or export a GIF.',
      ],
      verification: 'Public release notes record 25 tests, synthetic-image panel display and position restoration across three connected monitors, plus Release build, signature and ZIP checks. They do not establish the full real capture and permission flow.',
      stack: ['Swift', 'SwiftUI', 'AppKit', 'ScreenCaptureKit', 'Vision'],
      release: 'macOS app · GitHub download · Not Apple-notarized',
      links: [
        { label: 'GitHub · v0.2.2 source', href: 'https://github.com/hyeonse-swing/hovershot-macos/tree/93b8f824ec84eb8d1fc32c257e077d3212784273' },
        { label: 'Latest release', href: 'https://github.com/hyeonse-swing/hovershot-macos/releases/latest' },
      ],
    },
  ],
};

export function getPersonalProjects(locale: Locale): readonly PersonalProject[] {
  return personalProjects[locale];
}
