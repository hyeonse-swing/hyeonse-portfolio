---
title: 'HoverShot의 떠 있는 창을 원래 모니터에 놓기'
description: '여러 모니터에서 캡처 결과 창의 위치가 어긋난 문제와 AppKit 창 생성 후 위치를 다시 적용한 수정을 정리합니다.'
date: '2026-11-16'
updated: '2026-11-20'
activity:
  label: '공개 릴리스'
  start: '2026-10-12'
  end: '2026-11-20'
  point: '2026-11-20'
  pointLabel: 'v0.2.3 공개'
tags: ['macOS', 'AppKit', '화면 캡처']
projects: ['hovershot']
draft: false
---

## 캡처한 화면과 결과 창의 위치가 다를 때

[HoverShot](/about/#personal-projects)은 영역·창·시간 지연 캡처를 다른 앱 위에 떠 있는 창으로 보여주는 macOS 메뉴 막대 앱이에요. 캡처 화면에 주석을 달고 OCR로 라이브러리를 검색할 수 있습니다. 영역·창 녹화를 자르거나 GIF로 내보내는 기능도 있어요. 떠 있는 창의 투명도와 클릭 통과 여부는 사용자가 조절하고, 옮긴 위치와 창 상태도 저장합니다.

여러 모니터를 쓸 때는 캡처 결과가 어느 화면에 뜨는지도 중요해요. 캡처한 화면과 다른 모니터에 창이 나타나면 다시 찾아 옮겨야 하니까요. v0.2.1에서는 영역·창 캡처 결과의 대상 위치를 계산했는데도 실제 AppKit 창 생성 과정에서 표시 위치가 달라졌습니다. 공개 v0.2.2 릴리스에서는 이 문제를 고치면서, 사용자가 옮긴 창을 다시 열어도 위치가 유지되는지 같은 경로에서 확인했어요.

## AppKit 창을 만든 뒤 좌표를 다시 적용하기

먼저 전체 화면 좌표계에서 결과 창이 놓일 위치를 정해요. AppKit 패널을 만들고 설정을 마친 뒤 그 전역 좌표를 다시 적용합니다. 패널 생성 중에 AppKit이 위치를 바꿀 수 있어서, 계산한 좌표를 최종 표시 단계에 한 번 더 반영해야 했습니다.

새 캡처 결과는 캡처한 모니터를 기준으로 놓고, 다시 여는 창은 사용자가 저장한 위치를 따라요. 두 경우 모두 패널 생성 뒤 좌표를 적용합니다. 투명도와 클릭 통과 여부는 계속 사용자의 선택으로 남겨뒀어요.

## 세 대의 모니터에서 확인한 것

릴리스 기록에는 수정 전 모니터 3대를 연결한 환경에서 외부 모니터의 실제 AppKit 창 생성·표시 검사가 실패한 재현 과정이 있어요. 수정 뒤에는 세 모니터에 여러 결과 창을 띄워 대상 화면을 유지하는지 확인했습니다. 창을 옮겼다가 다시 표시하는 검사와 기존 회귀 검사를 포함해 테스트 25개를 통과했고, Release 빌드, 앱 서명, ZIP 무결성 검사도 기록돼 있어요.

v0.2.2의 창 표시 검사에는 합성 이미지를 썼어요. 공개 ZIP은 Apple Silicon·macOS 14 이상을 대상으로 하며 녹화에는 macOS 15 이상이 필요해요. 로컬 개발 서명으로 패키징했고 Apple 공증을 받지 않은 빌드라 설치할 때 이 상태를 확인해야 합니다.

## v0.2.3에서 GIF 길이 확인하기

이후 공개한 v0.2.3에서는 GIF 내보내기의 프레임 수를 녹화 길이에 맞추고, 프레임별 시간에 0.01초 단위 반올림 오차가 쌓이지 않게 수정했어요. 합성 MOV 두 개를 GIF로 내보내 각각 0.40초와 0.84초를 유지하는지 검사했고 Swift 테스트 29건을 통과했습니다.

별도 실기기 검사에서는 macOS 26.6.2의 Apple Silicon Mac에서 공개 ZIP을 열어 시험용 창을 캡처하고, 같은 창의 녹화를 재생한 뒤 GIF로 내보냈어요. 원본 영상과 60프레임 GIF의 길이가 모두 9.92초였고 프레임의 색 막대 변화도 확인했습니다. 이 검사는 시험용 창과 이미 허용된 화면 기록 권한으로 진행했어요.

## 공개 소스

- [HoverShot v0.2.2 릴리스와 검증 범위](https://github.com/hyeonse-swing/hovershot-macos/releases/tag/v0.2.2)
- [HoverShot v0.2.3 릴리스](https://github.com/hyeonse-swing/hovershot-macos/releases/tag/v0.2.3)
- [고정 소스의 떠 있는 창 구현](https://github.com/hyeonse-swing/hovershot-macos/blob/93b8f824ec84eb8d1fc32c257e077d3212784273/Apps/HoverShotMac/FloatingShots/FloatingWindowCoordinator.swift)
- [고정 소스의 README](https://github.com/hyeonse-swing/hovershot-macos/blob/93b8f824ec84eb8d1fc32c257e077d3212784273/README.ko.md)
