# 포트폴리오의 디자인 시스템 적용

[Hyeonse Design System](https://github.com/hyeonse-swing/hyeonse-design-system)의 CSS 토큰·화면 설정 UI·설정 로직을 공유한다. 공통 기준은 별도 저장소에서 관리하며, 이 문서는 포트폴리오의 적용과 배지 예외를 기록한다.

현재 구현: Next.js 정적 출력, React, CSS Modules와 전역 CSS. `/studio/`에서 방문자가 설정을 바꿀 수 있다.

## 기본 구성

- 영문: DM Sans. 한국어: Noto Sans KR. 모두 로컬 WOFF2이며 한국어는 공개 소스에서 사용하는 문자로 서브셋한다.
- 기본 화면: 흰 바탕, 짙은 글자, 코발트 강조색. 다크모드는 기기 설정을 따르며 수동 선택도 가능하다.
- 크기: 페이지 좌우 여백 `--gutter`는 22–72px. 큰 이름·제목과 본문 크기를 분리하고, 프로젝트 본문은 최대 830px로 제한한다.
- 형태: 카드 0px, 버튼 2px가 기본. 부드러운 모서리는 각각 20px, 12px다.

## 색 역할

색 정의의 기준은 `@hyeonse/design-system/tokens.css`다. 개별 화면은 원시 색상 대신 역할에 맞는 변수를 사용한다.

| 토큰 | 역할 |
| --- | --- |
| `--paper` | 페이지 바탕 |
| `--surface`, `--surface-raised` | 묶음 영역과 카드 |
| `--ink`, `--muted` | 본문과 보조 설명 |
| `--line` | 구분선 |
| `--accent-solid`, `--on-accent` | 강조 면과 그 위의 글자 |
| `--accent-text` | 현재 테마에서 읽히는 링크·선택 표시 |
| `--about-surface`, `--about-ink`, `--about-muted` | 소개 섹션 |
| `--inverse-surface`, `--inverse-ink` | 반전된 정보 패널 |

강조색은 코발트 `#204cfc`, 포레스트 `#087451`, 코랄 `#b93d20`이다. 다크모드의 강조 글자는 각각 `#9aafff`, `#68dfb1`, `#ffa58e`로 밝게 조정한다. 흰 종이를 표현하는 사원증 안쪽과 금속·끈의 재질 색은 물체 표현을 위해 따로 유지한다.

## 방문자 설정

| 설정 | 선택지 | 실제 적용 |
| --- | --- | --- |
| 테마 | 기기 설정 / 밝게 / 어둡게 | 배경·글자·패널·그림 |
| 강조색 | 코발트 / 포레스트 / 코랄 | 링크·배지·그림·버튼 |
| 간격 | 기본 / 촘촘하게 | 주요 섹션·카드 여백에 `--space-factor` 1 / 0.8 적용 |
| 모서리 | 각지게 / 부드럽게 | 카드·버튼의 공통 반경 |
| 움직임 | 기본 / 줄이기 | 배지 중력·장력 동작과 CSS 전환·스크롤 |

설정은 `hyeonse-site-preferences` 키에 저장한다. 저장값은 정해진 열거형만 허용한다. 저장소 접근 실패 시 현재 탭에서는 계속 조작할 수 있다. 다른 탭에서의 변경과 기기 테마 변경도 반영한다. 고정된 초기 스크립트가 `<head>`에서 값을 적용해 첫 화면과 수화 이후의 테마 차이를 줄인다. JavaScript가 꺼져 있으면 CSS가 기기의 다크모드를 따른다.

데스크톱과 모바일은 같은 배지 조작을 제공한다. 카드를 드래그하거나 탭해 뒤집고, 방향키로 움직이며 Enter로 뒤집을 수 있다. Home과 Escape는 원위치로 돌린다. 기존 우측 상단 드래그 가이드를 유지하고 모바일에서는 숨긴다. 시스템 또는 사이트에서 움직임 감소를 선택하면 CSS 배지를 유지한다.

`IdentityBadge`는 `Lanyard`를 지연 로드한다. [Lanyard.tsx](src/components/Lanyard.tsx)의 단일 Three.js 렌더러가 카드와 굵은 한 가닥 끈을 그린다. 초기 DOM 배지도 같은 형태를 사용한다. 데스크톱 `maxDpr`는 1.5, 모바일은 1.25다. 바람 설정은 0이고, 움직임이 멎거나 배지가 화면 밖에 있거나 문서가 숨겨지면 렌더러가 멈춘다.

DOM 배지는 처음 로딩할 때와 JavaScript 비활성화, WebGL 오류, 움직임 감소 상태에 표시한다. [badge-artwork.ts](src/lib/badge-artwork.ts)는 같은 HS·이름·직무·경력 데이터를 로컬 DM Sans·Noto Sans KR 글꼴로 카드 이미지에 그린다. Three.js 구현은 [React Bits Lanyard 원본 리비전](https://github.com/DavidHDev/react-bits/commit/3329f3bde763a37a2a89b24598e9f50fa0d4de3d)에서 적용했고, [MIT + Commons Clause 라이선스](licenses/react-bits-LICENSE.md)에 따라 포트폴리오 앱의 일부로 사용한다.

## 구성 파일

- `@hyeonse/design-system/tokens.css`: 색·반경·간격의 기준
- `@hyeonse/design-system/preferences`: 값 검증·기본값·초기 적용 스크립트
- `@hyeonse/design-system/react`와 `components.css`: 전역 Provider·테마 토글·설정 패널
- `src/components/SitePreferences.tsx`: 기존 저장 키·배지 이벤트 연결
- `design-system.audit.json`: CSS 재질 색상 예외의 이유와 허용 횟수
- `src/components/IdentityBadge.tsx`, `src/components/IdentityBadge.module.css`: 렌더러 지연 로딩, DOM 배지, 입력·위치 측정·기존 가이드와 배지 표시
- `src/components/Lanyard.tsx`, `src/components/Lanyard.module.css`: 카드·끈을 표시하는 단일 Three.js 렌더러와 동작
- `src/lib/badge-artwork.ts`: DOM 표시와 같은 신원 데이터로 그린 카드 이미지
- `src/components/StudioPage.tsx`: 한국어·영어 공통 설명·조작 화면과 견본
- `src/data/site-copy.ts`, `src/data/content.json`, `src/data/work.ts`: 소개·경력 본문

공개 문구를 바꾸면 `node scripts/subset-fonts.mjs`로 글꼴을 갱신한 뒤 `npm run check`, `npm run build`, `npm run audit:content`, `npm run audit:design-system`를 실행한다. 시각·동작 확인은 로컬 미리보기에서 수행한다.
