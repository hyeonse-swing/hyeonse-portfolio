'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import type { Locale } from '../lib/locale';
import { performanceEvidence, type PerformanceGroup } from '../data/performance-evidence';
import styles from './PerformanceEvidence.module.css';

const groups: PerformanceGroup[] = ['homepage', 'font'];
const copy = {
  ko: {
    eyebrow: 'LOCAL MEASUREMENT / 2026', title: '측정 조건과 함께 보는 변화',
    intro: '실험을 고르고 지표별 전후 값을 비교해 보세요.', group: '측정 실험', metric: '비교 지표',
    before: '개선 전', after: '개선 후', higher: '높을수록 좋은 지표', lower: '낮을수록 좋은 지표',
    conditions: '측정 조건', limitation: '해석 범위',
    caveat: '로컬 시뮬레이션과 별도 폰트 실험의 기록이에요. 실사용자 성능이나 전환율을 측정한 결과는 아니에요. 홈페이지는 렌더링·미디어·폰트·외부 콘텐츠를 함께 바꿔 개별 변경의 효과를 분리할 수 없어요.',
    table: '모든 측정값 표로 보기', experiment: '실험', values: '전후 값',
  },
  en: {
    eyebrow: 'LOCAL MEASUREMENT / 2026', title: 'Results with their measurement conditions',
    intro: 'Choose an experiment, then compare its metrics before and after.', group: 'Experiment', metric: 'Metric',
    before: 'Before', after: 'After', higher: 'Higher is better', lower: 'Lower is better',
    conditions: 'Measurement conditions', limitation: 'Interpretation limit',
    caveat: 'These are local simulation results and a separate font experiment. They do not measure real-user performance or conversion. Rendering, media, fonts, and external content changed together on the homepage, so the effect of each change cannot be isolated.',
    table: 'View all measured values in a table', experiment: 'Experiment', values: 'Before and after',
  },
} as const;

export default function PerformanceEvidence({ locale }: { locale: Locale }) {
  const [group, setGroup] = useState<PerformanceGroup>('homepage');
  const [metricIndex, setMetricIndex] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const t = copy[locale];
  const experiment = performanceEvidence[group];
  const metric = experiment.metrics[metricIndex];
  const max = metric.id === 'performance' ? 100 : Math.max(metric.before, metric.after);
  const selectGroup = (next: PerformanceGroup) => { setGroup(next); setMetricIndex(0); };

  return <figure className={styles.figure} id="performance-evidence" aria-labelledby="performance-evidence-title">
    <div className={styles.heading}>
      <div><span className={styles.eyebrow}>{t.eyebrow}</span><h3 id="performance-evidence-title">{t.title}</h3></div>
      <p>{t.intro}</p>
    </div>

    <div className={styles.selector}>
      <div role="group" aria-label={t.group} className={styles.groupButtons}>
        {groups.map(item => <button type="button" key={item} disabled={!ready} aria-pressed={group === item} aria-controls="performance-evidence-chart" onClick={() => selectGroup(item)}>{performanceEvidence[item].title[locale]}</button>)}
      </div>
      <div role="group" aria-label={t.metric} className={styles.metricButtons}>
        {experiment.metrics.map((item, index) => <button type="button" key={item.id} disabled={!ready} aria-pressed={metricIndex === index} aria-controls="performance-evidence-chart" onClick={() => setMetricIndex(index)}>{item.label[locale]}</button>)}
      </div>
    </div>

    <div className={styles.chart} id="performance-evidence-chart" aria-live="polite" aria-atomic="true">
      <div className={styles.chartHeading}><strong>{metric.label[locale]}</strong><span>{metric.direction === 'higher' ? t.higher : t.lower}</span></div>
      {[{ label: t.before, value: metric.before, kind: 'before' }, { label: t.after, value: metric.after, kind: 'after' }].map(row => <div className={styles.row} key={row.kind}>
        <span className={styles.rowLabel}>{row.label}</span>
        <div className={styles.barTrack}><span className={row.kind === 'after' ? styles.afterBar : styles.beforeBar} style={{ '--bar-width': `${row.value / max * 100}%` } as CSSProperties} /></div>
        <strong className={styles.value}>{row.value} <small>{metric.unit[locale]}</small></strong>
      </div>)}
    </div>

    <div className={styles.notes}>
      <div><strong>{t.conditions}</strong><p>{experiment.condition[locale]}</p></div>
      <div><strong>{t.limitation}</strong><p>{t.caveat}</p></div>
    </div>

    <details className={styles.details}>
      <summary>{t.table}</summary>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={t.table}><table>
        <caption>{t.values}</caption>
        <thead><tr><th scope="col">{t.experiment}</th><th scope="col">{t.metric}</th><th scope="col">{t.before}</th><th scope="col">{t.after}</th></tr></thead>
        {groups.map(item => <tbody key={item}>{performanceEvidence[item].metrics.map((row, index) => <tr key={`${item}-${row.id}`}>
          {index === 0 && <th scope="rowgroup" rowSpan={performanceEvidence[item].metrics.length}>{performanceEvidence[item].title[locale]}</th>}
          <th scope="row">{row.label[locale]}</th><td>{row.before} {row.unit[locale]}</td><td>{row.after} {row.unit[locale]}</td>
        </tr>)}</tbody>)}
      </table></div>
      <dl className={styles.tableConditions}>{groups.map(item => <div key={item}>
        <dt>{performanceEvidence[item].title[locale]}</dt><dd>{performanceEvidence[item].condition[locale]}</dd>
      </div>)}</dl>
    </details>
  </figure>;
}
