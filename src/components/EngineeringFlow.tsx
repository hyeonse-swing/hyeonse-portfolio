'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import styles from './EngineeringFlow.module.css';

type Step = { title: string; detail: string };

export default function EngineeringFlow({ steps, caption, locale }: { steps: readonly Step[]; caption: string; locale: 'ko' | 'en' }) {
  const [selected, setSelected] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (steps.length === 0) return null;
  const current = steps[Math.min(selected, steps.length - 1)];
  const en = locale === 'en';
  const choose = (next: number) => setSelected(Math.max(0, Math.min(steps.length - 1, next)));

  return <figure className={styles.figure}>
    <div className={styles.topline}><span className={styles.kicker}>FLOW / 0{steps.length}</span><span>{en ? 'Select a stage' : '단계를 선택해 보세요'}</span></div>
    <div className={styles.track} style={{ '--flow-progress': `${steps.length > 1 ? selected / (steps.length - 1) * 100 : 100}%` } as CSSProperties} aria-hidden="true"><span /></div>
    <div className={styles.stages} role="group" aria-label={en ? 'Implementation flow stages' : '구현 흐름 단계'}>
      {steps.map((step, index) => <button type="button" disabled={!ready} key={`${index}-${step.title}`} className={styles.stage} aria-pressed={index === selected} onClick={() => choose(index)}>
        <span className={styles.index}>0{index + 1}</span>
        <strong>{step.title}</strong>
        <span className={styles.marker} aria-hidden="true">{index === selected ? '●' : '○'}</span>
      </button>)}
    </div>
    <div className={styles.inspector} aria-live="polite" aria-atomic="true" data-selected-step={selected + 1}>
      <span className={styles.inspectorIndex}>{en ? 'SELECTED STAGE' : '선택한 단계'} / 0{selected + 1}</span>
      <div><h3>{current.title}</h3><p>{current.detail}</p></div>
    </div>
    <div className={styles.controls}>
      <button type="button" onClick={() => choose(selected - 1)} disabled={!ready || selected === 0}>← {en ? 'Previous' : '이전 단계'}</button>
      <span aria-hidden="true">0{selected + 1} / 0{steps.length}</span>
      <button type="button" onClick={() => choose(selected + 1)} disabled={!ready || selected === steps.length - 1}>{en ? 'Next' : '다음 단계'} →</button>
    </div>
    <noscript><p>{en ? 'To read without JavaScript, expand every stage below.' : 'JavaScript 없이도 아래에서 전체 단계를 펼쳐 읽을 수 있어요.'}</p></noscript>
    <details className={styles.allSteps}>
      <summary>{en ? 'Read every stage' : '전체 단계 읽기'}</summary>
      <ol>{steps.map((step, index) => <li key={`${index}-${step.title}`}><span>0{index + 1}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div></li>)}</ol>
    </details>
    <figcaption>{caption}</figcaption>
  </figure>;
}
