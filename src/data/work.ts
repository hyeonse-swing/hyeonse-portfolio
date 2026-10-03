import content from './content.json';

const presentation = {
  'bike-operations': { short: '바이크 주문과 계약 업무를 연결하다', brand: 'BIKE OPERATIONS', category: 'Product · Operations', year: '2026', color: 'sage', figure: 'bike', subtitle: '직원용 어드민과 사업자 조회 화면을 함께 만들었습니다.', number: '01', lesson: '직원의 주문·계약 업무와 사업자의 조회 흐름을 구분해 설계해야 했습니다.' },
  'swing-home-performance': { short: 'SWING 첫 화면의 표시 지연을 줄이다', brand: 'SWING WEB', category: 'Engineering · Performance', year: '2026', color: 'ink', figure: 'performance', subtitle: '렌더링과 전송 자원을 함께 살폈습니다.', number: '02', lesson: '렌더링 방식과 큰 미디어·폰트·외부 콘텐츠를 함께 수정하고, 같은 로컬 조건에서 전후를 비교했습니다.' },
  'yellow-bus': { short: 'Yellow Bus 운행 도구를 다시 만들다', brand: 'YELLOW BUS', category: 'Migration · Operations', year: '2024–25', color: 'yellow', figure: 'bus', subtitle: '분산된 운영 기능을 새 Admin의 운행 흐름으로 옮겼습니다.', number: '03', lesson: '배차와 탑승 상태, 정류장 변경이 실제 운영에서 이어지도록 기능과 권한을 정리했습니다.' },
  'swap-admin-v2': { short: 'SWAP Admin V1·V2의 공존을 다루다', brand: 'SWAP ADMIN', category: 'Architecture · Migration', year: '2025', color: 'lilac', figure: 'migration', subtitle: '기존 작업 데이터가 남아 있는 환경에서 V2 화면·API 전환에 참여했습니다.', number: '04', lesson: 'V2 화면과 API를 도입하는 동안 기존 작업 데이터의 조회 경로도 필요했습니다.' },
} as const;

export const works = ['bike-operations', 'swing-home-performance', 'yellow-bus', 'swap-admin-v2'].map(id => {
  const entry = content.featuredCases.find(item => item.id === id)!;
  return { ...entry, ...presentation[id as keyof typeof presentation] };
});
export type Work = (typeof works)[number];
export const profile = content;
