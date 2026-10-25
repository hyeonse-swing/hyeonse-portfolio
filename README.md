# Hyeonse Portfolio

Next.js App Router로 만든 한국어·영어 정적 포트폴리오.

[한국어 사이트](https://hyeonse-portfolio.vercel.app/) · [English](https://hyeonse-portfolio.vercel.app/en/)

## 실행

Node.js 24 LTS의 24.22.1 이상을 사용한다. `.nvmrc`는 검증한 버전인 24.22.1을 지정하며, `package.json`의 `engines.node`는 24.x의 후속 패치를 허용한다. 저장소 루트에서 실행한다.

```sh
nvm install
nvm use
npm ci
NEXT_TELEMETRY_DISABLED=1 npm run dev -- --port 4321
```

nvm을 사용하지 않으면 Node.js 24.22.1 이상의 24.x를 직접 설치한다. 기준 버전은 [2026-10-21 Node.js 보안 업데이트](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)의 TLS·DNS·Brotli 수정이 포함된 릴리스다. 이 프로젝트는 정적 출력이므로 Node.js는 로컬 개발과 빌드에 사용한다. Vercel은 24.x 안의 패치를 자동 관리하므로 배포 환경의 실제 버전은 빌드 로그로 확인한다.

개발 서버: `http://127.0.0.1:4321`

```sh
NEXT_TELEMETRY_DISABLED=1 npm run verify
npm run preview -- 4322
```

- `verify`: 타입·배지 회귀·정적 빌드·콘텐츠·디자인 시스템 검사를 순서대로 실행. GitHub CI와 Vercel 배포에서 공통 사용
- `check`: Next.js 라우트 타입을 생성한 뒤 TypeScript 검사
- `check:lanyard`: 실제 배지 소스에서 끈·클립 지오메트리를 추출해 정지·회전·접점 회귀 검사
- `build`: 정적 HTML·CSS·JS를 `out/`에 생성
- `audit:content`: 빌드된 페이지의 내부 링크·메타데이터·콘텐츠와 소스의 글꼴 문자 범위 검사
- `audit:design-system`: 공통 토큰 재정의와 문서화되지 않은 CSS 원시 색상 검사
- `preview`: `out/`을 `http://127.0.0.1:4322`에서 제공. Ctrl+C로 종료

## 보안 업데이트와 자동 검사

Next.js 16.4.2와 React·React DOM 19.3.1을 사용한다. [2026-10-14 Next.js 보안 업데이트](https://nextjs.org/blog/nextjs-security-update-october-14-2026)가 포함된 버전이며, 의존성 설치는 잠금 파일을 사용하는 `npm ci`를 기준으로 한다.

GitHub Actions의 `CI`는 main 푸시·main 대상 PR·수동 실행·주간 일정에서 `verify`와 `security-audit`를 실행한다. 보안 감사는 고위험 이상 취약점이나 레지스트리 오류가 있으면 실패한다. 감사 실패가 코드 검증을 생략하지 않도록 두 작업을 분리했다. Dependabot은 npm·GitHub Actions 의존성을 매주 확인하고 minor·patch 업데이트를 묶어 PR을 만든다. 보안 수정 PR은 자동으로 병합하지 않는다.

TypeScript는 배지 회귀 검사의 `transpileModule` 등 JavaScript 컴파일러 API가 필요해 검증한 5.9 계열을 유지한다. [TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)은 해당 API를 제공하지 않으므로 검증 도구의 이전을 먼저 확인해야 한다. `@types/node`는 실제 실행 환경과 같은 24 계열을 사용한다. 두 패키지의 일반 버전 업데이트에서는 major 전환을 제외하고, 같은 major의 minor·patch 업데이트와 취약점 검사는 계속 수행한다. 보안 수정 PR은 이 제외 규칙의 대상이 아니며, major 전환이 필요하면 컴파일러 API·실행 환경의 호환성을 함께 검토한다.

Vercel 빌드 명령은 `npm run verify`다. 타입·배지·콘텐츠 검사 중 하나라도 실패하면 새 배포가 진행되지 않는다. GitHub의 보안 감사 작업은 별도로 실행되며, 이 저장소에 PR 강제·필수 상태 검사나 Vercel Deployment Checks를 추가 설정한 것은 아니다.

## 구현 구조

| 영역 | 구현 |
| --- | --- |
| 정적 페이지 | `output: 'export'`와 `trailingSlash: true`. Vercel에서 `out/` 호스팅 |
| 다국어 | 한국어 `/`, 영어 `/en/`. 언어별 라우트가 공통 화면에 `locale`을 전달 |
| 콘텐츠 | `getPortfolio(locale)`에서 언어별 데이터를 선택하고 같은 컴포넌트로 렌더링 |
| 화면 설정 | `@hyeonse/design-system`의 토큰·설정 Provider·화면 설정 UI 공유. `<head>`에서 저장값 먼저 적용 |
| 배지 | `IdentityBadge`가 `Lanyard`를 지연 로드하고, 하나의 Three.js 렌더러가 카드와 상단 양쪽의 금속 연결부에 각각 매달린 두 가닥 넓적한 끈을 표시. 앞면은 이름·직무, 뒷면은 소개·주요 기술. 준비 중·WebGL 실패·JavaScript 비활성화·움직임 감소에서는 DOM 배지를 표시 |
| 배지 조작 | 데스크톱·모바일에서 드래그하거나 탭해 뒤집기. 방향키 이동, Enter 뒤집기, Home·Escape 초기화. 기존 우측 상단 드래그 가이드 유지 |
| 배지 렌더링 | 데스크톱 `maxDpr` 1.5, 모바일 1.25, `breeze` 0. 정지·화면 밖·문서 숨김 상태에서 애니메이션을 멈춤 |
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
| [IdentityBadge.tsx](src/components/IdentityBadge.tsx) | 지연 로딩, 입력 처리와 DOM 대체 배지 |
| [Lanyard.tsx](src/components/Lanyard.tsx) | 하나의 Three.js 렌더러와 배지 동작. [React Bits 원본 리비전](https://github.com/DavidHDev/react-bits/commit/3329f3bde763a37a2a89b24598e9f50fa0d4de3d)에서 적용한 코드이며 [라이선스](licenses/react-bits-LICENSE.md)는 MIT + Commons Clause로, 포트폴리오 앱의 일부로 사용 |
| [badge-artwork.ts](src/lib/badge-artwork.ts) | 같은 그리기 명령으로 초기 SVG와 Canvas 인쇄 이미지를 생성 |
| [audit-content.mjs](scripts/audit-content.mjs) | 정적 산출물과 콘텐츠 검사 |

구현 흐름과 변경 시 주의할 점은 [개발 안내](docs/development.md)에, 색·간격·모서리 기준은 [디자인 시스템](DESIGN_SYSTEM.md)에 정리했다.

글꼴 라이선스: [DM Sans](public/fonts/DM-Sans-LICENSE.txt) · [Noto Sans KR](public/fonts/Noto-Sans-KR-LICENSE.txt)
