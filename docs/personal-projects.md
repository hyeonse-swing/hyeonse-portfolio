# 개인 프로젝트 소개 근거

2026-11-07에 각 공개 저장소의 `main`, README·관련 구현·검증 문서, npm 메타데이터와 GitHub 릴리스를 확인했다. 2026-11-16에는 Hyeonse Design System, Flow QA, Browser Error Log, Error to Test의 아래 고정 커밋·릴리스와 검증 기록을 확인했다. 화면의 문구는 [personal-projects.ts](../src/data/personal-projects.ts)의 한·영 데이터로 관리한다. 공개 릴리스 기능과 기록된 로컬 검증을 설명하며, 실제 사용자 수·시간 절감·운영 도입률은 주장하지 않는다. 사이트에서 버전을 언급하는 경우 해당 기능의 시작 버전만 명시한다.

| 프로젝트 | 확인한 공개 소스 | npm / 릴리스 상태 |
| --- | --- | --- |
| Hyeonse Design System | [`090e10e` · v0.2.0](https://github.com/hyeonse-swing/hyeonse-design-system/tree/090e10e066b933c3c9565b4553c4c35ace45eb99) | GitHub 태그에서 설치하는 패키지와 [공개 쇼케이스](https://hyeonse-design-system.vercel.app). npm 레지스트리 게시 제품으로 소개하지 않음 |
| Flow QA | [`413c07c`](https://github.com/hyeonse-swing/flow-qa/tree/413c07c615bc2f3b02ead438e647147be28088a6) | [`@ihyeon/flow-qa` 0.8.9](https://www.npmjs.com/package/@ihyeon/flow-qa/v/0.8.9), [v0.8.9 릴리스](https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.8.9) |
| Browser Error Log | [`62be063`](https://github.com/hyeonse-swing/browser-error-log/tree/62be06359dbb0c706925bb2508ed2cdfcbc37007) | [v0.2.11 릴리스](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11): [`@ihyeon/browser-error-log`](https://www.npmjs.com/package/@ihyeon/browser-error-log/v/0.2.11), [`@ihyeon/browser-error-log-react`](https://www.npmjs.com/package/@ihyeon/browser-error-log-react/v/0.2.11), [`@ihyeon/browser-error-log-protocol`](https://www.npmjs.com/package/@ihyeon/browser-error-log-protocol/v/0.2.11) 모두 0.2.11 |
| Error to Test | [`8fa0651`](https://github.com/hyeonse-swing/error-to-test/tree/8fa0651ea18833206423010e1d71be99537afea6) | [`@ihyeon/error-to-test` 0.3.0](https://www.npmjs.com/package/@ihyeon/error-to-test/v/0.3.0), [v0.3.0 릴리스](https://github.com/hyeonse-swing/error-to-test/releases/tag/v0.3.0) |
| HoverShot | [`93b8f82`](https://github.com/hyeonse-swing/hovershot-macos/tree/93b8f824ec84eb8d1fc32c257e077d3212784273) | [v0.2.2 릴리스](https://github.com/hyeonse-swing/hovershot-macos/releases/tag/v0.2.2)의 macOS 14+ Apple Silicon ZIP. 녹화는 macOS 15+에서 지원. 로컬 개발 서명, Apple 미공증 |

이 표는 각 행의 확인일에 공개된 상태다. Browser Error Log의 무스코프 npm 패키지 3개는 2026-11-07에 `deprecated` 안내를 확인했으므로 화면에는 새 `@ihyeon/*` 주소만 연결했다. 아래의 2026-11-07 설명 중 갱신하지 않은 항목은 당시 고정 커밋에 근거한다.

## Hyeonse Design System

- [v0.2.0 README](https://github.com/hyeonse-swing/hyeonse-design-system/blob/090e10e066b933c3c9565b4553c4c35ace45eb99/README.md), [설정 구현](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/src/preferences.ts): 역할별 CSS 토큰과 React 설정 UI, 첫 페인트 스크립트·Provider에 같은 사이트 기본값 전달, 저장된 유효한 선택 우선.
- [AI 사용 안내](https://github.com/hyeonse-swing/hyeonse-design-system/blob/090e10e066b933c3c9565b4553c4c35ace45eb99/docs/ai.md), [카탈로그 스키마](https://github.com/hyeonse-swing/hyeonse-design-system/blob/090e10e066b933c3c9565b4553c4c35ace45eb99/schemas/catalog.schema.json): 설치 버전의 공개 API·토큰·예제를 읽기 전용 `hds` CLI, 카탈로그와 문서에서 조회한다. 일반 Button·Input·Card React 컴포넌트를 제공한다는 뜻은 아니다. v0.2.0의 별도 `npm run verify` 기록은 타입·빌드·소비 예제 타입 검사·17개 테스트와 설치 패키지의 CLI·카탈로그·예제 확인을 포함한다. 이 포트폴리오 편집자가 그 검사를 재실행한 것은 아니다. [v0.2.0 CI](https://github.com/hyeonse-swing/hyeonse-design-system/actions/runs/43814736366)의 성공과 대상 커밋 일치를 확인했다.
- [CSS 점검 범위](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/audit.md): 원시 CSS 색상과 공유 토큰 재정의 검사. TS·JS·3D 재질 전체를 검사한다고 확대하지 않는다.
- [통합 검증 기록](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/verification.md): 포트폴리오 이관 전후 로컬 Chrome 36개 조건과 화면 설정 복원·탭 동기화 등. 실제 기기·운영 배포 확인이 아니다. Flow QA에 적용한 사실은 공개 [Flow QA README](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/README.ko.md)의 구현·출처에도 적혀 있다.

## Flow QA

- [README](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/README.ko.md), [아키텍처](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/docs/architecture.md): 원본 플로우 해시, 명시적 assertion과 단계 허용 목록, 미확인 질문의 실행 차단. 플로우 계획과 실행을 분리하고 실제 브라우저 실행은 `tester-army/e2e`에 위임한다.
- [케이스 선택 구현](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/src/case-selection.ts), [UI 안내](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/docs/ui.md): 선택 실행, 실패·오류 케이스 재실행 준비, 저장 기록 검색·두 실행 비교, 상세 보고서의 케이스 검색과 시도·증거 탐색. 누락된 케이스와 실패 결과를 구분한다.
- [v0.8.7–0.8.9 검증 기록](https://github.com/hyeonse-swing/flow-qa/blob/413c07c615bc2f3b02ead438e647147be28088a6/docs/releases.md): 두 번 이상 시도한 케이스 필터와 화면에 보이는 케이스 ID 내보내기를 추가했다. 브라우저 저장소 읽기·쓰기 실패 시 현재 탭 적용 상태를 안내하고, 이후 정상 저장·초기화 시 안내가 사라지는 복구를 브라우저 fixture로 확인했다. 2026-11-16 공개 기록상 macOS Node 24.22.1에서 118개 테스트·타입 검사, UI smoke 8개, 패키지 검사와 새 설치 브라우저 케이스 7개를 통과했다. 이번 포트폴리오 편집자가 그 명령을 재실행한 것은 아니다. 실제 브라우저 정책·기기 권한, iOS/Android 기기와 인증된 외부 서비스 결과를 이 검증으로 설명하지 않는다.

## Browser Error Log

- [README](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/README.ko.md), [브라우저 SDK](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/packages/browser/src/index.ts): 기본 오류 수집, 선택적인 페이지 이동·네트워크 breadcrumb, `beforeBreadcrumb`·`beforeSend` 훅과 URL 정제, 큐·재시도 한도. 자동 맥락은 opt-in이며 사용자 지정 transport가 네트워크 수집을 켜려면 endpoint가 필요하다.
- [수집기·뷰어 설명](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/README.ko.md#얻을-수-있는-것): Node 마이크로 서버의 SQLite/회전 JSONL 보관과 조회 제한, 뷰어 필터·스택·JSON 스냅샷. 수집량 차트는 사용자 수나 오류율이 아니다.
- [v0.2.11 릴리스](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11), [SQLite 내보내기 변경](https://github.com/hyeonse-swing/browser-error-log/commit/62be06359dbb0c706925bb2508ed2cdfcbc37007): 2026-11-16 공개된 CLI 내보내기는 저장소 선택과 크기 제한을 명시하며 원본 SQLite 로그를 바꾸지 않는다. 커밋 기록은 내보내기 후 원본 해시와 수집기 재시작 검증을 설명한다. 기존 [검증 명령](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/README.ko.md#다른-실행-경로)의 패키지·마이크로 서버·Chromium/WebKit 전송 검사는 별도의 과거 기록이다. 이번 포트폴리오 편집자가 직접 재실행한 검사는 아니며, 전달 보장·완전한 비식별화·운영 인증 검증도 뜻하지 않는다.

## Error to Test

- [README](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/README.ko.md): Browser Error Log JSON, 수동 오류 메시지, 텍스트, 엄격하게 파싱하는 JSONL 입력. 여러 파일의 원본 바이트 해시와 순서를 보존하고 중복 ID 충돌·부분 입력을 검사한다.
- [원본 지문 구현](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/input-source.ts), [비교 구현](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/comparison.ts): 이전/현재에만 있거나 양쪽에 있는 서명을 구분하고 입력 범위·부분 내보내기 경고를 유지한다. 이전에만 남은 서명은 수정 완료를 뜻하지 않는다.
- [후보·Flow QA 내보내기](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/candidates.ts), [결과 연결](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/results.ts): 사람의 검토가 필요한 질문과 실행 차단 상태, suite 해시·case ID 검사, 오류 묶음별 결과 연결.
- [v0.3.0 릴리스 기록](https://github.com/hyeonse-swing/error-to-test/blob/8fa0651ea18833206423010e1d71be99537afea6/docs/releases.md), [대상별 결과 변경](https://github.com/hyeonse-swing/error-to-test/commit/8fa0651ea18833206423010e1d71be99537afea6): Flow QA의 정규화된 실제 웹·모바일 대상 식별값에서 SHA-256 지문을 만들어 같은 이름의 다른 대상을 구분한다. 대상별 최신 실행 조회·실패 판정에 적용하며, 구형·대상 없는 결과는 읽되 특정 대상 범위에 합치지 않는다. 선택 실행에서 빠진 케이스도 이전 통과로 채우지 않는다. 2026-11-16 공개 로컬 기록은 203개 테스트·타입 검사·빌드와 격리 설치 패키지 검사를 통과했다고 적는다. 2026-10-13의 통제된 Chromium 통합 기록은 별도 과거 검증이며, 이번 포트폴리오 편집자가 검사들을 재실행하거나 실제 서비스·기기에서 확인한 것은 아니다.

## HoverShot

- [README](https://github.com/hyeonse-swing/hovershot-macos/blob/93b8f824ec84eb8d1fc32c257e077d3212784273/README.md), [떠 있는 창 구현](https://github.com/hyeonse-swing/hovershot-macos/blob/93b8f824ec84eb8d1fc32c257e077d3212784273/Apps/HoverShotMac/FloatingShots/FloatingWindowCoordinator.swift): 영역·창·시간 지연 캡처를 다른 앱 위에 띄운다. 투명도·클릭 통과와 창 상태를 사용자가 조절한다. v0.2.2는 전역 화면 좌표를 AppKit 창 생성 뒤 다시 적용해, 여러 모니터에서 캡처 결과와 사용자가 옮긴 창 위치를 보존한다.
- [OCR 구현](https://github.com/hyeonse-swing/hovershot-macos/blob/93b8f824ec84eb8d1fc32c257e077d3212784273/Apps/HoverShotMac/Analysis/TextRecognitionService.swift), [녹화 자르기](https://github.com/hyeonse-swing/hovershot-macos/blob/93b8f824ec84eb8d1fc32c257e077d3212784273/Apps/HoverShotMac/Capture/RecordingTrimExportService.swift), [GIF 내보내기](https://github.com/hyeonse-swing/hovershot-macos/blob/93b8f824ec84eb8d1fc32c257e077d3212784273/Apps/HoverShotMac/Capture/RecordingGIFExportService.swift): 캡처 라이브러리의 OCR 검색·편집·주석·내보내기와 영역·창 녹화의 자르기·GIF 내보내기를 제공한다.
- [v0.2.2 릴리스 기록](https://github.com/hyeonse-swing/hovershot-macos/releases/tag/v0.2.2): 2026-11-16 확인한 공개 기록상 연결된 모니터 3대에서 합성 이미지로 실제 AppKit 창 표시·위치 복원과 25개 회귀 테스트를 확인했다. Release 빌드·서명·ZIP 무결성 검사도 기록됐다. 이번 포트폴리오 편집자가 재실행한 검사는 아니며, 사용자 환경의 실제 캡처·권한 흐름 전체는 검증되지 않았다. 다운로드 ZIP은 로컬 서명으로 패키징한 Apple 미공증 빌드다.
