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
        '포트폴리오, 하루코토바, 리턴 데스크와 Flow QA에서 같은 화면 설정을 사용해요. 리턴 데스크의 보류 목록에는 0.5.0의 DataTable을 적용해 정렬이나 페이지 이동 뒤에도 선택한 반품을 기억해요.',
        'CSS 원시 색상과 공유 토큰 재정의를 검사하는 CLI, 화면 제작·이관·리뷰용 재사용 스킬도 제공해요.',
        '버튼·입력·메뉴·모달·표와 Stack·Grid를 제공해요. 영역 전체에 xs부터 xl까지 크기를 적용하고, 설치 버전의 API·토큰·예제는 hds CLI로 조회해요.',
      ],
      verification: '로컬 컴포넌트·패키지 소비 검사와 Chromium·Firefox·WebKit의 크기·레이아웃 검사를 거쳤어요. macOS Safari 27·VoiceOver에서 HDS 0.4.8 모달의 닫기 버튼, 초점 이동 가드 이름과 Escape 후 초점 복귀를 확인했어요.',
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
      summary: '사용자 흐름을 테스트 케이스로 실행하고, 두 실행에서 어느 단계부터 결과가 달라졌는지 보여주는 로컬 QA 도구예요.',
      problem: '플로우 문서, 실행할 케이스, 실제 브라우저 결과가 흩어지면 어떤 기대값을 검증했는지 되짚기 어려워요.',
      decisions: [
        { title: '검토와 실행을 분리', detail: '원본 해시와 허용된 단계·명시적 assertion을 검사하고, 질문이 남은 케이스는 실행을 차단해요.' },
        { title: '실행 경로와 근거를 구분', detail: '기존 브라우저 실행은 전체 스위트와 선택 범위를 기록해요. 외부 에이전트에 맡긴 경우에는 관찰 결과를 따로 검토하고, 누락된 케이스를 통과로 해석하지 않아요.' },
      ],
      highlights: [
        '플로우·케이스 스키마와 CLI·한국어/영어 로컬 UI를 만들었어요. 기존 브라우저 실행은 tester-army/e2e를 사용하고, 고정 단계는 모델 없이 실행할 수 있어요.',
        '선택 케이스 실행과 실패·오류 케이스 재실행 준비를 제공해요. 웹 케이스는 별도 전달 묶음으로 내보내 이미 사용하는 에이전트의 브라우저 도구로 확인할 수도 있어요.',
        'flow-qa compare는 단계 정보가 있는 두 보고서에서 마지막으로 함께 성공한 단계와 처음 결과가 갈린 단계를 짚어줘요. 이전 형식의 보고서도 케이스 단위로 비교할 수 있어요.',
      ],
      verification: 'npm에서 0.10.2를 설치해 합성 반품 승인에 같은 케이스를 두 번 실행했어요. 두 실행 모두 2단계까지 성공했고, 승인 상태를 확인하는 3단계가 복구 후 통과한 것을 CLI에서 확인했어요.',
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
      summary: '브라우저 오류를 직접 수집·보관하고, 프로젝트와 이벤트 ID로 기록을 찾아 해당 릴리스의 원본 코드 위치를 확인하는 도구예요.',
      problem: '오류가 난 페이지와 직전 맥락을 확인하고 싶어도, 수집 데이터를 외부 서비스에 맡기기 어려운 경우가 있어요.',
      decisions: [
        { title: '필요한 만큼 수집', detail: '수동 기록만 하는 minimal부터 기본 standard, 추가 맥락을 모으는 detailed까지 고르고 개별 수집 옵션으로 조정해요. 요청 본문·헤더·쿠키는 자동 수집하지 않아요.' },
        { title: '전송·보관에 상한 두기', detail: 'SDK 전송 큐·재시도를 제한하고, 자체 호스팅 수집기는 SQLite 또는 JSONL로 저장하며 보관량을 제한해요.' },
      ],
      highlights: [
        '브라우저 SDK, 선택적 React Error Boundary 어댑터, 공유 이벤트 계약을 별도의 @ihyeon npm 패키지로 공개했어요.',
        'SDK의 수동 기록과 React 오류 경계에서 프로젝트와 이벤트 ID를 함께 받을 수 있어요. 수집 큐가 받은 오류를 문의나 테스트 기록에서 다시 찾는 데 써요.',
        '뷰어에서 릴리스별 소스맵을 열면 같은 app.js 위치에서 난 오류도 빌드에 맞는 원본 파일과 줄로 따라갈 수 있어요.',
        '자체 호스팅 Node.js 수집기와 뷰어에서 SQLite/JSONL 보관, 프로젝트·종류·기간 필터, 스택 확인을 제공해요. SQLite 로그는 원본을 바꾸지 않고 크기 제한을 둔 내보내기로 옮길 수 있어요.',
      ],
      verification: '0.2.22 공개 패키지로 합성 React 오류를 발생시켜 콜백과 전송 이벤트의 프로젝트·ID가 일치하는지 대조했어요. 공개 뷰어에서는 같은 번들 위치가 두 릴리스의 서로 다른 원본 줄로 연결되는지 세 브라우저에서 확인했어요.',
      stack: ['TypeScript', 'React', 'Node.js', 'SQLite'],
      release: 'npm 패키지 3개 공개 · 자체 호스팅 수집기·뷰어',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/browser-error-log' },
        { label: 'SDK · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log' },
        { label: 'React · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log-react' },
        { label: '오류 뷰어', href: 'https://hyeonse-swing.github.io/browser-error-log/' },
        { label: '오류 ID → 테스트 → 복구 예제', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md#한국어' },
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
        '프로젝트와 이벤트 ID로 오류를 찾고, 검토 화면에서 각 규칙이 어떤 후보에서 나왔는지 확인해요. 기대 결과를 확인한 케이스는 Flow QA 작업 공간으로 옮길 수 있어요.',
        '관측된 오류 묶음을 미선택·차단·검토 준비로 나눠 후보에서 빠진 범위를 확인해요. 검토 준비는 테스트 통과나 서비스 전체 커버리지를 뜻하지 않아요.',
        '검토한 케이스의 Flow QA 결과를 원본 오류에 연결해요. 대상별 결과 이력을 분리해 다른 대상이나 이전 통과가 현재 실패·미실행을 가리지 않도록 해요.',
      ],
      verification: '0.5.2 공개 설치본에 같은 이벤트 ID를 가진 두 프로젝트의 합성 기록을 넣었어요. ID만 조회하면 두 묶음이 나오고, 프로젝트를 지정하면 해당 묶음 하나와 그 케이스의 실행 결과를 찾을 수 있었어요.',
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
      summary: '합성 반품을 보류했다가 다시 검수하고, 한 건의 처리 이력을 복사할 수 있는 한·영 웹 데모와 설치형 콘솔이에요.',
      problem: '두 담당자가 같은 반품을 처리할 때 승인 기록이 하나만 남는지, 실패와 재시도 뒤에도 결과를 확인할 수 있는지 보여주고 싶었어요.',
      decisions: [
        { title: '승인 결과를 보존', detail: '로컬 콘솔은 승인과 같은 요청의 재시도 응답을 SQLite에 저장해요. 브라우저 데모의 합성 기록은 방문자의 브라우저에 저장해요.' },
        { title: '검증 도구를 한 흐름에 연결', detail: '로컬 QA에서는 Browser Error Log로 수집한 오류를 Error to Test의 후보로 검토하고, Flow QA로 실패·복구를 실행해요.' },
      ],
      highlights: [
        '보류 목록에서 반품을 골라 재검수하고, 상세 화면에서 현재 상태와 시간순 처리 내역·담당자·메모를 한 번에 복사해요.',
        '웹 데모는 합성 데이터로 동작하며 방문자의 브라우저에 기록을 보관해요. 로컬 콘솔은 별도로 SQLite에 승인 기록과 재시도 응답을 보관해요.',
        '로컬 QA 예제는 Browser Error Log → Error to Test → Flow QA에서 같은 오류와 검토된 케이스의 실패·복구 실행을 연결해요.',
      ],
      verification: '공개 웹 데모에서 한국어·영어 이력 복사를 확인하고, npm 0.2.3 설치본에서는 복사한 내용이 선택한 합성 반품 RET-2421과 일치하는지 읽어 봤어요. SQLite에 동시에 들어온 두 최종 결정 중 하나만 반영되는 것도 확인했어요.',
      stack: ['TypeScript', 'React', 'Hyeonse Design System', 'SQLite', 'Playwright'],
      release: '웹 데모 · npm CLI · GitHub',
      links: [
        { label: '웹 데모', href: 'https://return-desk.hyeonse.dev/?lang=ko' },
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/return-review-console' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/return-review-console' },
        { label: 'QA 연결 예제', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md' },
        { label: '실행 근거 사례', href: '/notes/return-desk-approval-regression/' },
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
        '영역·창 녹화를 라이브러리에서 찾아 자르고, 1초보다 짧은 장면도 원래 재생 길이를 살려 GIF로 내보낼 수 있어요.',
      ],
      verification: 'macOS 26.6.2의 Apple Silicon Mac에서 공개 앱 0.2.3으로 시험용 창을 캡처하고 녹화했어요. 내보낸 60프레임 GIF와 원본은 모두 9.92초였고, 별도로 만든 0.40초·0.84초 영상도 GIF에서 길이를 유지했어요.',
      stack: ['Swift', 'SwiftUI', 'AppKit', 'ScreenCaptureKit', 'Vision'],
      release: 'macOS 앱 · GitHub 다운로드 · Apple 미공증',
      links: [
        { label: 'GitHub · v0.2.3 소스', href: 'https://github.com/hyeonse-swing/hovershot-macos/tree/v0.2.3' },
        { label: 'v0.2.3 다운로드', href: 'https://github.com/hyeonse-swing/hovershot-macos/releases/tag/v0.2.3' },
      ],
    },
    {
      id: 'yt-music-companion',
      name: 'YouTube Music Companion',
      category: 'NATIVE DESKTOP APP',
      summary: '가사를 띄우고 지금 듣는 곡을 Discord에서 공유하는 macOS 메뉴 막대 앱이에요. 직접 설계하면서 노코드로 어디까지 만들 수 있는지 시험해 본 취미 프로젝트예요.',
      problem: '작업 창을 떠나지 않고 가사를 읽고, 친구가 내 프로필에서 지금 듣는 곡을 바로 열 수 있게 하고 싶었어요.',
      decisions: [
        { title: '플레이어에서 곡 주소 읽기', detail: '제목이 같은 다른 곡을 열지 않도록 설치형 YouTube Music 플레이어의 현재 영상 ID를 공유 링크에 사용해요.' },
        { title: '원할 때만 주간 곡 수 공유', detail: '사용자가 켜면 이 Mac에서 이번 주에 들은 해당 아티스트의 곡을 세요. 같은 곡을 여러 번 들어도 한 번만 세요.' },
      ],
      highlights: [
        '투명한 가사 창을 다른 앱 위에 띄우고, 미니 플레이어에서 앨범 표지와 곡 진행 시간을 볼 수 있어요.',
        'Discord 프로필에서 곡 제목이나 듣기 버튼을 누르면 같은 곡이 열려요. 곡이 바뀌면 표지와 링크도 갱신해요.',
      ],
      verification: '0.18.0에서 다른 Discord 계정으로 주간 곡 수와 듣기 버튼을 각각 눌러 같은 영상 ID가 열리는지 확인했어요. 플레이어가 백그라운드에서 다음 곡으로 넘어갔을 때도 프로필 링크를 원본과 대조했어요.',
      stack: ['Swift', 'AppKit', 'Discord Rich Presence'],
      release: 'macOS 앱 · Intel·Apple Silicon · Apple 미공증',
      links: [
        { label: 'v0.18.0 다운로드', href: 'https://github.com/hyeonse-swing/youtube-music-companion-macos/releases/tag/v0.18.0' },
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/youtube-music-companion-macos' },
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
        'The portfolio, Harukotoba, Return Desk and Flow QA share the display settings. Return Desk uses the 0.5.0 DataTable to keep a return selected when a reviewer sorts the hold queue or changes pages.',
        'Includes a CLI that checks raw CSS colors and shared-token overrides, plus a reusable skill for building, migrating and reviewing interfaces.',
        'Includes buttons, fields, menus, dialogs, tables, Stack and Grid, with inherited sizes from xs to xl. The hds CLI reads APIs, tokens and examples from the installed version.',
      ],
      verification: 'Local component and package-consumer checks cover sizing and layout in Chromium, Firefox and WebKit. macOS Safari 27 with VoiceOver confirmed the HDS 0.4.8 modal close button, focus-guard names and focus returning to the opener after Escape.',
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
      summary: 'A local QA tool that runs a user flow as a test case and shows the first step where two runs differ.',
      problem: 'When a flow description, runnable cases and browser results live apart, it is hard to tell which expectation was actually checked.',
      decisions: [
        { title: 'Separate review from execution', detail: 'Source hashes, allowed steps and explicit assertions are checked before a run; unresolved questions block their cases.' },
        { title: 'Distinguish execution from observation', detail: 'The browser runner records suite and selection scope. Results returned by an external agent are reviewed separately, and omitted cases never become passes.' },
      ],
      highlights: [
        'Built flow and case schemas, a CLI, and an English/Korean local UI. Existing browser runs use tester-army/e2e; fixed steps can run without a model.',
        'Supports selected-case runs and safe preparation of failed/error cases. A separate web handoff lets an agent use browser tools it already has, without installing the e2e runtime to read and execute the bundle.',
        'With step evidence in both reports, flow-qa compare shows the last step that passed in both runs and the first step where their results differed. Older reports still support case-level comparisons.',
      ],
      verification: 'I installed 0.10.2 from npm and ran the same synthetic return approval case twice. Both runs passed the first two steps. The CLI showed that step 3, the approval status check, passed after recovery.',
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
      summary: 'A self-hosted toolkit for finding a browser error by project and event ID and tracing it to the original source location for that release.',
      problem: 'I wanted to inspect the page and preceding context of a browser error while keeping collection and storage under the operator’s control.',
      decisions: [
        { title: 'Choose collection depth', detail: 'Choose minimal for manual logging, standard for existing defaults, or detailed for more diagnostic context, then override individual switches. Automatic capture omits request bodies, headers and cookies.' },
        { title: 'Bound delivery and retention', detail: 'The SDK limits its queue and retries, while the self-hosted collector stores events in SQLite or JSONL with retention limits.' },
      ],
      highlights: [
        'Published the browser SDK, optional React Error Boundary adapter and event contract as separate @ihyeon npm packages.',
        'Manual SDK capture and the React error boundary can return the project and event ID together. This reference connects an error accepted by the queue to a support report or test.',
        'The viewer opens a source map for each release. Errors at the same position in app.js can be traced to different original files and lines across builds.',
        'A self-hosted Node.js collector and viewer provide SQLite/JSONL storage, project/type/date filters and stack inspection. SQLite logs can be exported with a size limit without changing the source database.',
      ],
      verification: 'I triggered a synthetic React error with the published 0.2.22 packages and matched the project and ID in the callback to the transmitted event. In three browsers, the public viewer mapped the same bundle location to different source lines for two releases.',
      stack: ['TypeScript', 'React', 'Node.js', 'SQLite'],
      release: 'Three npm packages · Self-hosted collector and viewer',
      links: [
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/browser-error-log' },
        { label: 'SDK · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log' },
        { label: 'React · npm', href: 'https://www.npmjs.com/package/@ihyeon/browser-error-log-react' },
        { label: 'Error ID → test → recovery example', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md#english' },
        { label: 'Error viewer', href: 'https://hyeonse-swing.github.io/browser-error-log/' },
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
        'Find an error by project and event ID, see which candidates each rule came from, and prepare a Flow QA workspace for cases whose expected behavior you have reviewed.',
        'Lists every observed error group as unselected, blocked, or review-ready, so excluded groups remain visible. Review-ready does not mean a test passed or that production coverage is complete.',
        'Links reviewed Flow QA results back to source error groups, separating targets by identity so another target or an earlier pass cannot mask a current failure or unrun case.',
      ],
      verification: 'I gave the published 0.5.2 package synthetic records from two projects with the same event ID. Looking up the ID returned two groups. Adding the project narrowed it to one group, where I could follow the case to its run result.',
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
      summary: 'A bilingual web demo and installable console for putting a synthetic return on hold, reviewing it again and copying its history.',
      problem: 'I wanted to show what happens when two reviewers process the same return, and how a saved approval can be checked after a failed response or retry.',
      decisions: [
        { title: 'Preserve approval results', detail: 'The local console saves approvals and replay responses in SQLite. The browser demo keeps its synthetic history in each visitor’s browser.' },
        { title: 'Connect the QA tools', detail: 'The local QA example collects an error with Browser Error Log, reviews a candidate in Error to Test, and runs failure and recovery cases with Flow QA.' },
      ],
      highlights: [
        'Pick a return from the hold queue for reinspection. From its detail view, copy its current status, chronological history, reviewers and notes together.',
        'The web demo runs on synthetic data and keeps history in the visitor’s browser. The separate local console retains approvals and replay responses in SQLite.',
        'The local QA example links one error and a reviewed case through Browser Error Log → Error to Test → Flow QA failure and recovery runs.',
      ],
      verification: 'I checked the copied history in Korean and English on the public demo. With npm version 0.2.3, I read the clipboard to confirm it contained the selected synthetic return, RET-2421. In a separate SQLite check, only one of two concurrent final decisions took effect.',
      stack: ['TypeScript', 'React', 'Hyeonse Design System', 'SQLite', 'Playwright'],
      release: 'Web demo · npm CLI · GitHub',
      links: [
        { label: 'Web demo', href: 'https://return-desk.hyeonse.dev/?lang=en' },
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/return-review-console' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@ihyeon/return-review-console' },
        { label: 'QA example', href: 'https://github.com/hyeonse-swing/return-review-console/blob/main/qa/README.md' },
        { label: 'Case with execution evidence', href: '/en/notes/return-desk-approval-regression/' },
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
        'Find and trim area or window recordings in the library. Even clips under a second keep their playback duration when exported as GIFs.',
      ],
      verification: 'I captured and recorded a test window with the published 0.2.3 app on an Apple Silicon Mac running macOS 26.6.2. The 60-frame GIF and its source recording both lasted 9.92 seconds. Separate 0.40- and 0.84-second test clips also kept their duration after export.',
      stack: ['Swift', 'SwiftUI', 'AppKit', 'ScreenCaptureKit', 'Vision'],
      release: 'macOS app · GitHub download · Not Apple-notarized',
      links: [
        { label: 'GitHub · v0.2.3 source', href: 'https://github.com/hyeonse-swing/hovershot-macos/tree/v0.2.3' },
        { label: 'Download v0.2.3', href: 'https://github.com/hyeonse-swing/hovershot-macos/releases/tag/v0.2.3' },
      ],
    },
    {
      id: 'yt-music-companion',
      name: 'YouTube Music Companion',
      category: 'NATIVE DESKTOP APP',
      summary: 'A Mac menu bar app that puts lyrics over other apps and shares the current track on Discord. I designed it as a hobby project to see how far I could get with no-code tools.',
      problem: 'I wanted to read lyrics without leaving my work and let a friend open the exact song from my Discord profile.',
      decisions: [
        { title: 'Read the song link from the player', detail: 'The shared link uses the video ID from the installed YouTube Music player, so songs with the same title lead to the right recording.' },
        { title: 'Make the weekly count optional', detail: 'When enabled, the app counts the distinct songs by the current artist played on this Mac this week. Repeat plays count once.' },
      ],
      highlights: [
        'A transparent lyrics overlay stays above other apps. The mini player shows album art and playback progress.',
        'A friend can open the song from its title or the listen button on Discord. The artwork and link update when the track changes.',
      ],
      verification: 'With 0.18.0, I opened the weekly count and the listen button from a second Discord account. Both led to the same video ID as the player. I checked the link again when the player advanced to the next song in the background.',
      stack: ['Swift', 'AppKit', 'Discord Rich Presence'],
      release: 'macOS app · Intel and Apple Silicon · Not Apple-notarized',
      links: [
        { label: 'Download v0.18.0', href: 'https://github.com/hyeonse-swing/youtube-music-companion-macos/releases/tag/v0.18.0' },
        { label: 'GitHub', href: 'https://github.com/hyeonse-swing/youtube-music-companion-macos' },
      ],
    },
  ],
};

export function getPersonalProjects(locale: Locale): readonly PersonalProject[] {
  return personalProjects[locale];
}

export function isHobbyProject(id: string): boolean {
  return id === 'hovershot' || id === 'yt-music-companion';
}
