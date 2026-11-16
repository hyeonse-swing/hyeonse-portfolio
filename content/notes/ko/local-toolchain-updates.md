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

## 세 도구가 만나는 지점

[Browser Error Log](/about/#personal-projects)는 브라우저 오류를 수집하고 자체 호스팅 수집기에 보관합니다. Error to Test는 그 오류와 수동 제보를 읽어 회귀 테스트 후보를 만들고, Flow QA는 검토된 케이스를 브라우저에서 실행해 결과를 남깁니다. 이 순서를 연결하더라도 오류 기록만으로 재현 조건이나 올바른 기대 동작이 정해지지는 않습니다. 사람이 확인해야 할 질문을 남기고, 어떤 입력과 실행에서 나온 판단인지 추적할 수 있어야 합니다.

2026년 11월 공개된 세 릴리스는 이 흐름의 서로 다른 경계를 다룹니다. Browser Error Log는 SQLite 보관 기록을 다른 도구로 옮기는 경로를, Error to Test는 실행 대상을 구분해 결과를 읽는 기준을, Flow QA는 보고서 탐색과 화면 설정 저장 실패 안내를 보완했습니다. 각 기능은 독립적인 로컬 도구에 들어 있으며, 이 글은 공개 소스와 릴리스 기록에서 확인한 범위를 정리한 것입니다.

## 내보내기와 결과 범위

Browser Error Log의 SQLite 내보내기는 수집기의 기본 저장 방식에 있던 로그를 CLI로 옮길 수 있게 합니다. 저장소 선택과 크기 제한을 명시하고, 내보내는 동안 원본을 변경하지 않도록 설계했습니다. 이 경로는 오류 분석 도구에 데이터를 전달할 때 수집기 데이터베이스를 직접 수정할 필요를 줄입니다. JSONL 보관과 별개로 SQLite의 읽기 전용 이동 경로를 마련한 변경입니다.

Error to Test는 Flow QA 결과를 원본 오류 묶음에 연결할 때 대상의 이름만으로 이력을 구분하지 않습니다. 같은 이름을 쓰는 서로 다른 웹·모바일 대상이 있을 수 있기 때문입니다. 정규화된 실제 대상 식별값에서 만든 SHA-256 지문으로 특정 대상의 최신 실행과 케이스 수, 실패 판정을 조회합니다. 지문이 없는 예전 결과나 대상 정보가 없는 보고서는 읽을 수 있지만 특정 대상의 결과로 합치지 않습니다. 선택 실행에서 빠진 케이스 역시 이전 실행의 통과로 채우지 않습니다. 따라서 보고서를 읽는 사람은 성공·실패와 함께 대상과 실행 범위를 확인할 수 있습니다.

Flow QA의 상세 보고서는 두 번 이상 시도한 케이스만 골라 보고, 화면에 보이는 케이스 ID 목록을 내려받을 수 있습니다. 이 목록은 현재 필터에 맞춘 인계 자료이며 전체 Markdown·JSON 보고서의 범위를 바꾸지 않습니다. 브라우저 저장소를 읽거나 쓸 수 없을 때 화면 설정은 현재 탭에 적용되지만 저장되지 않았다고 안내합니다. 이후 정상적으로 저장하거나 설정을 초기화하면 안내가 사라집니다.

## 공개 기록이 확인한 범위

Flow QA 릴리스 기록은 로컬 테스트 118개, UI 검사 8개, 새 설치 패키지 검사와 브라우저 케이스 7개 통과를 적고 있습니다. 저장소 실패와 복구는 브라우저 fixture에서 재현했습니다. Error to Test 기록은 로컬 테스트 203개와 타입 검사·빌드·격리 설치 패키지 검사를 적습니다. Browser Error Log의 변경 기록은 SQLite 내보내기 뒤 원본 해시와 수집기 재시작을 확인했다고 설명합니다. 이 수치는 각 프로젝트의 공개 기록에 적힌 검증이며, 이 글을 작성하면서 같은 검사를 다시 실행한 결과가 아닙니다.

실제 서비스 인증, 네이티브 기기 실행, 브라우저 정책으로 인한 저장소 차단, 운영 환경의 전달 보장은 이 기록만으로 확인할 수 없습니다. 특히 대상 지문은 식별을 위한 값이지 익명화 수단이 아닙니다. 오류에 담길 수 있는 정보와 운영 환경의 권한 설정은 도구를 적용하는 쪽에서 별도로 검토해야 합니다.

## 공개 소스

- [Browser Error Log v0.2.11 릴리스](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11) · [SQLite 내보내기 변경](https://github.com/hyeonse-swing/browser-error-log/commit/62be06359dbb0c706925bb2508ed2cdfcbc37007)
- [Error to Test v0.3.0 릴리스](https://github.com/hyeonse-swing/error-to-test/releases/tag/v0.3.0) · [고정된 검증 기록](https://github.com/hyeonse-swing/error-to-test/blob/8fa0651ea18833206423010e1d71be99537afea6/docs/releases.md)
- [Flow QA v0.8.9 릴리스](https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.8.9) · [고정된 검증 기록](https://github.com/hyeonse-swing/flow-qa/blob/413c07c615bc2f3b02ead438e647147be28088a6/docs/releases.md)
