import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, Lock, HelpCircle, Eye, Edit3 } from 'lucide-react';

const GoalAchievementWorkbook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('round1');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [showGuide, setShowGuide] = useState({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showRawAnswers, setShowRawAnswers] = useState(false);
  const [finalText, setFinalText] = useState('');

  const [basicInfo, setBasicInfo] = useState({
    position: '',
    company: '',
    experience: ''
  });

  const [answers, setAnswers] = useState({});

  const handleLogin = () => {
    if (password === 'career2025') {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const round1Steps = [
    { id: 0, title: '기본 정보 입력', subtitle: '지원 직무, 회사, 목표달성 경험을 입력하세요' },
    {
      id: 1,
      title: 'STEP 1: 목표 설정 동기',
      subtitle: '왜 이 목표를 설정하게 되었는지 구체적 계기',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1.1.1. 이 목표를 설정하게 된 구체적인 계기는 무엇인가요?',
          hint: '언제, 어디서, 무엇 때문에 이 목표를 세웠는지',
          guide: {
            description: '답변 가이드: 특정한 날짜, 상황, 감정을 포함한 구체적 계기',
            diagnosis: '즉석자가진단: "그날의 구체적 상황은 어떠셨나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '그날의 구체적 상황은 어떠셨나요?',
              '어떤 감정을 느끼셨나요?',
              '왜 그때 행동하기로 결정하셨나요?'
            ],
            ifDifficult: '그 당시 어떤 문제나 아쉬움이 있으셨나요? 누군가의 영향을 받으셨나요? 특별한 사건이나 경험이 있으셨나요?',
            ifStillDifficult: '구체적 날짜와 상황을 떠올려보세요. "2023년 9월 학기 시작 후 첫 번째 팀 프로젝트에서"처럼 시간과 장소를 명확히 하세요.'
          },
          placeholder: '예: 2023년 9월, 첫 전공 수업에서 코딩 과제를 받았을 때 아무것도 모르는 제 자신이 너무 답답했습니다. 주변 친구들은 술술 풀어가는데 저만 혼자 구글링조차 어떻게 해야 할지 막막했고, "이대로는 안 되겠다"는 절실함이 들었습니다.',
          rows: 4
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 이 목표가 본인에게 어떤 의미였나요?',
          hint: '개인적인 중요성과 직무 관련성',
          guide: {
            description: '답변 가이드: 개인적 의미와 직무 연관성을 동시에 설명',
            diagnosis: '즉석자가진단: "왜 그게 중요했나요?"라는 질문에 즉답 가능한가?',
            helpQuestions: [
              '이 목표가 인생에서 어떤 의미였나요?',
              '이루지 못했다면 어떻게 되었을까요?',
              '지원 직무와 어떻게 연결되나요?'
            ],
            ifDifficult: '단순히 "좋은 경험"이 아니라 "왜" 중요했는지를 설명하세요.',
            ifStillDifficult: '이 목표는 단순한 스킬 습득이 아니라 삶의 전환점이어야 합니다. 어떤 변화를 원했고, 그것이 커리어에 어떤 영향을 미칠지 연결하세요.'
          },
          placeholder: '예: 이 목표는 문과생인 저에게 데이터 분석 직무로의 진로 전환을 가능하게 하는 유일한 기회였습니다. 단순히 코딩을 배우는 것이 아니라, 제 인생의 방향을 바꾸는 중대한 도전이었고, 이를 통해 데이터 분석가로서의 첫 걸음을 내딛을 수 있었습니다.',
          rows: 3
        },
        {
          id: 'q1_1_3',
          label: 'Q1.1.3. 목표 설정 당시 예상했던 어려움은?',
          hint: '시작 전 걱정과 우려사항',
          guide: {
            description: '답변 가이드: 현실적이고 구체적인 우려사항 제시',
            diagnosis: '즉석자가진단: "가장 큰 걱정이 무엇이었나요?"에 즉답 가능한가?',
            helpQuestions: [
              '가장 큰 걱정이 무엇이었나요?',
              '실패할 것 같다고 생각한 적이 있나요?',
              '주변의 반응은 어땠나요?'
            ],
            ifDifficult: '시간, 능력, 환경 등 다양한 측면에서의 걱정을 떠올려보세요.',
            ifStillDifficult: '모든 도전에는 걱정이 따릅니다. "시간 부족", "기초 지식 부족", "중도 포기 우려" 등 솔직한 걱정을 적으세요.'
          },
          placeholder: '예: 가장 큰 걱정은 프로그래밍 경험이 전무하다는 점이었습니다. 문과생으로서 코딩을 처음 접하는 것이 막막했고, 주변에서도 "너무 늦은 시작 아니냐"는 우려의 목소리가 많았습니다. 또한 학기 중 매일 3시간씩 투자하는 것이 현실적으로 가능할지, 중간에 포기하지 않을 자신이 있는지도 확신이 서지 않았습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 2,
      title: 'STEP 2: 구체적 목표와 계획',
      subtitle: 'SMART 원칙에 따른 명확한 목표 설정',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. 설정한 구체적 목표는 무엇인가요? (SMART 원칙)',
          hint: '측정 가능한 명확한 목표',
          guide: {
            description: '답변 가이드: 수치, 기한, 달성 기준을 포함한 구체적 목표',
            diagnosis: '즉석자가진단: "목표를 숫자로 표현한다면?"이라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '목표를 숫자로 표현한다면?',
              '성공의 기준은 무엇이었나요?',
              '중간 목표는 어떻게 설정했나요?'
            ],
            ifDifficult: '달성 여부를 어떻게 판단할 건가요? 구체적인 수치나 기준이 있나요? 언제까지 달성하려고 했나요?',
            ifStillDifficult: '"실력 향상"이나 "열심히 하기" 같은 막연한 목표가 아니라, 측정 가능한 구체적 목표를 세우세요. "Python으로 데이터 분석 프로젝트 3개 완성하기", "토익 850점 이상 달성하기"처럼 달성 여부를 명확히 판단할 수 있는 목표여야 합니다.'
          },
          placeholder: '예: 3개월 동안 Python 기초부터 데이터 분석까지 학습하여 최종적으로 실제 데이터를 활용한 분석 프로젝트 3개를 완성하는 것이 목표였습니다. 구체적으로 1개월차에는 기본 문법, 2개월차에는 Pandas와 Numpy, 3개월차에는 시각화와 실전 프로젝트로 단계를 나눴습니다.',
          rows: 3
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 목표 달성을 위한 구체적 실행 계획은?',
          hint: '단계별 상세 계획',
          guide: {
            description: '답변 가이드: 시간, 방법, 자원을 포함한 실행 가능한 계획',
            diagnosis: '즉석자가진단: "내일 당장 무엇을 할 건가요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '매일/매주 무엇을 할 건가요?',
              '어떤 자료나 도구를 사용할 건가요?',
              '진도 체크는 어떻게 할 건가요?'
            ],
            ifDifficult: '하루 일과를 떠올려보세요. 언제, 어디서, 무엇을, 어떻게 할 것인지 구체적으로 계획하세요.',
            ifStillDifficult: '계획은 실행 가능해야 합니다. "매일 저녁 9시-11시 도서관에서 온라인 강의 1챕터 수강 후 실습 문제 풀기"처럼 시간과 장소, 활동을 명확히 하세요.'
          },
          placeholder: '예: 평일 매일 저녁 2시간씩 온라인 강의를 수강하고, 주말에는 3시간씩 실습 프로젝트를 진행하기로 했습니다. 월요일에는 한 주 학습 계획을 세우고, 금요일에는 주간 복습을 하는 루틴을 만들었습니다. 진도는 노션에 기록하며 매주 달성률을 체크했습니다.',
          rows: 3
        },
        {
          id: 'q1_2_3',
          label: 'Q1.2.3. 계획 수립 시 참고한 정보나 조언은?',
          hint: '외부 정보 활용',
          guide: {
            description: '답변 가이드: 참고한 자료와 조언을 구체적으로 언급하여 주체적 계획 수립 강조',
            diagnosis: '즉석자가진단: "어떻게 그 계획을 세웠나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '누구에게 조언을 구했나요?',
              '어떤 자료를 참고했나요?',
              '그 정보를 어떻게 활용했나요?'
            ],
            ifDifficult: '독학 로드맵, 선배 조언, 온라인 커뮤니티 등 참고한 것을 떠올려보세요.',
            ifStillDifficult: '아무런 정보 없이 시작하는 사람은 없습니다. "유튜브 강의 커리큘럼", "선배의 조언", "온라인 커뮤니티 로드맵", "관련 도서" 등 참고한 자료를 구체적으로 언급하세요.'
          },
          placeholder: '예: Python 개발자 선배님께 직접 조언을 구했고, "처음엔 기초 문법보다 실제 프로젝트를 따라 만들면서 배우라"는 조언이 가장 도움이 되었습니다. 또한 \'점프 투 파이썬\' 책과 코딩 부트캠프 커리큘럼을 참고해 제 수준과 일정에 맞는 3개월 학습 로드맵을 수립했습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 3,
      title: 'STEP 3: 실행과 어려움',
      subtitle: '실제 실행 과정에서 겪은 어려움과 극복',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q1.3.1. 실행 과정에서 겪은 가장 큰 어려움은?',
          hint: '구체적이고 현실적인 어려움',
          guide: {
            description: '답변 가이드: 하나의 구체적 어려움을 생생하게 서술',
            diagnosis: '즉석자가진단: "왜 그게 어려웠나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '가장 힘들었던 순간은 언제였나요?',
              '무엇 때문에 힘들었나요?',
              '포기하고 싶었던 적이 있나요?'
            ],
            ifDifficult: '기술적 어려움인가요? 시간 관리 문제인가요? 동기부여 저하인가요? 가장 큰 것 하나를 선택하세요.',
            ifStillDifficult: '모든 도전에는 어려움이 있습니다. "이해가 안 되는 개념", "시간 부족", "동기 저하", "중간 슬럼프" 등 솔직한 어려움을 구체적으로 적으세요.'
          },
          placeholder: '예: 가장 큰 어려움은 기초 개념의 벽이었습니다. 특히 2주차에 접한 "클래스와 객체" 개념이 도저히 이해가 되지 않아 일주일간 같은 강의만 반복했습니다. 이해하지 못한 채 다음으로 넘어가면 전체가 무너질 것 같아 불안했고, 실제로 진도가 1주일이나 밀렸습니다.',
          rows: 4
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 어려움을 극복하기 위해 시도한 방법들은?',
          hint: '다양한 극복 시도',
          guide: {
            description: '답변 가이드: 여러 시도와 실패, 그리고 최종 해결 과정',
            diagnosis: '즉석자가진단: "몇 가지 방법을 시도했나요?"라고 물으면 3가지 이상 즉답 가능한가?',
            helpQuestions: [
              '처음에는 어떻게 해결하려 했나요?',
              '그게 안 되면 다음엔 무엇을 했나요?',
              '최종적으로 효과가 있었던 방법은?'
            ],
            ifDifficult: '처음 시도한 방법부터 시간 순서대로 나열해보세요.',
            ifStillDifficult: '어려움을 극복하는 과정은 여러 시행착오를 거칩니다. "처음엔 혼자 해결하려 했지만 한계를 느껴 스터디를 구성했다", "유튜브 강의가 맞지 않아 책으로 전환했다" 등 실제 시도한 다양한 방법들을 순서대로 설명하세요.'
          },
          placeholder: '예: 처음엔 혼자 유튜브 강의를 들으며 독학했지만 막히는 부분이 많아 한계를 느꼈습니다. 그래서 온라인 스터디를 구성해 주 2회 코드 리뷰를 진행했고, 막히는 문제는 Stack Overflow에 질문을 올려 해결했습니다. 또한 \'러버덕 디버깅\' 기법을 활용해 문제를 소리내어 설명하며 스스로 해결책을 찾았고, 마지막으로 멘토링 프로그램에 참여해 전문가의 피드백을 받았습니다.',
          rows: 3
        },
        {
          id: 'q1_3_3',
          label: 'Q1.3.3. 중간에 포기하지 않고 지속할 수 있었던 이유는?',
          hint: '동기부여 유지 방법',
          guide: {
            description: '답변 가이드: 내적/외적 동기를 구체적으로 설명',
            diagnosis: '즉석자가진단: "가장 포기하고 싶었던 순간은 언제였나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '어떤 생각이 힘이 되었나요?',
              '주변의 응원이나 격려가 있었나요?',
              '중간 성과가 동기가 되었나요?'
            ],
            ifDifficult: '힘이 된 사람이나 말이 있었나요? 포기할 수 없었던 이유는 무엇인가요? 작은 성취의 기쁨을 느낀 순간이 있었나요?',
            ifStillDifficult: '지속의 비결은 구체적이어야 합니다. "작은 성공 경험", "동료들의 격려", "목표 시각화", "중간 보상 시스템" 등 실제로 도움이 된 요소들을 언급하세요.'
          },
          placeholder: '예: 가장 큰 동력은 매주 눈에 보이는 작은 성과들이었습니다. 첫 번째 웹 크롤링 프로그램이 작동했을 때의 성취감, 알고리즘 문제를 처음으로 혼자 해결했을 때의 기쁨이 저를 계속 나아가게 했습니다. 또한 함께하는 스터디원들과의 약속, 그리고 "3개월만 버티자"는 구체적인 기한 설정이 포기하지 않는 원동력이 되었습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 4,
      title: 'STEP 4: 문제해결과 혁신',
      subtitle: '창의적이고 독특한 해결 방법',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q1.4.1. 가장 효과적이었던 해결책은 무엇인가요?',
          hint: '결정적 전환점이 된 방법',
          guide: {
            description: '답변 가이드: 구체적 방법과 그 이유를 명확히',
            diagnosis: '즉석자가진단: "왜 그 방법이 효과적이었을까요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '이전 방법과 무엇이 달랐나요?',
              '즉각적인 효과가 있었나요?',
              '다른 사람도 사용할 수 있나요?'
            ],
            ifDifficult: '문제가 해결된 결정적 순간은? 어떤 방법이 가장 효과적이었나요? 왜 그 방법이 효과적이었을까요?',
            ifStillDifficult: '단순히 "열심히 했다"가 아니라 구체적인 해결 방법을 찾으세요. "스터디 그룹을 만들어 함께 공부했다", "포모도로 기법으로 집중력을 높였다", "실패한 코드를 분석하여 패턴을 찾았다"처럼 구체적이고 재현 가능한 방법을 제시하세요.'
          },
          placeholder: '예: 온라인 스터디 그룹을 만든 것이 결정적 전환점이었습니다. 혼자 고민하던 문제를 5명이 함께 토론하니 30분 만에 해결되는 경우가 많았고, 매주 코드 리뷰를 통해 서로의 실수에서 배울 수 있었습니다. 특히 \'러버덕 디버깅\' 기법으로 문제를 설명하다 보면 스스로 답을 찾는 경우가 많았습니다.',
          rows: 3
        },
        {
          id: 'q1_4_2',
          label: 'Q1.4.2. 남들과 다른 나만의 독특한 접근법은?',
          hint: '창의적이고 차별화된 방법',
          guide: {
            description: '답변 가이드: 독창성과 차별화 포인트를 구체적으로',
            diagnosis: '즉석자가진단: "그 방법을 어떻게 생각해냈나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '왜 남들과 다른 방법을 선택했나요?',
              '이 방법의 독특한 점은 무엇인가요?',
              '다른 사람들의 반응은 어땠나요?'
            ],
            ifDifficult: '일반적인 방법을 변형한 것이 있나요? 다른 분야에서 차용한 아이디어가 있나요? 나만의 특별한 노하우가 있나요?',
            ifStillDifficult: '독특함은 거창한 것이 아닙니다. "게임처럼 레벨 시스템 도입", "일일 브이로그로 기록", "포모도로를 15분으로 변형", "코드를 손으로 먼저 작성" 등 자신만의 작은 변형이나 창의적 접근을 찾아보세요.'
          },
          placeholder: '예: 저는 코딩 학습을 RPG 게임처럼 설계했습니다. 엑셀로 경험치 시스템을 만들어 문제를 풀 때마다 포인트를 쌓고, 일정 포인트에 도달하면 \'레벨업\'하는 방식으로 동기부여를 했습니다. 또한 배운 내용을 \'3줄 요약\'으로 매일 트위터에 공유하며 스스로 설명할 수 있는지 확인했는데, 이는 많은 초보자들에게도 도움이 되었습니다.',
          rows: 3
        },
        {
          id: 'q1_4_3',
          label: 'Q1.4.3. 예상치 못한 긍정적 결과나 부수 효과는?',
          hint: '목표 외 추가 성과',
          guide: {
            description: '답변 가이드: 계획 외 수확과 의외의 성과',
            diagnosis: '즉석자가진단: "그것이 왜 의외였나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '어떤 점이 의외였나요?',
              '이것이 왜 중요한가요?',
              '향후 어떻게 활용할 건가요?'
            ],
            ifDifficult: '목표 외에 추가로 얻은 것이 있나요? 예상치 못한 능력 향상이 있었나요? 인간관계나 네트워크가 확장되었나요?',
            ifStillDifficult: '모든 도전에는 예상 밖의 선물이 있습니다. "문제해결 능력 향상", "새로운 인맥 형성", "다른 분야 관심 확장", "자신감 회복", "시간관리 능력 향상" 등 부수적으로 얻은 것들을 찾아보세요.'
          },
          placeholder: '예: 가장 의외였던 것은 문서화 능력의 향상이었습니다. 코드를 정리하고 주석을 다는 과정에서 자연스럽게 논리적 글쓰기 능력이 늘었고, 이는 다른 과제나 보고서 작성에도 큰 도움이 되었습니다. 또한 스터디를 통해 만난 다양한 전공의 사람들과 네트워크를 형성하게 되어, 현재는 창업 프로젝트를 함께 준비하고 있습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 5,
      title: 'STEP 5: 결과와 성과',
      subtitle: '측정 가능한 구체적 성과',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q1.5.1. 최종적으로 달성한 구체적 성과는?',
          hint: '수치와 데이터로 표현',
          guide: {
            description: '답변 가이드: 측정 가능한 결과를 수치, 비교, 인정 등으로 구체적으로 제시',
            diagnosis: '즉석자가진단: "그 성과를 어떻게 측정했나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '숫자로 표현할 수 있는 성과는?',
              '목표 대비 달성률은?',
              '이전과 비교하면 어느 정도 향상인가?'
            ],
            ifDifficult: '정량적으로 측정 가능한 것을 찾으세요. Before & After를 비교하면 어떤가요? 객관적 평가나 인정받은 것이 있나요?',
            ifStillDifficult: '성과는 반드시 측정 가능해야 합니다. "시험 점수", "프로젝트 개수", "소요 시간 단축", "순위", "자격증 취득" 등 객관적 지표를 제시하세요. 숫자가 없다면 "전혀 못했던 것 → 독립적으로 수행 가능" 같은 수준 변화라도 구체적으로 표현하세요.'
          },
          placeholder: '예: 6개월 만에 Python 데이터 분석 전문가 수준에 도달했습니다. 구체적으로는 Kaggle 대회에서 상위 15% 달성, GitHub에 10개의 프로젝트 업로드, 데이터 분석 관련 블로그 포스팅 30개 작성을 완료했습니다. 특히 처음엔 \'Hello World\'도 몰랐던 제가 실제 기업 데이터를 분석해 인사이트를 도출할 수 있는 수준까지 성장한 것이 가장 큰 성과입니다.',
          rows: 3
        },
        {
          id: 'q1_5_2',
          label: 'Q1.5.2. 주변의 반응이나 평가는 어땠나요?',
          hint: '타인의 인정과 피드백',
          guide: {
            description: '답변 가이드: 구체적인 평가 내용으로 제시',
            diagnosis: '즉석자가진단: "누가 정확히 뭐라고 했나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '가장 기억에 남는 칭찬은 무엇인가요?',
              '의외의 반응은 무엇이었나요?',
              '추가 요청이나 제안을 받은 것이 있나요?'
            ],
            ifDifficult: '교수님이나 선배의 구체적 피드백은? 팀원들의 반응은? 이 역량으로 받은 칭찬은?',
            ifStillDifficult: '주변의 반응을 구체적으로 떠올려보세요. "대단하다"보다는 "6개월 만에 이 정도면 놀랍다" "문과생이 맞나" 등 구체적인 평가를 인용하세요. 제안이나 부탁을 받은 것도 좋은 평가의 증거입니다.'
          },
          placeholder: '예: 지도교수님께서는 "6개월 만에 이 정도 완성도를 보이는 것은 매우 드물다"고 평가하셨고, 실제로 후배들 대상 Python 특강을 부탁받아 진행하기도 했습니다. 스터디원들은 "덕분에 우리도 배운다"며 저의 체계적인 학습 방법을 따라 했고, 한 스타트업에서는 인턴 제안을 받기도 했습니다.',
          rows: 3
        },
        {
          id: 'q1_5_3',
          label: 'Q1.5.3. 이 성과가 나에게 의미하는 것은?',
          hint: '성과의 본질적 가치',
          guide: {
            description: '답변 가이드: 성과가 증명하는 역량과 향후 활용 방안',
            diagnosis: '즉석자가진단: "이 성과로 무엇을 증명했나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '이 성과가 증명하는 나의 능력은?',
              '이를 통해 얻은 자신감은?',
              '입사 후 어떻게 활용할 수 있나요?'
            ],
            ifDifficult: '단순 숫자를 넘어선 본질적 의미를 생각해보세요. 이 경험이 당신에 대해 무엇을 말해주나요?',
            ifStillDifficult: '성과의 의미는 "무엇을 이뤘다"를 넘어 "무엇을 증명했다"입니다. "끈기", "학습 능력", "문제해결력", "목표 달성 능력" 등 이 경험이 입증한 역량을 연결하세요.'
          },
          placeholder: '예: 이 성과는 단순히 Python을 배운 것을 넘어, 제가 새로운 분야에 도전해 단기간에 전문성을 쌓을 수 있는 사람임을 증명한 것입니다. 문과생이라는 배경에도 불구하고 기술 분야에서 성과를 낼 수 있다는 자신감을 얻었으며, 이는 데이터 분석가로서의 커리어를 시작하는 출발점이 되었습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 6,
      title: 'STEP 6: 배운 점과 적용',
      subtitle: '경험을 통한 성장과 실무 활용 계획',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q1.6.1. 이 경험을 통해 얻은 가장 중요한 깨달음은?',
          hint: '핵심 교훈과 배움',
          guide: {
            description: '답변 가이드: 실용적이고 일반화 가능한 교훈',
            diagnosis: '즉석자가진단: "한 문장으로 요약한다면?"이라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '가장 크게 배운 것은?',
              '이전의 나와 달라진 점은?',
              '다른 상황에도 적용할 수 있나요?'
            ],
            ifDifficult: '이 경험이 당신의 생각이나 행동을 어떻게 바꿨나요? 이전과 달라진 관점이 있나요?',
            ifStillDifficult: '깨달음은 구체적이어야 합니다. "포기하지 않는 것이 중요하다"보다는 "큰 목표를 작은 단계로 나누면 달성 가능성이 높아진다" 같은 실용적 교훈이어야 합니다.'
          },
          placeholder: '예: 가장 큰 깨달음은 "완벽한 계획보다 작은 실행이 중요하다"는 것이었습니다. 처음엔 모든 것을 완벽하게 이해하고 넘어가려 했지만, 일단 부딪혀보고 실패하면서 배우는 것이 훨씬 효과적이었습니다. 또한 혼자보다 함께 하면 더 멀리 갈 수 있다는 것도 체감했습니다.',
          rows: 3
        },
        {
          id: 'q1_6_2',
          label: 'Q1.6.2. 개발/강화된 역량은 무엇인가요?',
          hint: '직무 관련 역량 연결',
          guide: {
            description: '답변 가이드: 개발/강화된 능력을 직무 관련 역량과 연결하여 구체적으로 설명',
            diagnosis: '즉석자가진단: "그 역량을 어떻게 증명할 수 있나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '이전과 달라진 능력은 무엇인가요?',
              '새로 생긴 자신감은 어떤 부분인가요?',
              '업무에 도움될 역량은 무엇인가요?'
            ],
            ifDifficult: '기술적 역량이 어떻게 향상되었나요? 소프트 스킬은 어떻게 개발되었나요? 사고방식은 어떻게 변화했나요?',
            ifStillDifficult: '역량은 구체적이어야 합니다. "문제해결력", "분석력", "끈기", "학습능력", "프로젝트 관리", "커뮤니케이션" 등 이 경험을 통해 개발된 능력을 찾아보세요.'
          },
          placeholder: '예: 이 경험은 세 가지 핵심 역량을 크게 강화시켰습니다. 첫째, 체계적인 학습 설계 능력이 생겨 어떤 새로운 분야도 효율적으로 학습할 수 있게 되었습니다. 둘째, 문제를 작은 단위로 분해하고 해결하는 분석적 사고력이 향상되었습니다. 셋째, 장기 목표를 포기하지 않고 완수하는 실행력과 끈기를 입증했습니다.',
          rows: 3
        },
        {
          id: 'q1_6_3',
          label: 'Q1.6.3. 이 방법론을 다른 상황에 어떻게 적용할 수 있을까요?',
          hint: '범용적 적용 가능성',
          guide: {
            description: '답변 가이드: 범용적 적용 가능성을 구체적 적용 시나리오와 함께 설명',
            diagnosis: '즉석자가진단: "실제로 적용해본 다른 사례가 있나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '어떤 상황에 유용할까요?',
              '필요한 수정사항은 무엇인가요?',
              '예상되는 효과는 무엇인가요?'
            ],
            ifDifficult: '비슷한 문제 상황에서는 어떻게 활용할 수 있을까요? 팀 프로젝트에서는 어떻게 적용할까요? 업무 상황에서는 어떻게 활용할 수 있을까요?',
            ifStillDifficult: '성공 방법론은 다른 상황에도 적용 가능해야 가치가 있습니다. "새로운 기술 습득", "프로젝트 관리", "팀 목표 달성" 등 이 경험에서 얻은 방법론을 적용할 수 있는 구체적 상황을 제시하세요.'
          },
          placeholder: '예: 이 \'작은 성공 축적\' 방법론은 이미 다른 목표에도 적용하고 있습니다. 현재 진행 중인 마케팅 자격증 준비에서도 매일 1챕터씩 학습하고 주간 모의고사로 진도를 체크하는 방식을 활용 중입니다. 향후 입사 후에도 새로운 업무를 익힐 때 이 방법론을 적용하여, 복잡한 업무를 단계별로 분해하고 체계적으로 마스터해나갈 계획입니다.',
          rows: 3
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q2.1.1. 그 순간의 감정과 생각을 더 자세히 설명한다면?',
        hint: '감정과 내면의 갈등',
        guide: {
          description: '답변 가이드: 정확한 날짜와 시간, 주변 환경과 분위기, 내면의 갈등과 결심',
          diagnosis: '즉석자가진단: "그때 정확히 어떤 기분이었나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '정확한 날짜와 시간은?',
            '주변 환경과 분위기는?',
            '내면의 갈등과 결심은?'
          ],
          ifDifficult: '그 순간의 오감을 떠올려보세요. 무엇이 보였고, 무슨 생각이 들었나요?',
          ifStillDifficult: '영화의 한 장면처럼 생생하게 묘사하세요.'
        },
        placeholder: '예: 2023년 9월 5일 저녁, 기숙사 책상 앞에서 공백 화면만 바라보고 있었습니다. 창밖으로 들리는 친구들의 웃음소리가 오히려 더 외롭게 느껴졌고, "나만 뒤처지고 있다"는 불안감이 밀려왔습니다.',
        rows: 4
      },
      {
        id: 'q2_1_2',
        label: 'Q2.1.2. 이 목표가 없었다면 어떻게 되었을까요?',
        hint: '목표의 필연성',
        guide: {
          description: '답변 가이드: 대안적 시나리오, 목표의 필연성, 개인적 의미 강화',
          diagnosis: '즉석자가진단: "만약 시작하지 않았다면?"이라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '대안이 있었나요?',
            '이 목표의 필연성은?',
            '개인적으로 어떤 의미가 있나요?'
          ],
          ifDifficult: '만약 이 도전을 하지 않았다면 지금 어땠을까요?',
          ifStillDifficult: '목표의 중요성을 역으로 설명해보세요.'
        },
        placeholder: '예: 만약 이 도전을 하지 않았다면, 평범한 문과생으로 남아 취업 시장에서 경쟁력이 없었을 것입니다. 데이터 분석이라는 명확한 목표 없이 방황하며 시간만 보냈을 것이고, 지금의 자신감도 없었을 것입니다.',
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2.2.1. 계획 수립 과정에서의 고민과 선택은?',
        hint: '우선순위 설정',
        guide: {
          description: '답변 가이드: 여러 옵션 중 선택 이유, 우선순위 설정 기준, 리스크 관리 방안',
          diagnosis: '즉석자가진단: "왜 그 계획을 선택했나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '여러 옵션 중 왜 이것을 선택했나요?',
            '우선순위를 어떻게 정했나요?',
            '리스크는 어떻게 관리했나요?'
          ],
          ifDifficult: '다른 선택지가 있었나요? 왜 이 방법을 선택했나요?',
          ifStillDifficult: '의사결정 과정을 단계별로 설명해보세요.'
        },
        placeholder: '예: 온라인 강의와 오프라인 학원 중 고민했지만, 시간 유연성과 반복 학습이 가능한 온라인을 선택했습니다. 비용도 1/3 수준이었고, 제 페이스에 맞춰 진행할 수 있다는 점이 결정적이었습니다.',
        rows: 4
      },
      {
        id: 'q2_2_2',
        label: 'Q2.2.2. 일일/주간 단위의 구체적 실행 내용은?',
        hint: '상세 일정',
        guide: {
          description: '답변 가이드: 하루 일과표, 주간 마일스톤, 진도 체크 방법',
          diagnosis: '즉석자가진단: "어제는 뭘 했나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '하루 일과는 어땠나요?',
            '주간 목표는 무엇이었나요?',
            '진도는 어떻게 체크했나요?'
          ],
          ifDifficult: '가장 생산적이었던 하루를 떠올려보세요.',
          ifStillDifficult: '시간표처럼 구체적으로 작성해보세요.'
        },
        placeholder: '예: 평일은 저녁 9-11시 온라인 강의 수강, 토요일 오전은 복습, 오후는 실습 프로젝트, 일요일은 주간 회고와 다음 주 계획을 세웠습니다. 매일 노션에 학습 내용과 느낀 점을 기록했습니다.',
        rows: 4
      }
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q2.3.1. 가장 힘들었던 특정 순간을 묘사한다면?',
        hint: '극복의 순간',
        guide: {
          description: '답변 가이드: 구체적 상황 묘사, 심리적 압박감, 포기 직전의 순간',
          diagnosis: '즉석자가진단: "그때 어떤 생각을 했나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '가장 힘들었던 순간은 언제였나요?',
            '심리적으로 얼마나 힘들었나요?',
            '포기하고 싶었나요?'
          ],
          ifDifficult: '가장 어두웠던 순간을 떠올려보세요.',
          ifStillDifficult: '그 순간의 감정을 솔직하게 표현하세요.'
        },
        placeholder: '예: 2주차 목요일 밤 2시, 4시간째 같은 에러와 씨름하고 있었습니다. 친구들은 다 자는데 저만 혼자 모니터를 노려보며 "내가 왜 이걸 하고 있지?"라는 생각이 들었고, 키보드를 덮고 싶었습니다.',
        rows: 4
      },
      {
        id: 'q2_3_2',
        label: 'Q2.3.2. 어려움이 나에게 준 예상치 못한 교훈은?',
        hint: '역경의 가치',
        guide: {
          description: '답변 가이드: 실패를 통한 학습, 인내심의 가치, 새로운 관점 획득',
          diagnosis: '즉석자가진단: "그 어려움이 왜 중요했나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '실패에서 무엇을 배웠나요?',
            '인내심은 어떻게 생겼나요?',
            '관점이 바뀐 것이 있나요?'
          ],
          ifDifficult: '어려움이 오히려 도움이 된 부분이 있나요?',
          ifStillDifficult: '역설적으로 감사한 점을 찾아보세요.'
        },
        placeholder: '예: 어려움 덕분에 "빠르게 배우는 것"보다 "제대로 이해하는 것"이 중요하다는 것을 깨달았습니다. 또한 혼자보다 함께 하면 더 멀리 갈 수 있다는 것도 체감했습니다.',
        rows: 4
      }
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q2.4.1. 아이디어가 떠오른 구체적 순간은?',
        hint: '영감의 순간',
        guide: {
          description: '답변 가이드: 영감의 원천, 발상의 전환 계기, 구체화 과정',
          diagnosis: '즉석자가진단: "어떻게 그 생각을 했나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '언제 그 아이디어가 떠올랐나요?',
            '무엇이 영감을 주었나요?',
            '어떻게 구체화했나요?'
          ],
          ifDifficult: '번뜩이는 순간이 있었나요? 어떤 계기로 생각이 바뀌었나요?',
          ifStillDifficult: '유레카의 순간을 떠올려보세요.'
        },
        placeholder: '예: 스터디에서 한 친구가 "게임처럼 재미있게 하면 안 될까?"라고 말한 순간, RPG 레벨업 시스템 아이디어가 떠올랐습니다. 그날 밤 바로 엑셀로 경험치 시스템을 만들기 시작했습니다.',
        rows: 4
      },
      {
        id: 'q2_4_2',
        label: 'Q2.4.2. 이 방법을 선택한 논리적 근거는?',
        hint: '선택의 합리성',
        guide: {
          description: '답변 가이드: 대안 분석 과정, 선택의 합리성, 예상 효과',
          diagnosis: '즉석자가진단: "왜 그 방법이 최선이었나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '다른 방법과 비교했나요?',
            '왜 이 방법이 더 나았나요?',
            '어떤 효과를 예상했나요?'
          ],
          ifDifficult: '의사결정 과정을 단계별로 설명해보세요.',
          ifStillDifficult: '논리적 근거를 3가지 이상 제시하세요.'
        },
        placeholder: '예: 게임화 전략을 선택한 이유는 첫째, 즉각적인 보상으로 동기부여가 유지되고, 둘째, 진도를 가시화하여 성취감을 느낄 수 있으며, 셋째, 재미 요소로 지루함을 극복할 수 있기 때문입니다.',
        rows: 4
      }
    ],
    5: [
      {
        id: 'q2_5_1',
        label: 'Q2.5.1. 성과를 다각도로 분석한다면?',
        hint: '다면적 성과',
        guide: {
          description: '답변 가이드: 양적 성과 세분화, 질적 성과 구체화, 장기적 영향력',
          diagnosis: '즉석자가진단: "다른 측면의 성과는 없나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '양적 성과는 무엇인가요?',
            '질적 변화는 무엇인가요?',
            '장기적 영향은 무엇인가요?'
          ],
          ifDifficult: '개인적 성장, 대인관계, 커리어 등 다양한 측면을 고려하세요.',
          ifStillDifficult: '성과를 3가지 카테고리로 나눠 설명하세요.'
        },
        placeholder: '예: 양적으로는 프로젝트 10개 완성, 질적으로는 분석적 사고력 향상, 장기적으로는 데이터 분석가로의 진로 전환 가능성을 열었습니다.',
        rows: 4
      },
      {
        id: 'q2_5_2',
        label: 'Q2.5.2. 이 성과가 특별한 이유는?',
        hint: '차별화 요소',
        guide: {
          description: '답변 가이드: 개인적 의미, 객관적 우수성, 차별화 요소',
          diagnosis: '즉석자가진단: "왜 이게 대단한가요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '나에게 어떤 의미인가요?',
            '객관적으로 우수한 이유는?',
            '남들과 다른 점은?'
          ],
          ifDifficult: '이 성과의 특별함을 설명할 수 있나요?',
          ifStillDifficult: '맥락을 고려하여 의미를 부여하세요.'
        },
        placeholder: '예: 비전공자가 6개월 만에 이 수준에 도달한 것은 매우 드문 사례입니다. 특히 체계적인 학습 설계와 실행력을 동시에 증명했다는 점에서 의미가 있습니다.',
        rows: 4
      }
    ],
    6: [
      {
        id: 'q2_6_1',
        label: 'Q2.6.1. 이 경험이 바꾼 나의 행동 패턴은?',
        hint: '구체적 변화',
        guide: {
          description: '답변 가이드: 구체적 변화 사례, 지속되는 습관, 새로운 접근법',
          diagnosis: '즉석자가진단: "어떻게 달라졌나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '이전과 달라진 행동은?',
            '새로 생긴 습관은?',
            '접근 방식이 바뀐 것은?'
          ],
          ifDifficult: 'Before & After를 비교해보세요.',
          ifStillDifficult: '일상에서의 작은 변화부터 찾아보세요.'
        },
        placeholder: '예: 이전에는 어려운 일을 피했다면, 이제는 작은 단계로 나눠 차근차근 접근합니다. 매일 아침 30분 학습 습관이 생겼고, 문제를 마주하면 먼저 분해하고 분석하는 태도가 자연스러워졌습니다.',
        rows: 4
      },
      {
        id: 'q2_6_2',
        label: 'Q2.6.2. 실무에서 구체적으로 어떻게 활용할 것인가?',
        hint: '실무 적용 계획',
        guide: {
          description: '답변 가이드: 직무별 적용 시나리오, 예상되는 성과, 팀 차원의 기여',
          diagnosis: '즉석자가진단: "입사 첫 달에 뭘 할 건가요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '어떤 업무에 적용할 수 있나요?',
            '팀에 어떻게 기여할 수 있나요?',
            '예상되는 결과는?'
          ],
          ifDifficult: '지원 직무의 구체적 업무를 떠올려보세요.',
          ifStillDifficult: '단계별 실행 계획을 작성하세요.'
        },
        placeholder: '예: 입사 후 신규 프로젝트를 맡으면, 이 경험에서 배운 단계별 접근법을 활용하여 복잡한 문제를 분해하고 체계적으로 해결하겠습니다. 또한 팀원들과 지식을 공유하며 함께 성장하는 문화를 만들겠습니다.',
        rows: 4
      }
    ]
  };

  const round3Questions = [
    {
      id: 'connect_1_2',
      label: '연결 확인 1→2: 동기에서 목표로',
      hint: 'STEP 1의 동기가 STEP 2의 구체적 목표로 어떻게 이어지나요?',
      placeholder: '예: 이러한 절실함을 바탕으로 저는 [구체적 목표]라는 명확한 목표를 세우고 체계적인 계획을 수립했습니다...',
      rows: 3,
      referenceSteps: [1, 2],
      referenceQuestions: ['q1_1_1', 'q1_1_2', 'q1_2_1']
    },
    {
      id: 'connect_2_3',
      label: '연결 확인 2→3: 계획에서 실행으로',
      hint: 'STEP 2의 계획이 STEP 3의 실제 실행과 어떻게 연결되나요?',
      placeholder: '예: 완벽해 보였던 계획도 실제 실행 과정에서는 예상치 못한 어려움들과 마주하게 되었습니다...',
      rows: 3,
      referenceSteps: [2, 3],
      referenceQuestions: ['q1_2_1', 'q1_2_2', 'q1_3_1']
    },
    {
      id: 'connect_3_4',
      label: '연결 확인 3→4: 어려움에서 해결로',
      hint: 'STEP 3의 어려움이 STEP 4의 혁신적 해결로 어떻게 연결되나요?',
      placeholder: '예: 하지만 이러한 어려움이 오히려 저만의 창의적인 해결책을 찾는 계기가 되었습니다...',
      rows: 3,
      referenceSteps: [3, 4],
      referenceQuestions: ['q1_3_1', 'q1_3_2', 'q1_4_1']
    },
    {
      id: 'connect_4_5',
      label: '연결 확인 4→5: 해결에서 성과로',
      hint: 'STEP 4의 해결책이 STEP 5의 구체적 성과로 어떻게 이어지나요?',
      placeholder: '예: 새로운 접근법은 기대 이상의 성과를 가져왔고, 목표를 뛰어넘는 결과를 달성할 수 있었습니다...',
      rows: 3,
      referenceSteps: [4, 5],
      referenceQuestions: ['q1_4_1', 'q1_4_2', 'q1_5_1']
    },
    {
      id: 'connect_5_6',
      label: '연결 확인 5→6: 성과에서 학습으로',
      hint: 'STEP 5의 성과가 STEP 6의 의미 있는 학습으로 어떻게 승화되나요?',
      placeholder: '예: 이 경험은 단순한 목표 달성을 넘어 저의 사고방식과 행동 패턴을 근본적으로 변화시켰습니다...',
      rows: 3,
      referenceSteps: [5, 6],
      referenceQuestions: ['q1_5_1', 'q1_5_3', 'q1_6_1']
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }));
  };

  const toggleGuide = (questionId) => {
    setShowGuide(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const toggleStepSelection = (stepId) => {
    setSelectedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const goToNextStep = () => {
    if (currentPhase === 'round1') {
      if (currentStep < round1Steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('evaluation');
      }
    } else if (currentPhase === 'evaluation') {
      const sortedSteps = [...selectedSteps].sort((a, b) => a - b);
      setSelectedSteps(sortedSteps);
      setCurrentPhase('round2');
      setCurrentStep(0);
    } else if (currentPhase === 'round2') {
      if (currentStep < selectedSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('round3');
        setCurrentStep(0);
      }
    } else if (currentPhase === 'round3') {
      if (currentStep < round3Questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setFinalText(generateGoalStory());
        setCurrentPhase('completed');
      }
    }
  };

  const goToPrevStep = () => {
    if (currentPhase === 'completed') {
      setCurrentPhase('round3');
      setCurrentStep(round3Questions.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentPhase === 'round3') {
      setCurrentPhase('round2');
      setCurrentStep(selectedSteps.length - 1);
    } else if (currentPhase === 'round2') {
      setCurrentPhase('evaluation');
    } else if (currentPhase === 'evaluation') {
      setCurrentPhase('round1');
      setCurrentStep(round1Steps.length - 1);
    } else if (currentPhase === 'round1' && currentStep === 0) {
      setShowIntro(true);
    }
  };

  const generateGoalStory = () => {
    const parts = [];
    
    if (answers.q1_1_1) parts.push(answers.q1_1_1);
    if (answers.q1_1_2) parts.push(answers.q1_1_2);
    if (answers.connect_1_2) parts.push('\n' + answers.connect_1_2);
    if (answers.q1_2_1) parts.push('\n' + answers.q1_2_1);
    if (answers.q1_2_2) parts.push(answers.q1_2_2);
    if (answers.connect_2_3) parts.push('\n' + answers.connect_2_3);
    if (answers.q1_3_1) parts.push('\n' + answers.q1_3_1);
    if (answers.q1_3_2) parts.push(answers.q1_3_2);
    if (answers.connect_3_4) parts.push('\n' + answers.connect_3_4);
    if (answers.q1_4_1) parts.push('\n' + answers.q1_4_1);
    if (answers.q1_4_2) parts.push(answers.q1_4_2);
    if (answers.connect_4_5) parts.push('\n' + answers.connect_4_5);
    if (answers.q1_5_1) parts.push('\n' + answers.q1_5_1);
    if (answers.q1_5_2) parts.push(answers.q1_5_2);
    if (answers.connect_5_6) parts.push('\n' + answers.connect_5_6);
    if (answers.q1_6_1) parts.push('\n' + answers.q1_6_1);
    if (answers.q1_6_2) parts.push(answers.q1_6_2);
    if (answers.q1_6_3) parts.push('\n' + answers.q1_6_3);
    
    return parts.join('\n\n');
  };

  const downloadFinalText = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>목표달성</title>
<style>
body { font-family: '맑은 고딕', 'Malgun Gothic', sans-serif; line-height: 1.8; padding: 40px; }
p { margin-bottom: 1em; }
</style>
</head>
<body>
${finalText.split('\n\n').map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`).join('\n')}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${basicInfo.company || '회사'}_목표수립및달성.doc`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const getRawAnswersText = () => {
    return `📋 원본 답변 모음\n\n[기본 정보]\n직무: ${basicInfo.position || '-'}\n회사: ${basicInfo.company || '-'}\n목표달성 경험: ${basicInfo.experience || '-'}\n\n[STEP 1: 목표 설정 동기]\nQ1.1.1: ${answers.q1_1_1 || '-'}\nQ1.1.2: ${answers.q1_1_2 || '-'}\nQ1.1.3: ${answers.q1_1_3 || '-'}\n\n[STEP 2: 구체적 목표와 계획]\nQ1.2.1: ${answers.q1_2_1 || '-'}\nQ1.2.2: ${answers.q1_2_2 || '-'}\nQ1.2.3: ${answers.q1_2_3 || '-'}\n\n[STEP 3: 실행과 어려움]\nQ1.3.1: ${answers.q1_3_1 || '-'}\nQ1.3.2: ${answers.q1_3_2 || '-'}\nQ1.3.3: ${answers.q1_3_3 || '-'}\n\n[STEP 4: 문제해결과 혁신]\nQ1.4.1: ${answers.q1_4_1 || '-'}\nQ1.4.2: ${answers.q1_4_2 || '-'}\nQ1.4.3: ${answers.q1_4_3 || '-'}\n\n[STEP 5: 결과와 성과]\nQ1.5.1: ${answers.q1_5_1 || '-'}\nQ1.5.2: ${answers.q1_5_2 || '-'}\nQ1.5.3: ${answers.q1_5_3 || '-'}\n\n[STEP 6: 배운 점과 적용]\nQ1.6.1: ${answers.q1_6_1 || '-'}\nQ1.6.2: ${answers.q1_6_2 || '-'}\nQ1.6.3: ${answers.q1_6_3 || '-'}\n\n[3라운드 연결]\n1→2: ${answers.connect_1_2 || '-'}\n2→3: ${answers.connect_2_3 || '-'}\n3→4: ${answers.connect_3_4 || '-'}\n4→5: ${answers.connect_4_5 || '-'}\n5→6: ${answers.connect_5_6 || '-'}`;
  };

  const canGoNext = () => {
    if (currentPhase === 'evaluation') {
      return selectedSteps.length >= 1;
    }
    if (currentStep === 0 && currentPhase === 'round1') {
      return basicInfo.position && basicInfo.company && basicInfo.experience;
    }
    return true;
  };

  const progress = currentPhase === 'round1'
    ? ((currentStep + 1) / round1Steps.length) * 33
    : currentPhase === 'round2'
    ? 33 + ((currentStep + 1) / selectedSteps.length) * 33
    : 66 + ((currentStep + 1) / round3Questions.length) * 34;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">비공개 페이지</h1>
            <p className="text-gray-600">CareerEngineer의 목표수립 및 달성 워크북</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호를 입력하세요</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="비밀번호 입력"
                autoFocus
              />
            </div>
            {showError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                비밀번호가 올바르지 않습니다.
              </div>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              접속하기
            </button>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2025 CareerEngineer All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              질문에 답하며 완성하는<br />목표수립 및 달성 워크북
            </h1>
            <p className="text-center text-gray-600 mb-8">CareerEngineer의 3라운드 체계적 작성 시스템</p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3라운드 작성 시스템</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-800 mb-2">1라운드: 기본 목표달성 스토리 구성</h3>
                  <p className="text-sm text-gray-700">6개 STEP 핵심 질문에 답변 (전체 구조 파악)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                  <h3 className="font-bold text-gray-800 mb-2">2라운드: 약한 부분 보강</h3>
                  <p className="text-sm text-gray-700">부족한 STEP 선택 → 심화 질문으로 구체화 (1개 이상)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-800 mb-2">3라운드: 연결 및 완성</h3>
                  <p className="text-sm text-gray-700">STEP 간 연결 질문으로 자연스러운 흐름 만들기</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">핵심 원칙</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>진정성:</strong> 3초 자가진단 통과한 내용만</li>
                <li><strong>구체성:</strong> 숫자와 사실로 표현</li>
                <li><strong>검증 가능성:</strong> 가족도 인정할 사실만</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-yellow-300">
                <p className="text-sm font-semibold text-gray-800 mb-2">💡 3초 자가진단이란?</p>
                <p className="text-sm text-gray-700">
                  누군가 "정말이에요?"라고 물었을 때 <strong>3초 안에 자신있게 구체적인 예시나 증거를 댈 수 있는지</strong> 확인하는 것입니다.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-red-800 mb-2">⚠️ 반드시 확인</h3>
              <p className="text-sm text-red-700">
                작성하는 내용은 자동으로 저장되지 않으며 새로고침 버튼을 누르면 그동안 작성했던 내용은 사라집니다. 내용 작성 후 마지막 페이지에서 반드시 워드 파일(.doc)로 다운로드 하여 작성한 내용을 보관하세요
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-800 text-center">
                  © 2025 CareerEngineer All Rights Reserved.
                </p>
                <p className="text-xs text-red-800 text-center mt-1 font-semibold">
                  이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를 저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나 수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인 책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-bold text-lg"
            >
              1라운드 시작하기 →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'evaluation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              1라운드 완료! 🎉
            </h2>
            <p className="text-center text-gray-600 mb-8">
              부족하다고 느끼는 STEP을 선택하여 2라운드에서 심화 질문에 답변하세요
            </p>

            <div className="space-y-4 mb-8">
              {round1Steps.slice(1).map(step => {
                const stepId = step.id;
                const isSelected = selectedSteps.includes(stepId);
                
                return (
                  <div 
                    key={stepId}
                    className={`border-2 rounded-lg p-5 transition-all ${
                      isSelected 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{step.subtitle}</p>
                        <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                          <strong>내 답변:</strong> {answers[step.questions[0].id]?.substring(0, 100) || '(답변 없음)'}
                          {answers[step.questions[0].id]?.length > 100 && '...'}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStepSelection(stepId)}
                        className={`ml-4 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isSelected 
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {isSelected ? '✓ 선택됨' : '심화 선택'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>💡 선택 기준:</strong> 답변이 부족하거나 더 구체화가 필요한 STEP을 자유롭게 선택하세요. (1개 이상)
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                이전
              </button>
              <button
                onClick={goToNextStep}
                disabled={!canGoNext()}
                className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                2라운드 시작하기 ({selectedSteps.length}개 선택됨)
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              © 2025 CareerEngineer All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                목표수립 및 달성 완성! 🎉
              </h2>
              <p className="text-gray-600">
                아래 내용을 확인하고 자유롭게 수정하세요
              </p>
            </div>

            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <p className="text-base font-bold text-red-900 mb-2">
                    반드시 다운로드하세요!
                  </p>
                  <p className="text-sm text-red-800 leading-relaxed">
                    지금까지 작성한 모든 내용은 브라우저에만 임시 저장되어 있습니다. 
                    페이지를 새로고침하거나 닫으면 <strong>모든 내용이 즉시 삭제</strong>됩니다.
                    <br />
                    <strong>내용 수정 후 "워드 파일로 다운로드"</strong> 버튼을 눌러 .doc 파일로 저장하세요!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  완성된 목표수립 및 달성 (수정 가능)
                </h3>
                <button
                  onClick={() => setShowRawAnswers(!showRawAnswers)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  {showRawAnswers ? '원본 답변 숨기기' : '원본 답변 보기'}
                </button>
              </div>
              
              <textarea
                value={finalText}
                onChange={(e) => setFinalText(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none font-serif leading-relaxed"
              />
            </div>

            {showRawAnswers && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">📋 원본 답변 참고</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {getRawAnswersText()}
                </pre>
              </div>
            )}

            <button
              onClick={downloadFinalText}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg mb-4"
            >
              <Download className="w-6 h-6" />
              워드 파일로 다운로드 (.doc)
            </button>

            {downloadSuccess && (
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center mb-4">
                <p className="text-green-800 font-semibold">
                  ✅ 다운로드 완료!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  다운로드 폴더에서 "{basicInfo.company || '회사'}_목표수립및달성.doc" 파일을 Microsoft Word로 열어주세요.
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-800">
                💾 <strong>워드에서 편집 가능:</strong> 다운로드한 .doc 파일을 Microsoft Word에서 열어 자유롭게 편집하고 서식을 적용할 수 있습니다.
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                이전으로
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-800 text-center">
                © 2025 CareerEngineer All Rights Reserved.
              </p>
              <p className="text-xs text-red-800 text-center mt-1 font-semibold">
                이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를 저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나 수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인 책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = currentPhase === 'round1' 
    ? round1Steps[currentStep]
    : currentPhase === 'round2'
    ? { 
        title: `${round1Steps[selectedSteps[currentStep]].title} - 심화`,
        questions: round2Questions[selectedSteps[currentStep]]
      }
    : {
        title: '3라운드: 연결 및 완성',
        questions: [round3Questions[currentStep]]
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            CareerEngineer 목표수립 및 달성 워크북
          </h1>
          <p className="text-gray-600">
            체계적인 3라운드 시스템으로 완성하는 목표달성 스토리
          </p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                {currentPhase === 'round1' ? '1라운드' : currentPhase === 'round2' ? '2라운드' : '3라운드'} - {currentStepData.title}
              </span>
              <span>전체 진행률: {Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: progress + '%' }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentStepData.title}
          </h2>
          {currentStepData.subtitle && (
            <p className="text-gray-600 mb-6">{currentStepData.subtitle}</p>
          )}

          {currentStep === 0 && currentPhase === 'round1' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 직무
                </label>
                <input
                  type="text"
                  value={basicInfo.position}
                  onChange={(e) => handleBasicInfoChange('position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 데이터 분석, 마케팅, 개발 등"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 회사명
                </label>
                <input
                  type="text"
                  value={basicInfo.company}
                  onChange={(e) => handleBasicInfoChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 삼성전자, 네이버, 카카오 등"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  선택한 목표달성 경험
                </label>
                <input
                  type="text"
                  value={basicInfo.experience}
                  onChange={(e) => handleBasicInfoChange('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: Python 독학을 통한 데이터 분석 프로젝트 완성"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {currentStepData.questions.map((q) => (
                <div key={q.id} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <label className="text-lg font-semibold text-gray-800">
                      {q.label}
                    </label>
                    {q.guide && (
                      <button
                        onClick={() => toggleGuide(q.id)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <HelpCircle className="w-4 h-4" />
                        {showGuide[q.id] ? '가이드 숨기기' : '가이드 보기'}
                      </button>
                    )}
                  </div>
                  
                  {q.hint && (
                    <p className="text-sm text-gray-600 mb-2">💡 {q.hint}</p>
                  )}
                  
                  {q.referenceQuestions && (
                    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-3">
                      <p className="text-sm font-semibold text-indigo-900 mb-2">📚 참고: 이전 답변</p>
                      <div className="space-y-3">
                        {q.referenceQuestions.map((refId) => {
                          const refQuestion = [...round1Steps.flatMap(s => s.questions || [])].find(q => q?.id === refId);
                          if (!refQuestion || !answers[refId]) return null;
                          return (
                            <div key={refId} className="bg-white p-3 rounded text-sm">
                              <p className="font-semibold text-gray-700 mb-1">{refQuestion.label}</p>
                              <p className="text-gray-600 italic">{answers[refId]?.substring(0, 150)}{answers[refId]?.length > 150 ? '...' : ''}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {q.guide && showGuide[q.id] && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">📝 {q.guide.description}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">🎯 {q.guide.diagnosis}</p>
                      </div>
                      
                      {q.guide.helpQuestions && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">❓ 구체화 도움 질문:</p>
                          <ul className="text-sm text-blue-800 space-y-1 ml-4">
                            {q.guide.helpQuestions.map((hq, i) => (
                              <li key={i}>• {hq}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {q.guide.ifDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">💭 답변하기 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifDifficult}</p>
                        </div>
                      )}
                      
                      {q.guide.ifStillDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">💡 구체화 도움 질문으로도 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifStillDifficult}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    rows={q.rows || 3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder={q.placeholder}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button
              onClick={goToPrevStep}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              이전
            </button>
            <button
              onClick={goToNextStep}
              disabled={!canGoNext()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              다음
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2025 CareerEngineer All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalAchievementWorkbook;