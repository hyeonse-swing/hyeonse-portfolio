'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../lib/locale';
import styles from './FrontendLab.module.css';

type DemoEvent = { key: string; label: string; at: number; state: 'started' | 'applied' | 'ignored' };

const copy = {
  ko: {
    responsive: '너비에 따라 다시 배치',
    responsiveIntro: '슬라이더를 움직이면 같은 카드가 놓인 공간을 기준으로 구성이 바뀌어요. 브라우저 창 크기만 보는 대신 카드의 실제 컨테이너 너비를 사용합니다.',
    width: '카드 너비', compact: '좁게', wide: '넓게',
    frame: 'LIVE COMPONENT', sampleTitle: '운영 카드 예제', sampleText: '같은 내용도 쓸 수 있는 공간에 따라 읽기 순서와 비중을 조정해요.',
    sampleIndex: '01 / RESPONSIVE', sampleMeta: 'React · CSS Container Queries', sampleStatus: '컨테이너 기준',
    responsiveNote: '좁은 공간에서는 그림 아래에 본문을 쌓고, 넓은 공간에서는 나란히 보여줘요. 설정한 테마·강조색·모서리도 같이 적용됩니다.',
    async: '늦게 온 응답을 다루기',
    asyncIntro: 'A와 B의 응답 시간을 바꿔 로컬 타이머로 요청 순서를 재현해 보세요. 응답이 도착한 순서대로 화면을 바꾸면 어떤 일이 생기는지 비교할 수 있어요.',
    run: '요청 순서 실행', reset: '초기화',
    delayA: 'A 응답 시간', delayB: 'B 응답 시간', slowA: 'A가 늦게 도착', slowB: 'B가 늦게 도착',
    schedule: (a: number, b: number) => `로컬 시뮬레이션 · A는 시작 후 ${a}ms에 응답해요. B는 120ms 뒤 시작해 ${b}ms 후, 전체 ${120 + b}ms에 응답해요.`,
    arrival: '도착순 반영', latest: '마지막 요청만 반영', current: '마지막 요청', rendered: '화면에 표시',
    noRequest: '없음', waiting: '응답 대기 중', resultA: 'A의 결과', resultB: 'B의 결과',
    pending: '실행 전', correct: '최신 결과 유지', stale: '이전 결과로 덮임',
    timeline: '요청 타임라인', startA: 'A 요청 시작', startB: 'B 요청 시작', receiveB: 'B 응답 · 왼쪽과 오른쪽에 표시', receiveA: 'A 응답 · 왼쪽에 표시, 오른쪽은 무시',
    timelineNote: '시점은 시작을 0ms로 둔 시뮬레이션 설정값이에요.',
    idleSummary: '응답 시간을 바꾸고 실행해 보세요. 시간을 바꾸면 이전 결과는 초기화돼요.',
    runningSummary: '두 요청의 응답을 기다리고 있어요.',
    staleSummary: 'B 다음에 도착한 A가 왼쪽 화면을 덮었어요. 오른쪽은 최신 요청 B의 결과를 유지해요.',
    sameSummary: '이번에는 A 다음에 B가 도착해 두 화면의 최종 결과가 같아요. A가 늦게 도착하는 조건도 비교해 보세요.',
    demoNote: '두 화면 모두 같은 가상 응답을 받습니다. 오른쪽은 최신 요청 ID와 다르면 오래된 응답을 버려요. 실제 서비스 요청이나 성능 측정값은 아닙니다.',
  },
  en: {
    responsive: 'Reflow inside a container',
    responsiveIntro: 'Move the slider to give the same card more or less space. Its layout responds to the width of its own container, rather than only the browser window.',
    width: 'Card width', compact: 'Compact', wide: 'Wide',
    frame: 'LIVE COMPONENT', sampleTitle: 'An operations card demo', sampleText: 'The same content changes its reading order and emphasis to fit the space available.',
    sampleIndex: '01 / RESPONSIVE', sampleMeta: 'React · CSS Container Queries', sampleStatus: 'Container-aware',
    responsiveNote: 'In a narrow space, the text moves below the visual; in a wide space, they sit side by side. Your theme, accent and corner choices apply here too.',
    async: 'Handle a late response',
    asyncIntro: 'Change the response times for A and B to simulate a request sequence with local timers. Compare what happens when every arriving response is allowed to update the screen.',
    run: 'Run request sequence', reset: 'Reset',
    delayA: 'A response time', delayB: 'B response time', slowA: 'A arrives later', slowB: 'B arrives later',
    schedule: (a: number, b: number) => `Local simulation · A responds ${a}ms after the start. B starts 120ms later and responds after ${b}ms, at ${120 + b}ms overall.`,
    arrival: 'Arrival order', latest: 'Latest request only', current: 'Latest request', rendered: 'On screen',
    noRequest: 'None', waiting: 'Waiting for response', resultA: 'Result A', resultB: 'Result B',
    pending: 'Not started', correct: 'Latest result stays', stale: 'Overwritten by old result',
    timeline: 'Request timeline', startA: 'Request A starts', startB: 'Request B starts', receiveB: 'B arrives · shown on left and right', receiveA: 'A arrives · shown on left, ignored on right',
    timelineNote: 'Times are simulation settings, relative to a 0ms start.',
    idleSummary: 'Set the response times and run the sequence. Changing a time clears the previous results.',
    runningSummary: 'Waiting for both requests to respond.',
    staleSummary: 'A arrived after B and overwrote the left panel. The right panel kept the latest request, B.',
    sameSummary: 'B arrived after A, so both panels ended with the same result. Try making A arrive later to compare.',
    demoNote: 'Both panels receive the same simulated responses. The right panel ignores a response when its request ID is no longer the latest. This does not call a service or represent measured performance.',
  },
} as const;

function ResponsiveLab({ locale, ready }: { locale: Locale; ready: boolean }) {
  const t = copy[locale];
  const railRef = useRef<HTMLDivElement>(null);
  const [requestedWidth, setRequestedWidth] = useState(520);
  const [availableWidth, setAvailableWidth] = useState(720);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => setAvailableWidth(Math.floor(rail.clientWidth));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  const maxWidth = Math.max(1, Math.min(720, availableWidth));
  const minWidth = Math.min(200, maxWidth);
  const compactWidth = Math.min(280, Math.max(minWidth, maxWidth - 120));
  const width = Math.min(requestedWidth, maxWidth);

  return <section className={styles.lab} id="responsive-lab" aria-labelledby="responsive-lab-title">
    <div className={styles.heading}><span className={styles.index}>INTERACTION / 01</span><div><h2 id="responsive-lab-title">{t.responsive}</h2><p>{t.responsiveIntro}</p></div></div>
    <div className={styles.responsiveSurface}>
      <div className={styles.controls}>
        <label htmlFor="responsive-width">{t.width} <output htmlFor="responsive-width" data-frame-width>{ready ? `${width} px` : '—'}</output></label>
        <div className={styles.controlRow}>
          <input id="responsive-width" type="range" name="responsive-width" disabled={!ready} min={minWidth} max={maxWidth} value={width} aria-valuetext={`${width} px`} onChange={event => setRequestedWidth(Number(event.target.value))} />
          <div className={styles.presets}><button type="button" disabled={!ready} onClick={() => setRequestedWidth(compactWidth)} aria-pressed={width === compactWidth}>{t.compact}</button><button type="button" onClick={() => setRequestedWidth(640)} aria-pressed={requestedWidth === 640 && maxWidth > 460} disabled={!ready || maxWidth <= 460}>{t.wide}</button></div>
        </div>
      </div>
      <div ref={railRef} className={styles.rail}>
        <div className={styles.frame} style={{ width }} data-width={width}>
          <div className={styles.frameBar}><span>{t.frame}</span><span>{ready ? `${width} px` : 'CSS'}</span></div>
          <article className={styles.sample}>
            <div className={styles.sampleVisual} aria-hidden="true"><span>01</span><i /><i /><i /></div>
            <div className={styles.sampleCopy}><span className={styles.sampleIndex}>{t.sampleIndex}</span><h3>{t.sampleTitle}</h3><p>{t.sampleText}</p><div className={styles.sampleFooter}><span>{t.sampleStatus}</span><span>{t.sampleMeta}</span></div></div>
          </article>
        </div>
      </div>
    </div>
    <p className={styles.note}>{t.responsiveNote}</p>
  </section>;
}

function AsyncLab({ locale, ready }: { locale: Locale; ready: boolean }) {
  const t = copy[locale];
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const runId = useRef(0);
  const latestRequestId = useRef(0);
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');
  const [requested, setRequested] = useState<'A' | 'B' | null>(null);
  const [arrivalResult, setArrivalResult] = useState<'A' | 'B' | null>(null);
  const [guardedResult, setGuardedResult] = useState<'A' | 'B' | null>(null);
  const [events, setEvents] = useState<DemoEvent[]>([]);
  const [delayA, setDelayA] = useState(1200);
  const [delayB, setDelayB] = useState(320);

  const clearTimers = () => {
    runId.current += 1;
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => { runId.current += 1; timers.current.forEach(clearTimeout); }, []);

  const reset = () => {
    clearTimers();
    setPhase('idle');
    setRequested(null);
    latestRequestId.current = 0;
    setArrivalResult(null);
    setGuardedResult(null);
    setEvents([]);
  };
  const changeTiming = (a: number, b: number) => {
    if (a === delayA && b === delayB) return;
    reset();
    setDelayA(a);
    setDelayB(b);
  };
  const run = () => {
    clearTimers();
    const currentRun = runId.current;
    const aDuration = delayA;
    const bDuration = delayB;
    let completed = 0;
    const schedule = (delay: number, action: () => void) => timers.current.push(setTimeout(() => {
      if (runId.current === currentRun) action();
    }, delay));
    const complete = (request: 'A' | 'B', requestId: number) => {
      setArrivalResult(request);
      if (latestRequestId.current === requestId) setGuardedResult(request);
      completed += 1;
      if (completed === 2) setPhase('done');
    };
    setPhase('running');
    latestRequestId.current = 1;
    setRequested('A');
    setArrivalResult(null);
    setGuardedResult(null);
    setEvents([{ key: 'start-a', label: t.startA, at: 0, state: 'started' }]);
    schedule(120, () => {
      latestRequestId.current = 2;
      setRequested('B');
      setEvents(previous => [...previous, { key: 'start-b', label: t.startB, at: 120, state: 'started' }]);
    });
    schedule(120 + bDuration, () => {
      complete('B', 2);
      setEvents(previous => [...previous, { key: 'receive-b', label: t.receiveB, at: 120 + bDuration, state: 'applied' }]);
    });
    schedule(aDuration, () => {
      complete('A', 1);
      setEvents(previous => [...previous, { key: 'receive-a', label: t.receiveA, at: aDuration, state: 'ignored' }]);
    });
  };

  const resultLabel = (value: 'A' | 'B' | null) => value === 'A' ? t.resultA : value === 'B' ? t.resultB : phase === 'idle' ? t.pending : t.waiting;
  const statusLabel = (value: 'A' | 'B' | null) => phase !== 'done' ? t.waiting : value === 'A' ? t.stale : t.correct;
  const timingDisabled = !ready || phase === 'running';
  const summary = phase === 'idle' ? t.idleSummary : phase === 'running' ? t.runningSummary : arrivalResult === 'A' ? t.staleSummary : t.sameSummary;

  return <section className={styles.lab} id="async-lab" aria-labelledby="async-lab-title">
    <div className={styles.heading}><span className={styles.index}>INTERACTION / 02</span><div><h2 id="async-lab-title">{t.async}</h2><p>{t.asyncIntro}</p></div></div>
    <div className={styles.asyncSurface} data-phase={phase}>
      <div className={styles.asyncTiming}>
        <div className={styles.asyncSliders}>
          <div><label htmlFor="async-delay-a">{t.delayA} <output htmlFor="async-delay-a">{delayA} ms</output></label><input id="async-delay-a" name="async-delay-a" type="range" min={200} max={1600} step={20} value={delayA} aria-valuetext={`${delayA} ms`} disabled={timingDisabled} onChange={event => changeTiming(Number(event.target.value), delayB)} /></div>
          <div><label htmlFor="async-delay-b">{t.delayB} <output htmlFor="async-delay-b">{delayB} ms</output></label><input id="async-delay-b" name="async-delay-b" type="range" min={200} max={1600} step={20} value={delayB} aria-valuetext={`${delayB} ms`} disabled={timingDisabled} onChange={event => changeTiming(delayA, Number(event.target.value))} /></div>
        </div>
        <div className={styles.asyncPresets}><button type="button" disabled={timingDisabled} aria-pressed={delayA === 1200 && delayB === 320} onClick={() => changeTiming(1200, 320)}>{t.slowA}</button><button type="button" disabled={timingDisabled} aria-pressed={delayA === 320 && delayB === 1200} onClick={() => changeTiming(320, 1200)}>{t.slowB}</button></div>
      </div>
      <div className={styles.asyncControls}><p>{t.schedule(delayA, delayB)}</p><div><button type="button" className={styles.runButton} onClick={run} disabled={timingDisabled}>{t.run} <span aria-hidden="true">↗</span></button><button type="button" className={styles.resetButton} onClick={reset} disabled={!ready || phase === 'idle'}>{t.reset}</button></div></div>
      <div className={styles.comparison}>
        <article className={styles.resultCard} data-result={arrivalResult ?? 'none'}><span className={styles.resultIndex}>01 / ARRIVAL ORDER</span><h3>{t.arrival}</h3><dl><div><dt>{t.current}</dt><dd>{requested ?? t.noRequest}</dd></div><div><dt>{t.rendered}</dt><dd aria-live="polite" aria-atomic="true">{resultLabel(arrivalResult)}</dd></div></dl><p className={phase === 'done' ? arrivalResult === 'A' ? styles.stale : styles.correct : styles.status}>{phase === 'idle' ? t.pending : statusLabel(arrivalResult)}</p></article>
        <article className={styles.resultCard} data-result={guardedResult ?? 'none'}><span className={styles.resultIndex}>02 / LATEST REQUEST</span><h3>{t.latest}</h3><dl><div><dt>{t.current}</dt><dd>{requested ?? t.noRequest}</dd></div><div><dt>{t.rendered}</dt><dd aria-live="polite" aria-atomic="true">{resultLabel(guardedResult)}</dd></div></dl><p className={phase === 'done' ? styles.correct : styles.status}>{phase === 'idle' ? t.pending : statusLabel(guardedResult)}</p></article>
      </div>
      <p className={styles.outcome} role="status" aria-atomic="true">{summary}</p>
      <div className={styles.timeline}><h3>{t.timeline}</h3><p className={styles.note}>{t.timelineNote}</p><ol>{events.map(event => <li key={event.key} data-state={event.state}><span className={styles.eventTime}>{event.at} ms</span><span>{event.label}</span></li>)}</ol></div>
    </div>
    <p className={styles.note}>{t.demoNote}</p>
  </section>;
}

export default function FrontendLab({ locale }: { locale: Locale }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return <div className={styles.root}><noscript><p className={styles.note}>{locale === 'en' ? 'Enable JavaScript to use these interactive experiments. The examples and explanations remain readable below.' : '직접 조작하는 실험은 JavaScript가 필요해요. 아래 예시와 설명은 그대로 읽을 수 있어요.'}</p></noscript><ResponsiveLab locale={locale} ready={ready} /><AsyncLab locale={locale} ready={ready} /></div>;
}
