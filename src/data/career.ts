export type ProjectDetail = {
  id: string;
  lead: string;
  contributions: { title: string; detail: string }[];
  tags: string[];
  publicLink?: { label: string; href: string };
};

export const projectDetails: Record<string, ProjectDetail> = {
  'swing-webview': {
    id: 'swing-webview',
    lead: '앱 안에서 고객이 만나는 화면을 오래 다뤘습니다. 제품 진입부터 멤버십, 포인트, 로그인과 결제까지 기능마다 앱과 웹뷰의 연결 방식을 확인했습니다.',
    contributions: [
      { title: '제품 간 진입', detail: '외부 서비스에서 앱 안의 다른 제품으로 이어지는 웹뷰 허브를 만들고, 연결 대상별 안내 문구를 분리했습니다.' },
      { title: '포인트와 멤버십', detail: '멤버십 구매 화면의 목록과 설명 구성을 정리했습니다. 포인트 화면을 개편할 때는 기존 내역 경로와 국·영문 표시를 함께 다뤘습니다.' },
      { title: '로그인과 결제', detail: '로그인·본인확인 화면 변경에 참여했고, 이후 포인트 충전의 결제 위젯과 결제 결과 복귀 화면을 포함한 웹뷰 흐름을 다뤘습니다.' },
    ],
    tags: ['WebView', 'React', 'TypeScript', '앱 브릿지'],
  },
  'swing-admin': {
    id: 'swing-admin',
    lead: '운영자가 매일 쓰는 화면에서는 한 메뉴의 변경이 다른 업무에 어떻게 이어지는지 살폈습니다.',
    contributions: [
      { title: '세션과 메뉴 상태', detail: '로그인 후 사용자 정보와 메뉴가 갱신되는 순서, 만료된 세션과 이전 화면 복귀 시 생기는 UI 문제를 수정했습니다.' },
      { title: '파트너 정산 조회', detail: '파트너 정산 요약과 정산서별 운행 내역을 찾고 조회하는 화면을 구현했습니다.' },
      { title: '운영 도구 정리', detail: '기존 JavaScript·MUI 기능을 TypeScript·Ant Design 기반으로 옮기고, 도메인별 Admin 분리와 모노레포 통합에 참여했습니다.' },
    ],
    tags: ['운영 Admin', 'React', 'TypeScript', '상태 관리'],
  },
  'swap-customer': {
    id: 'swap-customer',
    lead: 'SWAP에서는 초기 웹·웹뷰·Admin 구축부터 상품 탐색, 첫 주문, 결제 정보와 사업자 포털까지 여러 고객 접점을 맡았습니다.',
    contributions: [
      { title: '주문과 결제 표시', detail: '첫 주문에서 액세서리 구매와 구독 입력을 나누고, 영수증 화면을 서버 조회 결과와 연결하며 가격 표시 경로를 조정했습니다.' },
      { title: '로그인 계약 전환', detail: '팀과 함께 자전거 고객 로그인을 새 OAuth2 계약에 맞춰 옮겼습니다. 로그인 직후 토큰 상태 경합과 가입·동의 흐름을 함께 정리했습니다.' },
      { title: '상품 탐색과 사업자 포털', detail: '영문 상품 상세와 빠른 주문 경로를 연결했습니다. 사업자가 구독·납부 상태와 결제수단을 다루는 화면에서는 접근 확인과 결제 후 복귀 경로를 다뤘습니다.' },
      { title: '브릿지 호출 방식', detail: '기존 Android·iOS 호출에 Flutter의 callHandler와 JavaScriptChannel.postMessage 경로를 추가했습니다. 채널에 따라 객체 전달과 JSON 직렬화를 나누고, 호출 시 동기 예외가 발생하면 다음 방식을 시도하도록 연결했습니다. 호출 성공과 네이티브 처리 완료는 구분했습니다.' },
    ],
    tags: ['React', 'TypeScript', 'SWR', 'Zustand', 'Flutter WebView'],
  },
  vox: {
    id: 'vox',
    lead: '음성 AI를 고객 접점에 연결하기 위해 벤더 검토와 제품 흐름, CX 시나리오를 함께 살폈습니다.',
    contributions: [
      { title: '도입 범위 검토', detail: '미납 안내와 해피콜의 PoC 범위, 비용, 연동 요건을 비교하고 CX 팀과 안내 시나리오를 조율했습니다.' },
      { title: '제품 안의 진입점', detail: '반납형 구독 완료 화면에서 계약 안내로 들어가고 전화 앱에서 돌아오는 흐름을 연결했습니다.' },
      { title: '운영 확인', detail: '연동 이후 사용량과 비용을 추적했습니다. 통화 건수를 상담 완료나 문제 해결 건수로 해석하지는 않습니다.' },
    ],
    tags: ['제품 연동', 'CX 협업', 'WebView'],
  },
  'ai-development': {
    id: 'ai-development',
    lead: 'AI 보조 개발을 프로젝트 구조와 검증 기준에 맞춰 쓰는 방법을 정리해 FE 팀에 공유했습니다.',
    contributions: [
      { title: '저장소별 규칙', detail: '프로젝트마다 다른 코드 구조와 작업 절차를 반영해 개발 스킬을 구성하고 개선했습니다.' },
      { title: '검증 방식', detail: 'SWAP 모노레포의 의존 경계 검사, 변경 범위에 따른 확인 절차, 설정 백업·복구 방법을 안내했습니다.' },
      { title: '생성 코드 검토', detail: 'AI가 만든 코드도 구조와 복잡도를 직접 살피고 필요한 범위만 반영하는 판단을 공유했습니다.' },
    ],
    tags: ['개발 방식', '코드 검토', '팀 공유'],
  },
  'webview-qa-shell': {
    id: 'webview-qa-shell',
    lead: '로컬 또는 스테이지 웹서비스를 iOS·Android WebView 안에서 확인하기 위한 공개 QA 도구입니다.',
    contributions: [
      { title: '실제 웹뷰 환경', detail: 'iOS WKWebView와 Android WebView에서 화면을 열어 안전 영역과 네비게이션 동작을 확인할 수 있도록 셸을 구성했습니다.' },
      { title: '점검 패널', detail: '웹 콘솔에 뷰포트, 스토리지, 로그 등의 확인 기능을 모았습니다.' },
    ],
    tags: ['React Native', 'WebView', 'QA 도구'],
    publicLink: { label: '공개 저장소 보기', href: 'https://github.com/hyeonse-swing/webview-qa-shell' },
  },
  deer: {
    id: 'deer',
    lead: '공유모빌리티 인수 서비스의 인수인계와 유지보수에 참여했습니다.',
    contributions: [
      { title: '인수 서비스 유지보수', detail: '기존 서비스의 운영 맥락을 이어받아 프론트엔드 유지보수에 참여했습니다.' },
    ],
    tags: ['인수 서비스', '유지보수'],
  },
  'swing-japan': {
    id: 'swing-japan',
    lead: 'Japan TF에서 홈페이지·백오피스·웹뷰를 개발하고 일본 서비스에 맞는 화면과 앱 연결을 다뤘습니다.',
    contributions: [
      { title: '일본어 화면', detail: '일본 서비스 웹뷰의 UI 문구를 현지화했습니다.' },
      { title: '앱 브릿지', detail: '웹뷰에서 네이티브 기능을 호출하는 WebKit 브릿지 연결에 기여했습니다.' },
    ],
    tags: ['해외 서비스', 'WebView', '앱 브릿지'],
  },
  'swing-air': {
    id: 'swing-air',
    lead: '공항 콜밴 인수 서비스의 홈페이지와 백오피스 재개발에 참여했습니다.',
    contributions: [
      { title: '고객·운영 화면', detail: '서비스 인수 후 고객 홈페이지와 운영용 백오피스의 프론트엔드 재개발에 참여했습니다.' },
    ],
    tags: ['인수 서비스', '고객 웹', '백오피스'],
  },
  opensource: {
    id: 'opensource',
    lead: '공개 라이브러리에서 옵션 변경에 따른 동기화 오류를 수정했습니다.',
    contributions: [
      { title: '동적 옵션 변경', detail: 'react-wheel-picker의 옵션이 바뀔 때 선택 값의 위치가 따라오지 않는 오류를 한 줄 수정으로 해결했습니다. 기여 PR은 2025년 6월 30일 병합됐습니다.' },
    ],
    tags: ['오픈소스', 'React', '버그 수정'],
    publicLink: { label: '병합된 기여 보기', href: 'https://github.com/ncdai/react-wheel-picker/pull/54' },
  },
};

export const careerIntroduction: string[] = [
  '2022년 3월부터 더스윙에서 고객 웹·웹뷰와 운영 도구를 만들었습니다. SWING, SWAP, Yellow Bus 등 여러 서비스의 초기 구축부터 기능 개발, 기술 검토와 서비스 전환까지 폭넓게 참여했습니다.',
  '2025년 9월부터는 SWAP FE Part Lead로 기술 의사결정, 주요 기능 개발과 코드 리뷰를 맡고 있습니다. 주요 기능을 직접 개발하면서 API 변경과 공통 구조, 릴리스에 필요한 판단을 동료들과 맞춥니다.',
  '운영자가 어떤 순서로 일을 처리하는지 듣고, 백엔드와 데이터 계약을 맞추고, 앱·CX 동료와 화면 사이의 연결을 확인하는 일이 제 작업의 큰 부분입니다.',
];

export const workAreas: { number: string; title: string; description: string; examples: string[] }[] = [
  { number: '01', title: '고객이 쓰는 화면', description: '상품을 찾고 주문하거나 앱 안에서 로그인·결제를 이어가는 흐름을 만듭니다.', examples: ['SWING 고객 웹뷰', 'SWAP 상품 탐색·첫 주문', '사업자 포털'] },
  { number: '02', title: '운영자가 쓰는 도구', description: '계약, 배차, 정산처럼 업무 순서와 권한이 맞아야 하는 화면을 다룹니다.', examples: ['바이크 운영 어드민', 'Yellow Bus 운행 관리', 'SWING 파트너 정산'] },
  { number: '03', title: '개발 방식과 연결', description: '구·신규 시스템의 공존, 앱 브릿지, 화면 성능과 검증 방식을 함께 살핍니다.', examples: ['SWAP Admin V2', 'SWING 홈페이지 성능', 'WebView QA Shell'] },
];

export const workingNotes: { title: string; detail: string; example: string; href?: string }[] = [
  { title: '업무 순서를 먼저 묻습니다', detail: '화면이 필요한 이유와 사용자가 다음에 할 일을 확인한 뒤 API에 필요한 필드와 예외 상태를 정리합니다.', example: 'Yellow Bus 학생 목록에서 보호자 정보가 없거나 여러 명인 경우를 새 응답 계약에 반영해 논의했습니다.', href: '/work/yellow-bus/' },
  { title: '전환 중인 경로를 함께 봅니다', detail: '새 화면을 붙일 때 기존 데이터와 이동 경로가 남아 있는지 확인하고 연결 순서를 잡습니다.', example: 'SWAP Admin V2에서는 구·신규 작업 데이터가 공존하는 환경의 화면·API 전환에 참여했습니다.', href: '/work/swap-admin-v2/' },
  { title: '화면과 실행 결과를 확인합니다', detail: '자동화가 통과한 뒤에도 실제 화면의 빈 상태와 응답 차이를 살펴봅니다.', example: '바이크 화면에서 사용자 유형에 따라 응답 객체가 빠지는 경우를 발견해 수정 후 E2E와 직접 확인을 다시 진행했습니다.', href: '/work/bike-operations/' },
  { title: '선택한 이유를 비교합니다', detail: '렌더링 방식과 전송 자원을 같이 보고, 같은 조건에서 전후를 측정합니다.', example: 'SWING 홈페이지에서 영상·이미지·폰트와 렌더링 경로를 조정하고 로컬 Lighthouse 모바일 시뮬레이션 중앙값을 비교했습니다.', href: '/work/swing-home-performance/' },
];

export const publicWork: { title: string; description: string; href: string; label: string }[] = [
  { title: 'WebView QA Shell', description: 'iOS·Android WebView에서 로컬·스테이지 웹서비스의 화면과 로그를 살펴보는 공개 도구입니다.', href: 'https://github.com/hyeonse-swing/webview-qa-shell', label: '저장소 보기' },
  { title: 'react-wheel-picker 기여', description: '옵션이 동적으로 바뀔 때 선택 위치가 어긋나는 오류를 수정한 병합 PR입니다.', href: 'https://github.com/ncdai/react-wheel-picker/pull/54', label: '기여 보기' },
];
