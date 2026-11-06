# 구현 메모

[README](../README.md)

명령과 코드 안의 경로는 저장소 루트를 기준으로 한다.

## 정적 출력과 언어별 문서

[next.config.ts](../next.config.ts)의 `output: 'export'`로 각 경로의 HTML을 빌드할 때 생성한다. `trailingSlash: true`이므로 `/about/`은 `out/about/index.html`로 출력된다.

한국어 라우트는 `src/app/(ko)/`, 영어 라우트는 `src/app/en/`에 있다. 각 루트 레이아웃이 [SiteDocument](../src/components/SiteDocument.tsx)에 `locale`을 전달해 서버 HTML의 `lang`을 결정한다. 공통 404는 `globalNotFound` 옵션과 `src/app/global-not-found.tsx`로 구성한다.

페이지는 [getPortfolio(locale)](../src/data/localized.ts)로 데이터를 가져와 공통 화면 컴포넌트에 전달한다. 한국어와 영어의 프로젝트 ID를 같게 유지하며, `scripts/audit-content.mjs`에서 대응 여부를 검사한다.

[LanguageSwitcher](../src/components/LanguageSwitcher.tsx)는 현재 경로에서 언어 접두어만 바꾼다. 클라이언트가 실행된 뒤에는 쿼리와 해시도 덧붙인다. 언어는 URL로 결정하며 브라우저 언어에 따른 자동 이동은 하지 않는다.

## 첫 화면의 테마 적용

[공통 preferences 모듈](https://github.com/hyeonse-swing/hyeonse-design-system/blob/main/src/preferences.ts)는 설정값의 허용 목록과 기본값을 정의한다. localStorage의 값은 파싱한 뒤 허용 목록과 대조하고, 잘못된 값은 기본값으로 대체한다. 포트폴리오는 `site-preferences.ts`의 `corners: soft`를 초기 스크립트와 Provider 양쪽에 전달한다. 첫 HTML에도 `data-corners="soft"`를 넣어 JavaScript 없이도 같은 기본 모서리를 표시한다. 저장된 유효한 모서리 선택은 유지하며 기본값 복원은 soft로 돌아간다.

저장된 테마를 React 초기화 이후에만 적용하면 첫 화면과 초기화 후의 색이 달라질 수 있다. 그래서 `SiteDocument`가 `<head>`에 고정된 `preferenceScript`를 넣고, 먼저 `<html>`의 `data-*` 속성을 설정한다. 저장된 문자열을 HTML에 삽입하지 않고 허용된 값만 속성에 반영한다.

이후 [공통 PreferencesProvider](https://github.com/hyeonse-swing/hyeonse-design-system/blob/main/src/react.tsx)가 설정 변경, 기기 테마·움직임 설정, 다른 탭의 `storage` 이벤트를 처리한다. 시스템의 `prefers-reduced-motion`이 사용자 설정보다 우선한다. localStorage를 사용할 수 없어도 현재 탭의 설정은 바꿀 수 있다.

## 공통 디자인 시스템

색·다크모드·강조색·기본 글꼴·gutter와 설정 UI는 별도 [Hyeonse Design System](https://github.com/hyeonse-swing/hyeonse-design-system)에서 가져온다. 의존성은 GitHub의 특정 커밋으로 고정한다. 패키지의 초기 스크립트와 Provider는 기존 `hyeonse-site-preferences` 저장 키를 사용하며, 얇은 `SitePreferences.tsx` 어댑터가 배지의 `portfolio:preferences` 이벤트를 유지한다.

`npm run audit:design-system`은 `src/`의 CSS에서 원시 색상과 공유 토큰 재정의를 검사한다. 물리 배지 재질과 작업실 그림의 색상만 `design-system.audit.json`에 사용 횟수와 이유를 기록했다. 새 예외를 무조건 추가하지 말고 먼저 역할 토큰으로 표현할 수 있는지 확인한다. 이 검사는 TS·TSX나 3D 재질 값의 전체 검사와는 범위가 다르다.

## 배지 렌더러와 대체 표시

| 파일 | 책임 |
| --- | --- |
| [IdentityBadge.tsx](../src/components/IdentityBadge.tsx) | `Lanyard` 지연 로딩, 포인터·키보드 입력, 초기 배지·위치 측정과 기존 가이드 |
| [Lanyard.tsx](../src/components/Lanyard.tsx) | 카드·끈을 그리는 단일 Three.js 렌더러, 움직임과 상호작용 |
| [badge-artwork.ts](../src/lib/badge-artwork.ts) | DOM 배지와 같은 HS·이름·직무·경력 데이터를 로컬 DM Sans·Noto Sans KR 글꼴로 이미지에 그림 |

`Lanyard.tsx`는 [React Bits Lanyard 원본 리비전](https://github.com/DavidHDev/react-bits/commit/3329f3bde763a37a2a89b24598e9f50fa0d4de3d)의 Three.js 기반 구현을 포트폴리오에 맞춰 적용한 코드다. 원본 코드는 [MIT + Commons Clause 라이선스](../licenses/react-bits-LICENSE.md)에 따라 포트폴리오 앱의 일부로 사용한다.

HTML/CSS 배지는 첫 로딩 중 계속 표시된다. JavaScript가 실행되지 않거나, WebGL 초기화·컨텍스트에 실패하거나, 시스템 또는 사이트에서 움직임 감소를 선택해도 같은 DOM 배지가 표시된다. 데스크톱과 모바일 모두 WebGL 렌더러가 준비되면 드래그와 탭으로 배지를 조작할 수 있다.

키보드는 방향키로 움직이고 Enter로 뒤집으며 Home 또는 Escape로 초기화한다. 안내는 기존 카드 우측 상단 위치를 유지하고 모바일에서는 숨긴다. 단일 렌더러의 `maxDpr`는 데스크톱 1.5, 모바일 1.25이며 `breeze`는 0이다. 움직임이 멎으면 애니메이션 프레임 예약을 멈추고, 배지가 화면 밖에 있거나 문서가 숨겨져 있을 때도 렌더링을 일시 정지한다.

물리 계산의 미세 진동이 정지 판정을 방해할 수 있어, 에너지 조건과 함께 카드 모서리·끈 노드의 위치와 회전 변화도 확인한다. 잡고 있지 않은 배지가 0.6 CSS px 범위에 1.2초 머무르면 다음 프레임을 예약하지 않는다. 새 입력이 들어오면 다시 시작한다.

`badge-artwork.ts`의 공통 그리기 명령으로 `BadgePrint.tsx`의 초기 SVG와 Canvas 인쇄 이미지를 생성한다. 초기 카드의 실제 사각형을 측정해 `cardRect`로 전달하고, 인트로 회전 없이 같은 위치·비율로 첫 프레임을 그린다. 렌더 영역은 화면 너비와 hero의 실제 하단까지 채워, 고정된 배치 영역에서 카드가 잘리지 않도록 한다. 표시 글꼴은 포트폴리오가 로컬로 제공하는 DM Sans와 Noto Sans KR이다. 앞면은 이름·직무를, 뒷면은 짧은 작업 소개와 주요 기술을 그린다. `createBadgeArtwork`의 `face` 인자로 각각 생성한 이미지를 `frontImage`·`backImage`에 전달하며 한국어·영어와 강조색을 함께 반영한다.

끈은 기존 한 줄의 넓적한 끈·금속 클립·고리를 카드 상단의 18%·82% 위치에 하나씩 복제한 두 가닥이다. 각 끈의 너비는 `.144` world이며 양쪽에 원래 크기의 고리와 슬롯을 둔다. 두 끈을 합치는 막대나 추가 인출 줄은 없다. 초기 CSS 배지도 카드 높이의 `.064` 너비와 같은 연결부·슬롯 위치를 사용한다. 두 끈의 경로는 별도로 만들고 카드가 회전하면 각 끝점도 카드 상단을 따라 움직인다. 끈 폭 방향은 곡선의 접선을 따라 연속적으로 옮기고, 대칭인 금속 연결부에서 가장 적게 돌아가는 방향으로 맞춘다. 카드의 누적 회전을 끈에 다시 적용하지 않아 뒤집은 뒤에도 불필요한 꼬임을 남기지 않는다. 끝부분의 고정 경로는 금속 클립 바로 위로 줄였으며, 이동 중에도 끈 폭을 줄이지 않는다. `npm run check:lanyard`로 실제 소스의 정지·회전·접점 지오메트리를 검사한다. 카드와 겹치는 구간은 실제 끈의 두께를 고려해 카드 표면 밖으로 보정한다. 카드 몸체는 측면·베벨만 그리고 앞뒤 인쇄 면과 겹치는 몸체 캡은 제외해, 움직임이 멎을 때 깊이 충돌로 삼각형이 드러나는 것을 방지한다. 흐린 그림자는 회전한 꼭짓점에서 계산해 카드와 끈보다 뒤에 있는 평면에 투영한다. 실시간 그림자 맵이나 별도의 애니메이션 루프는 추가하지 않는다.

## 글꼴 서브셋

한국어 글꼴은 소스에서 추출한 문자를 포함하는 가변 WOFF2다. 문구를 바꾼 뒤 `npm run audit:content`가 누락 문자를 보고하면 서브셋을 다시 생성한다.

```sh
mkdir -p scripts/.font-cache
curl -L --fail 'https://raw.githubusercontent.com/google/fonts/main/ofl/notosanskr/NotoSansKR%5Bwght%5D.ttf' -o scripts/.font-cache/NotoSansKR.ttf
node scripts/subset-fonts.mjs
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run audit:content
```

현재 검사는 `src/`의 TS·TSX·JSON과 공통 디자인 시스템의 React·설정 모듈을 읽으므로 외부 패키지의 한국어 UI와 주석에 추가한 문자도 검사 대상이다. 생성과 검사는 `scripts/font-sources.mjs`에서 같은 문자 소스를 사용한다. 원본 TTF 캐시는 Git·배포 대상에서 제외하며, 일반 빌드는 저장된 서브셋을 사용한다.

## 포트폴리오 인터랙션

- `WorkExplorer`: 서버가 만든 대표 작업 카드에 필터만 적용한다. `work=operations|performance|migration` 쿼리와 뒤로 가기를 동기화하고, 기존 쿼리·언어 전환도 유지한다.
- `CaseNavigator`: 사례 본문의 실제 스크롤 위치를 rAF로 읽어 현재 섹션과 진행률을 표시한다. 모바일은 현재 항목을 가로 목차 안에 유지하며, 키보드 초점이 있는 동안에는 목차를 강제로 이동하지 않는다.
- `EngineeringFlow`: 기존 사례 데이터의 단계를 선택해 읽는다. 전체 단계는 native details로 제공한다.
- `FrontendLab`: CSS 컨테이너 쿼리로 카드 너비별 배치를 바꾸고, 로컬 타이머로 응답 순서와 최신 요청 ID 검증을 비교한다. A/B 지연은 200–1600ms로 조절하며 B는 항상 120ms 뒤 시작한다. 두 응답이 모두 끝나야 완료 상태가 되고 실행 중에는 지연 설정을 잠근다. 외부 서비스 요청이나 실제 성능 측정이 아니다. 타이머는 초기화·언마운트 때 정리한다.
- `ToolchainExplorer`: 소개 페이지에서 Browser Error Log → Error to Test → Flow QA의 입력·출력·검토 과정을 선택해 읽는다. 데이터는 가상 예시이며 실제 도구를 실행하지 않는다. 세 단계 전체는 native details로 읽을 수 있다.
- `PerformanceEvidence`: 기존 성능 사례의 홈페이지 전후 측정과 별도 폰트 실험을 구분한다. 지표별 막대와 정확한 값을 함께 표시하며 전체 표는 실험별 tbody와 측정 조건을 가진다. 수치는 `performance-evidence.ts`에 두며 기존 사례 근거와 일치해야 한다.
- `ArchiveExplorer`: 기존 native details를 감싸 전체 펼침·접기와 열린 개수를 제공한다. 직접 조작과 검색 앵커로 열린 경우도 capture 단계의 toggle 이벤트로 동기화한다.
- `WorkContextLink`: 홈 필터의 허용된 `work` 값만 사례·다음 사례·목록 복귀 링크에 전달한다. 임의의 쿼리를 복사하지 않는다. 서버 HTML/no-JS에서는 전체 목록 링크를 제공한다.

동적 조작은 수화 후 활성화한다. no-JS에서도 본문과 전체 단계는 읽을 수 있다. 신규 실험·개인 프로젝트의 문제/설계/검증 필드도 검색 색인에 포함한다. 문구 변경 뒤 글꼴 서브셋을 갱신하고 `npm run verify`와 관련 화면/동작을 확인한다.

## 사이트 검색 자료

`site-search-index.ts`는 공개 화면에서 사용한 필드만 선택해 한·영 검색 자료를 만든다. `search-index/ko.json`과 `search-index/en.json`은 `force-static` GET 라우트로 출력한다. 전체 profile 객체나 비공개 근거 자료를 색인에 넣지 않는다.

클라이언트에는 순위·정규화·자료 검증을 담당하는 `site-search-engine.ts`만 연결한다. 전체 콘텐츠는 검색창을 처음 열 때 가져오고, 같은 언어의 성공한 응답은 다시 사용한다. `check:search`는 검색 동작을, `audit:content`는 출력된 자료의 언어·개인정보 패턴·실제 내부 경로와 앵커를 검사한다.

검색 버튼은 수화 전 비활성화한다. `SearchTargetReveal`은 검색 및 직접 앵커 이동 시 열린 아카이브의 summary 또는 대상의 제목으로 초점을 옮긴다. 임시 tabindex는 초점이 떠나면 제거하고, 일반 앵커의 스크롤은 브라우저 기본 동작에 맡긴다.

`audit:content`의 공개 정보 검사는 HTML·검색 JSON뿐 아니라 RSC 텍스트, JavaScript, CSS, SVG 등 모든 공개 텍스트 산출물을 검사한다. 환경 파일·개인 키 파일은 출력 자체를 거부한다. 패턴 검사는 알려진 문자열 유형을 찾는 검사이며, 별도의 의존성 취약점 감사와 실제 배포 확인을 대체하지 않는다.

## 배포와 메타데이터 URL

[vercel.json](../vercel.json)은 Other 프리셋(`framework: null`)으로 `out/`을 호스팅한다. 정적 출력 폴더에 Next.js 서버용 manifest를 요구하지 않도록 정적 호스팅 설정을 사용한다.

[metadata.ts](../src/lib/metadata.ts)의 기준 URL 선택 순서는 다음과 같다.

1. `NEXT_PUBLIC_SITE_URL`: 직접 지정한 전체 URL
2. Vercel preview 환경의 `VERCEL_URL`
3. 공개 대표 도메인 `https://hyeonse.dev`

이 기준 URL을 canonical·언어별 alternate·Open Graph·사이트맵 주소에 사용한다. Vercel의 자동 별칭이나 로컬 검증 주소가 공개 대표 주소로 섞이지 않도록 한다. `NEXT_PUBLIC_SITE_URL`은 명시적으로 우선 적용한다.

`sitemap.xml`에는 홈·소개·작업실·대표 사례 4개의 한국어·영어 경로 14개와 언어 대체 링크를 담는다. 404·검색 조건·앵커는 포함하지 않으며 수정일을 임의로 생성하지 않는다. 메타데이터 라우트는 `dynamic = 'force-static'`으로 정적 출력한다.

일반 빌드는 `robots.txt`에서 크롤링을 허용하고 사이트맵을 안내한다. `VERCEL_ENV=preview` 빌드는 모든 페이지에 noindex·nofollow를 넣고 robots에서 전체 경로를 차단하며 사이트맵을 광고하지 않는다. `npm run audit:content`로 정적 산출물의 대표 주소·사이트맵·검색 허용 정책을 함께 검사한다.
