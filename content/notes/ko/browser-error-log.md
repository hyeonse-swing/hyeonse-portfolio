---
title: '브라우저 오류의 수집과 보관을 직접 다루기'
description: 'Browser Error Log에서 맥락 수집을 선택하게 하고, 전송·보관·내보내기의 범위를 제한한 설계예요.'
date: '2026-11-16'
activity:
  label: '공개 릴리스'
  start: '2026-10'
  end: '2026-11'
tags: ['오류 수집', 'TypeScript', 'SQLite']
projects: ['browser-error-log']
draft: false
---

## 오류 앞뒤의 맥락이 필요할 때

[Browser Error Log](/about/#browser-error-log)는 브라우저 SDK, 자체 호스팅 수집기, 뷰어로 이루어진 도구예요. 오류 메시지만 남으면 어느 페이지에서 무슨 일이 먼저 있었는지 파악하기 어렵습니다. 반대로 모든 요청 정보를 모으면 운영자가 보관해야 할 데이터의 범위가 커집니다. 이 도구는 수집 맥락을 앱에서 선택하고, 수집부터 조회까지 직접 운영할 수 있도록 구성했습니다.

SDK는 전역 오류와 처리되지 않은 Promise 거부, 네트워크 실패를 수집합니다. 페이지 이동과 네트워크 breadcrumb는 선택해서 켜는 기능이에요. 요청 본문, 헤더, 쿠키는 이 자동 맥락에 넣지 않고, URL 정제와 `beforeBreadcrumb`·`beforeSend` 훅으로 앱이 추가로 걸러낼 수 있게 했습니다. 선택적 React Error Boundary 어댑터와 공유 이벤트 계약은 브라우저 SDK와 별도 `@ihyeon` 패키지로 공개했어요. 사용자 지정 transport가 네트워크 수집을 켜려면 endpoint가 필요하다는 조건도 공개 문서에 있습니다.

## 큐에서 저장소까지 상한 두기

브라우저에서는 전송 큐와 재시도 횟수를 제한합니다. 수집기는 Node.js 마이크로 서버로 실행하고 SQLite 또는 회전 JSONL에 저장하며 보관량과 조회 범위를 제한합니다. 뷰어에서는 프로젝트, 오류 종류, 기간으로 기록을 좁히고 스택과 JSON 스냅샷을 볼 수 있어요. 화면의 수집량 차트는 들어온 로그의 양을 보여줄 뿐 사용자 수나 서비스 오류율을 뜻하지 않습니다.

SQLite를 기본 저장소로 쓰는 경우에도 기록을 다른 분석 도구로 옮길 길이 필요합니다. v0.2.11의 CLI 내보내기는 저장소 선택과 크기 제한을 명시하고 원본 DB를 수정하지 않도록 만들었습니다. 원본을 직접 가공하는 대신 보관 기록을 읽기 전용으로 꺼내는 경로예요. 공개 변경 기록에는 내보내기 뒤 원본 해시와 수집기 재시작을 확인한 과정이 적혀 있습니다.

## 확인한 것과 운영자가 결정할 것

공개 저장소에는 패키지, 마이크로 서버, Chromium·WebKit 전송에 대한 로컬 검증 기록이 있습니다. SQLite 내보내기 검증은 그보다 뒤의 v0.2.11 변경 기록이고, 이 글을 쓰면서 두 검사를 다시 실행한 결과는 아닙니다. 재시도 상한은 무한 재시도를 피하기 위한 조건이지 모든 오류의 전달 보장이 아니에요.

수집을 직접 운영해도 오류 메시지나 앱이 넘긴 값에 개인 정보가 포함될 수 있습니다. URL 정제와 훅만으로 완전한 비식별화가 증명되지는 않아요. 실제 서비스의 인증, 접근 권한, 보관 정책은 적용하는 환경에서 확인해야 합니다. 이 프로젝트는 어떤 오류를 수집하고 보관할지 결정할 수 있는 도구를 제공하지만, 그 결정을 대신하지는 않습니다.

## 공개 소스

- [고정된 README](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/README.ko.md) · [브라우저 SDK](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/packages/browser/src/index.ts)
- [v0.2.11 릴리스](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11) · [SQLite 내보내기 변경](https://github.com/hyeonse-swing/browser-error-log/commit/62be06359dbb0c706925bb2508ed2cdfcbc37007)
