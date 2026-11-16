---
title: '동적으로 바뀌는 옵션에 선택 위치 맞추기'
description: 'react-wheel-picker에서 옵션 변경 후 선택 위치가 남던 문제를 수정한 작은 오픈소스 기여예요.'
date: '2026-11-16'
activity:
  label: 'PR 병합'
  start: '2025-06-30'
tags: ['오픈소스', 'React', '버그 수정']
projects: ['opensource']
draft: false
---

## 옵션 목록이 바뀌었을 때

휠 피커에서 선택 값은 그대로인데 옵션 목록이 바뀌면, 그 값이 놓일 위치는 달라질 수 있어요. `react-wheel-picker`에서는 이런 경우 선택 위치가 이전 인덱스에 남는 문제가 있었습니다. 수정 내역은 [공개 기여 기록](/#archive-opensource)과 [병합된 PR #54](https://github.com/ncdai/react-wheel-picker/pull/54)에서 볼 수 있어요.

수정한 곳은 `selectByValue(value)`를 호출하는 `useEffect`의 의존성 배열 한 줄이에요. 기존 `value`, `valueProp`에 `options`를 추가했습니다. 값이 같아도 옵션 목록이 바뀌면 선택 값을 기준으로 위치를 다시 맞추도록 했어요. PR diff의 변경은 이 한 줄이며, 2025년 6월 30일 병합됐어요.

공개 PR에는 별도 성능 측정이나 모든 사용 환경의 회귀 검증 기록이 없어요. 이 한 줄 수정으로 라이브러리 전체의 안정성이 높아졌다고 판단할 근거도 없습니다.
