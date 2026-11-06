import type { Locale } from '../lib/locale';

export type ToolchainStage = {
  id: 'browser-error-log' | 'error-to-test' | 'flow-qa';
  name: string;
  role: string;
  input: string;
  output: string;
  example: string;
  handoff: string;
};

type ToolchainCopy = {
  title: string;
  intro: string;
  exampleLabel: string;
  selectLabel: string;
  inputLabel: string;
  outputLabel: string;
  handoffLabel: string;
  projectLabel: string;
  allLabel: string;
  note: string;
  stages: readonly ToolchainStage[];
};

const copy: Record<Locale, ToolchainCopy> = {
  ko: {
    title: '오류에서 검토 가능한 실행 근거까지',
    intro: '세 개인 도구가 정보를 넘기는 방식을 가상의 사례로 따라가 보세요. 이 화면은 도구를 실행하지 않아요.',
    exampleLabel: '가상 예시 · 개인정보를 포함하지 않은 샘플',
    selectLabel: '살펴볼 도구',
    inputLabel: '받는 정보',
    outputLabel: '남기는 정보',
    handoffLabel: '다음으로 넘길 때',
    projectLabel: '프로젝트 자세히',
    allLabel: '세 단계 전체 읽기',
    note: '오류가 이전 기록에서만 보인다고 수정됐다는 뜻은 아니에요. 후보의 재현 조건과 기대 결과는 사람이 확인해야 하고, 실행 결과도 해당 스위트와 선택한 케이스 범위에서 읽어야 해요.',
    stages: [
      {
        id: 'browser-error-log',
        name: 'Browser Error Log',
        role: '브라우저 오류 수집과 조회',
        input: '앱에서 발생한 오류와 선택적으로 켠 정제된 페이지 맥락을 받아요.',
        output: '자체 호스팅 수집기·뷰어에서 필터링하고 내보낼 수 있는 오류 기록을 남겨요.',
        example: '예: 가상의 주문 화면에서 “Cannot read properties of undefined” 오류가 기록돼요. 주문 정보나 실제 URL은 이 예시에 없어요.',
        handoff: '검토할 오류 기록을 JSON으로 내보내 Error to Test의 입력으로 전달해요.',
      },
      {
        id: 'error-to-test',
        name: 'Error to Test',
        role: '오류를 회귀 테스트 후보로 정리',
        input: 'Browser Error Log 내보내기나 직접 적은 오류 제보를 받아요.',
        output: '오류 묶음과 출처를 유지한 검토용 후보를 만들고, 모르는 재현 조건·기대 결과는 질문으로 남겨요.',
        example: '예: “주문 확인 화면을 열기 전 어떤 상태였나요?”와 “정상 화면의 근거는 무엇인가요?”가 미확인 질문으로 남아요.',
        handoff: '사람이 질문을 확인하고 다시 분석한 뒤 Flow QA 묶음을 준비해요. 미확인 후보는 실행을 막아요.',
      },
      {
        id: 'flow-qa',
        name: 'Flow QA',
        role: '검토된 케이스 실행과 근거 기록',
        input: '원본 해시와 명시적 단계·assertion을 가진 검토된 케이스를 받아요.',
        output: '선택한 케이스의 브라우저 실행 시도와 증거를 보고서에 남겨요. Error to Test는 스위트 해시와 케이스 ID를 확인해 원본 오류 묶음에 결과를 연결할 수 있어요.',
        example: '예: 사람이 기대 결과를 확인한 가상 케이스만 선택해 실행하면, 그 케이스의 시도와 결과를 보고서에서 살펴봐요.',
        handoff: '보고서는 검증한 케이스와 실행 범위를 함께 읽어요. 실행하지 않은 케이스를 통과로 보지 않아요.',
      },
    ],
  },
  en: {
    title: 'From an error to reviewable run evidence',
    intro: 'Follow a fictional example through three personal tools and see what each passes on. This page does not run the tools.',
    exampleLabel: 'Fictional example · sanitized sample',
    selectLabel: 'Choose a tool',
    inputLabel: 'Input',
    outputLabel: 'Output',
    handoffLabel: 'Handoff',
    projectLabel: 'Project details',
    allLabel: 'Read all three stages',
    note: 'An error appearing only in an earlier input is not proof of a fix. A person must confirm a candidate’s setup and expected result. Run results must be read within the recorded suite and selected case scope.',
    stages: [
      {
        id: 'browser-error-log',
        name: 'Browser Error Log',
        role: 'Collect and inspect browser errors',
        input: 'Takes an app error and, when enabled, sanitized page context.',
        output: 'Keeps an error record that can be filtered and exported from the self-hosted collector and viewer.',
        example: 'Example: a fictional order page records “Cannot read properties of undefined”. No order data or real URL appears here.',
        handoff: 'Export the error record as JSON for Error to Test to analyze.',
      },
      {
        id: 'error-to-test',
        name: 'Error to Test',
        role: 'Shape errors into regression test candidates',
        input: 'Takes a Browser Error Log export or a manually entered error report.',
        output: 'Groups errors into reviewable candidates with their sources; unknown setup and expected behavior remain questions.',
        example: 'Example: “What state led to the order confirmation page?” and “What is the source for the expected screen?” remain open questions.',
        handoff: 'A person checks the questions and analyzes again before preparing a Flow QA suite. Unresolved candidates are blocked from execution.',
      },
      {
        id: 'flow-qa',
        name: 'Flow QA',
        role: 'Run reviewed cases and record evidence',
        input: 'Takes reviewed cases with a source hash, explicit steps and assertions.',
        output: 'Reports browser attempts and evidence for selected cases. Error to Test can check the suite hash and case IDs to link results back to the source error group.',
        example: 'Example: once a person confirms the expected behavior, the fictional case can be selected for a run and its attempts and results inspected.',
        handoff: 'Read the report with its suite and selection scope. An unrun case is not a pass.',
      },
    ],
  },
};

export function getToolchainCopy(locale: Locale): ToolchainCopy {
  return copy[locale];
}
