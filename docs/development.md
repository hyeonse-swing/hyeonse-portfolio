# 구현 메모

[README](../README.md)

명령과 코드 안의 경로는 저장소 루트를 기준으로 한다.

## 정적 출력과 언어별 문서

[next.config.ts](../next.config.ts)의 `output: 'export'`로 각 경로의 HTML을 빌드할 때 생성한다. `trailingSlash: true`이므로 `/about/`은 `out/about/index.html`로 출력된다.

한국어 라우트는 `src/app/(ko)/`, 영어 라우트는 `src/app/en/`에 있다. 각 루트 레이아웃이 [SiteDocument](../src/components/SiteDocument.tsx)에 `locale`을 전달해 서버 HTML의 `lang`을 결정한다. 공통 404는 `globalNotFound` 옵션과 `src/app/global-not-found.tsx`로 구성한다.

페이지는 [getPortfolio(locale)](../src/data/localized.ts)로 데이터를 가져와 공통 화면 컴포넌트에 전달한다. 한국어와 영어의 프로젝트 ID를 같게 유지하며, `scripts/audit-content.mjs`에서 대응 여부를 검사한다.

[LanguageSwitcher](../src/components/LanguageSwitcher.tsx)는 현재 경로에서 언어 접두어만 바꾼다. 클라이언트가 실행된 뒤에는 쿼리와 해시도 덧붙인다. 언어는 URL로 결정하며 브라우저 언어에 따른 자동 이동은 하지 않는다.

## 첫 화면의 테마 적용

[공통 preferences 모듈](https://github.com/hyeonse-swing/hyeonse-design-system/blob/main/src/preferences.ts)는 설정값의 허용 목록과 기본값을 정의한다. localStorage의 값은 파싱한 뒤 허용 목록과 대조하고, 잘못된 값은 기본값으로 대체한다.

저장된 테마를 React 초기화 이후에만 적용하면 첫 화면과 초기화 후의 색이 달라질 수 있다. 그래서 `SiteDocument`가 `<head>`에 고정된 `preferenceScript`를 넣고, 먼저 `<html>`의 `data-*` 속성을 설정한다. 저장된 문자열을 HTML에 삽입하지 않고 허용된 값만 속성에 반영한다.

이후 [공통 PreferencesProvider](https://github.com/hyeonse-swing/hyeonse-design-system/blob/main/src/react.tsx)가 설정 변경, 기기 테마·움직임 설정, 다른 탭의 `storage` 이벤트를 처리한다. 시스템의 `prefers-reduced-motion`이 사용자 설정보다 우선한다. localStorage를 사용할 수 없어도 현재 탭의 설정은 바꿀 수 있다.

## 공통 디자인 시스템

색·다크모드·강조색·기본 글꼴·gutter와 설정 UI는 별도 [Hyeonse Design System](https://github.com/hyeonse-swing/hyeonse-design-system)에서 가져온다. 의존성은 GitHub의 특정 커밋으로 고정한다. 패키지의 초기 스크립트와 Provider는 기존 `hyeonse-site-preferences` 저장 키를 사용하며, 얇은 `SitePreferences.tsx` 어댑터가 배지의 `portfolio:preferences` 이벤트를 유지한다.

`npm run audit:design-system`은 `src/`의 CSS에서 원시 색상과 공유 토큰 재정의를 검사한다. 물리 배지 재질과 작업실 그림의 색상만 `design-system.audit.json`에 사용 횟수와 이유를 기록했다. 새 예외를 무조건 추가하지 말고 먼저 역할 토큰으로 표현할 수 있는지 확인한다. 이 검사는 TS·TSX나 3D 재질 값의 전체 검사와는 범위가 다르다.

## 배지의 입력·물리·렌더링 분리

| 파일 | 책임 |
| --- | --- |
| [IdentityBadge.tsx](../src/components/IdentityBadge.tsx) | DOM 카드, 포인터·키보드 입력, 상태 전환, SVG 대체 표시 |
| [badge-physics.ts](../src/lib/badge-physics.ts) | Rapier의 끈·카드·연결부와 관절 계산 |
| [BadgeAccessories3D.tsx](../src/components/BadgeAccessories3D.tsx) | Three.js 끈·금속 연결부·그림자 렌더링 |

처음에는 CSS/SVG 배지를 표시한다. 데스크톱에서 물리 상태와 3D의 첫 그리기가 준비되면 동적 표시로 전환한다. WebGL 초기화에 실패하면 SVG 표시를 사용한다.

700px 이하 화면 또는 coarse pointer 기기에서는 정적 표시를 유지한다. 물리·3D 모듈을 초기화하지 않으며 카드 위의 터치도 일반 페이지 스크롤로 처리한다.

물리 루프는 카드를 잡고 있지 않고 `isSettled()`가 참이면 다음 RAF를 예약하지 않는다. 입력이 들어오면 다시 시작한다. Three.js도 상태가 바뀔 때만 그린다. 움직임 줄이기에서는 관성 애니메이션 대신 정적인 드래그·키보드 조작을 사용한다.

클립의 금속 형상은 크기 변경 시 생성하고, 매 프레임에는 위치와 회전만 바꾼다. 카드 슬롯과 클립은 x축 회전 관절로 연결한다. 카드와 클립의 서로 다른 회전을 정점에 섞어 적용하면 연결부가 휘어 보일 수 있어 형상과 자세 계산을 분리했다.

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

## 배포와 메타데이터 URL

[vercel.json](../vercel.json)은 Other 프리셋(`framework: null`)으로 `out/`을 호스팅한다. 정적 출력 폴더에 Next.js 서버용 manifest를 요구하지 않도록 정적 호스팅 설정을 사용한다.

[metadata.ts](../src/lib/metadata.ts)의 기준 URL 선택 순서는 다음과 같다.

1. `NEXT_PUBLIC_SITE_URL`: 직접 지정한 전체 URL
2. Vercel preview 환경의 `VERCEL_URL`
3. `VERCEL_PROJECT_PRODUCTION_URL`
4. `VERCEL_URL`
5. 로컬 미리보기 주소 `http://127.0.0.1:4322`

이 기준 URL을 canonical·언어별 alternate·Open Graph 주소에 사용한다. 프리뷰에서는 프리뷰 도메인을 우선해 공유 링크가 프로덕션을 가리키지 않도록 한다. `NEXT_PUBLIC_SITE_URL`을 지정하면 이 자동 선택보다 우선한다.
