export type EngineeringStory = {
  lead: string;
  stack: string[];
  flow: { title: string; detail: string }[];
  flowCaption: string;
  details: { label: string; title: string; body: string }[];
};

export const caseEngineering: Record<string, EngineeringStory> = {
  'bike-operations': {
    lead: '어드민에서는 API가 확정되기 전에 화면 개발을 먼저 진행했어요. 이후 사업자 포털에서는 인증·접근 확인·스토어 선택 순서로 조회를 열고, 사용자 유형에 따라 달라지는 응답도 따로 처리했어요.',
    stack: ['React', 'TypeScript', 'TanStack Query · Admin', 'SWR · Portal', 'Zustand', 'Playwright'],
    flow: [
      { title: '인증 준비', detail: '저장된 인증 상태를 복원하고 초기 처리가 끝나기를 기다려요.' },
      { title: '접근 확인', detail: '접근 요약을 확인한 뒤 스토어 목록을 조회해요.' },
      { title: '스토어 선택', detail: '목록에 있는 ID로 상세·구독 정보를 조회해요.' },
      { title: '변경 후 갱신', detail: '결제 결과를 반영하고 청구 내역을 다시 조회해요.' },
    ],
    flowCaption: '사업자 포털에서 데이터를 조회하는 순서를 간추렸어요.',
    details: [
      { label: 'API CONTRACT', title: 'fixture와 실제 응답의 차이', body: 'API가 정해지기 전에는 비운영 fixture로 반납·인수·보험 변경 화면을 확인했어요. 실제 연동에서는 공통 사용자 모델의 구분값을 반영했어요. B2C 응답에 사업자 정보 객체 자체가 없는 경우를 발견한 뒤에는 응답 계약과 화면 조건, 테스트 케이스를 함께 고쳤어요.' },
      { label: 'DEPENDENT FETCHING', title: '접근 확인 뒤 순차 조회', body: 'Zustand에 저장된 인증 상태의 복원과 초기 처리가 끝나면 접근 요약을 확인했어요. 그 결과에 따라 스토어 목록과 선택 스토어의 상세를 차례로 조회하고, 조건이 맞지 않으면 SWR 키를 null로 두어 요청을 보류했어요. 로그인 필요·접근 불가·조회 오류는 각각 다른 진입 상태로 표시했어요.' },
      { label: 'STATE & CACHE', title: '스토어 선택과 결제 후 갱신', body: '스토어는 URL, 저장된 선택, 단일 스토어 기본값 순으로 결정했어요. 상세 조회에는 목록에 있는 ID만 사용하고, 결제 후에는 성공한 항목만 SWR 캐시에 반영한 뒤 청구 목록을 다시 확인했어요. 일부 항목 실패와 전체 실패, 요청 예외도 각각 안내했어요.' },
      { label: 'RETURN FLOW', title: '외부 인증 복귀 위치의 일회성 사용', body: '결제수단 등록을 시작할 때 복귀 위치를 sessionStorage에 저장하고 앱 브릿지로 인증 화면을 열었어요. 결과 화면에서는 저장값을 꺼내 지운 뒤 같은 출처의 포털 경로인지 확인해 이동해요. 유효한 복귀 위치가 없으면 기존 결제수단 화면으로 이어지게 했어요.' },
    ],
  },
  'swing-home-performance': {
    lead: '렌더링과 브라우저가 받는 자원, 서버가 요청마다 하는 일을 나눠 살폈어요. 첫 화면에 필요한 내용은 미리 만들고, 상호작용과 외부 콘텐츠는 필요한 곳에만 남겼어요.',
    stack: ['Next.js App Router', 'Server Components', 'IntersectionObserver', 'sharp', 'next/image', 'WOFF2'],
    flow: [
      { title: '빌드', detail: '언어별 페이지와 이미지 변형을 빌드에서 만들어요.' },
      { title: '첫 응답', detail: '미리 만든 HTML과 영상 포스터를 보내요.' },
      { title: '상호작용', detail: '메뉴·캐러셀에 필요한 클라이언트 코드를 실행해요.' },
      { title: '스크롤', detail: '외부 콘텐츠는 화면에 가까워질 때 불러와요.' },
    ],
    flowCaption: '첫 화면 표시와 이후 상호작용에 필요한 작업을 나눠 정리했어요.',
    details: [
      { label: 'RENDERING', title: '상호작용을 위한 클라이언트 영역', body: '언어별 경로를 generateStaticParams로 만들고 서버에서 번역 사전을 읽었어요. 페이지·레이아웃은 서버 컴포넌트로 구성하고, 메뉴처럼 상태와 이벤트가 필요한 부분만 별도 클라이언트 컴포넌트로 분리했어요.' },
      { label: 'LOADING', title: '뷰포트 근처에서 iframe 로드', body: 'IntersectionObserver로 뉴스 영역이 뷰포트 300px 이내에 들어오면 iframe을 만들고 관찰을 해제했어요. 로드 전에도 같은 높이의 자리를 확보했고, 브라우저가 관찰 API를 지원하지 않을 때는 콘텐츠가 빠지지 않도록 별도 로드 경로를 뒀어요.' },
      { label: 'ASSET PIPELINE', title: '빌드 시점 이미지 변환', body: 'sharp로 회전 보정·폭별 리사이즈·WebP 생성을 빌드에서 수행했어요. next/image의 커스텀 로더는 요청한 너비 이상인 변형 중 하나를 골라 정적 파일 주소를 반환해요. 등록되지 않은 이미지는 원본 경로를 사용하고, 생성 파일은 버전 경로로 구분했어요.' },
      { label: 'FONT', title: '폰트 굵기와 초기 요청 우선순위', body: '가변 WOFF2 서브셋 하나에 사용하는 굵기를 담고 next/font/local로 연결했어요. 히어로 포스터의 초기 우선순위를 고려해 폰트 preload를 끄고 display: swap을 사용했어요. 그 효과는 별도의 폰트 비교 실험으로 확인했어요.' },
    ],
  },
  'yellow-bus': {
    lead: '운행 화면에서는 학원·날짜·시간·배차 선택이 목록과 지도에 일관되게 반영돼야 했어요. 조회 데이터와 선택 상태를 나누고, 수정 후에는 해당 운행 데이터를 다시 가져오게 했어요.',
    stack: ['React', 'TypeScript', 'React Context', 'TanStack Query', 'Kakao Map', 'Drag & Drop'],
    flow: [
      { title: '조건 선택', detail: '학원·날짜·시간에 맞는 배차를 조회해요.' },
      { title: '지도 확인', detail: '선택한 배차의 여러 노선을 지도에 표시해요.' },
      { title: '운행 수정', detail: '탑승 상태와 승하차 정류장을 변경해요.' },
      { title: '데이터 갱신', detail: '관련 조회 캐시를 무효화해요.' },
    ],
    flowCaption: '운행 정보 탭에서 조회하고 선택한 뒤 수정하는 흐름이에요.',
    details: [
      { label: 'STATE MODEL', title: '상위 조건 변경 시 하위 선택 초기화', body: 'React Context에서 선택 학원·날짜·시간·배차와 지도 초점을 관리했어요. 학원을 바꾸면 기존 선택을 초기화하고, 날짜를 바꾸면 시간과 경로 선택을 비웠어요. 이전 조건의 배차가 새 조건 아래 남지 않도록 상태 간 관계를 맞췄어요.' },
      { label: 'QUERY & MAP', title: '자동 조회와 명시적 조회', body: '시간 목록은 useQuery로 가져오고, 배차와 경로는 useMutation으로 명시적으로 요청했어요. 선택한 배차가 없거나 조회 중일 때는 경로 요청을 막았어요. 경로가 하나면 해당 배차에 초점을 맞추고, 여러 개면 학원 위치를 중심으로 보여줬어요. 선택한 노선은 Polyline으로 강조했어요.' },
      { label: 'INVALIDATION', title: '변경 후 관련 데이터 재조회', body: '탑승 상태와 정류장 변경이 성공하면 해당 배차의 상세·학생 일정·정류장 목록 query key를 무효화했어요. 화면의 값만 바꾸지 않고 관련 조회가 서버 결과로 갱신되게 했어요.' },
      { label: 'INTERACTION RULES', title: '승하차 정류장 이동 제약', body: '학생의 승하차 정류장을 드래그할 때 같은 정류장인지, 노선 방향과 출발·도착 제약을 만족하는지, 승차와 하차 순서가 뒤집히지 않는지 검사했어요. 조건을 통과한 이동만 변경 확인 대화상자로 보냈어요.' },
    ],
  },
  'swap-admin-v2': {
    lead: 'V2 전환에서는 데이터 버전에 맞춰 화면을 이동시키고 새 API 응답을 연결했어요. 상세·계약 업무에 남아 있던 기존 API 경로도 함께 다뤘어요.',
    stack: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'Suspense', 'ErrorBoundary'],
    flow: [
      { title: '상세 진입', detail: '기존 주소에서 작업 데이터를 조회해요.' },
      { title: '버전 확인', detail: '응답의 작업 버전을 확인해요.' },
      { title: 'V2 상세 이동', detail: 'replace로 새 상세 경로에 이동해요.' },
      { title: '신규·기존 경로 공존', detail: '새 API와 기존 API의 업무 경로를 함께 유지해요.' },
    ],
    flowCaption: '팀과 함께 전환한 화면의 버전별 이동 순서예요.',
    details: [
      { label: 'ROUTING', title: '작업 데이터 버전에 따른 이동', body: '기존 작업 상세에서 응답의 버전을 확인하고, V2 데이터이면 새 상세 화면으로 보내도록 연결했어요. 이동에는 replace를 사용해 전환용 진입 주소가 브라우저 이력에 추가로 쌓이지 않게 했어요.' },
      { label: 'LIST CONTRACT', title: '필터·페이지와 목록 응답', body: '팩토링 목록에서는 필터·페이지 상태를 함께 관리하고 빈 필터 값을 제거해 조회했어요. 필터가 바뀌면 첫 페이지로 돌아가고, Fleet API가 돌려준 총 건수와 페이지를 테이블의 페이지네이션에 연결했어요.' },
      { label: 'MIGRATION BOUNDARY', title: '화면별 API 전환 범위', body: '신규 목록은 Fleet API의 페이지 응답을 사용했지만, 관련 상세·계약·첨부 업무에는 기존 API 경로도 남아 있었어요. 구독·작업·팩토링의 새 진입 화면을 연결했어요. 팩토링 V2 목록에 Suspense와 ErrorBoundary로 로딩·오류 경계를 구성한 팀 릴리스에도 참여했어요.' },
    ],
  },
};

export const technicalFocus = [
  { title: 'React · TypeScript', subtitle: '화면과 데이터 계약', detail: '고객 화면과 운영 Admin을 만들며 응답 타입, 사용자 유형, 폼 입력과 예외 상태를 맞췄어요. API 미정 단계의 fixture와 실제 응답을 구분해 연동한 경험도 있어요.', href: '/work/bike-operations/#engineering', label: '바이크 화면의 데이터 흐름' },
  { title: 'TanStack Query · SWR', subtitle: '조회 조건과 변경 후 갱신', detail: '언제 조회할지, 어떤 조건으로 데이터를 구분할지, 수정 후 무엇을 다시 가져올지 업무 흐름에 맞춰 정했어요.', href: '/work/yellow-bus/#engineering', label: '운행 정보의 조회와 갱신' },
  { title: 'Next.js · Web performance', subtitle: '렌더링과 자원 처리', detail: '서버·클라이언트 경계를 나누고 페이지를 프리렌더링했어요. 이미지 생성과 iframe 로드 시점, 폰트 요청을 바꾸고 로컬 Lighthouse로 비교했어요.', href: '/work/swing-home-performance/#engineering', label: '초기 로딩 경로와 빌드 처리' },
  { title: 'WebView · QA', subtitle: '앱 경계와 실행 환경', detail: '네이티브 브릿지와 웹 화면을 연결하고 결제 이후의 복귀 흐름을 다뤘어요. Playwright 자동화에 직접 화면 확인을 더하고, 공개 WebView QA 셸도 만들었어요.', href: '/#archive', label: '웹뷰와 공개 QA 도구' },
];
