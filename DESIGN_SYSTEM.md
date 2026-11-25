# 포트폴리오의 디자인 시스템 적용

[Hyeonse Design System](https://github.com/hyeonse-swing/hyeonse-design-system)의 CSS 토큰·화면 설정 UI·설정 로직을 공유한다. 공통 기준은 별도 저장소에서 관리하며, 이 문서는 포트폴리오의 적용과 배지 예외를 기록한다.

현재 구현: Next.js 정적 출력, React, CSS Modules와 전역 CSS. `/studio/`에서 방문자가 설정을 바꿀 수 있다.

## 기본 구성

- 영문: DM Sans. 한국어: Noto Sans KR. 모두 로컬 WOFF2이며 한국어는 공개 소스에서 사용하는 문자로 서브셋한다.
- 기본 화면: 흰 바탕, 짙은 글자, 코발트 강조색. 다크모드는 기기 설정을 따르며 수동 선택도 가능하다.
- 크기: 헤더 안쪽, 본문, 푸터는 HDS `Container`의 `lg` 크기를 공유한다. 최대 너비는 1040px이며 기본 좌우 패딩은 24px다. 상세 본문은 읽기에 맞는 줄 길이를 유지한다. 아래 포트폴리오 크기 역할은 HDS의 sm/md/lg 컨트롤 단계(32/36/40px)와 같은 기준을 사용한다.
- 형태: 부드러운 모서리가 기본이며 카드 20px, 버튼·입력창 12px다. 작업실에서 각진 모서리(카드 0px, 버튼 2px)를 선택할 수 있다.

## 크기 역할

| 역할 | 기준 | 적용 |
| --- | --- | --- |
| 본문 | 16px 내외, 모바일 최소 15px | 사례·노트·소개·작업실의 연속해서 읽는 문장 |
| 메타데이터 | 12px 이상 | 분류·날짜·작은 레이블·표 주석 |
| 기본 컨트롤 | 36px, 13–14px 글자 | 필터·페이지 번호·검색 제안·보조 버튼 |
| 강조 컨트롤 | 40px 이상 | 주요 이동·실습 실행 버튼 |
| 터치 영역 | 가로·세로 각각 최소 44px | 모바일과 coarse pointer의 링크·버튼 |
| 입력창 | 모바일에서 16px 이상 | 검색 입력 등 확대 방지 |

포트폴리오 전용 CSS는 `src/styles/global.css`의 `--portfolio-control-sm/md/lg`, `--portfolio-meta-font`, `--portfolio-body-font`를 사용한다. 방문자 간격 설정의 `--space-factor`는 공통 컨테이너, 섹션과 카드 간격에 적용한다. 글자 크기와 터치 영역은 별도 역할을 사용한다. CSS Modules의 사용자 정의 컨트롤에도 역할 변수를 직접 사용한다.

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
| 움직임 | 기본 / 줄이기 | 포인터 배경, 배지 중력·장력 동작, CSS 전환·스크롤 |

포트폴리오의 모서리 기본값은 `src/lib/site-preferences.ts`에서 정의한다. 첫 HTML·초기 스크립트·Provider와 기본값 복원에 같은 값을 적용한다. 기존에 저장한 유효한 선택은 기본값보다 우선한다.

상단바의 HDS 테마 아이콘과 `Alt+Shift+T`는 기기 설정·밝게·어둡게를 같은 순서로 전환한다. 작업실에서도 테마와 다른 화면 설정을 고를 수 있다.

설정은 `hyeonse-site-preferences` 키에 저장한다. 저장값은 정해진 열거형만 허용한다. 저장소 접근 실패 시 현재 탭에서는 계속 조작할 수 있다. 다른 탭에서의 변경과 기기 테마 변경도 반영한다. 고정된 초기 스크립트가 `<head>`에서 값을 적용해 첫 화면과 수화 이후의 테마 차이를 줄인다. JavaScript가 꺼져 있으면 CSS가 기기의 다크모드를 따른다.

한·영 페이지에서 마우스나 트랙패드를 움직이면 HDS 강조색이 배경에서 포인터를 따라간다. 터치만 쓰는 환경과 시스템 또는 사이트의 움직임 감소 설정에서는 표시하지 않는다.

작업실에서는 3D 카드를 드래그하거나 탭해 뒤집고, 방향키로 움직이며 Enter로 뒤집을 수 있다. 앞면은 이름·직무, 뒷면은 짧은 소개와 주요 기술을 보여준다. Home과 Escape는 원위치로 돌린다.

`IdentityBadge`는 `Lanyard`를 지연 로드한다. [Lanyard.tsx](src/components/Lanyard.tsx)의 단일 Three.js 렌더러가 카드와 상단 양쪽의 금속 연결부에 각각 매달린 두 가닥 넓적한 끈을 그린다. 초기 DOM 배지도 같은 형태를 사용한다. 데스크톱 `maxDpr`는 1.5, 모바일은 1.25다. 바람 설정은 0이고, 움직임이 멎거나 배지가 화면 밖에 있거나 문서가 숨겨지면 렌더러가 멈춘다.

DOM 배지는 처음 로딩할 때와 JavaScript 비활성화, WebGL 오류, 움직임 감소 상태에 표시한다. [badge-artwork.ts](src/lib/badge-artwork.ts)는 같은 HS·이름·직무·경력 데이터를 로컬 DM Sans·Noto Sans KR 글꼴로 카드 이미지에 그린다. Three.js 구현은 [React Bits Lanyard 원본 리비전](https://github.com/DavidHDev/react-bits/commit/3329f3bde763a37a2a89b24598e9f50fa0d4de3d)에서 적용했고, [MIT + Commons Clause 라이선스](licenses/react-bits-LICENSE.md)에 따라 포트폴리오 앱의 일부로 사용한다.

## 구성 파일

- `@hyeonse/design-system/tokens.css`: 색·반경·간격의 기준
- `@hyeonse/design-system/preferences`: 값 검증·기본값·초기 적용 스크립트
- `@hyeonse/design-system/react`와 `components.css`: 전역 Provider·테마 토글·설정 패널
- `@hyeonse/design-system/layout`: 공통 페이지 폭을 정하는 `Container`
- `src/components/SitePreferences.tsx`: 기존 저장 키·배지 이벤트 연결
- `design-system.audit.json`: CSS 재질 색상 예외의 이유와 허용 횟수
- `src/components/IdentityBadge.tsx`, `src/components/IdentityBadge.module.css`: 렌더러 지연 로딩, DOM 배지, 입력·위치 측정·기존 가이드와 배지 표시
- `src/components/Lanyard.tsx`, `src/components/Lanyard.module.css`: 카드·끈을 표시하는 단일 Three.js 렌더러와 동작
- `src/lib/badge-artwork.ts`: DOM 표시와 같은 신원 데이터로 그린 카드 이미지
- `src/components/StudioPage.tsx`: 한국어·영어 공통 설명·조작 화면과 견본
- `src/data/site-copy.ts`, `src/data/content.json`, `src/data/work.ts`: 소개·경력 본문

공개 문구를 바꾸면 `node scripts/subset-fonts.mjs`로 글꼴을 갱신한 뒤 `npm run check`, `npm run build`, `npm run audit:content`, `npm run audit:design-system`를 실행한다. 시각·동작 확인은 로컬 미리보기에서 수행한다.
