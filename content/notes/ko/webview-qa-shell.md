---
title: 'iOS·Android 웹뷰를 확인하는 QA Shell'
description: '로컬·스테이지 화면을 네이티브 웹뷰에서 열고 안전 영역과 로그를 살펴보는 공개 도구예요.'
date: '2026-11-16'
updated: '2026-11-20'
activity:
  label: '공개 개발'
  start: '2026-05'
  end: '2026-11-20'
  point: '2026-11-20'
  pointLabel: 'v0.1.3 공개'
tags: ['React Native', 'WebView', 'QA 도구']
projects: ['webview-qa-shell']
draft: false
---

## 같은 페이지를 두 가지 안전 영역에서

브라우저에서 확인한 화면을 앱 웹뷰에 띄우면 노치나 상태 바, 하단 제스처 영역을 누가 처리하는지 다시 봐야 해요. [WebView QA Shell](/#archive-webview-qa-shell)은 로컬·스테이지 웹서비스를 iOS WKWebView와 Android WebView에서 열어 보려고 공개한 도구입니다. React Native 앱이 네이티브 셸을 맡고, 필요할 때 여는 웹 QA 콘솔은 별도 계층이에요. 실행 경로와 점검 기능은 [공개 README](https://github.com/hyeonse-swing/webview-qa-shell#readme)에 적혀 있습니다.

셸에서 `Edge`를 선택하면 페이지가 화면 가장자리까지 그려지고, `Safe`를 선택하면 네이티브 안전 영역 안에 놓여요. 페이지가 직접 여백을 처리하는 경우와 셸이 적용하는 경우를 나눠 살필 수 있습니다. 대상 URL과 이동은 QA 패널에서 다루고, 웹 콘솔에서는 뷰포트·스토리지·로그를 확인할 수 있게 했어요. 로컬 대상과 스테이지 URL을 모두 입력할 수 있어 개발 중인 화면과 공유 테스트 화면을 같은 셸에서 열어 볼 수 있습니다. 뒤로 가기 동작도 브라우저 밖에서 확인할 대상이에요.

## 실패한 페이지를 같은 주소로 다시 열기

공개 v0.1.3에서는 페이지를 여는 중 연결이 거절되거나 HTTP 503이 돌아오면 오류 화면에서 `Retry`를 눌러 같은 주소를 다시 열 수 있어요. Android에서는 실패한 URL의 뒤늦은 방문 기록 알림이 오류 화면을 덮어쓰던 문제를 수정했습니다. 웹 콘솔은 QA 보고서나 이벤트 로그의 복사에 실패하면 결과를 알리고 키보드 포커스를 버튼으로 돌려줘요.

공개 소스를 새로 내려받아 iOS 18.6 시뮬레이터와 Android 16 에뮬레이터에서 첫 페이지, `Edge`·`Safe` 전환, 오류 후 같은 URL의 200 응답으로 복구, 보고서의 시스템 붙여넣기를 확인했어요. 두 환경 모두 합성 페이지와 데이터를 썼고, 기기와 호스트 Mac 사이의 클립보드 공유는 껐습니다. 자동화에서는 같은 Flow QA 케이스가 두 플랫폼에서 `Retry`를 눌러 복구하는지도 확인했습니다.

- [WebView QA Shell v0.1.3 릴리스](https://github.com/hyeonse-swing/webview-qa-shell/releases/tag/v0.1.3)
