# 개인 프로젝트 소개 근거

2026-11-07에 각 공개 저장소의 `main`, README·관련 구현·검증 문서, npm 메타데이터와 GitHub 릴리스를 확인했다. 화면의 문구는 [personal-projects.ts](../src/data/personal-projects.ts)의 한·영 데이터로 관리한다. 공개 릴리스 기능과 기록된 로컬 검증을 설명하며, 실제 사용자 수·시간 절감·운영 도입률은 주장하지 않는다. 버전은 이 근거 문서에만 기록하고 사이트 문구에는 고정하지 않는다.

| 프로젝트 | 확인한 공개 소스 | npm / 릴리스 상태 |
| --- | --- | --- |
| Hyeonse Design System | [`d04bda5`](https://github.com/hyeonse-swing/hyeonse-design-system/tree/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6) | GitHub에서 설치하는 패키지. npm 레지스트리 게시 제품으로 소개하지 않음 |
| Flow QA | [`45aa9dc`](https://github.com/hyeonse-swing/flow-qa/tree/45aa9dce110f9a2b1397b11b14fc2e3a47810d12) | [`@ihyeon/flow-qa` 0.8.1](https://www.npmjs.com/package/@ihyeon/flow-qa/v/0.8.1), [v0.8.1 릴리스](https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.8.1) |
| Browser Error Log | [`413c8d1`](https://github.com/hyeonse-swing/browser-error-log/tree/413c8d1e42532a84a314e6b1003b52f9eb64a091) | [`@ihyeon/browser-error-log` 0.2.1](https://www.npmjs.com/package/@ihyeon/browser-error-log), [`@ihyeon/browser-error-log-react` 0.2.1](https://www.npmjs.com/package/@ihyeon/browser-error-log-react), [`@ihyeon/browser-error-log-protocol` 0.2.0](https://www.npmjs.com/package/@ihyeon/browser-error-log-protocol). GitHub 공개 최신 릴리스 목록은 v0.2.0으로 관찰되어 npm 버전과 동일한 태그라고 쓰지 않음 |
| Error to Test | [`514616f`](https://github.com/hyeonse-swing/error-to-test/tree/514616f3cb7a1c31845b07de6faad26f14b8f935) | [`@ihyeon/error-to-test` 0.2.1](https://www.npmjs.com/package/@ihyeon/error-to-test/v/0.2.1), [v0.2.1 릴리스](https://github.com/hyeonse-swing/error-to-test/releases/tag/v0.2.1) |

이 표는 확인일의 공개 상태다. Browser Error Log의 무스코프 npm 패키지 3개는 `deprecated` 안내를 확인했으므로 화면에는 새 `@ihyeon/*` 주소만 연결했다. Browser Error Log `main`의 자동 릴리스 작업은 조회 시 진행 중이었고, 완료를 단정하지 않는다.

## Hyeonse Design System

- [README](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/README.md), [설정 구현](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/src/preferences.ts): 역할별 CSS 토큰과 React 설정 UI, 첫 페인트 스크립트·Provider에 같은 사이트 기본값 전달, 저장된 유효한 선택 우선.
- [CSS 점검 범위](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/audit.md): 원시 CSS 색상과 공유 토큰 재정의 검사. TS·JS·3D 재질 전체를 검사한다고 확대하지 않는다.
- [통합 검증 기록](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/verification.md): 포트폴리오 이관 전후 로컬 Chrome 36개 조건과 화면 설정 복원·탭 동기화 등. 실제 기기·운영 배포 확인이 아니다. Flow QA에 적용한 사실은 공개 [Flow QA README](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/README.ko.md)의 구현·출처에도 적혀 있다.

## Flow QA

- [README](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/README.ko.md), [아키텍처](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/docs/architecture.md): 원본 플로우 해시, 명시적 assertion과 단계 허용 목록, 미확인 질문의 실행 차단. 플로우 계획과 실행을 분리하고 실제 브라우저 실행은 `tester-army/e2e`에 위임한다.
- [케이스 선택 구현](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/src/case-selection.ts), [UI 안내](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/docs/ui.md): 선택 실행, 실패·오류 케이스 재실행 준비, 저장 기록 검색·두 실행 비교, 상세 보고서의 케이스 검색과 시도·증거 탐색. 누락된 케이스와 실패 결과를 구분한다.
- [v0.8.1 검증 기록](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/docs/releases.md): 공개 기록상 macOS Node 24.22.1에서 118개 테스트·타입·패키지·로컬 Chromium 검사, 새 설치의 브라우저 케이스 7개 통과. 이번 포트폴리오 편집자가 그 명령을 재실행한 것은 아니다. 실제 iOS/Android 기기와 인증된 외부 서비스 결과를 이 검증으로 설명하지 않는다.

## Browser Error Log

- [README](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/README.ko.md), [브라우저 SDK](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/packages/browser/src/index.ts): 기본 오류 수집, 선택적인 페이지 이동·네트워크 breadcrumb, `beforeBreadcrumb`·`beforeSend` 훅과 URL 정제, 큐·재시도 한도. 자동 맥락은 opt-in이며 사용자 지정 transport가 네트워크 수집을 켜려면 endpoint가 필요하다.
- [수집기·뷰어 설명](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/README.ko.md#얻을-수-있는-것): Node 마이크로 서버의 SQLite/회전 JSONL 보관과 조회 제한, 뷰어 필터·스택·JSON 스냅샷. 수집량 차트는 사용자 수나 오류율이 아니다.
- [검증 명령](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/README.ko.md#다른-실행-경로)과 [과거 릴리스 기록](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/docs/ko/releasing.md): 패키지·마이크로 서버·Chromium/WebKit 전송 검사가 기록돼 있다. 이번 확인에서 진행 중이던 최신 자동 릴리스 작업의 성공으로 승격해 쓰지 않는다. 기본 마스킹은 최선형이고 전달 보장·완전한 비식별화·운영 인증 검증은 제공하지 않는다.

## Error to Test

- [README](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/README.ko.md): Browser Error Log JSON, 수동 오류 메시지, 텍스트, 엄격하게 파싱하는 JSONL 입력. 여러 파일의 원본 바이트 해시와 순서를 보존하고 중복 ID 충돌·부분 입력을 검사한다.
- [원본 지문 구현](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/input-source.ts), [비교 구현](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/comparison.ts): 이전/현재에만 있거나 양쪽에 있는 서명을 구분하고 입력 범위·부분 내보내기 경고를 유지한다. 이전에만 남은 서명은 수정 완료를 뜻하지 않는다.
- [후보·Flow QA 내보내기](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/candidates.ts), [결과 연결](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/results.ts): 사람의 검토가 필요한 질문과 실행 차단 상태, suite 해시·case ID 검사, 오류 묶음별 결과 연결.
- [로컬 통합 기록](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/docs/releases.md): 2026-10-13 통제된 로컬 Chromium에서 SDK 오류 → 후보 → Flow QA 보고서 연결과 미확인 후보 차단을 확인했다. 최신 v0.2.1 기능 전체나 실제 서비스·기기 검증을 재수행했다고 주장하지 않는다.
