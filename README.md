# Hyeonse Im · 포트폴리오

한국어·영어 경력 사례를 담은 정적 포트폴리오다. 흑백과 코발트 블루를 기본으로 하며 다크모드와 화면 설정을 지원한다. 직원 ID 배지를 직접 당겨볼 수 있다. 실제 제품 화면이나 고객 데이터를 복제하지 않고, 대표 프로젝트 네 개의 핵심 흐름을 설명용 그래픽으로 표현했다.

## 로컬 실행

Node.js 22 이상을 사용한다. 아래 명령은 저장소 루트에서 실행한다.

```sh
npm ci
NEXT_TELEMETRY_DISABLED=1 npm run dev -- --port 4321
```

개발 서버는 `http://127.0.0.1:4321`에서 확인한다. 종료할 때 터미널에서 Ctrl+C를 누른다.

```sh
npm run check
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run audit:content
npm run preview -- 4322
```

`check`는 TypeScript 검사, `build`는 Next.js 정적 내보내기, `audit:content`는 공개 콘텐츠와 글꼴 문자 범위 검사다. 빌드 결과는 `out/`에 생성된다. `preview`는 `out/`을 `http://127.0.0.1:4322`에서 제공하는 일반 포그라운드 Node 서버이며 Ctrl+C로 종료한다.

## 구성

- Next.js 16.3.8, React 19.3.0, TypeScript 5.9를 사용한다. 스타일은 전역 CSS와 컴포넌트별 CSS Modules로 관리한다.
- `src/data/content.json`은 공개용 경력 데이터, `src/data/work.ts`는 대표 사례의 표시 순서와 시각 주제를 담는다. 내부 근거 문서는 포함하지 않는다.
- `src/data/career.ts`는 추가 프로젝트 10개의 기여·협업 내용, `case-stories.ts`는 대표 사례의 맥락·선택·검증, `engineering.ts`는 실제 코드에서 확인한 기술 설명과 개념 흐름을 관리한다.
- `src/components/HomePage.tsx`는 소개, 대표 사례 네 개, 경력, 추가 경험, 연락처를 배치한다.
- `src/components/AboutPage.tsx`는 역할과 프로젝트 범위, 기술별 경험, 판단 방식과 공개 작업을 소개한다. 기술 설명에서 대표 사례의 `#engineering`으로 바로 이동할 수 있다.
- `src/components/StudioPage.tsx`는 사이트 설명과 테마·강조색·간격·모서리·움직임을 조작하는 작업실이다. 설정은 전체 페이지와 언어에 공통 적용되고 이 브라우저에 저장된다.
- `src/styles/tokens.css`와 `DESIGN_SYSTEM.md`에서 디자인 기준을 관리한다.
- `src/components/WorkPage.tsx`는 각 사례의 문제·역할·선택·기술적 구현·검증·결과·한계를 보여준다. `TechnicalDetails`는 실제 구현을 요약한 흐름과 API·상태·렌더링·갱신 설명을 표시한다.
- `src/components/IdentityBadge.tsx`는 DOM 카드의 CSS 원근 변환과 포인터·키보드 입력, SVG 대체 렌더링을 맡는다. 처음에는 CSS로 크기를 맞춘 정적 끈·클립을 유지하고, 물리 상태와 3D 첫 그리기가 준비되면 함께 전환한다. `src/components/BadgeAccessories3D.tsx`는 Three.js로 입체적인 천 끈·금속 연결부와 부드러운 배경 그림자를 그린다. 클립 금속선은 배지 크기가 바뀔 때만 형상을 다시 만들고, 움직일 때는 관절 자세에 맞춰 고정 형상을 이동·회전한다. 슬롯 구멍이 있는 깊이 형상이 카드 뒤의 부품을 가리며, WebGL 초기화 실패 시에는 움직이는 SVG로 전환한다. 배지 상단은 데스크톱에서 `clamp(348px, calc(33svh + 48px), 448px)`, 모바일에서 `312px`이다. 헤더와 소개·상태·하단 문구는 움직이는 카드와 끈보다 앞에 표시한다.
- `src/lib/badge-physics.ts`는 Rapier 3D로 양쪽 12구간 끈의 스프링·캡슐 충돌과 카드·뒤쪽 벽의 충돌, 걸쇠·고리·연결부의 관절을 계산한다. 카드 슬롯과 클립은 x축 회전 관절로 연결하고 각도 스프링도 그 축에만 적용한다. 관절 접힘 한계는 실제 연결 부품에만 적용된다. 화면 경계나 카드 회전각을 직접 제한하지 않는다. 물리 모듈은 초기 HTML 이후 비동기로 불러오고, 움직임이 멈추면 RAF도 정지한다. Three.js 역시 상태 변화가 있을 때만 다시 그린다. 움직임 줄이기 설정에서는 정적인 드래그·키보드 조작을 유지한다.
- 마우스를 카드 주변 48px 안에서 움직이면 클릭 없이 작은 힘을 준다. 가까울수록 반응하며 커서 이동량을 기준으로 계산한다. 드래그·키보드 조작 중이거나 터치 입력·모션 감소 설정에서는 이 반응을 적용하지 않는다.
- `src/components/ProjectVisual.tsx`는 바이크 운영, 성능 개선, 옐로우버스 운행, SWAP Admin 전환을 서로 다른 설명용 그래픽으로 표현한다.
- `public/fonts/`의 DM Sans와 Noto Sans KR WOFF2는 직접 호스팅한다. 라이선스 원문도 같은 폴더에 있다.
- `public/social.png`는 1200×630 공유 이미지이며, `scripts/social-preview.html`은 원본 레이아웃이다.

사이트의 GitHub 프로필은 `https://github.com/hyeonse-swing`, LinkedIn은 `https://www.linkedin.com/in/hyeonse-im-131b54141/`이다. LinkedIn 주소는 제공된 경력 PDF 두 곳의 표기와 대조했다. 공개 연락처와 경력 내용은 `src/data/content.json`에서 관리한다.

## 한국어·영어 i18n

한국어는 기존 `/`, `/about/`, `/studio/`, `/work/:id/` 주소를 사용한다. 영어는 같은 경로에 `/en`을 붙인다. 상단 EN/KO 링크는 같은 페이지로 이동하며 JavaScript가 켜진 환경에서는 쿼리와 현재 섹션도 유지한다. 언어의 기준은 URL이며 자동 언어 감지나 저장된 언어에 따른 강제 이동은 없다.

화면은 공통 컴포넌트가 `locale`을 받아 렌더링한다. 한국어 데이터는 `src/data/`, 영어 데이터는 `src/data/en/`, 선택은 `src/data/localized.ts`, 경로 변환은 `src/lib/locale.ts`에 있다. 문구를 바꾸면 두 언어의 같은 항목을 함께 검토한다. 본문뿐 아니라 도식, 배지 안내, 작업실 조작, 접근성 이름과 메타데이터도 언어에 맞춘다.

`src/app/(ko)/`와 `src/app/en/`의 얇은 라우트가 공통 화면을 호출한다. 두 루트 레이아웃은 `SiteDocument`를 공유하면서 서버 HTML에 올바른 `lang`을 출력한다. 각 페이지는 canonical·언어별 alternate 링크를 내보낸다. 루트 레이아웃이 둘이므로 Next.js의 `globalNotFound` 옵션과 `global-not-found.tsx`로 공통 404를 구성했다. 404에는 두 언어의 홈으로 돌아가는 링크가 있다. JavaScript 없이도 본문과 기본 언어 링크를 사용할 수 있다.

## 글꼴과 콘텐츠 변경

한국어 글꼴은 사이트에 쓰인 문자를 추출한 가변 WOFF2 서브셋이다. 새 한글이나 기호를 추가한 뒤 `npm run audit:content`가 누락 문자를 발견하면 원본 글꼴에서 다시 생성한다.

```sh
mkdir -p scripts/.font-cache
curl -L --fail 'https://raw.githubusercontent.com/google/fonts/main/ofl/notosanskr/NotoSansKR%5Bwght%5D.ttf' -o scripts/.font-cache/NotoSansKR.ttf
node scripts/subset-fonts.mjs
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run audit:content
```

원본 TTF 캐시는 Git·Vercel 대상에서 제외했다. 기본 빌드는 저장된 서브셋과 커버리지 파일을 사용하므로 글꼴 다운로드 없이 실행된다. 서브셋에도 동일한 OFL 라이선스가 적용된다.

## Vercel 배포 준비

외부 배포는 아직 수행하지 않았다. 이 공개 저장소의 루트가 프로젝트 루트다. `next.config.ts`가 정적 내보내기를 설정하고, `vercel.json`은 Next.js 빌드 결과인 `out/`을 지정한다.

공개 도메인이 정해지면 빌드 환경의 `NEXT_PUBLIC_SITE_URL`에 `https://`를 포함한 전체 주소를 설정한다. 이 값이 없으면 메타데이터는 Vercel의 `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL` 순서로 사용한다. 모두 없을 때는 로컬 미리보기 주소를 사용한다.

## 근거와 한계

SWING 성능 수치인 Lighthouse Performance 54→95와 초기 전송량 19.805→0.488MB는 2026.07 당시 로컬 모바일 시뮬레이션의 개선 전 3회·후 5회 중앙값이다. 이 포트폴리오의 성능이나 실사용자 지표를 뜻하지 않는다. 회사 코드·내부 PR 링크·전화번호·고객 정보는 공개 페이지에 포함하지 않는다.

상세 경력 근거와 브라우저 QA 기록은 공개 저장소·배포 대상에서 제외한다. 기존 Lighthouse 수치는 작업실·테마 추가 전 측정이며 이번 변경에서는 다시 측정하지 않았다.

i18n 적용 후 두 언어의 14개 페이지와 공통 404, 내부 링크/앵커 210개 및 글꼴 범위를 검사했다. 모바일 자동 접근성 28개 조합, 번역 누락, 언어 전환·테마 유지·키보드·JavaScript 비활성 상태를 확인했다. 영어 태블릿 카드의 넘침을 수정한 뒤 양 언어 홈의 24개 너비·테마 조합을 다시 확인했다. 실제 회사 서비스의 인증·결제·기기 동작을 이번 작업에서 재실행한 것은 아니다.
