# 개인 프로젝트 소개 근거

확인일: 2026-10-08. 공개 GitHub 소스·문서와 npm 메타데이터를 확인해 홈과 소개 페이지의 한국어·영어 문구를 작성했다. 실제 사용자 수, 시간 절감, 운영 도입률은 확인하지 않았으므로 성과 수치로 사용하지 않는다.

## Hyeonse Design System

- 확인 커밋: [`38978c6`](https://github.com/hyeonse-swing/hyeonse-design-system/tree/38978c6a86f422fc0e63e919f600bc2dd3451e5c), Git 태그 `v0.1.0`.
- [README](https://github.com/hyeonse-swing/hyeonse-design-system/blob/38978c6a86f422fc0e63e919f600bc2dd3451e5c/README.md): CSS 토큰, 선호 설정 유틸리티, React 설정 UI, 재사용 스킬, CSS 검사 CLI.
- [기초 규칙](https://github.com/hyeonse-swing/hyeonse-design-system/blob/38978c6a86f422fc0e63e919f600bc2dd3451e5c/docs/foundations.md): 테마·강조색·밀도·모서리·움직임 설정.
- 적용 근거: 이 포트폴리오의 [package.json](../package.json)과 Flow QA의 [package.json](https://github.com/hyeonse-swing/flow-qa/blob/f21045c414fbfb1a2334687bd0499d30e1d29d52/package.json), [구현 안내](https://github.com/hyeonse-swing/flow-qa/blob/f21045c414fbfb1a2334687bd0499d30e1d29d52/README.ko.md#구현과-출처).
- 배포 범위: GitHub에서 설치하는 패키지. npm 게시나 범용 React Button/Input 라이브러리로 표현하지 않는다.
- [통합 검증 기록](https://github.com/hyeonse-swing/hyeonse-design-system/blob/38978c6a86f422fc0e63e919f600bc2dd3451e5c/docs/verification.md)은 로컬 화면 비교와 설정 동작 검증이다.

## Flow QA

- 확인 커밋: [`f21045c`](https://github.com/hyeonse-swing/flow-qa/tree/f21045c414fbfb1a2334687bd0499d30e1d29d52).
- [README](https://github.com/hyeonse-swing/flow-qa/blob/f21045c414fbfb1a2334687bd0499d30e1d29d52/README.ko.md): 플로우·케이스 스키마, 모델 연결, 허용된 단계의 컴파일, 실행 조율, 리포트와 로컬 CLI/UI.
- [아키텍처](https://github.com/hyeonse-swing/flow-qa/blob/f21045c414fbfb1a2334687bd0499d30e1d29d52/docs/architecture.md): 검토 가능한 케이스, 원본 해시, 실행별 결과와 증거 연결. 브라우저 엔진은 외부 `tester-army/e2e`를 사용한다.
- 공개 상태: [`@ihyeon/flow-qa`](https://www.npmjs.com/package/@ihyeon/flow-qa)의 `latest`·`alpha` 태그 모두 `0.1.0-alpha.2`. `npm view`로 직접 확인했다.
- [GitHub 알파 릴리스](https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.1.0-alpha.2)와 해당 커밋의 [CI 성공](https://github.com/hyeonse-swing/flow-qa/actions/runs/37747008856)을 확인했다.
- 범위: 로컬 CLI와 루프백 웹 UI를 제공하는 공개 알파. 호스팅 서비스, 팀 공유 서버, 인증된 외부 서비스의 검증 성과로 표현하지 않는다. 로컬 데모 검사와 실제 모델 품질은 별개다.

## Browser Error Log

- 확인 커밋: [`d7d8ace`](https://github.com/hyeonse-swing/browser-error-log/tree/d7d8acebe895e82d7f17c7f6e5b8e810c5495762).
- [README](https://github.com/hyeonse-swing/browser-error-log/blob/d7d8acebe895e82d7f17c7f6e5b8e810c5495762/README.ko.md): 프레임워크 독립 SDK → 공유 이벤트 계약 → Node.js 수집기 또는 자체 백엔드 → React 뷰어.
- [SDK](https://github.com/hyeonse-swing/browser-error-log/blob/d7d8acebe895e82d7f17c7f6e5b8e810c5495762/packages/browser/src/index.ts): 전역 오류, unhandled rejection, fetch/XHR 실패 수집과 큐·배치·재시도 설정.
- [React 어댑터](https://github.com/hyeonse-swing/browser-error-log/blob/d7d8acebe895e82d7f17c7f6e5b8e810c5495762/packages/react/src/index.tsx): Error Boundary와 fallback/reset.
- [수집기](https://github.com/hyeonse-swing/browser-error-log/blob/d7d8acebe895e82d7f17c7f6e5b8e810c5495762/examples/micro-server/src/server.ts)와 [뷰어](https://github.com/hyeonse-swing/browser-error-log/blob/d7d8acebe895e82d7f17c7f6e5b8e810c5495762/apps/viewer/src/Dashboard.tsx): SQLite/JSONL 저장, 필터, 스택·요청 정보, JSON 가져오기·내보내기.
- `npm view`로 확인한 공개 버전: [`browser-error-log`](https://www.npmjs.com/package/browser-error-log) `0.1.1`, [`browser-error-log-react`](https://www.npmjs.com/package/browser-error-log-react) `0.1.0`, [`browser-error-log-protocol`](https://www.npmjs.com/package/browser-error-log-protocol) `0.1.1`. 저장소 문서의 이전 게시 기록과 달라 npm 현재 응답을 기준으로 삼았다. 화면에는 유지보수를 고려해 버전 번호를 고정하지 않았다.
- 범위: npm 패키지와 자체 호스팅 수집기·뷰어. 관리형 SaaS, 전송 보장, 완전한 개인정보 마스킹, 알림·소스맵·세션 리플레이를 제공한다고 표현하지 않는다.

## 편집 위치

문구는 [personal-projects.ts](../src/data/personal-projects.ts)에 언어별로 보관한다. [PersonalProjects.tsx](../src/components/PersonalProjects.tsx)는 홈 요약과 소개 상세에 같은 데이터를 사용한다. 전문 경력 사례 4개와 기존 다른 작업 목록은 유지한다.
