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
      summary: '포트폴리오의 색과 화면 설정을 재사용하고, v0.2.0부터 설치 버전의 API·토큰·예제를 조회할 수 있는 디자인 시스템이에요.',
      problem: '사이트마다 색과 화면 설정이 달라지지 않도록, 같은 시각 언어를 여러 개인 프로젝트에서 재사용하고 싶었어요.',
      decisions: [
        { title: '역할로 이름 붙인 토큰', detail: '바탕·글자·강조처럼 쓰임을 기준으로 CSS 토큰을 나눠 화면별 색값 복사를 줄였어요.' },
        { title: '첫 화면과 저장 설정의 일치', detail: '사이트별 기본값을 초기 스크립트와 React Provider에 함께 전달하고, 방문자가 저장한 유효한 선택은 우선하도록 했어요.' },
      ],
      highlights: [
        '색상·서체·간격을 역할별 CSS 토큰으로 정리하고, 테마·강조색·밀도·모서리·움직임 설정을 React UI와 함께 패키지로 제공해요.',
        '이 포트폴리오와 Flow QA에 적용했어요. 저장된 선택, 다른 탭 변경, 기기 테마·움직임 감소도 반영해요.',
        'CSS 원시 색상과 공유 토큰 재정의를 검사하는 CLI, 화면 제작·이관·리뷰용 재사용 스킬도 제공해요.',
        'v0.2.0부터 설치한 버전의 공개 API·토큰·예제를 읽기 전용 hds CLI와 문서에서 찾아볼 수 있어요.',
      ],
      verification: '이전 포트폴리오 통합에서 로컬 Chrome 36개 화면과 설정 복원·탭 동기화를 확인했어요. v0.2.0 조회 기능은 별도로 17개 테스트와 설치 패키지 검사를 거쳤어요. 실제 기기 검증과는 구분해요.',
      stack: ['TypeScript', 'React', 'CSS tokens'],
      release: 'GitHub 패키지 공개 · 포트폴리오·Flow QA 적용',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/hyeonse-design-system' },
        { label: '통합 검증 기록', href: 'https://github.com/hyeonse-swing/hyeonse-design-system/blob/main/docs/verification.md' },
        { label: '쇼케이스', href: 'https://hyeonse-design-system.vercel.app' },
        { label: 'AI 사용 안내', href: 'https://github.com/hyeonse-swing/hyeonse-design-system/blob/v0.2.0/docs/ai.md' },
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
        '저장된 실행 기록과 보고서 내용을 검색·필터링하고, 두 번 이상 시도한 케이스의 ID를 내보낼 수 있어요. 화면 설정을 저장할 수 없을 때는 현재 탭에만 적용된다는 안내와 복구 상태를 보여줘요.',
      ],
      verification: '공개 릴리스 기록상 로컬 테스트 118개, UI 검사 8개와 새 설치 패키지·브라우저 검사를 통과했어요. 저장소 실패는 브라우저 fixture로 재현했으며, 실제 서비스 인증과 기기 실행은 별도 확인이 필요해요.',
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
        '자체 호스팅 Node.js 수집기와 뷰어에서 SQLite/JSONL 보관, 프로젝트·종류·기간 필터, 스택 확인을 제공해요. SQLite 로그는 원본을 바꾸지 않고 크기 제한을 둔 내보내기로 옮길 수 있어요.',
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
        '검토용 리포트·Flow QA 묶음을 만든 뒤 실행 결과를 원본 오류 묶음에 연결해요. 대상의 실제 식별값으로 결과 이력을 구분해, 같은 이름의 다른 대상이나 이전 통과 결과가 현재 실패·미실행을 가리지 않도록 해요.',
      ],
      verification: '공개 기록상 로컬 테스트 203개·타입·빌드와 격리 설치 패키지 검사를 통과했어요. 이전 입력에만 있던 오류나 대상 범위 밖의 통과 결과를 수정·실행 완료로 판정하지 않아요.',
      stack: ['TypeScript', 'Node.js', 'CLI', 'Flow QA'],
      release: 'npm 공개 · CLI·JavaScript API',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/error-to-test' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/error-to-test' },
        { label: '최신 릴리스', href: 'https://github.com/hyeonse-swing/error-to-test/releases/latest' },
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
      summary: 'A reusable design system for this portfolio’s visual language and display settings, with installed-version API, token and example lookup since v0.2.0.',
      problem: 'I wanted one visual language and set of display controls to stay consistent across my personal projects.',
      decisions: [
        { title: 'Name tokens by role', detail: 'Paper, text and accent roles replace copied color values in individual screens.' },
        { title: 'Align the first paint with saved settings', detail: 'A site passes the same defaults to the initial script and React provider, while a valid saved visitor choice still takes priority.' },
      ],
      highlights: [
        'Packaged semantic CSS tokens for color, type and spacing with React controls for theme, accent, density, corners and motion.',
        'Used in this portfolio and Flow QA, with saved choices, cross-tab changes, system theme and reduced-motion settings.',
        'Includes a CLI that checks raw CSS colors and shared-token overrides, plus a reusable skill for building, migrating and reviewing interfaces.',
        'Since v0.2.0, a read-only hds CLI and docs let you look up the installed version’s public APIs, tokens and examples.',
      ],
      verification: 'Earlier portfolio integration checks covered 36 local Chrome views, preference restoration and cross-tab updates. The v0.2.0 lookup interface separately passed 17 tests and installed-package checks. Neither establishes behavior on physical devices.',
      stack: ['TypeScript', 'React', 'CSS tokens'],
      release: 'GitHub package · Used in this portfolio and Flow QA',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/hyeonse-design-system' },
        { label: 'Integration checks', href: 'https://github.com/hyeonse-swing/hyeonse-design-system/blob/main/docs/verification.md' },
        { label: 'Showcase', href: 'https://hyeonse-design-system.vercel.app' },
        { label: 'AI usage guide', href: 'https://github.com/hyeonse-swing/hyeonse-design-system/blob/v0.2.0/docs/ai.md' },
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
        'Searches saved runs and reports, filters cases with multiple attempts and exports their IDs. When display settings cannot be saved, the UI warns that changes apply only to the current tab and clears the warning after recovery.',
      ],
      verification: 'Public release notes record 118 local tests, eight UI checks, and fresh-install package and browser checks. Storage failures were simulated in browser fixtures; real service authentication and device execution need separate verification.',
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
        'A self-hosted Node.js collector and viewer provide SQLite/JSONL storage, project/type/date filters and stack inspection. SQLite logs can be exported with a size limit without changing the source database.',
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
        'Creates review reports and Flow QA suites, then links run results back to source error groups. Result history uses the target’s actual identity so another target with the same name or an earlier pass cannot mask a current failure or unrun case.',
      ],
      verification: 'Public records show 203 local tests, type checking, build and an isolated installed-package check. A signature seen only in an earlier input, or a pass outside the selected target, does not prove a fix.',
      stack: ['TypeScript', 'Node.js', 'CLI', 'Flow QA'],
      release: 'Published on npm · CLI and JavaScript API',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/error-to-test' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/error-to-test' },
        { label: 'Latest release', href: 'https://github.com/hyeonse-swing/error-to-test/releases/latest' },
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
