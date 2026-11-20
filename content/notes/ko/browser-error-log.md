---
title: 'Browser Error Log에서 필요한 오류 맥락만 수집하기'
description: '앱이 수집할 맥락을 고르고, 브라우저 전송 큐와 자체 호스팅 저장소의 보관·조회 범위를 제한했어요.'
date: '2026-11-16'
updated: '2026-11-20'
activity:
  label: '공개 릴리스'
  start: '2026-10'
  end: '2026-11-20'
  point: '2026-10-12'
  pointLabel: 'v0.1.5 공개'
tags: ['오류 수집', 'TypeScript', 'SQLite']
projects: ['browser-error-log']
draft: false
---

## 오류 메시지만으로는 부족해서

[Browser Error Log](/about/#browser-error-log)는 브라우저 SDK, 자체 호스팅 수집기, 뷰어로 구성한 도구예요. 오류 메시지만 보면 어느 페이지에서 어떤 일이 먼저 일어났는지 놓치기 쉽습니다. 그렇다고 요청 정보를 전부 모으면 보관하고 보호해야 할 데이터가 늘어나요. 그래서 앱이 필요한 맥락을 고르고, 수집부터 조회까지 직접 운영할 수 있게 했습니다.

SDK는 전역 오류, 처리되지 않은 Promise 거부, 네트워크 실패를 수집해요. 페이지 이동과 네트워크 breadcrumb는 필요할 때만 켭니다. 자동으로 모으는 맥락에는 요청 본문, 헤더, 쿠키를 넣지 않았고, 앱이 URL 정제와 `beforeBreadcrumb`·`beforeSend` 훅으로 더 걸러낼 수 있어요. React Error Boundary 어댑터와 공유 이벤트 계약은 선택해서 쓸 수 있도록 브라우저 SDK와 별도 `@ihyeon` 패키지로 공개했습니다. 사용자 지정 transport로 네트워크 수집을 켤 때 endpoint가 필요하다는 조건도 문서에 적었습니다.

## 브라우저 큐부터 저장소까지

브라우저에서는 전송 큐의 크기와 재시도 횟수에 상한을 뒀어요. Node.js 마이크로 서버로 실행하는 수집기는 SQLite 또는 회전 JSONL에 기록을 저장하고, 보관량과 조회 범위도 제한합니다. 뷰어에서는 프로젝트, 오류 종류, 기간으로 좁혀 스택과 JSON 스냅샷을 살펴볼 수 있어요. 수집량 차트는 들어온 로그 수를 보여줍니다. 사용자 수나 서비스 오류율로 읽을 수 있는 지표는 아니에요.

SQLite를 기본 저장소로 쓰다 보면 다른 분석 도구로 기록을 옮겨야 할 때도 있어요. v0.2.11에서 CLI 내보내기를 추가하면서 저장소 선택과 크기 제한을 명시하고, 원본 DB는 수정하지 않게 했습니다. 보관 기록을 읽기 전용으로 꺼내는 방식이에요. 공개 변경 기록에는 내보내기 뒤 원본 해시를 확인하고 수집기를 재시작한 과정이 남아 있습니다.

## 원본 위치와 이벤트 참조를 다음 작업으로 넘기기

v0.2.21에서는 릴리스별 소스맵을 등록해 압축된 스택의 원본 위치를 확인할 수 있게 했어요. 같은 `app.js`의 오류라도 어느 릴리스인지에 따라 다른 소스 파일로 해석합니다. 공개 뷰어에서 합성 오류를 열어 세 브라우저로 두 릴리스의 위치를 대조했고, 한 릴리스의 맵을 지운 뒤에도 다른 릴리스의 위치가 유지됐어요. 이 검사는 로컬 SQLite 수집기에서 만든 오류를 공개 뷰어에 불러온 결과예요.

v0.2.22에서는 `captureExceptionWithReference`가 수집한 이벤트의 프로젝트와 ID를 돌려주고, React Error Boundary의 `onCapture`도 같은 참조를 전달해요. Protocol 패키지에서 조회용 두 필드만 추출할 수 있습니다. 공개 npm 설치본으로 합성 오류를 한 번 일으켜 React 콜백과 전송 이벤트의 참조가 일치하는지 확인했어요. 이 ID는 전송 이벤트를 찾는 단서이며 서버 저장 확인을 뜻하지 않아요.

## 실제 서비스에 붙이기 전에

공개 저장소에는 패키지, 마이크로 서버, Chromium·WebKit 전송을 로컬에서 확인한 기록이 있어요. SQLite 내보내기는 더 뒤의 v0.2.11 변경 기록에서 확인할 수 있습니다. 이 글을 쓰며 어느 쪽 검사도 다시 실행하지는 않았어요. 재시도에 상한을 둔 만큼 무한 재시도는 피하지만, 모든 오류가 전달된다는 보장은 없습니다.

직접 운영하는 수집기에도 오류 메시지나 앱이 넘긴 값에 개인 정보가 들어갈 수 있어요. URL 정제와 훅만으로 완전한 비식별화를 보장할 수는 없습니다. 어떤 오류를 얼마나 보관할지, 인증과 접근 권한을 어떻게 둘지는 실제 서비스 환경에 맞춰 결정해야 해요.

## 공개 소스

- [고정된 README](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/README.ko.md) · [브라우저 SDK](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/packages/browser/src/index.ts)
- [v0.2.11 릴리스](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11) · [SQLite 내보내기 변경](https://github.com/hyeonse-swing/browser-error-log/commit/62be06359dbb0c706925bb2508ed2cdfcbc37007)
- [v0.2.21 릴리스와 소스맵 예제](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.21) · [v0.2.22 릴리스](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.22)
