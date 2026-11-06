'use client';

import { useEffect, useState } from 'react';
import { getToolchainCopy, type ToolchainStage } from '../data/toolchain';
import { localizedPath, type Locale } from '../lib/locale';
import styles from './ToolchainExplorer.module.css';

function StageContent({ stage, locale }: { stage: ToolchainStage; locale: Locale }) {
  const t = getToolchainCopy(locale);
  return <>
    <div className={styles.stageHead}>
      <div><span className={styles.micro}>{stage.role}</span><h4>{stage.name}</h4></div>
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

  return <section className={styles.root} id="toolchain" aria-labelledby="toolchain-title">
    <div className={styles.heading}>
      <span className={styles.micro}>TOOLCHAIN / 01—03</span>
      <div><h3 id="toolchain-title">{t.title}</h3><p>{t.intro}</p></div>
    </div>
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
  </section>;
}
