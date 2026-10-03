export type EngineeringStory = {
  lead: string;
  stack: string[];
  flow: { title: string; detail: string }[];
  flowCaption: string;
  details: { label: string; title: string; body: string }[];
};

export const caseEngineering: Record<string, EngineeringStory> = {
  'bike-operations': {
    lead: '어드민에서는 미확정 API와 화면을 분리해 개발했고, 이후 사업자 포털에서는 인증·접근 확인·스토어 선택 순서에 맞춰 조회를 열었습니다. 사용자 유형과 응답 형태가 달라지는 지점을 별도로 다뤘습니다.',
    stack: ['React', 'TypeScript', 'TanStack Query · Admin', 'SWR · Portal', 'Zustand', 'Playwright'],
    flow: [
      { title: '인증 준비', detail: '저장된 인증 상태와 초기 처리 완료' },
      { title: '접근 확인', detail: '스토어 접근 요약과 목록 조회' },
      { title: '스토어 선택', detail: '목록에 있는 ID로 상세·구독 조회' },
      { title: '변경 후 갱신', detail: '결제 결과 반영과 청구 재조회' },
    ],
    flowCaption: '사업자 포털의 실제 데이터 조회 순서를 간추렸습니다.',
    details: [
      { label: 'API CONTRACT', title: 'fixture에서 시작해 실제 응답의 차이를 수정했습니다', body: 'API가 정해지기 전에는 비운영 fixture로 반납·인수·보험 변경 화면을 확인했습니다. 실제 연동에서는 공통 사용자 모델의 구분값을 반영했습니다. 특히 B2C 응답에 사업자 정보 객체 자체가 없는 경우를 발견해 응답 계약과 화면 조건, 테스트 케이스를 함께 고쳤습니다.' },
      { label: 'DEPENDENT FETCHING', title: '접근 확인 전에 하위 조회가 시작되지 않게 했습니다', body: 'Zustand에 저장된 인증 상태의 복원과 초기 처리가 끝나면 접근 요약을 확인하고, 그 결과에 따라 스토어 목록과 선택 스토어의 상세를 차례로 조회했습니다. SWR 키를 null로 두어 조건이 맞지 않는 요청은 보류했습니다. 로그인 필요·접근 불가·조회 오류는 서로 다른 진입 상태로 표시했습니다.' },
      { label: 'STATE & CACHE', title: '선택 상태와 결제 결과를 실제 데이터에 맞췄습니다', body: '스토어는 URL, 저장된 선택, 단일 스토어 기본값 순으로 결정하되 목록에 존재하는 ID만 상세 조회에 사용했습니다. 결제 후에는 성공한 항목만 SWR 캐시에 반영하고 청구 목록을 다시 확인했습니다. 일부 항목 실패와 전체 실패, 요청 예외도 각각 안내했습니다.' },
      { label: 'RETURN FLOW', title: '외부 인증에서 돌아올 위치를 한 번만 사용했습니다', body: '결제수단 등록을 시작할 때 복귀 위치를 sessionStorage에 저장하고 앱 브릿지로 인증 화면을 열었습니다. 결과 화면은 저장값을 꺼내 지운 뒤 같은 출처의 포털 경로인지 확인해 이동합니다. 유효한 복귀 위치가 없으면 기존 결제수단 화면으로 이어지게 했습니다.' },
    ],
  },
  'swing-home-performance': {
    lead: '렌더링, 브라우저가 받는 자원, 서버가 요청마다 하는 일을 나눠서 살폈습니다. 초기 화면에 필요한 내용은 먼저 만들고, 상호작용과 외부 콘텐츠는 필요한 곳에만 남겼습니다.',
    stack: ['Next.js App Router', 'Server Components', 'IntersectionObserver', 'sharp', 'next/image', 'WOFF2'],
    flow: [
      { title: '빌드', detail: '언어별 페이지와 이미지 변형 생성' },
      { title: '첫 응답', detail: '미리 만든 HTML과 영상 포스터' },
      { title: '상호작용', detail: '메뉴·캐러셀의 클라이언트 코드' },
      { title: '스크롤', detail: '화면에 가까워진 외부 콘텐츠 로드' },
    ],
    flowCaption: '초기 표시와 이후 상호작용에 필요한 작업을 나눠 정리한 흐름입니다.',
    details: [
      { label: 'RENDERING', title: '페이지 전체에서 상호작용 부분으로 클라이언트 경계를 좁혔습니다', body: '언어별 경로를 generateStaticParams로 만들고 서버에서 번역 사전을 읽었습니다. 페이지·레이아웃은 서버 컴포넌트로 구성하고 메뉴처럼 상태와 이벤트가 필요한 부분은 별도 클라이언트 컴포넌트로 분리했습니다.' },
      { label: 'LOADING', title: 'iframe은 화면에 가까워졌을 때 마운트했습니다', body: 'IntersectionObserver로 뉴스 영역이 뷰포트 300px 이내에 들어오면 iframe을 만들고 관찰을 해제했습니다. 로드 전에도 같은 높이의 자리를 확보했으며, 브라우저가 관찰 API를 지원하지 않을 때는 콘텐츠가 빠지지 않도록 로드 경로를 두었습니다.' },
      { label: 'ASSET PIPELINE', title: '이미지 요청에서 변환 단계를 덜어냈습니다', body: 'sharp로 회전 보정·폭별 리사이즈·WebP 생성을 빌드에서 수행했습니다. next/image의 커스텀 로더는 요청한 너비 이상인 변형 중 하나를 골라 정적 파일 주소를 반환합니다. 등록되지 않은 이미지는 원본 경로를 사용하고, 생성 파일은 버전 경로로 구분했습니다.' },
      { label: 'FONT', title: '표현할 굵기는 유지하고 초기 요청 우선순위를 조정했습니다', body: '가변 WOFF2 서브셋 하나에 사용하는 굵기를 담고 next/font/local로 연결했습니다. 히어로 포스터의 초기 우선순위를 고려해 폰트 preload를 끄고 display: swap을 사용했습니다. 선택의 효과는 별도의 폰트 비교 실험으로 확인했습니다.' },
    ],
  },
  'yellow-bus': {
    lead: '운행 화면의 핵심은 학원·날짜·시간·배차 선택이 목록과 지도에서 일관되게 이어지는 것이었습니다. 조회와 선택 상태를 나누고, 수정이 끝나면 해당 운행의 데이터를 다시 가져오도록 연결했습니다.',
    stack: ['React', 'TypeScript', 'React Context', 'TanStack Query', 'Kakao Map', 'Drag & Drop'],
    flow: [
      { title: '조건 선택', detail: '학원·날짜·시간으로 배차 조회' },
      { title: '지도 확인', detail: '선택한 배차의 복수 노선 표시' },
      { title: '운행 수정', detail: '탑승 상태·승하차 정류장 변경' },
      { title: '데이터 갱신', detail: '관련 조회 캐시 무효화' },
    ],
    flowCaption: '운행 정보 탭에 포함된 조회·선택·수정 흐름입니다.',
    details: [
      { label: 'STATE MODEL', title: '상위 조건이 바뀌면 하위 선택을 정리했습니다', body: 'React Context에서 선택 학원·날짜·시간·배차와 지도 초점을 관리했습니다. 학원을 바꾸면 기존 선택을 초기화하고, 날짜를 바꾸면 시간과 경로 선택을 비웠습니다. 이전 조건의 배차가 새 조건 아래 남지 않도록 상태 간 관계를 맞췄습니다.' },
      { label: 'QUERY & MAP', title: '자동 조회와 사용자가 실행하는 조회를 나눴습니다', body: '시간 목록은 useQuery로 가져오고, 배차와 경로는 useMutation으로 명시적으로 요청했습니다. 선택한 배차가 없거나 조회 중일 때는 경로 요청을 막았습니다. 경로가 하나면 해당 배차에 초점을 맞추고, 여러 개면 학원 위치를 중심으로 보여주며 선택한 노선은 Polyline으로 강조했습니다.' },
      { label: 'INVALIDATION', title: '변경한 배차와 관련된 데이터를 다시 읽었습니다', body: '탑승 상태와 정류장 변경이 성공하면 해당 배차의 상세·학생 일정·정류장 목록 query key를 무효화했습니다. 화면에서 값을 바꾸는 것에 그치지 않고 관련 조회가 서버 결과로 갱신되도록 연결했습니다.' },
      { label: 'INTERACTION RULES', title: '드래그가 가능해도 모든 이동을 허용하지 않았습니다', body: '학생의 승하차 정류장을 드래그할 때 같은 정류장인지, 노선 방향과 출발·도착 제약을 만족하는지, 승차와 하차 순서가 뒤집히지 않는지 검사했습니다. 조건을 통과한 이동만 변경 확인 대화상자로 보냈습니다.' },
    ],
  },
  'swap-admin-v2': {
    lead: 'V2는 화면 이름만 바꾸는 작업이 아니었습니다. 데이터 버전에 맞는 화면 이동과 새 API 응답을 연결하면서, 아직 기존 API를 쓰는 상세·계약 업무도 함께 다뤘습니다.',
    stack: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'Suspense', 'ErrorBoundary'],
    flow: [
      { title: '상세 진입', detail: '기존 주소에서 작업 데이터 조회' },
      { title: '버전 확인', detail: '응답의 작업 버전으로 판단' },
      { title: 'V2로 이동', detail: '새 상세 경로로 replace 이동' },
      { title: '운영 계속', detail: '신규·기존 API 업무 경로 공존' },
    ],
    flowCaption: '팀과 함께 전환한 화면의 버전별 이동 구조입니다.',
    details: [
      { label: 'ROUTING', title: '주소보다 실제 데이터의 버전을 기준으로 이동했습니다', body: '기존 작업 상세가 응답의 버전을 확인하고 V2 데이터이면 새 상세 화면으로 보내도록 연결했습니다. 이동에는 replace를 사용해 전환용 진입 주소가 브라우저 이력에 추가로 쌓이지 않게 했습니다.' },
      { label: 'LIST CONTRACT', title: '필터·페이지와 API 응답을 한 흐름으로 맞췄습니다', body: '팩토링 목록에서는 필터·페이지 상태를 함께 관리하고 빈 필터 값을 제거해 조회했습니다. 필터가 바뀌면 첫 페이지로 돌아가며, Fleet API가 돌려준 총 건수와 페이지를 테이블의 페이지네이션에 연결했습니다.' },
      { label: 'MIGRATION BOUNDARY', title: '화면 안에서도 API 전환 단위를 나눴습니다', body: '신규 목록은 Fleet API의 페이지 응답을 사용했지만 관련 상세·계약·첨부 업무에는 기존 API 경로도 남아 있었습니다. 구독·작업·팩토링의 새 진입 화면을 연결하고, 팩토링 V2 목록은 Suspense와 ErrorBoundary로 로딩·오류 경계를 구성한 팀 릴리스에 참여했습니다.' },
    ],
  },
};

export const technicalFocus = [
  { title: 'React · TypeScript', subtitle: '화면과 데이터 계약', detail: '고객 화면과 운영 Admin을 만들며 응답 타입, 사용자 유형, 폼 입력과 예외 상태를 맞췄습니다. API가 미정일 때의 fixture와 실제 응답을 분리해 연결한 경험이 있습니다.', href: '/work/bike-operations/#engineering', label: '바이크 화면의 데이터 흐름' },
  { title: 'TanStack Query · SWR', subtitle: '조회 조건과 변경 후 갱신', detail: '조회가 가능한 시점, 데이터를 구분하는 조건, 수정 이후 다시 가져올 범위를 화면의 업무 흐름과 함께 다뤘습니다.', href: '/work/yellow-bus/#engineering', label: '운행 정보의 조회와 갱신' },
  { title: 'Next.js · Web performance', subtitle: '렌더링과 자원 처리', detail: '서버·클라이언트 경계를 나누고 페이지를 프리렌더링했습니다. 이미지 생성 시점, iframe 로드 시점, 폰트 요청을 바꾸고 로컬 Lighthouse로 비교했습니다.', href: '/work/swing-home-performance/#engineering', label: '초기 로딩 경로와 빌드 처리' },
  { title: 'WebView · QA', subtitle: '앱 경계와 실행 환경', detail: '네이티브 브릿지와 웹 화면을 연결하고 결제 이후의 복귀 흐름을 다뤘습니다. Playwright 자동화에 직접 화면 확인을 더하고, 공개 WebView QA 셸도 만들었습니다.', href: '/#archive', label: '웹뷰와 공개 QA 도구' },
];
