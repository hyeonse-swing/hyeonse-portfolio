# Hyeonse Portfolio

Next.js App Router로 만든 한국어·영어 정적 포트폴리오.

[한국어 사이트](https://hyeonse-portfolio.vercel.app/) · [English](https://hyeonse-portfolio.vercel.app/en/)

## 실행

Node.js 22 이상. 저장소 루트에서 실행한다.

```sh
npm ci
NEXT_TELEMETRY_DISABLED=1 npm run dev -- --port 4321
```

개발 서버: `http://127.0.0.1:4321`

```sh
npm run check
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run audit:content
npm run audit:design-system
npm run preview -- 4322
```

- `check`: TypeScript 검사
- `build`: 정적 HTML·CSS·JS를 `out/`에 생성
- `audit:content`: 빌드된 페이지의 내부 링크·메타데이터·콘텐츠와 소스의 글꼴 문자 범위 검사
- `audit:design-system`: 공통 토큰 재정의와 문서화되지 않은 CSS 원시 색상 검사
- `preview`: `out/`을 `http://127.0.0.1:4322`에서 제공. Ctrl+C로 종료

## 구현 구조

| 영역 | 구현 |
| --- | --- |
| 정적 페이지 | `output: 'export'`와 `trailingSlash: true`. Vercel에서 `out/` 호스팅 |
| 다국어 | 한국어 `/`, 영어 `/en/`. 언어별 라우트가 공통 화면에 `locale`을 전달 |
| 콘텐츠 | `getPortfolio(locale)`에서 언어별 데이터를 선택하고 같은 컴포넌트로 렌더링 |
| 화면 설정 | `@hyeonse/design-system`의 토큰·설정 Provider·화면 설정 UI 공유. `<head>`에서 저장값 먼저 적용 |
| 배지 | DOM/CSS 카드, Rapier 물리 계산, Three.js 끈·클립 렌더링을 분리 |
| 모바일 | 700px 이하 또는 coarse pointer에서는 정적 CSS/SVG 배지 표시. 물리·3D 모듈 초기화 생략 |
| 글꼴 | DM Sans와 Noto Sans KR WOFF2 자체 호스팅. 한국어는 소스 문자 기반 서브셋 |

Next.js 16, React 19, TypeScript, CSS Modules를 사용한다. 정확한 의존성 버전은 [package.json](package.json)에 있다.

## 주요 파일

| 파일 | 역할 |
| --- | --- |
| [SiteDocument.tsx](src/components/SiteDocument.tsx) | 언어별 HTML 문서, 공통 헤더·푸터, 초기 설정 스크립트 |
| [localized.ts](src/data/localized.ts) · [locale.ts](src/lib/locale.ts) | 언어별 데이터 선택과 경로 변환 |
| [personal-projects.ts](src/data/personal-projects.ts) · [소개 근거](docs/personal-projects.md) | 홈·소개 페이지에서 공유하는 개인 프로젝트 문구와 공개 소스 확인 기록 |
| [metadata.ts](src/lib/metadata.ts) | 배포 환경별 기준 URL, canonical·언어별 alternate·공유 메타데이터 |
| [공통 디자인 시스템](https://github.com/hyeonse-swing/hyeonse-design-system) · [SitePreferences.tsx](src/components/SitePreferences.tsx) | 공통 토큰·설정 UI와 포트폴리오 배지 이벤트 연결 |
| [IdentityBadge.tsx](src/components/IdentityBadge.tsx) | 입력 처리, 모듈 로딩, 정적·동적 배지 전환 |
| [badge-physics.ts](src/lib/badge-physics.ts) · [BadgeAccessories3D.tsx](src/components/BadgeAccessories3D.tsx) | 물리 시뮬레이션과 3D 렌더링 |
| [audit-content.mjs](scripts/audit-content.mjs) | 정적 산출물과 콘텐츠 검사 |

구현 흐름과 변경 시 주의할 점은 [개발 안내](docs/development.md)에, 색·간격·모서리 기준은 [디자인 시스템](DESIGN_SYSTEM.md)에 정리했다.

글꼴 라이선스: [DM Sans](public/fonts/DM-Sans-LICENSE.txt) · [Noto Sans KR](public/fonts/Noto-Sans-KR-LICENSE.txt)
