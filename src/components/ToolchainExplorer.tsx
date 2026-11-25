'use client';

import { useEffect, useState } from 'react';
import { getToolchainCopy, type ToolchainStage } from '../data/toolchain';
import { localizedPath, type Locale } from '../lib/locale';
import styles from './ToolchainExplorer.module.css';

function StageContent({ stage, locale }: { stage: ToolchainStage; locale: Locale }) {
  const t = getToolchainCopy(locale);
  return <>
    <div className={styles.stageHead}>
      <div><h3>{stage.name}</h3><p className={styles.micro}>{stage.role}</p></div>
      <a href={localizedPath(locale, `/about/#${stage.id}`)}>{t.projectLabel} <span aria-hidden="true">↗</span></a>
    </div>
    <div className={styles.io}>
      <div><span className={styles.micro}>{t.inputLabel}</span><p>{stage.input}</p></div>
      <div><span className={styles.micro}>{t.outputLabel}</span><p>{stage.output}</p></div>
    </div>
    <p className={styles.example}>{stage.example}</p>
    <p className={styles.handoff}><span className={styles.micro}>{t.handoffLabel}</span>{stage.handoff}</p>
  </>;
}

export default function ToolchainExplorer({ locale }: { locale: Locale }) {
  const t = getToolchainCopy(locale);
  const [selected, setSelected] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const stage = t.stages[selected];

  return <details className={styles.root} id="toolchain" data-search-target>
    <summary className={styles.summary}>{t.title}</summary>
    <p className={styles.intro}>{t.intro}</p>
    <div className={styles.frame}>
      <div className={styles.toolbar}><span className={styles.micro}>{t.exampleLabel}</span><span aria-hidden="true">0{selected + 1} / 03</span></div>
      <div className={styles.tabs} role="group" aria-label={t.selectLabel}>
        {t.stages.map((item, index) => <button key={item.id} type="button" disabled={!ready} aria-pressed={selected === index} aria-controls="toolchain-selected" onClick={() => setSelected(index)}>
          <span>0{index + 1}</span><strong>{item.name}</strong><span aria-hidden="true">↗</span>
        </button>)}
      </div>
      <div className={styles.selected} id="toolchain-selected" data-selected-stage={stage.id} aria-live="polite" aria-atomic="true">
        <StageContent stage={stage} locale={locale} />
      </div>
      <details className={styles.all}>
        <summary>{t.allLabel}<span aria-hidden="true">＋</span></summary>
        <div className={styles.allBody}>{t.stages.map((item, index) => <article key={item.id}>
          <span className={styles.micro}>0{index + 1} / 03</span>
          <StageContent stage={item} locale={locale} />
        </article>)}</div>
      </details>
    </div>
    <p className={styles.note}>{t.note}</p>
    <p className={styles.note}><a href={localizedPath(locale, '/notes/return-desk-approval-regression/')}>
      {locale === 'en' ? 'Follow one captured error through a reviewed case and two runs ↗' : '오류 하나가 검토 케이스와 두 실행으로 이어진 사례 보기 ↗'}
    </a></p>
  </details>;
}
