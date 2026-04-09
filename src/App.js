/* eslint-disable */
 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, HelpCircle, Eye, Edit3 } from 'lucide-react';

const GoalAchievementWorkbook = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('round1');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [showGuide, setShowGuide] = useState({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showRawAnswers, setShowRawAnswers] = useState(false);
  const [finalText, setFinalText] = useState('');

  const [basicInfo, setBasicInfo] = useState({ position: '', company: '', experience: '' });
  const [answers, setAnswers] = useState({});

  // ── 1라운드 질문 ───────────────────────────────────────────
  const round1Steps = [
    { id: 0, title: '기본 정보 입력', subtitle: '지원 직무, 회사, 목표달성 경험을 입력하세요' },
    {
      id: 1,
      title: 'Q1: 목표 정의',
      subtitle: '목표가 제대로 정의되어 있는가 — 기대효과와 도전 이유',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1-1. 달성하려 한 목표를 구체적으로 정의해주세요.',
          hint: '단순한 다짐이 아닌 명확한 목표 — 무엇을, 언제까지, 어느 수준으로',
          guide: {
            description: '좋은 목표는 달성 여부를 객관적으로 판단할 수 있어야 합니다. "열심히 공부하겠다"가 아닌 "3개월 안에 Python으로 데이터 분석 프로젝트 3개 완성"처럼 수치·기한·기준이 있어야 합니다.',
            diagnosis: '즉석자가진단: "목표를 달성했는지 어떻게 판단했나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: ['목표를 숫자나 기준으로 표현한다면?', '언제까지 달성하려 했나요?', '달성 여부를 어떻게 판단했나요?', '중간 목표(마일스톤)가 있었나요?'],
            ifDifficult: '"실력 향상"처럼 막연한 표현은 목표가 아닙니다. "어떤 상태가 되면 목표를 이룬 것인가?"라고 자문하며 기준을 찾아보세요.',
            ifStillDifficult: '목표 = 달성 기준 + 기한 + 수준. 이 세 가지가 모두 포함되면 제대로 정의된 목표입니다.'
          },
          placeholder: '예: 문과생 배경에서 데이터 분석가로 직무 전환을 위해, 3개월 안에 Python 기초부터 실전까지 독학하여 실제 데이터를 활용한 분석 프로젝트 3개를 GitHub에 완성·업로드하는 것이 목표였습니다. 달성 기준은 "SQL·Pandas·시각화를 독립적으로 활용해 인사이트를 도출할 수 있는가"였습니다.',
          rows: 4
        },
        {
          id: 'q1_1_2',
          label: 'Q1-2. 이 목표를 달성했을 때 기대했던 효과는 무엇이었나요?',
          hint: '목표 달성 후 어떤 변화를 기대했는가 — 개인·직무·팀 차원',
          guide: {
            description: '기대효과는 목표를 세운 이유를 보여줍니다. "좋을 것 같아서"가 아닌, 이 목표가 달성되면 어떤 구체적인 변화가 생길지 예측했던 내용을 서술하세요.',
            diagnosis: '즉석자가진단: "왜 그 목표였나요? 다른 목표를 세워도 됐지 않나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: ['이 목표를 달성하면 내 상황이 어떻게 달라질 것이라 기대했나요?', '커리어·업무·개인 성장 중 어떤 변화를 원했나요?', '이 목표가 아닌 다른 목표를 선택하지 않은 이유는?'],
            ifDifficult: '목표를 세우던 당시로 돌아가서 "이게 되면 뭐가 달라지지?"라고 생각했던 것을 떠올려보세요.',
            ifStillDifficult: '기대효과는 나중에 Q4(결과)와 연결됩니다. "예상했던 것"과 "실제로 된 것"의 비교가 스토리의 핵심입니다.'
          },
          placeholder: '예: 첫째, 데이터 분석 직무 지원 자격을 갖추는 것(커리어 전환). 둘째, 취업 후 팀에서 데이터를 직접 다룰 수 있어 업무 의존도를 낮추는 것(업무 효율). 셋째, "문과생도 할 수 있다"는 것을 스스로에게 증명하는 것(자기 확신).',
          rows: 4
        },
        {
          id: 'q1_1_3',
          label: 'Q1-3. 이 목표가 쉽지 않았던 이유는 무엇인가요?',
          hint: '왜 도전적인 목표였는가 — 외적 장벽과 내적 장벽 모두',
          guide: {
            description: '쉽지 않았던 이유가 구체적일수록 극복 과정의 설득력이 높아집니다. "어려웠다"가 아닌, 어떤 조건들이 이 목표를 도전적으로 만들었는지 밝히세요.',
            diagnosis: '즉석자가진단: "왜 많은 사람들이 이 목표를 포기하나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: ['배경이나 조건 면에서 불리한 점이 있었나요?', '시간·자원·환경 측면의 제약이 있었나요?', '이 목표에 필요한 선행 지식이나 경험이 부족했나요?', '스스로도 "할 수 있을까" 의심했던 부분은?'],
            ifDifficult: '도전의 어려움은 크게 세 가지입니다: ① 기초/배경 부족 ② 시간·환경 제약 ③ 불확실한 성공 가능성.',
            ifStillDifficult: '이 목표를 포기하는 것이 더 편한 선택이었다면 왜 그랬는지 생각해보세요.'
          },
          placeholder: '예: 세 가지 장벽이 있었습니다. ① 기초 없음: 프로그래밍 경험이 전무한 문과생. ② 시간 제약: 학기 중이라 하루 2~3시간만 확보 가능. ③ 불확실성: "문과생이 3개월에 이 수준까지 가능한가?"라는 회의감, 주변의 "너무 이상적"이라는 반응.',
          rows: 4
        }
      ]
    },
    {
      id: 2,
      title: 'Q2: 계획 수립',
      subtitle: '어떻게 달성할 것인가 — 계획의 논리와 근거',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q2-1. 목표를 달성하기 위해 수립한 계획은 무엇인가요?',
          hint: '단계별 실행 계획 — 왜 그 순서·방법을 선택했는지 포함',
          guide: {
            description: '계획은 "무엇을"만이 아니라 "왜 그 방법인가"가 함께 드러나야 합니다. 여러 선택지 중 이 방법을 택한 논리가 있어야 준비된 사람처럼 읽힙니다.',
            diagnosis: '즉석자가진단: "왜 하필 그 방법이었나요? 다른 방법은 안 됐나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: ['전체 계획을 단계로 나눈다면 몇 단계였나요?', '왜 그 순서였나요? (앞 단계가 뒷 단계의 기반이 되는 이유)', '참고한 자료나 조언이 있었나요?', '대안적 접근법과 비교해서 이 방법을 택한 이유는?'],
            ifDifficult: '계획을 수립할 때 참고했던 자료(로드맵, 선배 조언 등)를 떠올려보세요.',
            ifStillDifficult: '계획의 핵심은 "논리적 순서"입니다. 왜 A를 먼저 하고 B를 나중에 했는지 인과관계로 설명해보세요.'
          },
          placeholder: '예: 3단계로 설계했습니다. 1단계(1개월): Python 기초 문법 — 체계적 커리큘럼이 필요하다 판단해 온라인 강의 선택. 2단계(1개월): Pandas·Numpy 실습 — 실제 데이터셋으로 반복 훈련. 3단계(1개월): 실전 프로젝트 3개 완성. 이 순서는 현직 데이터 분석가 선배 3명에게 물어 수렴된 방식이었습니다.',
          rows: 5
        },
        {
          id: 'q1_2_2',
          label: 'Q2-2. 계획을 수립하는 과정에서 기대한 것은 무엇이었나요?',
          hint: '이 계획대로 했을 때 어떤 결과를 예상했는가 — 중간 지점의 기대',
          guide: {
            description: '"이렇게 하면 이렇게 될 것이다"라는 예측이 있었을 것입니다. 그 예측을 구체적으로 적으세요. 이것이 나중에 실제 결과와 비교되어 스토리의 깊이를 만들어냅니다.',
            diagnosis: '즉석자가진단: "계획대로 됐을 때 어떤 상태일 것이라 예상했나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: ['1개월 후, 2개월 후 각각 어떤 상태일 것이라 예상했나요?', '가장 어려울 것이라 예상한 구간은?', '최종적으로 어떤 결과물이 나올 것이라 예상했나요?'],
            ifDifficult: '계획을 처음 세울 때의 기대감을 떠올려보세요.',
            ifStillDifficult: '"이 방법으로 이 기간 동안 하면 이 수준에 도달할 것"이라는 형식으로 적어보세요.'
          },
          placeholder: '예: 1단계 완료 시 기본 코드 작성·수정 가능, 2단계 완료 시 실제 데이터에서 패턴 발견 가능, 3단계 완료 시 포트폴리오 3개 완성을 기대했습니다. 가장 어려울 것이라 예상한 구간은 1→2단계 전환 시점이었고, 이 구간에 시간을 더 배분했습니다.',
          rows: 4
        }
      ]
    },
    {
      id: 3,
      title: 'Q3: 실행과 극복',
      subtitle: '계획과 현실의 차이 — 예상치 못한 것들을 어떻게 넘었는가',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q3-1. 계획을 실행하면서 실제로 계획과 달랐던 점은 무엇이었나요?',
          hint: '예상과 현실의 차이 — 구체적인 갭과 상황',
          guide: {
            description: '"다 계획대로 됐다"는 답변은 설득력이 없습니다. 실제로 어떤 부분에서 계획이 틀어졌는지 솔직하고 구체적으로 서술하세요.',
            diagnosis: '즉석자가진단: "계획 중 가장 크게 빗나간 것은 무엇이었나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: ['예상보다 훨씬 어려웠던 부분은?', '예상보다 오래 걸린 구간은?', '아예 계획에 없던 문제가 생긴 적이 있나요?', '중간에 방향을 수정한 것이 있나요?'],
            ifDifficult: '"계획에 있었던 것"과 "실제 한 것"을 나란히 비교해보세요.',
            ifStillDifficult: '가장 힘들었던 순간이 언제였는지 떠올려보세요. 그 순간이 계획과 현실의 가장 큰 갭입니다.'
          },
          placeholder: '예: 두 가지 큰 차이가 있었습니다. ① 속도 차이: 1단계를 1개월에 끝낼 계획이었지만 6주가 걸렸습니다. "클래스와 객체" 개념에서 일주일이 통째로 막혔기 때문입니다. ② 방법 차이: 혼자 강의를 따라가는 방식이 막힌 개념 앞에서 완전히 정체됐습니다. 계획에 없던 "질문할 사람"이 필요해졌습니다.',
          rows: 4
        },
        {
          id: 'q1_3_2',
          label: 'Q3-2. 계획과 달랐던 것들을 어떻게 극복했나요?',
          hint: '극복 방법 — 시도한 것들, 실패한 것들, 결국 효과가 있었던 것',
          guide: {
            description: '처음 시도한 방법이 안 되어서 다른 방법을 쓰는 과정 자체가 스토리입니다. 한 번에 해결된 것보다 여러 시도를 거친 것이 오히려 더 설득력 있습니다.',
            diagnosis: '즉석자가진단: "처음 시도한 방법이 안 됐을 때 다음에 뭘 했나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: ['가장 먼저 어떻게 해결하려 했나요?', '그 방법이 효과가 없었다면 다음에는?', '최종적으로 효과가 있었던 방법은?', '극복하고 나서 계획을 어떻게 조정했나요?'],
            ifDifficult: '"이 방법이 한계가 있어서 저 방법으로 전환했다"는 것도 훌륭한 극복입니다.',
            ifStillDifficult: '"처음 시도 → 실패 또는 한계 → 다른 방법 → 결과"의 흐름으로 적어보세요.'
          },
          placeholder: '예: 방법 문제는 세 단계로 해결했습니다. ① Stack Overflow 검색 → 내 상황과 딱 맞는 답변 없음. ② 유튜브 다른 강사 영상 → 부분적 해결. ③ 온라인 Python 스터디 가입 → 실시간 질문·답변으로 막힌 개념을 3시간 만에 해결. 이후 스터디가 이 프로젝트 전체에서 가장 중요한 자원이 됐습니다.',
          rows: 5
        }
      ]
    },
    {
      id: 4,
      title: 'Q4: 결과와 임팩트',
      subtitle: '달성한 것과 그것이 만들어낸 변화 — 수치와 사실로',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q4-1. 목표를 달성한 결과는 어떠했나요?',
          hint: '구체적 성과 — 수치·사실·Before & After',
          guide: {
            description: '결과는 수치와 사실로 표현해야 합니다. Q1에서 정의한 달성 기준에 비춰 실제로 어떤 결과가 나왔는지를 서술하세요.',
            diagnosis: '즉석자가진단: "그 결과를 숫자로 표현한다면?"이라고 물으면 즉답 가능한가?',
            helpQuestions: ['Q1에서 정의한 목표 기준을 달성했나요?', '숫자로 표현할 수 있는 결과는?', '달성 전과 달성 후를 비교하면?', '객관적으로 증명할 수 있는 결과물이 있나요?'],
            ifDifficult: '"100% 달성"하지 못했더라도 괜찮습니다. "80% 달성, 미달된 부분은 이런 이유"처럼 솔직하게 서술하는 것이 오히려 신뢰를 줍니다.',
            ifStillDifficult: '"처음 상태"와 "지금 상태"를 비교하면 결과가 보입니다.'
          },
          placeholder: '예: 목표 대비 실제 결과: GitHub 프로젝트 3개 완성(목표 달성), Kaggle 대회 상위 15% 진입(목표 초과). 처음에는 "Hello World"도 몰랐던 상태에서 실제 기업 데이터를 SQL로 추출하고 Pandas로 분석해 인사이트를 도출하는 수준이 됐습니다.',
          rows: 4
        },
        {
          id: 'q1_4_2',
          label: 'Q4-2. 처음 목표를 수립할 때의 목적(기대효과)을 달성했나요?',
          hint: 'Q1에서 기대했던 효과가 실제로 실현됐는가 — 예상과 현실의 비교',
          guide: {
            description: 'Q1-2에서 적었던 기대효과를 다시 꺼내어, 그것이 실제로 충족됐는지 직접 비교해보세요. "기대했던 것 → 실제 된 것"의 구조로 서술하면 스토리의 완결성이 높아집니다.',
            diagnosis: '즉석자가진단: "목표를 세운 이유가 결국 해결됐나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: ['기대효과를 하나씩 확인해보세요. 실현됐나요?', '기대했던 것 중 실현되지 않은 것이 있나요? 왜?', '기대하지 않았는데 생긴 긍정적 변화가 있나요?'],
            ifDifficult: '"이 목표를 왜 세웠는지" 처음으로 돌아가서 그 이유가 지금 해결됐는지 확인해보세요.',
            ifStillDifficult: '기대효과를 100% 달성하지 못했더라도 좋습니다. 왜 일부는 충족됐고 일부는 안 됐는지 분석하는 것이 오히려 더 깊은 이야기입니다.'
          },
          placeholder: '예: Q1에서 세운 세 가지 기대효과를 점검하면 — ① 직무 전환 자격 확보: 충족. ② 업무 의존도 감소: 충족. 인턴 시작 후 첫 주부터 직접 쿼리를 작성했습니다. ③ 자기 확신: 충족 이상. "문과생도 된다"를 넘어 더 큰 자신감이 생겼습니다.',
          rows: 4
        },
        {
          id: 'q1_4_3',
          label: 'Q4-3. 이 목표를 달성한 것의 임팩트는 어떤 것들이 있었나요?',
          hint: '달성이 만들어낸 파급효과 — 나·주변·조직에 미친 영향',
          guide: {
            description: '임팩트는 목표 달성 자체를 넘어선 영향입니다. 나 개인에게만 그친 것인지, 주변이나 팀에도 영향을 미쳤는지 서술하세요.',
            diagnosis: '즉석자가진단: "이 결과가 당신과 주변에 어떤 영향을 미쳤나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: ['나 자신에게 미친 영향은?', '주변 사람(팀원·동료·후배)에게 미친 영향은?', '이 경험으로 인해 추가로 요청받거나 인정받은 것이 있나요?'],
            ifDifficult: '임팩트가 크게 느껴지지 않아도 괜찮습니다. 작은 변화라도 구체적이고 사실적으로 서술하면 됩니다.',
            ifStillDifficult: '"이 달성이 없었다면 일어나지 않았을 일"들을 나열해보세요. 그것이 임팩트입니다.'
          },
          placeholder: '예: 세 차원의 임팩트가 있었습니다. ① 개인: "새로운 기술을 혼자 익힐 수 있다"는 학습 자기효능감 확립 — 이후 SQL을 2주 만에 실무 수준으로 독학했습니다. ② 주변: 스터디원 2명이 제 방법론을 채택해 함께 목표를 달성했습니다. ③ 조직: 인턴십에서 팀의 수작업 리포트를 Python 자동화로 전환해 주간 4시간 절약 효과를 냈습니다.',
          rows: 5
        }
      ]
    },
    {
      id: 5,
      title: 'Q5: 노력 과정',
      subtitle: '과정이 제대로 드러났는가 — 노력의 질과 방식',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q5-1. 목표를 달성하기 위해 가장 집중적으로 노력한 순간과 방식은?',
          hint: '"열심히 했다"를 넘어 — 어떤 방식으로, 어떤 강도로 노력했는가',
          guide: {
            description: '"열심히 했다"는 누구나 쓰는 표현입니다. 구체적으로 언제, 어떤 방식으로, 어떤 강도로 노력했는지가 드러나야 합니다.',
            diagnosis: '즉석자가진단: "그 기간 동안 하루 일과가 어땠나요?"라고 물으면 구체적으로 답할 수 있는가?',
            helpQuestions: ['하루 일과를 구체적으로 묘사해보면?', '가장 힘들었지만 포기하지 않았던 순간은?', '이 목표만을 위해 포기한 것이 있었나요?', '스스로 만든 규칙이나 루틴이 있었나요?'],
            ifDifficult: '일주일 중 가장 대표적인 하루를 아침부터 밤까지 묘사해보세요.',
            ifStillDifficult: '"이 정도면 충분히 열심히 했다"고 느꼈던 순간을 중심으로 쓰세요.'
          },
          placeholder: '예: 평일은 저녁 9시~자정까지 3시간, 주말은 오전 9시~오후 6시까지 9시간 집중했습니다. 스스로 세운 규칙은 "오늘 이해 안 된 채로 자지 않기"였고, 이 규칙 덕분에 다음 날로 넘기는 습관을 막을 수 있었습니다.',
          rows: 4
        },
        {
          id: 'q1_5_2',
          label: 'Q5-2. 이 과정에서 당신만의 차별화된 접근법이 있었다면?',
          hint: '남들과 다른 나만의 방법 — 창의적 접근이나 독특한 방식',
          guide: {
            description: '거창한 차별화가 아니어도 됩니다. 일반적인 방법에서 본인이 조금이라도 다르게 한 것, 스스로 고안한 방법이 있다면 서술하세요.',
            diagnosis: '즉석자가진단: "이 방법은 본인이 만든 건가요, 아니면 일반적인 방법인가요?"라고 물으면 즉답 가능한가?',
            helpQuestions: ['주변에서 이 방법을 보고 신기하다거나 좋다고 했던 것이 있나요?', '다른 분야에서 아이디어를 빌려온 것이 있나요?', '이 접근법이 효과적이었던 이유는?'],
            ifDifficult: '"이 방법을 남들보다 더 체계적으로 사용했다"는 것도 차별화입니다.',
            ifStillDifficult: '없어도 됩니다. Q5-1의 노력 과정이 충분히 구체적이라면 이 질문은 보조적입니다.'
          },
          placeholder: '예: 저는 코딩 학습에 "교사 효과"를 적용했습니다. 매일 배운 내용을 "초등학생도 이해할 수 있게" 노션에 정리하는 습관을 만든 것입니다. 설명문 형식으로 쓰다 보니 이해가 안 된 부분이 즉시 드러났고, 그 빈칸을 채우는 방식으로 학습 완성도가 높아졌습니다.',
          rows: 4
        }
      ]
    },
    {
      id: 6,
      title: 'Q6: 배움과 기여',
      subtitle: '이 경험이 직무에서 어떤 역량이 되는가 — 연결의 논리',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q6-1. 이 목표를 세우고 달성하는 과정에서 배운 것은 무엇인가요?',
          hint: '기술적 배움과 비기술적 배움 모두 — 행동·사고·태도의 변화',
          guide: {
            description: '배움은 기술 습득만이 아닙니다. 이 과정에서 변화된 행동 방식, 사고 패턴, 태도까지 포함됩니다.',
            diagnosis: '즉석자가진단: "이 경험 이전과 이후 당신이 달라진 점은?"이라고 물으면 즉답 가능한가?',
            helpQuestions: ['기술적으로 새롭게 할 수 있게 된 것은?', '일하는 방식이나 문제를 대하는 태도가 어떻게 달라졌나요?', '실패나 계획 차질을 겪으며 배운 것은?'],
            ifDifficult: '배움을 "기술 + 방법론 + 태도" 세 가지로 나눠서 각각 한 줄씩 써보세요.',
            ifStillDifficult: '"이 경험이 없었다면 몰랐을 것"들을 나열해보세요. 그것이 배움입니다.'
          },
          placeholder: '예: 세 가지를 배웠습니다. ① 기술: Python·Pandas·SQL 실무 활용 능력. ② 방법론: "큰 문제를 작은 단위로 분해한 뒤 하나씩 해결하는" 문제해결 방식. ③ 태도: 계획은 바뀌는 것이 정상이며, 변화에 맞춰 조정하는 유연성이 포기보다 훨씬 강한 전략입니다.',
          rows: 4
        },
        {
          id: 'q1_6_2',
          label: 'Q6-2. 이 배움이 지원하는 직무와 어떻게 연결되나요?',
          hint: '경험 → 직무 연결 — 구체적인 업무 상황으로',
          guide: {
            description: '"도움이 될 것 같다"는 설득력이 없습니다. "이 직무의 이 업무에서 이 역량이 이렇게 쓰인다"는 구체적인 연결이 필요합니다.',
            diagnosis: '즉석자가진단: "입사 첫 달에 이 역량이 어떤 업무에서 쓰일 것 같나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: ['지원 직무의 주요 업무를 꺼내어, 각 업무에 어떤 역량이 연결되는지 매핑해보세요.', '기술적 역량이 아닌 방법론·태도는 어떤 업무 상황에서 쓰일까요?', '이 역량이 없었다면 이 직무를 하는 데 어떤 한계가 있었을까요?'],
            ifDifficult: '지원 직무 채용공고의 "주요 업무" 항목을 열어두고, 각 업무에 내 역량을 1:1로 연결해보세요.',
            ifStillDifficult: '"이 역량이 있어서 이 업무를 할 수 있다" / "없었다면 이 업무를 할 수 없었을 것"이라는 문장으로 연결하세요.'
          },
          placeholder: '예: 지원 직무(데이터 분석)의 주요 업무와 연결하면 — ① 데이터 수집·전처리: SQL·Python 역량이 직접 연결됩니다. ② 인사이트 도출: "문제 분해 → 탐색 → 패턴 발견"의 방법론이 그대로 쓰입니다. ③ 보고서 작성: 노션 정리 습관으로 키운 "복잡한 것을 단순하게 설명하는 능력"이 리포팅에 연결됩니다.',
          rows: 5
        },
        {
          id: 'q1_6_3',
          label: 'Q6-3. 이렇게 체득한 역량으로 지원 직무에 어떻게 기여할 수 있나요?',
          hint: '기여의 구체적 그림 — "도움이 되겠다"가 아닌 인과의 결론',
          guide: {
            description: '기여는 의지 선언이 아닙니다. "이 역량이 있기 때문에 이 업무에서 이렇게 기여할 수 있다"는 논리적 인과관계가 보여야 합니다.',
            diagnosis: '즉석자가진단: "왜 그 기여가 가능하다고 생각하나요?"라고 물으면 경험을 근거로 즉답 가능한가?',
            helpQuestions: ['"이 역량 때문에" + "이 직무에서" + "이렇게 기여할 수 있다"를 한 문장으로 써보세요.', '기여의 근거가 "열심히 하겠다"가 아닌 "이미 해봤다"는 경험에 있나요?', '입사 후 3개월 안에 어떤 기여가 가능할까요?'],
            ifDifficult: 'Q6-2에서 연결한 직무-역량 연결을 다시 보고, "그래서 어떤 기여가 가능한가"로 이어보세요.',
            ifStillDifficult: '"이 경험 덕분에 이 직무에서 하지 않아도 되는 실수"가 있다면 그것도 기여입니다.'
          },
          placeholder: '예: "문과생의 데이터 분석 독학" 경험이 두 가지 직접적인 기여로 이어집니다. ① 기술 기여: 입사 직후부터 SQL·Python으로 독립적인 데이터 추출·분석이 가능해 선임에게 의존 없이 업무를 진행할 수 있습니다. ② 방법론 기여: "계획 → 실행 → 차이 발견 → 조정"의 반복 사이클로 처음 맡는 프로젝트에서도 단계적으로 접근해 기여할 수 있습니다.',
          rows: 5
        }
      ]
    }
  ];

  // ── 2라운드 심화 질문 ──────────────────────────────────────
  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q1 심화-1. 이 목표를 세우게 된 결정적 순간을 장면으로 묘사해보세요.',
        hint: '날짜·장소·대화·감정 — 영화의 한 씬처럼',
        guide: {
          description: '목표의 출발점이 되는 순간을 생생하게 묘사하면 읽는 사람이 공감합니다.',
          diagnosis: '즉석자가진단: "그날 뭘 보거나 들었나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: ['정확히 어디에서였나요?', '무엇을 보거나 듣고 결심했나요?', '그 순간 어떤 감정이었나요?'],
          ifDifficult: '"이대로는 안 되겠다"는 생각이 든 순간을 떠올려보세요.',
          ifStillDifficult: '정확한 날짜가 기억 안 나도 됩니다. 어떤 상황이었는지 상황을 중심으로 묘사해보세요.'
        },
        placeholder: '예: 2023년 9월 첫 주 월요일, 전공 수업에서 교수님이 Python 코드를 화면에 띄우셨을 때입니다. 옆자리 친구는 "이거 저번에 해봤는데 쉽던데"라고 속삭였고, 저는 화면에 있는 게 무엇인지조차 몰랐습니다. "이대로 졸업하면 나는 데이터 분석가가 될 수 없겠구나"라는 생각이 들었습니다.',
        rows: 5
      },
      {
        id: 'q2_1_2',
        label: 'Q1 심화-2. 이 목표 대신 더 쉬운 선택지가 있었다면 왜 이 목표를 택했나요?',
        hint: '목표 선택의 이유 — 쉬운 길을 두고 어려운 길을 택한 이유',
        guide: {
          description: '"더 쉬운 선택지가 있었는데도 이것을 택했다"는 논리가 가치관을 드러냅니다.',
          diagnosis: '즉석자가진단: "왜 그냥 더 쉬운 방법을 택하지 않았나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: ['더 쉬운 선택지는 무엇이었나요?', '그 선택지를 택하지 않은 이유는?', '이 어려운 목표를 택하게 만든 가치관이나 신념은?'],
          ifDifficult: '"안 했다면 후회했을까요?"라고 자문해보세요.',
          ifStillDifficult: '목표 달성 후 "이걸 안 했다면 어떻게 됐을까"를 생각해보고 역으로 서술해보세요.'
        },
        placeholder: '예: 더 쉬운 선택은 "관련 자격증만 따는 것"이었습니다. 하지만 실제 포트폴리오 없이 자격증만으로는 "할 수 있다"를 증명하기 어렵다는 것을 현직자 인터뷰를 통해 파악했습니다. 더 긴 시간이 걸리더라도 실제 프로젝트 결과물로 증명하는 것이 결국 빠른 길이라고 판단했습니다.',
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2 심화-1. 계획을 수립하는 과정에서 고려하고 버린 대안들은 무엇이었나요?',
        hint: '선택하지 않은 방법들 — 왜 버렸는가',
        guide: {
          description: '고려했지만 버린 대안들을 함께 서술하면 계획의 논리가 더 강해집니다.',
          diagnosis: '즉석자가진단: "다른 방법도 있었을 텐데 왜 이 방법이었나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: ['처음에 고려했다가 포기한 방법은?', '그 방법을 버린 이유는?', '최종적으로 선택한 방법의 장점은?'],
          ifDifficult: '계획을 세울 때 "이렇게 할까, 저렇게 할까" 고민했던 것을 떠올려보세요.',
          ifStillDifficult: '오프라인 학원 vs 온라인 독학, 자격증 vs 프로젝트 등 일반적인 선택지와 비교해보세요.'
        },
        placeholder: '예: ① 오프라인 학원: 학기 중 고정 시간 확보 불가로 제외. ② 부트캠프: 비용 200만원 이상으로 어려움. ③ 유튜브 독학: 체계가 없어 방향을 잃을 가능성. 최종 선택(유료 온라인 강의 + 스터디)은 세 가지 단점을 모두 보완한 방식이었습니다.',
        rows: 4
      },
      {
        id: 'q2_2_2',
        label: 'Q2 심화-2. 계획을 수립할 때 참고한 정보나 조언이 있나요?',
        hint: '근거 있는 계획 — 어떤 정보를 어떻게 수집했는가',
        guide: {
          description: '누구에게 물어봤는지, 어떤 자료를 참고했는지가 드러나면 계획 수립 능력이 증명됩니다.',
          diagnosis: '즉석자가진단: "그 계획이 옳다는 것을 어떻게 알았나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: ['현직자, 선배, 커뮤니티 등 누군가에게 조언을 구했나요?', '참고한 로드맵이나 자료가 있나요?', '그 정보가 계획에 어떻게 반영됐나요?'],
          ifDifficult: '유튜브 추천 영상, 블로그 로드맵, 커뮤니티 글도 모두 참고 자료입니다.',
          ifStillDifficult: '아무런 참고 없이 계획을 세운 사람은 없습니다. 아주 작은 것이라도 참고한 것을 떠올려보세요.'
        },
        placeholder: '예: ① 현직 데이터 분석가 선배에게 "처음 독학 시 가장 비효율적인 방법이 무엇이었나요?"라고 물었습니다. ② "데이터 분석가 독학 로드맵" 블로그 5개를 비교해 공통 학습 순서를 파악했습니다. ③ 실제 신입 공고 10개의 자격요건을 정리해 "최소 필요 기술 스택"을 목표 수준으로 설정했습니다.',
        rows: 5
      }
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q3 심화-1. 계획이 틀어진 순간을 가장 생생하게 묘사해보세요.',
        hint: '그 순간의 상황·감정·생각 — 구체적인 장면으로',
        guide: {
          description: '위기의 순간을 생생하게 묘사할수록 극복의 의미가 커집니다.',
          diagnosis: '즉석자가진단: "그때 어떤 생각을 했나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: ['정확히 어떤 상황이었나요?', '그 순간 어떤 생각이 들었나요?', '"포기할까"라는 생각이 든 적이 있나요?'],
          ifDifficult: '가장 힘들었던 밤을 떠올려보세요.',
          ifStillDifficult: '계획이 예상대로 안 됐을 때 처음 느낀 감정부터 시작해보세요.'
        },
        placeholder: '예: 3주차 금요일 밤 11시, 같은 에러 메시지를 6시간째 보고 있었습니다. "나는 이 분야에 재능이 없는 게 아닐까"라는 생각이 처음으로 들었습니다.',
        rows: 4
      },
      {
        id: 'q2_3_2',
        label: 'Q3 심화-2. 극복 과정에서 처음에 시도한 방법이 실패했다면 어떻게 됐나요?',
        hint: '시행착오 — 처음 시도가 안 됐을 때 어떻게 했는가',
        guide: {
          description: '극복이 한 번에 된 것보다 여러 번의 시도를 거친 것이 더 강합니다.',
          diagnosis: '즉석자가진단: "처음 시도한 방법이 안 됐을 때 어떻게 했나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: ['처음에 어떻게 해결하려 했나요?', '두 번째, 세 번째로 무엇을 시도했나요?', '최종적으로 효과가 있었던 방법을 찾기까지 얼마나 걸렸나요?'],
          ifDifficult: '극복에 사용한 방법이 여러 개라면 시간 순서대로 나열해보세요.',
          ifStillDifficult: '"처음 시도 → 결과 → 다음 시도 → 결과"의 반복으로 서술해보세요.'
        },
        placeholder: '예: ① 혼자 구글링(3시간) → 내 에러와 같은 케이스 없음. ② 공식 문서 탐독(1시간) → 더 혼란스러워짐. ③ 스터디 오픈 채팅방에 질문 게시 → 30분 후 유사 경험자가 원인 설명 → 해결. 결국 "혼자 해결"의 한계를 인정하고 질문하는 것이 최선이었다는 교훈을 얻었습니다.',
        rows: 4
      }
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q4 심화-1. 기대효과 중 충족되지 않은 것이 있다면 왜 그랬나요?',
        hint: '미달된 기대효과 분석 — 솔직한 평가',
        guide: {
          description: '기대효과를 100% 달성하지 못한 것이 있다면 솔직하게 인정하고 이유를 분석하는 것이 신뢰를 높입니다.',
          diagnosis: '즉석자가진단: "기대했던 것 중 아직 안 된 것이 있나요?"라고 물으면 솔직하게 즉답 가능한가?',
          helpQuestions: ['기대효과 목록을 다시 보면 달성되지 않은 것이 있나요?', '왜 그것이 달성되지 않았나요?', '앞으로 달성하기 위한 계획이 있나요?'],
          ifDifficult: '모든 기대효과가 달성됐다면 "예상보다 더 큰 효과가 있었던 것"을 서술해보세요.',
          ifStillDifficult: '기대했던 것과 실제 결과 사이의 갭을 솔직하게 비교해보세요.'
        },
        placeholder: '예: "한 달 만에 취업 가능한 수준 도달"이라는 기대는 미달됐습니다. 현실적으로 3개월이 걸렸고 면접 통과까지 6개월이 필요했습니다. 목표는 달성했지만 타임라인에 대한 기대가 지나치게 낙관적이었다는 것을 배웠습니다.',
        rows: 4
      },
      {
        id: 'q2_4_2',
        label: 'Q4 심화-2. 이 달성이 다음 목표나 도전에 어떤 영향을 미쳤나요?',
        hint: '연쇄 임팩트 — 이 경험이 만들어낸 다음 변화',
        guide: {
          description: '하나의 목표 달성이 다음 도전에 영향을 미쳤다면 임팩트가 더 깊어집니다.',
          diagnosis: '즉석자가진단: "이 경험 덕분에 그다음에 무엇을 다르게 했나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: ['이 경험이 없었다면 시도하지 않았을 다음 도전이 있나요?', '이 경험의 방법론을 다른 목표에 적용한 것이 있나요?'],
          ifDifficult: '"이 경험 이후 달라진 행동이나 결정이 있다면 무엇인지 떠올려보세요.',
          ifStillDifficult: '"이 경험 이후 달라진 행동이나 결정이 있다면 무엇인지 떠올려보세요.'
        },
        placeholder: '예: 이 경험이 두 가지 연쇄 도전을 만들었습니다. ① SQL을 동일한 단계별 방식으로 2주 만에 실무 수준으로 독학했습니다. ② 취업 준비에서도 "포트폴리오 3개 완성"이라는 구체적 목표 설정법을 그대로 적용했습니다.',
        rows: 4
      }
    ],
    5: [
      {
        id: 'q2_5_1',
        label: 'Q5 심화-1. 가장 포기하고 싶었던 순간과 그것을 이겨낸 이유는?',
        hint: '한계점에서의 선택 — 포기하지 않은 이유',
        guide: {
          description: '포기하고 싶었던 순간이 있었다는 것 자체가 이 목표가 진짜 도전이었음을 증명합니다.',
          diagnosis: '즉석자가진단: "왜 그때 포기하지 않았나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: ['가장 포기하고 싶었던 순간은 언제였나요?', '그 순간 무슨 생각이 들었나요?', '포기하지 않은 결정적 이유는?'],
          ifDifficult: '포기하고 싶다는 생각이 구체적으로 든 날이 있었나요?',
          ifStillDifficult: '"계속해야 할 이유"를 스스로에게 말했던 것을 떠올려보세요.'
        },
        placeholder: '예: 4주차에 진도가 계획보다 2주 밀렸을 때입니다. 실제로 이틀 동안 컴퓨터를 켜지 않았습니다. 돌아온 계기는 "오늘 30분만 하자"고 자신과 타협한 것이었고, 그 30분이 2시간이 됐습니다.',
        rows: 4
      },
      {
        id: 'q2_5_2',
        label: 'Q5 심화-2. 이 과정에서 당신의 노력을 인정해준 사람이나 순간이 있었나요?',
        hint: '외부 인정 — 주변의 반응과 피드백',
        guide: {
          description: '자신의 노력이 외부에서 어떻게 인식됐는지를 서술하면 객관성이 생깁니다.',
          diagnosis: '즉석자가진단: "이 과정을 주변에서 어떻게 봤나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: ['누군가가 이 노력을 직접 언급하거나 인정한 적이 있나요?', '이 경험으로 인해 어떤 요청이나 제안을 받은 적이 있나요?'],
          ifDifficult: '"대단하다", "어떻게 했어?"라는 말도 인정입니다.',
          ifStillDifficult: '주변의 반응이 없었다면 그것도 솔직하게 쓰고, 스스로 느낀 성취감을 서술해도 됩니다.'
        },
        placeholder: '예: 두 가지 순간이 기억납니다. ① 스터디 그룹장이 "니 설명 방식이 이해하기 제일 쉽다"며 다음 스터디 발표를 맡아달라 요청했습니다. ② 인턴십 면접에서 포트폴리오를 보던 면접관이 "혼자 한 거 맞아요? 코드 품질이 신입치고 이상하게 높네요"라고 했습니다.',
        rows: 4
      }
    ],
    6: [
      {
        id: 'q2_6_1',
        label: 'Q6 심화-1. 이 경험에서 배운 방법론을 다른 상황에 적용한 사례가 있나요?',
        hint: '범용성 증명 — 한 번만 쓴 것이 아닌 반복 활용',
        guide: {
          description: '배운 방법론이 다른 상황에서도 적용됐다면, 그것이 단순한 운이 아닌 진짜 역량임을 증명합니다.',
          diagnosis: '즉석자가진단: "이 방법을 다른 곳에도 썼나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: ['이 경험의 방식을 다른 학업·취업·일상에 적용한 것이 있나요?', '같은 방법으로 다른 목표도 달성한 것이 있나요?'],
          ifDifficult: '이 경험 이후에 시도한 다른 도전들을 떠올려보세요.',
          ifStillDifficult: '아직 다른 곳에 적용하지 못했다면, 앞으로 이 직무에서 어떻게 적용할지를 서술해도 됩니다.'
        },
        placeholder: '예: SQL 학습(2주 완성): Python 때의 "단계별 프로젝트 완성" 방식을 그대로 적용해 2주 만에 실무 수준에 도달했습니다. 취업 준비에서도 "목표 수치화"를 적용해 "서류 합격률 50%"를 목표로 설정하고 주차별 결과를 기록해 전략을 조정했습니다.',
        rows: 4
      },
      {
        id: 'q2_6_2',
        label: 'Q6 심화-2. 이 역량으로 입사 후 실제로 어떤 업무에 기여할 수 있는지 구체적으로 그려보세요.',
        hint: '입사 후 첫 3개월 시나리오 — 구체적 업무 상황',
        guide: {
          description: '"잘 할 수 있을 것 같다"가 아닌 실제 업무 시나리오로 기여를 그려보세요.',
          diagnosis: '즉석자가진단: "입사 첫 주에 어떤 업무를 독립적으로 할 수 있나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: ['지원 직무 채용공고의 주요 업무 3가지를 적어보세요.', '그 업무 각각에 내 역량이 어떻게 연결되나요?', '처음 맡게 될 업무에서 남들보다 빠르게 기여할 수 있는 것은?'],
          ifDifficult: '지원 직무의 일상적인 하루 업무를 상상해보고, 내가 바로 할 수 있는 것을 찾아보세요.',
          ifStillDifficult: '"이 역량이 없는 신입과 있는 신입의 첫 3개월 차이"를 상상해보고 그 차이를 서술해보세요.'
        },
        placeholder: '예: 입사 후 1개월 시나리오: 팀의 주간 데이터 리포트 작성 업무를 맡을 경우, SQL로 원하는 데이터를 직접 추출하고 Python으로 시각화해 독립적으로 완성할 수 있습니다. 3개월 시나리오: 반복되는 리포트 작업이 있다면 Python으로 자동화해 팀 업무 시간을 줄이는 것도 가능합니다.',
        rows: 5
      }
    ]
  };

  // ── 3라운드 연결 질문 ──────────────────────────────────────
  const round3Questions = [
    {
      id: 'connect_q1q2',
      label: '연결 Q1→Q2: 목표 정의에서 계획 수립으로',
      hint: 'Q1에서 정의한 목표와 기대효과가 Q2의 계획으로 어떻게 논리적으로 이어지나요? "이 목표였기 때문에 이 계획이었다"는 연결이 드러나야 합니다.',
      placeholder: '예: "데이터 분석 프로젝트 3개 완성"이라는 수치 목표와 "직무 전환 자격 확보"라는 기대효과가 있었기 때문에, 단순한 강의 수강이 아닌 실제 결과물을 만드는 방향으로 계획을 설계했습니다...',
      rows: 4,
      referenceSteps: [1, 2],
      referenceQuestions: ['q1_1_1', 'q1_1_2', 'q1_2_1']
    },
    {
      id: 'connect_q2q3',
      label: '연결 Q2→Q3: 계획에서 실행·극복으로',
      hint: 'Q2의 계획이 Q3에서 현실과 부딪혔을 때 어떻게 연결되나요? "계획대로 됐다"가 아닌 "계획과 달랐고, 그래서 이렇게 했다"는 인과 흐름이 중요합니다.',
      placeholder: '예: 체계적으로 수립했던 계획도 실제 실행 과정에서는 예상보다 훨씬 더 큰 벽과 마주쳤습니다. 그리고 그 벽이 오히려 더 나은 방법을 찾게 하는 계기가 됐습니다...',
      rows: 4,
      referenceSteps: [2, 3],
      referenceQuestions: ['q1_2_1', 'q1_2_2', 'q1_3_1']
    },
    {
      id: 'connect_q3q4',
      label: '연결 Q3→Q4: 극복에서 결과·임팩트로',
      hint: 'Q3의 극복 과정이 Q4의 결과와 임팩트로 어떻게 이어지나요? 극복의 방식이 결과의 질을 어떻게 높였는지 연결하세요.',
      placeholder: '예: 처음 계획에 없던 스터디를 활용하게 된 것이 결과적으로 목표를 달성한 것을 넘어 예상치 못한 추가 임팩트를 만들어냈습니다...',
      rows: 4,
      referenceSteps: [3, 4],
      referenceQuestions: ['q1_3_1', 'q1_3_2', 'q1_4_1']
    },
    {
      id: 'connect_q4q6',
      label: '연결 Q4→Q6: 결과·임팩트에서 배움과 기여로',
      hint: 'Q4의 결과와 임팩트가 Q6의 배움 및 직무 기여로 어떻게 이어지나요? "이 경험 덕분에 이것을 배웠고, 그래서 이 직무에서 이렇게 기여할 수 있다"는 흐름이 핵심입니다.',
      placeholder: '예: 목표 달성 과정의 모든 경험이 단순한 기술 습득이 아닌 "새로운 것을 배우는 방법 자체"를 익힌 것이었고, 이것이 입사 후 가장 빠르게 발휘될 수 있는 역량입니다...',
      rows: 5,
      referenceSteps: [4, 6],
      referenceQuestions: ['q1_4_1', 'q1_4_3', 'q1_6_1', 'q1_6_2']
    },
    {
      id: 'connect_full',
      label: '최종 연결: 전체 흐름으로 스토리 완성',
      hint: '목표 정의 → 계획 → 실행·극복 → 결과·임팩트 → 배움·기여의 전체 흐름을 하나의 완결된 스토리로 연결하세요.',
      placeholder: '첫 문장(주제문)부터 시작해 전체 흐름을 하나의 이야기로 연결하세요...',
      rows: 8,
      referenceSteps: [1, 2, 3, 4, 5, 6],
      referenceQuestions: ['q1_1_1', 'q1_1_2', 'q1_2_1', 'q1_3_1', 'q1_4_1', 'q1_4_3', 'q1_6_1', 'q1_6_3']
    }
  ];

  // ── 핸들러 ─────────────────────────────────────────────────
  const handleAnswerChange = (questionId, value) => setAnswers(prev => ({ ...prev, [questionId]: value }));
  const handleBasicInfoChange = (field, value) => setBasicInfo(prev => ({ ...prev, [field]: value }));
  const toggleGuide = (questionId) => setShowGuide(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  const toggleStepSelection = (stepId) => setSelectedSteps(prev =>
    prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
  );

  const goToNextStep = () => {
    if (currentPhase === 'round1') {
      if (currentStep < round1Steps.length - 1) setCurrentStep(currentStep + 1);
      else setCurrentPhase('evaluation');
    } else if (currentPhase === 'evaluation') {
      setSelectedSteps([...selectedSteps].sort((a, b) => a - b));
      setCurrentPhase('round2'); setCurrentStep(0);
    } else if (currentPhase === 'round2') {
      if (currentStep < selectedSteps.length - 1) setCurrentStep(currentStep + 1);
      else { setCurrentPhase('round3'); setCurrentStep(0); }
    } else if (currentPhase === 'round3') {
      if (currentStep < round3Questions.length - 1) setCurrentStep(currentStep + 1);
      else { setFinalText(generateGoalStory()); setCurrentPhase('completed'); }
    }
  };

  const goToPrevStep = () => {
    if (currentPhase === 'completed') { setCurrentPhase('round3'); setCurrentStep(round3Questions.length - 1); }
    else if (currentStep > 0) setCurrentStep(currentStep - 1);
    else if (currentPhase === 'round3') { setCurrentPhase('round2'); setCurrentStep(selectedSteps.length - 1); }
    else if (currentPhase === 'round2') setCurrentPhase('evaluation');
    else if (currentPhase === 'evaluation') { setCurrentPhase('round1'); setCurrentStep(round1Steps.length - 1); }
    else if (currentPhase === 'round1' && currentStep === 0) setShowIntro(true);
  };

  const generateGoalStory = () => {
    const parts = [];
    if (answers.connect_full) {
      parts.push(answers.connect_full);
    } else {
      if (answers.connect_q1q2) parts.push(answers.connect_q1q2);
      else { if (answers.q1_1_1) parts.push(answers.q1_1_1); if (answers.q1_1_2) parts.push(answers.q1_1_2); }
      if (answers.connect_q2q3) parts.push('\n' + answers.connect_q2q3);
      else { if (answers.q1_2_1) parts.push('\n' + answers.q1_2_1); if (answers.q1_3_1) parts.push(answers.q1_3_1); if (answers.q1_3_2) parts.push(answers.q1_3_2); }
      if (answers.connect_q3q4) parts.push('\n' + answers.connect_q3q4);
      else { if (answers.q1_4_1) parts.push('\n' + answers.q1_4_1); if (answers.q1_4_2) parts.push(answers.q1_4_2); }
      if (answers.connect_q4q6) parts.push('\n' + answers.connect_q4q6);
      else { if (answers.q1_4_3) parts.push('\n' + answers.q1_4_3); if (answers.q1_6_1) parts.push(answers.q1_6_1); if (answers.q1_6_2) parts.push(answers.q1_6_2); if (answers.q1_6_3) parts.push('\n' + answers.q1_6_3); }
    }
    return parts.join('\n\n');
  };

  const downloadFinalText = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>목표달성</title><style>body{font-family:'맑은 고딕','Malgun Gothic',sans-serif;line-height:1.8;padding:40px;}p{margin-bottom:1em;}</style></head><body>${finalText.split('\n\n').map(para => `<p>${para.replace(/\n/g,'<br>')}</p>`).join('\n')}</body></html>`;
    const blob = new Blob([html], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${basicInfo.company || '회사'}_목표수립및달성.doc`; a.click();
    URL.revokeObjectURL(url); setDownloadSuccess(true); setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const getRawAnswersText = () =>
    `📋 원본 답변 모음\n\n[기본 정보]\n직무: ${basicInfo.position||'-'}\n회사: ${basicInfo.company||'-'}\n목표달성 경험: ${basicInfo.experience||'-'}\n\n[Q1: 목표 정의]\nQ1-1 목표 정의: ${answers.q1_1_1||'-'}\nQ1-2 기대효과: ${answers.q1_1_2||'-'}\nQ1-3 쉽지 않은 이유: ${answers.q1_1_3||'-'}\n\n[Q2: 계획 수립]\nQ2-1 계획: ${answers.q1_2_1||'-'}\nQ2-2 계획의 기대: ${answers.q1_2_2||'-'}\n\n[Q3: 실행과 극복]\nQ3-1 달랐던 점: ${answers.q1_3_1||'-'}\nQ3-2 극복 방법: ${answers.q1_3_2||'-'}\n\n[Q4: 결과와 임팩트]\nQ4-1 달성 결과: ${answers.q1_4_1||'-'}\nQ4-2 기대효과 달성: ${answers.q1_4_2||'-'}\nQ4-3 임팩트: ${answers.q1_4_3||'-'}\n\n[Q5: 노력 과정]\nQ5-1 노력 방식: ${answers.q1_5_1||'-'}\nQ5-2 차별화 접근: ${answers.q1_5_2||'-'}\n\n[Q6: 배움과 기여]\nQ6-1 배운 것: ${answers.q1_6_1||'-'}\nQ6-2 직무 연결: ${answers.q1_6_2||'-'}\nQ6-3 기여 방안: ${answers.q1_6_3||'-'}\n\n[3라운드 연결]\nQ1→Q2: ${answers.connect_q1q2||'-'}\nQ2→Q3: ${answers.connect_q2q3||'-'}\nQ3→Q4: ${answers.connect_q3q4||'-'}\nQ4→Q6: ${answers.connect_q4q6||'-'}\n최종 완성: ${answers.connect_full||'-'}`;

  const canGoNext = () => {
    if (currentPhase === 'evaluation') return selectedSteps.length >= 1;
    if (currentStep === 0 && currentPhase === 'round1') return basicInfo.position && basicInfo.company && basicInfo.experience;
    return true;
  };

  const progress = currentPhase === 'round1'
    ? ((currentStep + 1) / round1Steps.length) * 33
    : currentPhase === 'round2'
    ? 33 + ((currentStep + 1) / Math.max(selectedSteps.length, 1)) * 33
    : 66 + ((currentStep + 1) / round3Questions.length) * 34;

  // ── 비밀번호 화면 ──────────────────────────────────────────
  // ── 인트로 화면 ────────────────────────────────────────────
  if (showIntro) {
    return (
      React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8"    ,}
        , React.createElement('div', { className: "max-w-4xl mx-auto" ,}
          , React.createElement('div', { className: "bg-white rounded-lg shadow-2xl p-8"   ,}
            , React.createElement('h1', { className: "text-4xl font-bold text-gray-800 mb-4 text-center"    ,}, "질문에 답하며 완성하는"  , React.createElement('br', null ), "목표수립 및 달성 워크북"   )
            , React.createElement('p', { className: "text-center text-gray-600 mb-8"  ,}, "CareerEngineer의 3라운드 체계적 작성 시스템"    )

            , React.createElement('div', { className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6"     ,}
              , React.createElement('h2', { className: "text-2xl font-bold text-gray-800 mb-4"   ,}, "3라운드 작성 시스템"  )
              , React.createElement('div', { className: "space-y-3",}
              , [
                ['border-blue-500', '1라운드: 기본 답변 작성', 'Q1~Q6 핵심 질문에 기본 답변 — 스토리의 뼈대 완성'],
                ['border-indigo-500', '2라운드: 약한 부분 보강', '부족한 질문 선택 → 심화 질문으로 구체화'],
                ['border-purple-500', '3라운드: 연결 및 완성', '질문 간 연결로 하나의 완결된 스토리 완성'],
              ].map(([border, title, desc]) => (
                React.createElement('div', { key: title, className: `bg-white rounded-lg p-4 border-l-4 ${border}`,}
                  , React.createElement('h3', { className: "font-bold text-gray-800 mb-1"  ,}, title)
                  , React.createElement('p', { className: "text-sm text-gray-600" ,}, desc)
                )
              ))
              )
            )

            , React.createElement('div', { className: "bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6"    ,}
              , React.createElement('h3', { className: "font-bold text-gray-800 mb-3"  ,}, "핵심 원칙" )
              , React.createElement('ul', { className: "space-y-1 text-sm text-gray-700"  ,}
                , React.createElement('li', null, React.createElement('strong', null, "진정성:"), " 3초 자가진단 통과한 내용만"    )
                , React.createElement('li', null, React.createElement('strong', null, "구체성:"), " 숫자와 사실로 표현"   )
                , React.createElement('li', null, React.createElement('strong', null, "연결성:"), " 목표 정의 → 계획 → 극복 → 결과 → 임팩트 → 배움 → 기여가 인과 흐름으로 이어져야 합니다"                  )
                , React.createElement('li', null, React.createElement('strong', null, "비교 가능성:" ), " \"기대했던 것\"과 \"실제 된 것\"의 비교가 스토리에 깊이를 만듭니다"         )
              )
              , React.createElement('div', { className: "mt-4 pt-4 border-t border-yellow-300"   ,}
                , React.createElement('p', { className: "text-sm font-semibold text-gray-800 mb-1"   ,}, "💡 3초 자가진단이란?"  )
                , React.createElement('p', { className: "text-sm text-gray-700" ,}, "누군가 \"정말이에요?\"라고 물었을 때 "    , React.createElement('strong', null, "3초 안에 자신있게 구체적인 예시나 증거를 댈 수 있는지"        ), " 확인하는 것입니다."  )
              )
            )

            , React.createElement('div', { className: "bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6"     ,}
              , React.createElement('h3', { className: "font-bold text-red-800 mb-2"  ,}, "⚠️ 반드시 확인"  )
              , React.createElement('p', { className: "text-sm text-red-700" ,}, "작성하는 내용은 자동으로 저장되지 않으며 새로고침 버튼을 누르면 그동안 작성했던 내용은 사라집니다. 마지막 페이지에서 반드시 워드 파일(.doc)로 다운로드 하여 보관하세요."                   )
            )

            , React.createElement('div', { className: "bg-white rounded-lg shadow-lg p-6 mb-8"    ,}
              , React.createElement('div', { className: "mt-4 pt-4 border-t border-gray-200"   ,}
                , React.createElement('p', { className: "text-xs text-gray-800 text-center"  ,}, "© 2026 CareerEngineer All Rights Reserved."     )
                , React.createElement('p', { className: "text-xs text-red-800 text-center mt-1 font-semibold"    ,}, "이 워크북은 저작권법에 의해 보호받는 저작물입니다. 무단 복제·배포·전송·수정을 금하며, 오직 개인적인 용도로만 사용해야 합니다."             )
              )
            )

            , React.createElement('button', { onClick: () => setShowIntro(false), className: "w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-bold text-lg"           ,}, "1라운드 시작하기 →"  )
          )
        )
      )
    );
  }

  // ── 평가 화면 ──────────────────────────────────────────────
  if (currentPhase === 'evaluation') {
    return (
      React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"    ,}
        , React.createElement('div', { className: "max-w-4xl mx-auto" ,}
          , React.createElement('div', { className: "bg-white rounded-lg shadow-lg p-8"   ,}
            , React.createElement('h2', { className: "text-3xl font-bold text-gray-800 mb-4 text-center"    ,}, "1라운드 완료! 🎉"  )
            , React.createElement('p', { className: "text-center text-gray-600 mb-4"  ,}, "답변이 얕거나 더 구체화가 필요한 질문을 선택하여 2라운드에서 심화 질문에 답변하세요"          )
            , React.createElement('div', { className: "bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 text-sm text-amber-900 rounded"       ,}
              , React.createElement('p', { className: "font-semibold mb-1" ,}, "💡 선택 기준"  )
              , React.createElement('p', null, "답변을 다시 읽었을 때 면접관이 "     , React.createElement('strong', null, "\"더 구체적으로 말해줄 수 있어요?\""    ), "라고 물을 것 같은 질문을 선택하세요."     )
              , React.createElement('p', { className: "mt-1 text-amber-700" ,}, "특히 3초 자가진단을 통과하기 어려웠던 질문을 우선 선택하세요."       )
            )
            , React.createElement('div', { className: "space-y-4 mb-8" ,}
              , round1Steps.slice(1).map(step => {
                const isSelected = selectedSteps.includes(step.id);
                return (
                  React.createElement('div', { key: step.id, className: `border-2 rounded-lg p-5 transition-all ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white hover:border-indigo-300'}`,}
                    , React.createElement('div', { className: "flex items-start justify-between"  ,}
                      , React.createElement('div', { className: "flex-1",}
                        , React.createElement('h3', { className: "font-bold text-gray-800 mb-1"  ,}, step.title)
                        , React.createElement('p', { className: "text-sm text-gray-600 mb-2"  ,}, step.subtitle)
                        , React.createElement('div', { className: "bg-gray-50 rounded p-3 text-sm text-gray-700"    ,}
                          , React.createElement('strong', null, "내 답변:" ), " " , _optionalChain([answers, 'access', _ => _[step.questions[0].id], 'optionalAccess', _2 => _2.substring, 'call', _3 => _3(0, 100)]) || '(답변 없음)', _optionalChain([answers, 'access', _4 => _4[step.questions[0].id], 'optionalAccess', _5 => _5.length]) > 100 && '...'
                        )
                      )
                      , React.createElement('button', { onClick: () => toggleStepSelection(step.id), className: `ml-4 px-4 py-2 rounded-lg font-semibold transition-colors ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`,}
                        , isSelected ? '✓ 선택됨' : '심화 선택'
                      )
                    )
                  )
                );
              })
            )
            , React.createElement('div', { className: "bg-blue-50 border-l-4 border-blue-400 p-4 mb-6"    ,}
              , React.createElement('p', { className: "text-sm text-blue-800" ,}, React.createElement('strong', null, "💡 선택 기준:"  ), " 답변이 부족하거나 더 구체화가 필요한 질문을 자유롭게 선택하세요. (1개 이상)"          )
            )
            , React.createElement('div', { className: "flex gap-4" ,}
              , React.createElement('button', { onClick: goToPrevStep, className: "flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"         ,}, React.createElement(ChevronLeft, { className: "w-5 h-5" ,} ), "이전")
              , React.createElement('button', { onClick: goToNextStep, disabled: !canGoNext(), className: "flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"         ,}, "2라운드 시작하기 ("
                  , selectedSteps.length, "개 선택됨)"
              )
            )
          )
          , React.createElement('div', { className: "text-center mt-6" ,}, React.createElement('p', { className: "text-xs text-gray-500" ,}, "© 2026 CareerEngineer All Rights Reserved."     ))
        )
      )
    );
  }

  // ── 완성 화면 ──────────────────────────────────────────────
  if (currentPhase === 'completed') {
    return (
      React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"    ,}
        , React.createElement('div', { className: "max-w-4xl mx-auto" ,}
          , React.createElement('div', { className: "bg-white rounded-lg shadow-lg p-8"   ,}
            , React.createElement('div', { className: "text-center mb-8" ,}
              , React.createElement('div', { className: "inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"       ,}, React.createElement(Check, { className: "w-10 h-10 text-green-600"  ,} ))
              , React.createElement('h2', { className: "text-3xl font-bold text-gray-800 mb-2"   ,}, "목표수립 및 달성 완성! 🎉"    )
              , React.createElement('p', { className: "text-gray-600",}, "아래 내용을 확인하고 자유롭게 수정하세요"    )
            )

            , React.createElement('div', { className: "bg-red-100 border-2 border-red-500 rounded-lg p-5 mb-6"     ,}
              , React.createElement('div', { className: "flex items-start gap-3"  ,}
                , React.createElement('span', { className: "text-3xl",}, "⚠️")
                , React.createElement('div', null
                  , React.createElement('p', { className: "text-base font-bold text-red-900 mb-2"   ,}, "반드시 다운로드하세요!" )
                  , React.createElement('p', { className: "text-sm text-red-800 leading-relaxed"  ,}, "지금까지 작성한 모든 내용은 브라우저에만 임시 저장되어 있습니다. 페이지를 새로고침하거나 닫으면 "           , React.createElement('strong', null, "모든 내용이 즉시 삭제"   ), "됩니다.", React.createElement('br', null ), React.createElement('strong', null, "내용 수정 후 \"워드 파일로 다운로드\""     ), " 버튼을 눌러 .doc 파일로 저장하세요!"     )
                )
              )
            )

            , React.createElement('div', { className: "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5 mb-6"       ,}
              , React.createElement('div', { className: "flex items-center justify-between mb-3"   ,}
                , React.createElement('h3', { className: "text-lg font-bold text-gray-800 flex items-center gap-2"     ,}, React.createElement(Edit3, { className: "w-5 h-5 text-blue-600"  ,} ), "완성된 목표수립 및 달성 (수정 가능)"     )
                , React.createElement('button', { onClick: () => setShowRawAnswers(!showRawAnswers), className: "text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"     ,}, React.createElement(Eye, { className: "w-4 h-4" ,} ), showRawAnswers ? '원본 답변 숨기기' : '원본 답변 보기')
              )

              /* 첫 문장 가이드 */
              , React.createElement('div', { className: "bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded"     ,}
                , React.createElement('p', { className: "text-sm font-bold text-amber-900 mb-2"   ,}, "💡 첫 문장 — 전체 주제문"     )
                , React.createElement('p', { className: "text-sm text-amber-800 mb-1"  ,}, "구조: " , React.createElement('strong', null, "[목표·도전의 배경]" ), "에서 시작 → "   , React.createElement('strong', null, "[계획과 극복]" ), " 연결 → "   , React.createElement('strong', null, "[결과·임팩트]"), " → "  , React.createElement('strong', null, "[배움·역량·기여]"), " 마무리" )
                , React.createElement('p', { className: "text-xs text-amber-700 mt-2 border-t border-amber-200 pt-2"     ,}, "⚠️ 피해야 할 표현: \"열심히 했습니다\" / \"결과가 좋았습니다\" — 모두 구체성이 없습니다"            )
              )

              /* 내 답변 활용 가이드 */
              , React.createElement('div', { className: "bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4"     ,}
                , React.createElement('p', { className: "text-sm font-bold text-purple-900 mb-3"   ,}, "📋 내 답변 활용 가이드 — 각 단락의 재료와 연결 방법"          )
                , React.createElement('p', { className: "text-xs text-purple-700 mb-4"  ,}, "아래 답변들을 참고하여 위 텍스트를 수정하세요. 모든 답변을 쓸 필요는 없습니다. 각 단락에서 가장 구체적이고 선명한 것 하나씩 골라 연결하세요."                   )

                , [
                  { color: 'purple', title: 'Q1 — 목표 정의 (목표·기대효과·도전 이유)', hint: '연결Q1→Q2 우선 사용', connId: 'connect_q1q2', connLabel: '연결Q1→Q2 (권장)', ids: [['q1_1_1','목표 정의 (Q1-1)'],['q1_1_2','기대효과 (Q1-2)']], tip: '연결 문장 예시: "이 목표였기 때문에 이 계획이 나왔습니다..."' },
                  { color: 'pink', title: 'Q2-Q3 — 계획과 극복 (계획·달랐던 점·극복)', hint: '연결Q2→Q3 우선 사용', connId: 'connect_q2q3', connLabel: '연결Q2→Q3 (권장)', ids: [['q1_3_1','계획과 달랐던 점 (Q3-1)'],['q1_3_2','극복 방법 (Q3-2)']], tip: '연결 문장 예시: "계획이 틀어진 것이 오히려 더 나은 방법을 찾는 계기가 됐습니다..."' },
                  { color: 'purple', title: 'Q4 — 결과와 임팩트 (수치 결과·기대효과 달성·임팩트)', hint: '연결Q3→Q4 우선 사용', connId: 'connect_q3q4', connLabel: '연결Q3→Q4 (권장)', ids: [['q1_4_1','달성 결과 수치 (Q4-1)'],['q1_4_3','임팩트 (Q4-3)']], tip: '연결 문장 예시: "이 결과는 처음 기대효과를 충족시켰고, 예상치 못한 임팩트도 만들어냈습니다..."' },
                  { color: 'pink', title: 'Q6 — 배움과 기여 (직무 연결 마무리)', hint: '연결Q4→Q6 우선 사용', connId: 'connect_q4q6', connLabel: '연결Q4→Q6 (권장)', ids: [['q1_6_2','직무 연결 (Q6-2)'],['q1_6_3','기여 방안 (Q6-3)']], tip: '연결 문장 예시: "이렇게 체득한 역량이 귀사의 직무에서 이런 방식으로 활용됩니다..."' },
                ].map(sec => (
                  React.createElement('div', { key: sec.title, className: `bg-white border-l-4 ${sec.color === 'purple' ? 'border-purple-500' : 'border-pink-500'} rounded p-3 mb-3`,}
                    , React.createElement('p', { className: `text-xs font-bold ${sec.color === 'purple' ? 'text-purple-700' : 'text-pink-700'} mb-2`,}, sec.title)
                    , React.createElement('p', { className: "text-xs text-gray-500 mb-1"  ,}, "👉 " , sec.hint)
                    , answers[sec.connId] && (
                      React.createElement('div', { className: `${sec.color === 'purple' ? 'bg-purple-50' : 'bg-pink-50'} rounded p-2 mb-2`,}
                        , React.createElement('p', { className: `text-xs ${sec.color === 'purple' ? 'text-purple-600' : 'text-pink-600'} font-semibold`,}, "✅ " , sec.connLabel)
                        , React.createElement('p', { className: "text-xs text-gray-700 mt-1 whitespace-pre-wrap"   ,}, answers[sec.connId].substring(0,150), answers[sec.connId].length>150?'...':'')
                      )
                    )
                    , sec.ids.map(([id, label]) => answers[id] && (
                      React.createElement('div', { key: id, className: "bg-gray-50 rounded p-2 mb-1"   ,}
                        , React.createElement('p', { className: "text-xs text-gray-500 font-semibold"  ,}, label)
                        , React.createElement('p', { className: "text-xs text-gray-700 mt-1"  ,}, answers[id].substring(0,100), answers[id].length>100?'...':'')
                      )
                    ))
                    , React.createElement('p', { className: `text-xs ${sec.color === 'purple' ? 'text-purple-600' : 'text-pink-600'} mt-2 italic`,}, sec.tip)
                  )
                ))
              )

              /* 최종 확인 체크리스트 */
              , React.createElement('div', { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4"     ,}
                , React.createElement('p', { className: "text-sm font-bold text-blue-900 mb-3"   ,}, "✅ 수정 전 최종 확인 — 통과 못 하면 해당 질문으로 돌아가세요"           )
                , React.createElement('div', { className: "space-y-3",}
                  , [
                    ['목표가 수치·기한·기준으로 정의되어 있는가?', 'Q1-1(목표 정의)', 'q1_1_1'],
                    ['기대효과와 실제 결과가 비교되어 있는가?', 'Q1-2(기대효과)와 Q4-2(달성 여부)', null],
                    ['계획과 달랐던 점·극복 과정이 구체적으로 드러나는가?', 'Q3-1·Q3-2', 'q1_3_1'],
                    ['성과가 수치나 객관적 사실로 표현되어 있는가?', 'Q4-1(달성 결과)', 'q1_4_1'],
                    ['마지막 문장이 역량과 직무 기여의 논리적 결론인가?', 'Q6-3(기여 방안)', 'q1_6_3'],
                  ].map(([check, ref, ansId], i) => (
                    React.createElement('div', { key: i, className: "bg-white rounded p-3 border border-blue-100"    ,}
                      , React.createElement('p', { className: "text-xs font-semibold text-blue-800 mb-1"   ,}, `${['①','②','③','④','⑤'][i]} ${check}`)
                      , React.createElement('p', { className: "text-xs text-gray-500" ,}, "통과 못 하면 → "    , React.createElement('span', { className: "text-purple-600 font-semibold" ,}, ref), "를 다시 확인하세요"  )
                      , ansId && answers[ansId] && React.createElement('p', { className: "text-xs text-gray-600 mt-1 bg-gray-50 rounded p-1 italic"      ,}, "\"", answers[ansId].substring(0,60), answers[ansId].length>60?'...':'', "\"")
                    )
                  ))
                )
              )

              , React.createElement('textarea', { value: finalText, onChange: e => setFinalText(e.target.value), rows: 20,
                className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none font-serif leading-relaxed"          ,} )
            )

            , showRawAnswers && (
              React.createElement('div', { className: "bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6"     ,}
                , React.createElement('h4', { className: "font-semibold text-gray-800 mb-3"  ,}, "📋 원본 답변 참고"   )
                , React.createElement('pre', { className: "text-sm text-gray-700 whitespace-pre-wrap font-sans"   ,}, getRawAnswersText())
              )
            )

            , React.createElement('button', { onClick: downloadFinalText, className: "w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg mb-4"                 ,}
              , React.createElement(Download, { className: "w-6 h-6" ,} ), "워드 파일로 다운로드 (.doc)"
            )

            , downloadSuccess && (
              React.createElement('div', { className: "bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center mb-4"      ,}
                , React.createElement('p', { className: "text-green-800 font-semibold" ,}, "✅ 다운로드 완료!"  )
                , React.createElement('p', { className: "text-sm text-green-700 mt-1"  ,}, "다운로드 폴더에서 \""  , basicInfo.company || '회사', "_목표수립및달성.doc\" 파일을 Microsoft Word로 열어주세요."    )
              )
            )

            , React.createElement('div', { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 text-center mb-4"      ,}
              , React.createElement('p', { className: "text-sm text-blue-800" ,}, "💾 " , React.createElement('strong', null, "워드에서 편집 가능:"  ), " 다운로드한 .doc 파일을 Microsoft Word에서 열어 자유롭게 편집하고 서식을 적용할 수 있습니다."            )
            )

            , React.createElement('div', { className: "flex gap-4 mt-4"  ,}
              , React.createElement('button', { onClick: goToPrevStep, className: "flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"         ,}, React.createElement(ChevronLeft, { className: "w-5 h-5" ,} ), "이전으로")
            )
          )

          , React.createElement('div', { className: "bg-white rounded-lg shadow-lg p-6 mt-6"    ,}
            , React.createElement('div', { className: "mt-4 pt-4 border-t border-gray-200"   ,}
              , React.createElement('p', { className: "text-xs text-gray-800 text-center"  ,}, "© 2026 CareerEngineer All Rights Reserved."     )
              , React.createElement('p', { className: "text-xs text-red-800 text-center mt-1 font-semibold"    ,}, "이 워크북은 저작권법에 의해 보호받는 저작물입니다. 무단 복제·배포·전송·수정을 금하며, 오직 개인적인 용도로만 사용해야 합니다."             )
            )
          )
        )
      )
    );
  }

  // ── 메인 질문 화면 ─────────────────────────────────────────
  const currentStepData = currentPhase === 'round1'
    ? round1Steps[currentStep]
    : currentPhase === 'round2'
    ? { title: `${round1Steps[selectedSteps[currentStep]].title} - 심화`, questions: round2Questions[selectedSteps[currentStep]] }
    : { title: '3라운드: 연결 및 완성', questions: [round3Questions[currentStep]] };

  return (
    React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"    ,}
      , React.createElement('div', { className: "max-w-4xl mx-auto" ,}
        , React.createElement('div', { className: "bg-white rounded-lg shadow-lg p-6 mb-6"    ,}
          , React.createElement('h1', { className: "text-3xl font-bold text-gray-800 mb-2"   ,}, "CareerEngineer 목표수립 및 달성 워크북"    )
          , React.createElement('p', { className: "text-gray-600",}, "체계적인 3라운드 시스템으로 완성하는 목표달성 스토리"     )
          , React.createElement('div', { className: "mt-4",}
            , React.createElement('div', { className: "flex justify-between text-sm text-gray-600 mb-2"    ,}
              , React.createElement('span', null, currentPhase === 'round1' ? '1라운드' : currentPhase === 'round2' ? '2라운드' : '3라운드', " - "  , currentStepData.title)
              , React.createElement('span', null, "전체 진행률: "  , Math.round(progress), "%")
            )
            , React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-3"   ,}
              , React.createElement('div', { className: "bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"      , style: { width: progress + '%' },} )
            )
          )
        )

        , React.createElement('div', { className: "bg-white rounded-lg shadow-lg p-8"   ,}
          , React.createElement('h2', { className: "text-2xl font-bold text-gray-800 mb-2"   ,}, currentStepData.title)
          , currentStepData.subtitle && React.createElement('p', { className: "text-gray-600 mb-6" ,}, currentStepData.subtitle)

          , currentStep === 0 && currentPhase === 'round1' ? (
            React.createElement('div', { className: "space-y-4",}
              , [['position','지원하고자 하는 직무','예: 데이터 분석, 마케팅, 개발 등'],['company','지원하고자 하는 회사명','예: 삼성전자, 네이버, 카카오 등'],['experience','어필할 목표달성 경험','예: Python 독학으로 데이터 분석 프로젝트 3개 완성']].map(([field,label,placeholder]) => (
                React.createElement('div', { key: field,}
                  , React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-2"    ,}, label)
                  , React.createElement('input', { type: "text", value: basicInfo[field], onChange: e => handleBasicInfoChange(field, e.target.value),
                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"       , placeholder: placeholder,} )
                )
              ))
            )
          ) : (
            React.createElement('div', { className: "space-y-6",}
              , currentStepData.questions.map(q => (
                React.createElement('div', { key: q.id, className: "mb-6 border-b border-gray-200 pb-6 last:border-b-0"    ,}
                  , React.createElement('div', { className: "flex items-start justify-between mb-2"   ,}
                    , React.createElement('label', { className: "text-lg font-semibold text-gray-800"  ,}, q.label)
                    , q.guide && (
                      React.createElement('button', { onClick: () => toggleGuide(q.id), className: "flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 shrink-0 ml-4"       ,}
                        , React.createElement(HelpCircle, { className: "w-4 h-4" ,} ), showGuide[q.id] ? '가이드 숨기기' : '가이드 보기'
                      )
                    )
                  )
                  , q.hint && React.createElement('p', { className: "text-sm text-gray-600 mb-2"  ,}, "💡 " , q.hint)

                  , q.referenceQuestions && (
                    React.createElement('div', { className: `border-l-4 p-4 mb-4 rounded-r-lg ${currentPhase === 'round3' ? 'bg-purple-50 border-purple-400' : 'bg-indigo-50 border-indigo-400'}`,}
                      , React.createElement('p', { className: `text-sm font-semibold mb-1 ${currentPhase === 'round3' ? 'text-purple-900' : 'text-indigo-900'}`,}
                        , currentPhase === 'round3' ? '📚 아래 답변들을 읽고, 하나의 흐름으로 연결해서 위 질문에 답하세요' : '📚 참고: 이전 답변'
                      )
                      , currentPhase === 'round3' && React.createElement('p', { className: "text-xs text-purple-700 mb-3"  ,}, "모든 내용을 다 쓸 필요는 없습니다. 각 답변에서 가장 핵심적인 부분을 골라 자연스럽게 연결하세요."             )
                      , React.createElement('div', { className: "space-y-3",}
                        , q.referenceQuestions.map(refId => {
                          const allQs = round1Steps.flatMap(s => s.questions || []);
                          const refQ = allQs.find(q => _optionalChain([q, 'optionalAccess', _6 => _6.id]) === refId);
                          if (!refQ || !answers[refId]) return null;
                          const limit = currentPhase === 'round3' ? 300 : 150;
                          return (
                            React.createElement('div', { key: refId, className: `rounded text-sm p-3 ${currentPhase === 'round3' ? 'bg-white border border-purple-100' : 'bg-white'}`,}
                              , React.createElement('p', { className: `font-semibold mb-1 text-xs ${currentPhase === 'round3' ? 'text-purple-700' : 'text-gray-700'}`,}, refQ.label)
                              , React.createElement('p', { className: "text-gray-700 leading-relaxed whitespace-pre-wrap"  ,}, _optionalChain([answers, 'access', _7 => _7[refId], 'optionalAccess', _8 => _8.substring, 'call', _9 => _9(0, limit)]), _optionalChain([answers, 'access', _10 => _10[refId], 'optionalAccess', _11 => _11.length]) > limit ? '...' : '')
                            )
                          );
                        })
                      )
                    )
                  )

                  , q.guide && showGuide[q.id] && (
                    React.createElement('div', { className: "bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 space-y-3"     ,}
                      , React.createElement('p', { className: "text-sm font-semibold text-blue-900"  ,}, "📝 " , q.guide.description)
                      , React.createElement('p', { className: "text-sm font-semibold text-blue-900"  ,}, "🎯 " , q.guide.diagnosis)
                      , q.guide.helpQuestions && (
                        React.createElement('div', null
                          , React.createElement('p', { className: "text-sm font-semibold text-blue-900 mb-1"   ,}, "❓ 구체화 도움 질문:"   )
                          , React.createElement('ul', { className: "text-sm text-blue-800 space-y-1 ml-4"   ,}, q.guide.helpQuestions.map((hq, i) => React.createElement('li', { key: i,}, "• " , hq)))
                        )
                      )
                      , q.guide.ifDifficult && React.createElement('div', null, React.createElement('p', { className: "text-sm font-semibold text-blue-900 mb-1"   ,}, "💭 답변하기 어렵다면:"  ), React.createElement('p', { className: "text-sm text-blue-800" ,}, q.guide.ifDifficult))
                      , q.guide.ifStillDifficult && React.createElement('div', null, React.createElement('p', { className: "text-sm font-semibold text-blue-900 mb-1"   ,}, "💡 구체화 도움 질문으로도 어렵다면:"    ), React.createElement('p', { className: "text-sm text-blue-800" ,}, q.guide.ifStillDifficult))
                    )
                  )

                  , React.createElement('textarea', { value: answers[q.id] || '', onChange: e => handleAnswerChange(q.id, e.target.value),
                    rows: q.rows || 3, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"        ,
                    placeholder: q.placeholder,} )
                )
              ))
            )
          )

          , React.createElement('div', { className: "flex gap-4 mt-8"  ,}
            , React.createElement('button', { onClick: goToPrevStep, className: "flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"         ,}, React.createElement(ChevronLeft, { className: "w-5 h-5" ,} ), "이전")
            , React.createElement('button', { onClick: goToNextStep, disabled: !canGoNext(), className: "flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"             ,}, "다음"
              , React.createElement(ChevronRight, { className: "w-5 h-5" ,} )
            )
          )
        )

        , React.createElement('div', { className: "text-center mt-6" ,}, React.createElement('p', { className: "text-xs text-gray-500" ,}, "© 2026 CareerEngineer All Rights Reserved."     ))
      )
    )
  );
};

export default GoalAchievementWorkbook;
