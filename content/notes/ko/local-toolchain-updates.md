---
title: '오류 수집부터 QA 결과까지, 도구 세 개의 최근 변경'
description: 'Browser Error Log, Error to Test, Flow QA의 공개 릴리스에서 데이터 이동과 결과 해석의 경계를 살펴봅니다.'
date: '2026-11-16'
activity:
  label: '대상 릴리스'
  start: '2026-11-16'
tags: ['오류 수집', 'QA', '로컬 도구']
projects: ['browser-error-log', 'error-to-test', 'flow-qa']
draft: false
---

## 오류 기록이 테스트로 넘어가려면

[Browser Error Log](/about/#personal-projects)가 브라우저 오류를 수집해 자체 호스팅 수집기에 보관하면, Error to Test는 그 기록과 수동 제보를 읽어 회귀 테스트 후보를 만들어요. Flow QA는 검토한 케이스를 브라우저에서 실행하고 결과를 남깁니다. 이 흐름에서 오류 기록만으로 재현 조건이나 올바른 기대 동작을 알아낼 수는 없어요. 사람이 답해야 할 질문을 남기면서, 나중에 어떤 입력과 실행을 근거로 판단했는지 찾을 수 있어야 합니다.

2026년 11월에 공개된 세 릴리스에서 각각 이 연결부를 손봤어요. Browser Error Log에는 SQLite 기록을 꺼내는 경로가 생겼고, Error to Test는 실행 대상을 구분하는 방식을 바꿨습니다. Flow QA에서는 보고서를 찾고 화면 설정 저장 실패를 알아채기 쉬워졌어요. 세 기능은 각각 독립적인 로컬 도구에 들어 있습니다.

## 기록을 옮기고 결과를 연결하기

Browser Error Log 수집기의 기본 저장소는 SQLite예요. CLI 내보내기는 저장소 선택과 크기 제한을 명시하고 원본 DB를 바꾸지 않은 채 로그를 꺼냅니다. 분석 도구가 수집기 DB를 직접 수정할 필요 없이 기록을 받을 수 있는 경로예요. 기존 JSONL 보관 경로와는 별개입니다.

Error to Test가 Flow QA 결과를 원본 오류 묶음에 연결할 때는 표시 이름만 보지 않아요. 서로 다른 웹·모바일 대상이 같은 이름을 쓸 수 있어서예요. 정규화된 실제 대상 식별값으로 만든 SHA-256 지문을 사용해 대상별 최신 실행, 케이스 수, 실패 판정을 구분합니다. 지문이 없는 예전 결과나 대상 정보가 없는 보고서는 읽을 수 있지만 특정 대상의 결과로 합치지 않아요. 선택 실행에서 빠진 케이스도 이전 통과 기록으로 채우지 않습니다.

Flow QA의 상세 보고서에서는 두 번 이상 시도한 케이스를 골라 보고, 현재 필터에 보이는 케이스 ID를 내려받을 수 있어요. 인계용 목록만 좁혀지는 것이고 전체 Markdown·JSON 보고서의 범위는 그대로입니다. 브라우저 저장소를 읽거나 쓸 수 없으면 화면 설정은 현재 탭에 적용하되 저장되지 않았다고 알려줘요. 나중에 저장에 성공하거나 설정을 초기화하면 안내가 사라집니다.

## 공개된 검사와 적용 환경

Flow QA 릴리스 기록에는 로컬 테스트 118개, UI 검사 8개, 새 설치 패키지 검사, 브라우저 케이스 7개 통과가 적혀 있어요. 저장소 실패와 복구는 브라우저 fixture에서 재현했습니다. Error to Test 기록에는 로컬 테스트 203개와 타입 검사·빌드·격리 설치 패키지 검사가 있고, Browser Error Log 변경 기록에는 SQLite 내보내기 뒤 원본 해시 확인과 수집기 재시작이 나옵니다. 모두 공개된 과거 검사이며 이 글을 쓰면서 다시 실행하지는 않았어요.

실제 서비스 인증, 네이티브 기기 실행, 브라우저 정책에 따른 저장소 차단이나 운영 환경의 전달 보장은 이 기록에 포함되지 않아요. 대상 지문은 식별값이지 익명화 수단이 아닙니다. 오류에 담긴 정보와 운영 환경의 권한 설정은 도구를 적용하는 쪽에서 살펴야 해요.

## 공개 소스

- [Browser Error Log v0.2.11 릴리스](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11) · [SQLite 내보내기 변경](https://github.com/hyeonse-swing/browser-error-log/commit/62be06359dbb0c706925bb2508ed2cdfcbc37007)
- [Error to Test v0.3.0 릴리스](https://github.com/hyeonse-swing/error-to-test/releases/tag/v0.3.0) · [고정된 검증 기록](https://github.com/hyeonse-swing/error-to-test/blob/8fa0651ea18833206423010e1d71be99537afea6/docs/releases.md)
- [Flow QA v0.8.9 릴리스](https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.8.9) · [고정된 검증 기록](https://github.com/hyeonse-swing/flow-qa/blob/413c07c615bc2f3b02ead438e647147be28088a6/docs/releases.md)
