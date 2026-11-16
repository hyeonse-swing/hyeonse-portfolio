# 프로젝트 기록 작성 안내

프로젝트 기록은 포트폴리오 안의 짧은 기술 글이다. 한·영 Markdown 원고를 GitHub에서 추가하거나 수정할 수 있다. 별도 CMS 계정은 필요하지 않다. 원고는 공개 저장소의 파일이므로 `draft: true`로 두어도 파일 내용은 GitHub에서 볼 수 있다. 비공개 정보, 회사 원본 코드, 고객 정보, 인증정보는 초안에도 넣지 않는다.

## 새 글 만들기

1. [작성 템플릿](../content/templates/note.md)을 복사해 `content/notes/ko/new-note.md`에 붙여 넣는다. 파일 이름에는 영문 소문자·숫자를 쓰고 단어 사이는 하이픈으로 연결한다(예: `flow-qa-history.md`). 영어 글을 쓰려면 `content/notes/en/new-note.md`도 만든다. 언어별 글은 독립적이며 번역이 없다고 자동 생성되지 않는다. 같은 주제의 번역에는 같은 slug를 쓴다.
2. 앞부분의 YAML frontmatter를 채운다. `title`과 `description`은 해당 언어로 쓰고, `date`는 게시일을 `'YYYY-MM-DD'` 문자열로 적는다. 과거 업무를 회고하는 글에서는 당시 수행 기간을 본문에 따로 적는다. 수정일을 표시할 필요가 있으면 `updated`를 같은 형식으로 추가한다. `tags`와 `projects`는 문자열 배열이다. `projects`에는 아래 표의 포트폴리오 프로젝트 ID를 사용한다.
3. 본문은 일반 Markdown으로 작성한다. 문단, 제목, 목록, 코드 블록과 링크를 사용할 수 있다. HTML·JSX를 직접 넣지 않는다. 실제 역할·선택·검증과 공개 근거를 연결하고, 재실행하지 않은 검사를 직접 확인한 결과처럼 쓰지 않는다. 개인 프로젝트 링크는 `/about/#flow-qa`처럼 해당 항목을 가리키고, 영어 글에서는 `/en/about/#flow-qa`처럼 같은 언어의 경로를 쓴다. 업무 사례와 기타 작업의 연결 위치는 아래 표를 따른다.
4. 작성 중에는 `draft: true`로 둔다. 공개 화면에 올릴 준비가 되면 `draft: false`로 바꾼다. 초안은 목록·검색·사이트맵·정적 글 경로에서 제외된다. 파일은 여전히 공개 GitHub 저장소에 남는다.

## 확인과 게시

로컬에서 작업한다면 `portfolio/`에서 `npm run verify`로 타입, 정적 빌드, 링크·콘텐츠 검사를 확인한다. 새 한국어 문자가 있으면 빌드가 고정된 Google Fonts 원본의 무결성을 확인하고 글꼴 서브셋을 자동 갱신한다. GitHub 웹에서 글만 편집해도 Vercel 빌드에 적용된다. 원본이 캐시에 없으면 최초 한 번 다운로드가 필요하며, 실패하면 배포를 중단한다.

GitHub 웹 화면에서는 해당 경로의 파일을 열어 편집하거나 새 파일을 만든 뒤 변경 내용을 검토한다. `main`에 커밋하면 기존 GitHub/Vercel 설정이 검증과 정적 사이트 배포를 시작한다. 검증 작업과 Vercel 배포가 모두 성공했는지 확인한 후 공개 주소에서 글과 링크를 확인한다. 파일 저장이나 커밋만으로 실제 배포 완료를 뜻하지 않는다. 이 안내는 절차 설명이며 현재 세션에서 커밋·푸시·배포를 수행했다는 뜻이 아니다.

## 현재 원고

한국어 원고는 `content/notes/ko`, 같은 이름의 영어 원고는 `content/notes/en`에 있다.

| 구분 | 원고 |
| --- | --- |
| 개인 프로젝트 | [디자인 시스템](../content/notes/ko/hyeonse-design-system.md), [Flow QA](../content/notes/ko/flow-qa.md), [Browser Error Log](../content/notes/ko/browser-error-log.md), [Error to Test](../content/notes/ko/error-to-test.md), [HoverShot](../content/notes/ko/hovershot-window-restoration.md) |
| 대표 업무 사례 | [바이크](../content/notes/ko/bike-operations.md), [SWING 성능](../content/notes/ko/swing-home-performance.md), [Yellow Bus](../content/notes/ko/yellow-bus.md), [SWAP Admin](../content/notes/ko/swap-admin-v2.md) |
| 기타 작업과 공개 기여 | [고객 웹뷰](../content/notes/ko/customer-webviews.md), [운영 Admin·공통 모듈](../content/notes/ko/admin-shared-modules.md), [AI 개발 방식](../content/notes/ko/ai-development-practices.md), [음성 AI 연동](../content/notes/ko/voice-ai-integration.md), [WebView QA Shell](../content/notes/ko/webview-qa-shell.md), [react-wheel-picker 기여](../content/notes/ko/react-wheel-picker-contribution.md) |
| 업데이트 | [로컬 도구 세 개의 최근 변경](../content/notes/ko/local-toolchain-updates.md) |

Deer와 SWING Air는 현재 공개 자료가 참여 이력 수준이어서 별도 상세 글을 만들지 않았다. 원래 포트폴리오 소개는 유지한다. 다른 글도 공개된 기존 설명과 소스 범위에서 작성하며 새로운 업무 성과나 수행하지 않은 검증을 추가하지 않는다.

## 관련 프로젝트 연결

| 구분 | 사용 가능한 `projects` 값 | 연결 위치 |
| --- | --- | --- |
| 개인 프로젝트 | `hyeonse-design-system`, `flow-qa`, `browser-error-log`, `error-to-test`, `hovershot` | 소개 페이지의 해당 프로젝트 |
| 대표 업무 사례 | `bike-operations`, `swing-home-performance`, `yellow-bus`, `swap-admin-v2` | 해당 사례 상세 페이지 |
| 기타 작업 | `swing-webview`, `swing-admin`, `swap-customer`, `vox`, `ai-development`, `webview-qa-shell`, `deer`, `swing-japan`, `swing-air`, `opensource` | 홈의 해당 작업 펼침 영역 |

이름과 경로는 `src/data/note-projects.ts`에서 기존 포트폴리오 데이터로 만든다. 글에서 해당 프로젝트로 돌아갈 수 있고, 원래 소개·업무 사례에도 연결된 글 제목이 표시된다. 개인 프로젝트 카드에서는 프로젝트 ID와 같은 slug의 글을 우선 연결하며, 상세 소개에서는 관련 글을 모두 표시한다.

## 댓글 관리

방문자가 글 아래에서 댓글을 불러오면 Giscus가 연결된다. 읽기는 로그인 없이 가능하며, 쓰기는 방문자 본인의 GitHub 로그인이 필요하다. 댓글은 [포트폴리오 Discussions](https://github.com/hyeonse-swing/hyeonse-portfolio/discussions)의 Announcements 분류에 저장된다. 같은 slug의 한·영 글은 `notes/slug` 식별값으로 같은 대화를 공유한다. 제목이나 언어를 바꿔도 유지되므로, 게시한 뒤에는 파일 이름을 바꾸지 않는 편이 좋다.

댓글 수정·삭제·신고·잠금은 GitHub Discussions에서 관리한다. Giscus 앱에는 포트폴리오 저장소 한 곳의 메타데이터 읽기와 Discussions 읽기·쓰기만 연결했다. 연결할 GitHub 식별값은 `src/data/blog-comments.ts`, 허용 사이트는 `giscus.json`에 있다. `giscus.json` 변경은 GitHub의 기본 브랜치에 반영되어야 적용된다.

번역이 없는 글에서 언어를 바꾸면 해당 언어의 기록 목록으로 이동한다. 초안은 사이트에서 제외되지만 GitHub 파일과 변경 이력은 공개다.
