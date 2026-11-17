---
title: '화면 설정을 여러 프로젝트에서 일관되게 쓰기'
description: '포트폴리오의 색과 화면 설정을 토큰과 React UI로 분리하면서 첫 화면과 저장된 선택을 맞춘 과정이에요.'
date: '2026-11-16'
activity:
  label: '공개 개발'
  start: '2026-10'
tags: ['디자인 시스템', 'React', 'CSS']
projects: ['hyeonse-design-system']
draft: false
---

## 색상 값을 복사해 쓰다 보면

[Hyeonse Design System](/about/#hyeonse-design-system)은 이 포트폴리오의 색과 화면 설정을 다른 개인 프로젝트에서도 쓰려고 분리한 패키지예요. 색상 값을 화면마다 복사해 두면 테마나 강조색을 바꿀 때 같은 역할의 요소를 일일이 찾아야 해요. 그래서 바탕, 글자, 강조처럼 쓰임에 이름을 붙인 CSS 토큰으로 정리했습니다. 서체와 간격도 같은 방식으로 다룹니다.

토큰과 함께 테마, 강조색, 밀도, 모서리, 움직임 설정을 조절하는 React UI도 제공해요. 각 사이트가 기본값을 정하되 방문자의 유효한 선택이 저장돼 있으면 그 값을 먼저 씁니다. 이 포트폴리오와 Flow QA에 적용한 범위가 공개 자료에 남아 있어요. 두 화면이 같은 모양일 필요는 없고, 색의 역할과 설정 동작을 공유합니다.

v0.2.0에서는 설치한 패키지 버전의 공개 API·토큰·예제를 읽기 전용 `hds` CLI로 조회할 수 있게 했어요. 카탈로그와 사용 문서도 패키지에 담아, 화면에 어떤 설정을 연결할지 찾을 때 같은 버전의 자료를 볼 수 있습니다. [공개 쇼케이스](https://design-system.hyeonse.dev)에서 토큰과 설정을 살펴볼 수 있어요. v0.2.0 당시에는 일반 버튼·입력창·카드가 사용 예시였고, 해당 React 컴포넌트를 패키지에서 내보내지는 않았습니다.

## 첫 화면에서 테마가 바뀌지 않게

React가 실행된 뒤에만 화면 설정을 적용하면 첫 페인트에 잠깐 다른 테마가 보일 수 있어요. 사이트별 기본값을 초기 스크립트와 React Provider 양쪽에 전달한 이유입니다. 저장된 값이 유효하면 그 선택을 우선하고, 기기 테마와 움직임 감소 설정도 반영해요. 다른 탭에서 바꾼 설정은 현재 탭에도 연결합니다.

초기 스크립트와 Provider가 서로 다른 기본값을 쓰면 방문자가 아무것도 바꾸지 않아도 시작하면서 화면이 달라질 수 있어요. 저장된 선택도 무조건 적용하지 않고 유효성을 확인합니다. 첫 화면과 React가 뜬 뒤의 화면이 같은 우선순위를 따르도록 한 거예요.

## 토큰을 우회한 색 찾기

새 화면을 만들거나 기존 화면을 옮길 때는 토큰을 우회한 색이 들어오기 쉬워요. 함께 제공한 CLI로 CSS의 원시 색상과 공유 토큰 재정의를 검사합니다. 이 검사는 CSS만 다루며 TypeScript·JavaScript의 모든 색 사용이나 3D 재질은 살피지 않아요. 화면 제작·이관·리뷰용 재사용 스킬도 제공하지만, 디자인 선택 자체는 사람이 판단해야 합니다.

공개 통합 기록에는 포트폴리오 이관 전후 로컬 Chrome 화면 조건 36개와 설정 복원, 탭 동기화 확인이 적혀 있어요. 이 글을 쓰며 다시 실행한 검사는 아니고, 실제 기기나 운영 배포 환경까지 확인한 기록도 아닙니다. 패키지는 GitHub에서 설치하는 형태로 공개했으며 npm 레지스트리에는 게시하지 않았어요.

새 조회 인터페이스는 별도로 타입·빌드·소비 예제 타입 검사와 17개 테스트, 설치한 패키지의 CLI·카탈로그·예제 확인을 거쳤습니다. 이 검증은 앞서 기록한 36개 화면 확인을 새 버전에서 다시 수행했다는 뜻이 아닙니다.

## 컴포넌트와 레이아웃에도 같은 크기 적용하기

2026년 11월 17일에는 버튼뿐 아니라 입력, 카드, 표, 모달과 레이아웃까지 공통 크기를 적용했어요. `SizeProvider`나 `Stack`, `Grid`에서 `xs`부터 `xl`까지 정하면 안쪽 요소가 같은 크기를 이어받고, 필요한 요소만 따로 지정할 수 있습니다. 모달이나 선택 목록처럼 다른 위치에 렌더링되는 UI도 이 범위를 유지해요.

기본 버튼 높이는 일반 포인터 환경에서 36px로 줄였고, 터치 기기에서는 작은 크기도 최소 44px의 조작 영역을 유지하게 했습니다. 세 브라우저에서 크기와 포털, 좁은 화면 배치를 확인했어요. WebKit의 일부 VoiceOver 초점 가드는 아직 확인이 더 필요해 검증 기록에 남겼습니다. 현재 [쇼케이스와 설치 안내](https://design-system.hyeonse.dev/#start)에서 이 컴포넌트를 사용할 수 있고, [검증 범위](https://design-system.hyeonse.dev/docs/code-freeze.md)도 함께 볼 수 있어요.

## 공개 소스

- [v0.2.0 README](https://github.com/hyeonse-swing/hyeonse-design-system/blob/090e10e066b933c3c9565b4553c4c35ace45eb99/README.md) · [AI 사용 안내](https://github.com/hyeonse-swing/hyeonse-design-system/blob/090e10e066b933c3c9565b4553c4c35ace45eb99/docs/ai.md)
- [이전 화면 설정 구현](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/src/preferences.ts) · [CSS 검사 범위](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/audit.md)
- [이전 포트폴리오 통합 검증 기록](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/verification.md)
