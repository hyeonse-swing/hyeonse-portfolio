---
title: 'YouTube Music Companion의 재생 제어와 Discord 활동'
description: 'macOS 메뉴 막대에서 설치형 YouTube Music의 재생 정보를 확인하고, 미니 플레이어와 Discord 활동으로 연결한 과정을 정리합니다.'
date: '2026-11-20'
activity:
  label: 'v0.18.0 릴리스'
  start: '2026-11-20'
tags: ['macOS', 'Swift', '음악']
projects: ['yt-music-companion']
draft: false
---

## 설치형 플레이어의 곡을 따라가기

[YouTube Music Companion](/about/#yt-music-companion)은 설치형 YouTube Music과 함께 쓰는 macOS 메뉴 막대 앱이에요. 현재 곡의 제목·아티스트·표지·진행 시간을 미니 플레이어에 보여주고, 화면 가장자리에 붙였다가 닫을 수 있어요. Chrome·Edge·Brave에서 설치 안내를 열고, 설치된 플레이어를 찾아 실행하는 경로도 제공합니다.

헤드셋 재생 버튼이 다른 오디오 앱으로 향할 수 있어서 macOS의 미디어 제어 대상을 살폈어요. 공개 v0.16.3을 실행한 Apple Silicon Mac에서 YouTube Music과 QuickTime을 함께 재생하고 물리 Bluetooth 버튼을 눌렀습니다. 실행 중 `Pause`는 YouTube Music에 전달됐고, Companion을 종료해 우선권을 해제한 뒤에는 QuickTime에 전달됐어요. 두 경우 모두 명령 대상과 플레이어의 실제 상태를 대조했습니다.

## Discord에서 곡과 링크 확인하기

공개 v0.18.0은 Discord 활동에 현재 곡과 앨범 표지를 표시하고, 확인된 YouTube Music 곡 주소를 연결해요. 플레이어 창이 백그라운드에 있을 때도 새 곡 제목과 주소를 읽도록 보완했습니다. Discord 설정에서 주간 곡 수를 켜면 해당 Mac의 현지 월요일부터 현재 아티스트의 서로 다른 곡을 세어 프로필 둘째 줄에 표시해요. 이 옵션의 기본값은 꺼짐이며, 비공개 곡과 수동 활동은 집계에서 제외합니다.

한 Mac의 설치본으로 곡 전환을 진행하면서 별도 Discord 계정에서 제목·표지·듣기 링크와 주간 곡 수를 확인했어요. 백그라운드 전환 뒤 새 곡의 링크가 원본 YouTube Music 창의 영상 ID와 일치했고, 512px 앨범 표지도 로드됐습니다. 공개 ZIP은 검증에 사용한 빌드 30과 파일이 일치했고, Universal 앱의 서명과 arm64·x86_64 실행 파일을 확인했어요. 배포 전 Swift 테스트 225건과 미디어 브리지 검사 14건이 통과했습니다.

곡 주소를 읽으려면 YouTube Music 플레이어 페이지가 열려 있어야 해요. Discord의 활동 노출 위치와 표시 여부는 Discord 설정과 화면에 따라 달라집니다. 공개 macOS 앱은 Apple 미공증 배포본입니다.

- [YouTube Music Companion v0.18.0 공개 릴리스](https://github.com/hyeonse-swing/youtube-music-companion-macos/releases/tag/v0.18.0)
- [공개 저장소와 실행 안내](https://github.com/hyeonse-swing/youtube-music-companion-macos)
