/**
 * Public subset of one synthetic qa:pr run from return-review-console
 * at ee41355585ac542a27585551c796011945d86b8e.
 */
export const approvalRegression = {
  date: '2026-11-19',
  sourceCommit: 'ee41355585ac542a27585551c796011945d86b8e',
  returnId: 'RET-2421',
  event: {
    id: 'bf817d2d-4cdd-4b9d-af58-a688ed3265aa',
    kind: 'HTTP 503',
    method: 'POST',
    path: '/api/returns/RET-2421/approve',
    sdkVersion: '0.2.18',
  },
  requirement: {
    id: 'R_3c3d691955346c61',
    source: 'qa/README.md',
    expected: '승인 완료',
    observedDuringFailure: '검수 대기',
  },
  case: {
    id: 'TC_3c3d691955346c61',
    name: '반품 승인 후 완료 상태 확인',
  },
  suiteHash: '86d38f075287c44a97cd3fc35fcff4e219ac7d5dc304ce0611cb8d9cc4866e6d',
  runs: {
    failure: {
      id: '57710d21-dfed-4161-9f2a-9365d4f2efb0',
      status: 'failed',
      gateExitCode: 2,
      finalAssertion: 'failed',
    },
    recovery: {
      id: 'd9a99ed4-3a1e-494c-a6b3-155706376f03',
      status: 'passed',
      gateExitCode: 0,
      finalAssertion: 'passed',
    },
  },
  screenshot: {
    path: '/evidence/return-desk-approval-fault.png',
    sha256: 'd22dc3f1632c088bcb2c1a194a0b28945be13f321536af3859cac743c15ecc58',
  },
} as const;
