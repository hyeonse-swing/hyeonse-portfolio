import styles from './ProjectVisual.module.css';
import type { Locale } from '../lib/locale';

type Kind = 'bike' | 'performance' | 'bus' | 'migration';

interface Props {
  kind: Kind;
  large?: boolean;
  locale?: Locale;
}

const koreanDescriptions: Record<Kind, string> = {
  bike: '바이크 운영 흐름 설명용 구성. 첫 주문, 계약 발송, 차량 인계, 이후 보험 변경과 납부 조회로 이어지는 업무 단계.',
  performance: '로컬 Lighthouse 모바일 시뮬레이션의 전 3회, 후 5회 중앙값. Performance 점수 54에서 95, 초기 전송량 19.805MB에서 0.488MB. 실사용자 지표는 아닙니다.',
  bus: '옐로우버스 운행 흐름 설명용 구성. 배차에서 탑승, 도착까지 이어지는 운영 업무의 개념도.',
  migration: 'SWAP Admin V1과 V2의 공존 설명용 구성. 새 V2 화면과 API가 도입되는 동안 기존 작업 조회 경로도 연결됩니다.',
};
const englishDescriptions: Record<Kind, string> = {
  bike: 'Illustrative bike operations flow: first order, contract delivery, vehicle handover, then insurance changes and payment lookup.',
  performance: 'Median of three before and five after local Lighthouse mobile simulations. Performance score rose from 54 to 95, and initial transfer fell from 19.805 MB to 0.488 MB. These are not real-user metrics.',
  bus: 'Illustrative Yellow Bus operations diagram, from dispatch through boarding to arrival.',
  migration: 'Illustrative coexistence of SWAP Admin V1 and V2. The existing task lookup route remains connected while new V2 screens and APIs are introduced.',
};

function BikeVisual({ locale }: { locale: Locale }) {
  const en = locale === 'en';
  const steps = en ? [
    ['01', 'First order', 'ORDER'], ['02', 'Send contract', 'CONTRACT'],
    ['03', 'Vehicle handover', 'HANDOVER'], ['04', 'Insurance & payments', 'AFTERCARE'],
  ] : [
    ['01', '첫 주문', 'ORDER'],
    ['02', '계약 발송', 'CONTRACT'],
    ['03', '차량 인계', 'HANDOVER'],
    ['04', '보험·납부', 'AFTERCARE'],
  ];

  return (
    <div className={styles.bike}>
      <div className={styles.bikeHeader}><span>BIKE / OPERATIONS</span><span>01 — 04</span></div>
      <div className={styles.bikeTitle}>{en ? 'Workflows' : '업무는'}<br /><strong>{en ? 'connect.' : '이어진다.'}</strong></div>
      <div className={styles.bikeTrack}>
        {steps.map(([number, title, english]) => (
          <div className={styles.bikeStep} key={number}>
            <span className={styles.bikeNumber}>{number}</span>
            <span className={styles.bikeStepText}><strong>{title}</strong><small>{english}</small></span>
          </div>
        ))}
      </div>
      <div className={styles.bikeFoot}><span>{en ? 'Staff tasks' : '직원 업무'}</span><span className={styles.bikeFootLine} /><span>{en ? 'Operator view' : '사업자 화면'}</span><span className={styles.explainer}>{en ? 'Illustrative diagram' : '설명용 구성'}</span></div>
    </div>
  );
}

function PerformanceVisual({ locale }: { locale: Locale }) {
  return (
    <div className={styles.performance}>
      <div className={styles.perfHeader}><span>SWING WEB / PERFORMANCE</span><span>LOCAL MEASUREMENT</span></div>
      <div className={styles.perfBody}>
        <div className={styles.perfScore}><span>54</span><svg viewBox="0 0 64 18" focusable="false"><path d="M1 9h60m-11-8 12 8-12 8" fill="none" stroke="currentColor" strokeWidth="2" /></svg><strong>95</strong></div>
        <div className={styles.perfScoreLabel}>LIGHTHOUSE PERFORMANCE</div>
        <div className={styles.perfTransfer}>
          <span>INITIAL TRANSFER</span>
          <div><s>19.805 MB</s><svg viewBox="0 0 34 12" focusable="false"><path d="M0 6h33m-8-5 8 5-8 5" fill="none" stroke="currentColor" /></svg><strong>0.488 MB</strong></div>
        </div>
      </div>
      <div className={styles.perfFoot}>{locale === 'ko' ? '로컬 모바일 시뮬레이션 · 개선 전 3회 / 후 5회 중앙값' : 'Local mobile simulations · median of 3 before / 5 after'}<span>{locale === 'ko' ? '실사용자 지표 아님' : 'Not real-user metrics'}</span></div>
    </div>
  );
}

function BusVisual({ locale }: { locale: Locale }) {
  const en = locale === 'en';
  return (
    <div className={styles.bus}>
      <div className={styles.busHeader}><span>YELLOW BUS / ROUTE SYSTEM</span><span>2024 — 2025</span></div>
      <div className={styles.busMap}>
        <svg className={styles.busSvg} viewBox="0 0 640 290" preserveAspectRatio="xMidYMid meet" focusable="false">
          <path className={styles.busGrid} d="M0 58h640M0 116h640M0 174h640M0 232h640M80 0v290M160 0v290M240 0v290M320 0v290M400 0v290M480 0v290M560 0v290" />
          <path className={styles.busRouteUnder} d="M46 214h120q28 0 28-30v-59q0-30 30-30h179q28 0 28 30v22q0 30 30 30h129" />
          <path className={styles.busRoute} d="M46 214h120q28 0 28-30v-59q0-30 30-30h179q28 0 28 30v22q0 30 30 30h129" />
          <g className={styles.busNode}><circle cx="82" cy="214" r="10" /><circle cx="270" cy="95" r="10" /><circle cx="555" cy="177" r="10" /></g>
          <g className={styles.busNodeCore}><circle cx="82" cy="214" r="3" /><circle cx="270" cy="95" r="3" /><circle cx="555" cy="177" r="3" /></g>
          <g className={styles.busSvgText}><text x="50" y="190">01</text><text x="237" y="72">02</text><text x="523" y="153">03</text></g>
        </svg>
        <div className={styles.busLabel}><span>01 / {en ? 'Dispatch' : '배차'}</span><span>02 / {en ? 'Boarding' : '탑승'}</span><span>03 / {en ? 'Arrival' : '도착'}</span></div>
      </div>
      <div className={styles.busFoot}><strong>{en ? 'One flow for daily operations.' : '매일의 운행을 하나의 흐름으로.'}</strong><span>{en ? 'Operations flow · illustrative diagram' : '운행 흐름 · 설명용 구성'}</span></div>
    </div>
  );
}

function MigrationVisual({ locale }: { locale: Locale }) {
  const en = locale === 'en';
  return (
    <div className={styles.migration}>
      <div className={styles.migrationHeader}><span>SWAP ADMIN / SYSTEM TRANSITION</span><span>V1 + V2</span></div>
      <div className={styles.migrationSystem}>
        <div className={styles.migrationSide}>
          <span className={styles.migrationIndex}>01 / EXISTING</span>
          <strong>V1</strong>
          <div className={styles.migrationRule} />
          <span>{en ? 'Existing task lookup' : '기존 작업 조회'}</span>
        </div>
        <div className={styles.migrationBridge}><span>{en ? 'Coexisting routes' : '공존하는 경로'}</span><svg viewBox="0 0 120 30" focusable="false"><path d="M0 15h118m-12-12 12 12-12 12" fill="none" stroke="currentColor" strokeWidth="2" /></svg></div>
        <div className={styles.migrationSideNext}>
          <span className={styles.migrationIndex}>02 / NEW SYSTEM</span>
          <strong>V2</strong>
          <div className={styles.migrationRule} />
          <span>{en ? 'New screens · APIs' : '새 화면 · API'}</span>
        </div>
      </div>
      <div className={styles.migrationFoot}><span>TRANSITION WITHOUT A HARD CUT</span><span>{en ? 'Illustrative diagram' : '설명용 구성'}</span></div>
    </div>
  );
}

export default function ProjectVisual({ kind, large = false, locale = 'ko' }: Props) {
  return (
    <div className={`${styles.visual} ${large ? styles.large : ''}`} role="img" aria-label={locale === 'ko' ? koreanDescriptions[kind] : englishDescriptions[kind]}>
      <div aria-hidden="true">
        {kind === 'bike' && <BikeVisual locale={locale} />}
        {kind === 'performance' && <PerformanceVisual locale={locale} />}
        {kind === 'bus' && <BusVisual locale={locale} />}
        {kind === 'migration' && <MigrationVisual locale={locale} />}
      </div>
    </div>
  );
}
