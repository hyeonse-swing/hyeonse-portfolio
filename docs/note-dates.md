# 글 발행일과 활동 시점

확인 기준: 2026-11-16. 노트의 `date: '2026-11-16'`은 글의 발행일이다. 아래 `activity`는 글에서 다룬 작업, 병합, 공개 개발 또는 릴리스의 시점이며 프로젝트 시작일을 뜻하지 않는다. 월·연도만 확인된 항목은 그 정밀도 그대로 기록했다. `ongoing`은 발행 당시 자료의 진행 중 표기를 옮긴 것이며 이후 상태를 새로 확인했다는 뜻은 아니다.

`point`는 기간 안에서 목록에 보여 줄 대표 활동 시점이다. 함께 쓰는 `pointLabel`은 릴리스 버전·작업 시작·참여 종료처럼 그 날짜의 의미를 구분한다. 이후 변경까지 다루는 글의 본문 전체가 그 날짜에 작성되거나 릴리스되었다는 뜻은 아니다. `point`가 없으면 단일 시점·진행 중 기간은 시작 시점, 종료일이 있는 기간은 종료 시점을 사용한다. 날짜가 확인되지 않은 글은 정렬에서 마지막에 둔다.

| 글 | 활동 표기 | 근거 |
| --- | --- | --- |
| `admin-shared-modules` | 작업 기간: 더스윙 재직 중 | [경력 데이터](../src/data/content.json)의 `otherWork` · `swing-admin`; 정확한 시작·종료일은 확인되지 않아 날짜 대신 원문 기간을 사용 |
| `ai-development-practices` | 팀 공유: 2026-09 | [경력 데이터](../src/data/content.json)의 `otherWork` · `ai-development` |
| `bike-operations` | 주요 연동: 2026-06–2026-07; `point`: 2026-07 | [경력 데이터](../src/data/content.json)의 `featuredCases` · `bike-operations`; [글 본문](../content/notes/ko/bike-operations.md)의 월 단위 주요 연동 |
| `browser-error-log` | 공개 릴리스: 2026-10–2026-11; `point`: 2026-10-12 | 확인된 초기 공개 릴리스 [v0.1.5](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.1.5)의 게시일 2026-10-12; 이후 [v0.2.11](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11)까지의 내용도 글에 포함 |
| `customer-webviews` | 작업 기간: 2022–2026; `point`: 2022 | [경력 데이터](../src/data/content.json)의 `otherWork` · `swing-webview`에 적힌 시작 연도; 정확한 월·일은 확인되지 않음 |
| `error-to-test` | 공개 릴리스: 2026-10–2026-11; `point`: 2026-10-13 | 공개 [v0.1.0](https://github.com/hyeonse-swing/error-to-test/releases/tag/v0.1.0)의 게시일 2026-10-13; 이후 [v0.3.0](https://github.com/hyeonse-swing/error-to-test/releases/tag/v0.3.0)까지의 내용도 글에 포함 |
| `flow-qa` | 공개 릴리스: 2026-10–2026-11; `point`: 2026-10-08 | 공개 [v0.1.0-alpha.1](https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.1.0-alpha.1)의 게시일 2026-10-08; 이후 [v0.8.9](https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.8.9)까지의 내용도 글에 포함 |
| `hovershot-window-restoration` | v0.2.2 릴리스: 2026-10-12 | [HoverShot v0.2.2](https://github.com/hyeonse-swing/hovershot-macos/releases/tag/v0.2.2); 이 글의 창 복구 수정 시점이며 앱 전체 개발 시작일은 아님 |
| `hyeonse-design-system` | 공개 개발: 2026-10 | [공개 저장소](https://github.com/hyeonse-swing/hyeonse-design-system) 생성·[고정 소스](https://github.com/hyeonse-swing/hyeonse-design-system/tree/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6) 공개 기록의 월 단위 범위; 작업 착수 시점은 아님 |
| `local-toolchain-updates` | 대상 릴리스: 2026-11-16 | 글에서 다룬 [Browser Error Log v0.2.11](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11), [Error to Test v0.3.0](https://github.com/hyeonse-swing/error-to-test/releases/tag/v0.3.0), [Flow QA v0.8.9](https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.8.9)의 공개 릴리스 날짜 |
| `react-wheel-picker-contribution` | PR 병합: 2025-06-30 | [ncdai/react-wheel-picker PR #54](https://github.com/ncdai/react-wheel-picker/pull/54) |
| `swap-admin-v2` | 주요 릴리스: 2025-12 | [경력 데이터](../src/data/content.json)의 `featuredCases` · `swap-admin-v2`; [글 본문](../content/notes/ko/swap-admin-v2.md) |
| `swing-home-performance` | 개선·측정: 2026-07 | [경력 데이터](../src/data/content.json)의 `featuredCases` · `swing-home-performance`; [로컬 측정 조건](../src/data/performance-evidence.ts) |
| `voice-ai-integration` | 작업 기간: 2026-04–진행 중; `point`: 2026-04 | [경력 데이터](../src/data/content.json)의 `otherWork` · `vox`에 적힌 시작 월; 발행 당시 기록된 진행 상태 |
| `yellow-bus` | 작업 기간: 2024-11–2025-08; `point`: 2025-08 | [경력 데이터](../src/data/content.json)의 `featuredCases` · `yellow-bus`에 적힌 종료 월 |
| `webview-qa-shell` | 공개 개발: 2026-05–2026-10; `point`: 2026-05-15 | 공개 [v0.1.0](https://github.com/hyeonse-swing/webview-qa-shell/releases/tag/v0.1.0)의 게시일 2026-05-15; 이후 [공개 저장소](https://github.com/hyeonse-swing/webview-qa-shell) 및 [고정 소스](https://github.com/hyeonse-swing/webview-qa-shell/tree/bdef461)의 내용도 글에 포함. 공개 이력은 작업 착수 시점이 아님 |
