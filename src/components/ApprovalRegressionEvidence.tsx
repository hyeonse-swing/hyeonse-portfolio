import { approvalRegression as evidence } from '../data/approval-regression';
import type { Locale } from '../lib/locale';
import styles from './ApprovalRegressionEvidence.module.css';

export default function ApprovalRegressionEvidence({ locale }: { locale: Locale }) {
  const en = locale === 'en';
  const repository = `https://github.com/hyeonse-swing/return-review-console/blob/${evidence.sourceCommit}`;
  return <section className={styles.root} aria-labelledby="approval-evidence-title">
    <h2 id="approval-evidence-title">{en ? 'Trace the evidence' : '근거 따라가기'}</h2>
    <p>{en ? 'A synthetic return and a local HTTP 503. Each ID below came from one QA run.' : '합성 반품과 로컬 HTTP 503을 사용했습니다. 아래 식별자는 한 번의 QA 실행에서 가져왔습니다.'}</p>
    <nav aria-label={en ? 'Evidence sections' : '근거 목차'} className={styles.jump}>
      <a href="#source-error">{en ? 'Captured error' : '수집한 오류'}</a>
      <a href="#reviewed-case">{en ? 'Reviewed case' : '검토한 케이스'}</a>
      <a href="#failed-run">{en ? 'Fault run' : '장애 실행'}</a>
      <a href="#recovery-run">{en ? 'Recovery run' : '복구 실행'}</a>
    </nav>
    <div className={styles.cards}>
      <section id="source-error" className={styles.card} aria-labelledby="source-error-title">
        <h3 id="source-error-title">{en ? '1. Captured error' : '1. 수집한 오류'}</h3>
        <p>{en ? 'The approval request for the synthetic return received HTTP 503.' : '합성 반품의 승인 요청에 HTTP 503을 주입했습니다.'}</p>
        <dl>
          <div><dt>{en ? 'Error ID' : '오류 ID'}</dt><dd><code>{evidence.event.id}</code></dd></div>
          <div><dt>{en ? 'Request' : '요청'}</dt><dd><code>{evidence.event.method} {evidence.event.path}</code></dd></div>
          <div><dt>SDK</dt><dd><code>{evidence.event.sdkVersion}</code></dd></div>
        </dl>
        <figure className={styles.figure}>
          <img src={evidence.screenshot.path} width="1280" height="720" alt={en
            ? 'Synthetic Return Desk approval dialog for RET-2421 showing a failed request message while the return remains pending'
            : '합성 반품 RET-2421의 승인 대화상자에 승인 요청 실패 안내가 나오고 상태가 검수 대기로 남은 화면'} />
          <figcaption>{en ? 'Local fault capture from the same QA run.' : '같은 로컬 QA 실행에서 캡처한 장애 화면.'}</figcaption>
        </figure>
      </section>
      <section id="reviewed-case" className={styles.card} aria-labelledby="reviewed-case-title">
        <h3 id="reviewed-case-title">{en ? '2. Reviewed case' : '2. 검토한 케이스'}</h3>
        <p>{en
          ? 'A human supplied the acceptance rule from the Return Desk QA guide: after a successful approval request, the status must read “승인 완료” (Approved). The captured error was used to draft the candidate.'
          : '정상 동작의 기준은 리턴 데스크 QA 안내에서 사람이 정한 요구사항입니다. 승인 API가 성공하면 상태에 “승인 완료”가 보여야 합니다. 수집한 오류로 이 후보를 만들었습니다.'}</p>
        <dl>
          <div><dt>{en ? 'Requirement' : '요구사항'}</dt><dd><code>{evidence.requirement.id}</code></dd></div>
          <div><dt>{en ? 'Case' : '케이스'}</dt><dd><code>{evidence.case.id}</code></dd></div>
          <div><dt>{en ? 'Suite SHA-256' : '스위트 SHA-256'}</dt><dd><code>{evidence.suiteHash}</code></dd></div>
        </dl>
        <a href={`${repository}/qa/README.md`} target="_blank" rel="noopener noreferrer">{en ? 'Read the source acceptance rule ↗' : '원래 승인 요구사항 읽기 ↗'}</a>
      </section>
      <section id="failed-run" className={styles.card} aria-labelledby="failed-run-title">
        <h3 id="failed-run-title">{en ? '3. With the fault' : '3. 장애 상태'}</h3>
        <p>{en ? 'The final assertion expected “승인 완료” and observed “검수 대기” (Pending). The run failed, and the required-pass gate exited 2.' : '최종 단언에서 “승인 완료”를 기대했지만 실제 화면은 “검수 대기”였습니다. 실행이 실패했고 통과 요구 게이트는 2로 종료됐습니다.'}</p>
        <dl>
          <div><dt>{en ? 'Run ID' : '실행 ID'}</dt><dd><code>{evidence.runs.failure.id}</code></dd></div>
          <div><dt>{en ? 'Case and suite' : '케이스와 스위트'}</dt><dd><a href="#reviewed-case"><code>{evidence.case.id}</code></a> · <code>{evidence.suiteHash}</code></dd></div>
        </dl>
      </section>
      <section id="recovery-run" className={styles.card} aria-labelledby="recovery-run-title">
        <h3 id="recovery-run-title">{en ? '4. After removing the fault' : '4. 장애 해제 뒤'}</h3>
        <p>{en ? 'The same case and suite passed when the local 503 injection was disabled. The required-pass gate exited 0.' : '로컬 503 주입을 해제한 뒤 같은 케이스와 스위트가 통과했습니다. 통과 요구 게이트는 0으로 종료됐습니다.'}</p>
        <dl>
          <div><dt>{en ? 'Run ID' : '실행 ID'}</dt><dd><code>{evidence.runs.recovery.id}</code></dd></div>
          <div><dt>{en ? 'Case and suite' : '케이스와 스위트'}</dt><dd><a href="#reviewed-case"><code>{evidence.case.id}</code></a> · <code>{evidence.suiteHash}</code></dd></div>
        </dl>
      </section>
    </div>
    <p className={styles.source}>{en
      ? 'Reproduce locally with npm run qa:pr at the pinned source commit. This record describes a synthetic return, one Chromium run and local fault injection.'
      : '고정된 소스 커밋에서 npm run qa:pr로 로컬 재현할 수 있습니다. 이 기록은 합성 반품, Chromium 실행 한 번과 로컬 장애 주입을 다룹니다.'} <a href={`${repository}/qa/pr-regression.mjs`} target="_blank" rel="noopener noreferrer">{en ? 'Reproduction script ↗' : '재현 스크립트 ↗'}</a></p>
  </section>;
}
