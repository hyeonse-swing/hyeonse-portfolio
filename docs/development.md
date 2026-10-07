# 개발 안내

[프로젝트 소개로 돌아가기](../README.md)

이 문서의 소스 경로와 명령은 저장소 루트를 기준으로 한다.

## 소스 구성

- Next.js 16.3.8, React 19.3.0, TypeScript 5.9를 사용한다. 스타일은 전역 CSS와 컴포넌트별 CSS Modules로 관리한다.
- `src/data/content.json`은 공개용 경력 데이터, `src/data/work.ts`는 대표 사례의 표시 순서와 시각 주제를 담는다. 내부 근거 문서는 포함하지 않는다.
- `src/data/career.ts`는 추가 프로젝트 10개의 기여·협업 내용, `case-stories.ts`는 대표 사례의 맥락·선택·검증, `engineering.ts`는 실제 코드에서 확인한 기술 설명과 개념 흐름을 관리한다.
- `src/components/HomePage.tsx`는 소개, 대표 사례 네 개, 경력, 추가 경험, 연락처를 배치한다.
- `src/components/AboutPage.tsx`는 역할과 프로젝트 범위, 기술별 경험, 판단 방식과 공개 작업을 소개한다. 기술 설명에서 대표 사례의 `#engineering`으로 바로 이동할 수 있다.
- `src/components/StudioPage.tsx`는 사이트 설명과 테마·강조색·간격·모서리·움직임을 조작하는 작업실이다. 설정은 전체 페이지와 언어에 공통 적용되고 이 브라우저에 저장된다.
- `src/styles/tokens.css`와 [디자인 시스템](../DESIGN_SYSTEM.md)에서 디자인 기준을 관리한다.
- `src/components/WorkPage.tsx`는 각 사례의 문제·역할·선택·기술적 구현·검증·결과·한계를 보여준다. `TechnicalDetails`는 실제 구현을 요약한 흐름과 API·상태·렌더링·갱신 설명을 표시한다.
- 700px 이하 화면 또는 coarse pointer 기기에서는 처음의 CSS/SVG 배지와 끈·클립만 표시한다. 물리·Three.js를 불러오지 않고 드래그·키보드 조작·안내를 끈다. 카드 위에서도 일반 세로 스크롤을 사용할 수 있다. 배지와 공유 이미지의 이니셜은 `HS`다.
- 데스크톱의 `src/components/IdentityBadge.tsx`는 DOM 카드의 CSS 원근 변환과 포인터·키보드 입력, SVG 대체 렌더링을 맡는다. 처음에는 CSS로 크기를 맞춘 정적 끈·클립을 유지하고, 물리 상태와 3D 첫 그리기가 준비되면 함께 전환한다. `src/components/BadgeAccessories3D.tsx`는 Three.js로 입체적인 천 끈·금속 연결부와 부드러운 배경 그림자를 그린다. 클립 금속선은 배지 크기가 바뀔 때만 형상을 다시 만들고, 움직일 때는 관절 자세에 맞춰 고정 형상을 이동·회전한다. 슬롯 구멍이 있는 깊이 형상이 카드 뒤의 부품을 가리며, WebGL 초기화 실패 시에는 움직이는 SVG로 전환한다. 배지 상단은 데스크톱에서 `clamp(348px, calc(33svh + 48px), 448px)`, 모바일에서 `312px`이다. 헤더와 소개·상태·하단 문구는 움직이는 카드와 끈보다 앞에 표시한다.
- `src/lib/badge-physics.ts`는 Rapier 3D로 양쪽 12구간 끈의 스프링·캡슐 충돌과 카드·뒤쪽 벽의 충돌, 걸쇠·고리·연결부의 관절을 계산한다. 카드 슬롯과 클립은 x축 회전 관절로 연결하고 각도 스프링도 그 축에만 적용한다. 관절 접힘 한계는 실제 연결 부품에만 적용된다. 화면 경계나 카드 회전각을 직접 제한하지 않는다. 물리 모듈은 초기 HTML 이후 비동기로 불러오고, 움직임이 멈추면 RAF도 정지한다. Three.js 역시 상태 변화가 있을 때만 다시 그린다. 움직임 줄이기 설정에서는 정적인 드래그·키보드 조작을 유지한다.
- 마우스를 카드 주변 48px 안에서 움직이면 클릭 없이 작은 힘을 준다. 가까울수록 반응하며 커서 이동량을 기준으로 계산한다. 드래그·키보드 조작 중이거나 터치 입력·모션 감소 설정에서는 이 반응을 적용하지 않는다.
- `src/components/ProjectVisual.tsx`는 바이크 운영, 성능 개선, 옐로우버스 운행, SWAP Admin 전환을 서로 다른 설명용 그래픽으로 표현한다.
- `public/fonts/`의 DM Sans와 Noto Sans KR WOFF2는 직접 호스팅한다. 라이선스 원문도 같은 폴더에 있다.
- `public/social.png`는 1200×630 공유 이미지이며, `scripts/social-preview.html`은 원본 레이아웃이다.

공개 연락처와 경력 내용은 `src/data/content.json`에서 관리한다.

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

## Vercel 배포

정식 배포: [한국어](https://hyeonse-portfolio.vercel.app/) · [English](https://hyeonse-portfolio.vercel.app/en/)

이 공개 저장소의 루트가 프로젝트 루트다. `next.config.ts`가 정적 내보내기를 설정한다. `vercel.json`은 Other 프리셋(`framework: null`)으로 완성된 `out/`을 호스팅한다. Next.js 프리셋과 `outputDirectory: "out"`을 함께 지정하면 Vercel 빌더가 정적 폴더에서 Next.js 내부 manifest를 찾으므로 함께 사용하지 않는다. URL 끝의 `/`도 유지한다.

공유 메타데이터에 고정 도메인을 사용하려면 빌드 환경의 `NEXT_PUBLIC_SITE_URL`에 `https://`를 포함한 전체 주소를 설정한다. 이 값이 없으면 프리뷰 메타데이터는 해당 배포의 `VERCEL_URL`을 사용한다. 그 외 환경에서는 `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL` 순서로 사용하며, 모두 없을 때는 로컬 미리보기 주소를 사용한다.
