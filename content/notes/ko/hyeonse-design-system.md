---
title: '화면 설정을 여러 프로젝트에서 일관되게 쓰기'
description: '포트폴리오의 색과 화면 설정을 토큰과 React UI로 분리하면서 첫 화면과 저장된 선택을 맞춘 과정이에요.'
date: '2026-11-16'
tags: ['디자인 시스템', 'React', 'CSS']
projects: ['hyeonse-design-system']
draft: false
---

## 포트폴리오 밖에서도 같은 언어를 쓰려면

[Hyeonse Design System](/about/#hyeonse-design-system)은 이 포트폴리오에서 사용하던 색과 화면 설정을 다른 개인 프로젝트에서도 쓸 수 있도록 분리한 패키지예요. 화면마다 색상 값을 복사하면 나중에 테마나 강조색을 바꿀 때 같은 의미의 요소를 따로 찾아야 합니다. 바탕, 글자, 강조처럼 쓰임에 이름을 붙인 CSS 토큰을 둔 이유가 여기에 있어요. 색뿐 아니라 서체와 간격도 같은 방식으로 정리했습니다.

패키지는 토큰과 함께 테마, 강조색, 밀도, 모서리, 움직임 설정을 조절하는 React UI를 제공합니다. 사이트가 어떤 기본값을 쓸지는 각 통합 지점에서 정하고, 저장된 방문자의 유효한 선택이 있다면 그 선택을 우선합니다. 이 포트폴리오와 Flow QA에 적용한 범위가 공개 자료에 기록돼 있어요. 모든 화면을 같은 모양으로 강제하기보다, 공통 역할과 설정 동작을 공유하는 구조입니다.

## 첫 페인트와 React가 같은 값을 읽기

화면 설정은 React가 실행된 뒤에만 적용하면 첫 페인트와 실제 설정이 다르게 보일 수 있어요. 그래서 사이트별 기본값을 초기 스크립트와 React Provider 양쪽에 전달합니다. 저장된 값이 유효할 때는 그것을 먼저 사용하고, 기기 테마와 움직임 감소 설정도 반영합니다. 다른 탭에서 설정이 바뀌면 현재 탭의 표시에도 그 변경을 연결해요.

이 선택에서 중요한 것은 설정 UI의 개수가 아니라 값의 우선순위예요. 같은 사이트 기본값을 두 경로에 전달해야 초기 화면과 이후 화면의 기준이 어긋나지 않습니다. 저장된 값은 무조건 신뢰하는 대신 유효한 선택인지 확인합니다. 사용자의 선택을 유지하면서도 새 화면이 예상치 못한 값으로 시작하지 않게 하려는 설계예요.

## 검사 범위를 분명히 하기

함께 제공한 CLI는 CSS의 원시 색상과 공유 토큰 재정의를 검사합니다. 새 화면을 만들거나 기존 화면을 옮길 때 토큰을 우회한 색이 들어오는지 확인할 수 있어요. 공개된 검사 범위는 CSS이며, TypeScript·JavaScript의 모든 색 사용이나 3D 재질까지 검사한다고 해석하면 안 됩니다. 화면 제작·이관·리뷰용 재사용 스킬도 제공하지만, 자동 검사와 사람이 판단할 디자인 선택은 범위가 다릅니다.

공개 통합 기록에는 포트폴리오 이관 전후 로컬 Chrome의 화면 조건 36개와 설정 복원, 탭 동기화 확인이 적혀 있습니다. 이 글을 작성하며 그 검사를 다시 실행한 결과는 아닙니다. 실제 기기와 운영 배포 환경의 동작은 그 기록만으로 확인되지 않아요. 이 패키지는 GitHub에서 설치하는 형태로 공개돼 있으며 npm 레지스트리에 게시된 제품으로 소개하지 않습니다.

## 공개 소스

- [고정된 README](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/README.md)
- [화면 설정 구현](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/src/preferences.ts) · [CSS 검사 범위](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/audit.md)
- [포트폴리오 통합 검증 기록](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/verification.md)
