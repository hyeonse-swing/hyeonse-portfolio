---
title: 'iOS·Android 웹뷰를 확인하는 QA Shell'
description: '로컬·스테이지 화면을 네이티브 웹뷰에서 열고 안전 영역과 로그를 살펴보는 공개 도구예요.'
date: '2026-11-16'
activity:
  label: '공개 개발'
  start: '2026-05'
  end: '2026-10'
  point: '2026-05-15'
  pointLabel: 'v0.1.0 공개'
tags: ['React Native', 'WebView', 'QA 도구']
projects: ['webview-qa-shell']
draft: false
---

## 같은 페이지를 두 가지 안전 영역에서

브라우저에서 확인한 화면을 앱 웹뷰에 띄우면 노치나 상태 바, 하단 제스처 영역을 누가 처리하는지 다시 봐야 해요. [WebView QA Shell](/#archive-webview-qa-shell)은 로컬·스테이지 웹서비스를 iOS WKWebView와 Android WebView에서 열어 보려고 공개한 도구입니다. React Native 앱이 네이티브 셸을 맡고, 필요할 때 여는 웹 QA 콘솔은 별도 계층이에요. 실행 경로와 점검 기능은 [공개 README](https://github.com/hyeonse-swing/webview-qa-shell#readme)에 적혀 있습니다.

셸에서 `Edge`를 선택하면 페이지가 화면 가장자리까지 그려지고, `Safe`를 선택하면 네이티브 안전 영역 안에 놓여요. 페이지가 직접 여백을 처리하는 경우와 셸이 적용하는 경우를 나눠 살필 수 있습니다. 대상 URL과 이동은 QA 패널에서 다루고, 웹 콘솔에서는 뷰포트·스토리지·로그를 확인할 수 있게 했어요. 로컬 대상과 스테이지 URL을 모두 입력할 수 있어 개발 중인 화면과 공유 테스트 화면을 같은 셸에서 열어 볼 수 있습니다. 뒤로 가기 동작도 브라우저 밖에서 확인할 대상이에요.

README에는 타입 검사, 테스트, 빌드, E2E 명령이 안내돼 있어요. 이 글을 위해 명령을 다시 실행하거나 실제 기기에서 새로 검증하지는 않았고, 모든 iOS·Android 버전이나 운영 서비스에서 같은 결과가 나오는지도 확인하지 않았어요.
