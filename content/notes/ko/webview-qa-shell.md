---
title: 'iOS·Android 웹뷰를 확인하는 QA Shell'
description: '로컬·스테이지 화면을 네이티브 웹뷰에서 열고 안전 영역과 로그를 살펴보는 공개 도구예요.'
date: '2026-11-16'
activity:
  label: '공개 개발'
  start: '2026-05'
  end: '2026-10'
tags: ['React Native', 'WebView', 'QA 도구']
projects: ['webview-qa-shell']
draft: false
---

## 브라우저 밖에서 화면 보기

웹 브라우저에서 정상인 화면도 앱의 웹뷰에서는 안전 영역이나 뒤로 가기 동작을 따로 확인해야 합니다. [WebView QA Shell](/#archive-webview-qa-shell)은 로컬 또는 스테이지 웹서비스를 iOS WKWebView와 Android WebView에서 열어 보기 위해 공개한 도구예요. 네이티브 셸은 React Native 앱이고, 선택적으로 여는 웹 QA 콘솔은 별도 계층입니다. [공개 README](https://github.com/hyeonse-swing/webview-qa-shell#readme)에 실행 경로와 점검 범위가 적혀 있어요.

셸에서는 화면을 가장자리까지 그리는 `Edge`와 네이티브 안전 영역 안에 두는 `Safe` 모드를 바꿀 수 있어요. 그래서 페이지가 직접 노치·상태 바·하단 제스처 영역을 처리할 때와 셸이 여백을 적용할 때를 구분해 볼 수 있습니다. QA 패널에서는 대상 URL과 이동을 다루고, 웹 콘솔에는 뷰포트·스토리지·로그 확인 기능을 모았습니다. 로컬 대상과 스테이지 URL 모두 입력할 수 있도록 한 것은 개발 중인 화면과 공유된 테스트 화면을 같은 셸에서 살피기 위해서예요.

README에는 타입 검사, 테스트, 빌드, E2E 명령도 안내돼 있습니다. 이 글을 쓰며 해당 명령을 새로 실행하거나 실제 기기에서 검증한 결과는 없어요. 도구가 제공하는 점검 기능을 소개하는 것이며, 모든 iOS·Android 버전이나 운영 서비스에서 동일하게 동작한다는 주장으로 넓히지 않습니다.
