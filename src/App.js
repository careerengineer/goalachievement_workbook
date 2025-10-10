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
    goal: ''
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
    { id: 0, title: '기본 정보 입력', subtitle: '지원 직무, 회사명, 목표를 입력하세요' },
    {
      id: 1,
      title: 'STEP 1: 목표 설정 동기',
      subtitle: '이 목표를 설정하게 된 구체적인 계기',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1.1.1. 이 목표를 설정하게 된 구체적인 계기는 무엇인가요?',
          hint: '언제, 어디서, 무엇 때문에 이 목표를 세웠는지 구체적으로',
          placeholder: '예: 2023년 9월, 전공 수업에서 데이터 분석 과제를 하다가 제 실력의 한계를 절실히 느꼈습니다...',
          rows: 4
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 이 목표가 본인에게 왜 중요했나요?',
          hint: '개인적 의미와 가치, 달성했을 때의 변화 기대를 구체적으로',
          placeholder: '예: 취업 경쟁력 확보, 자신감 회복, 전문성 입증 등 실질적이고 측정 가능한 이유...',
          rows: 3
        }
      ]
    },
    {
      id: 2,
      title: 'STEP 2: 구체적 목표와 계획',
      subtitle: '구체적 목표와 이를 달성하기 위한 계획',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. 설정한 목표를 구체적으로 설명해주세요. (SMART 원칙 적용)',
          hint: '측정 가능하고 검증 가능한 목표',
          placeholder: '예: Python 마스터 목표를 세우고, 6개월간 계획을 세웠습니다...',
          rows: 3
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 이를 달성하기 위한 세부 계획은 무엇이었나요?',
          hint: '구체적 실행 계획과 단계',
          placeholder: '예: 매일 2시간씩 공부, 주 1회 프로젝트 적용 등...',
          rows: 3
        }
      ]
    },
    {
      id: 3,
      title: 'STEP 3: 실행과 어려움',
      subtitle: '실행 과정에서 만난 어려움',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q1.3.1. 실행 과정에서 어떤 어려움을 겪었나요?',
          hint: '시간, 장소, 상황의 디테일',
          placeholder: '예: 실행 중 예상치 못한 장애물...',
          rows: 3
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 그 어려움은 어떻게 느껴졌나요?',
          hint: '내면의 변화와 깨달음',
          placeholder: '예: 포기하고 싶었던 순간...',
          rows: 3
        }
      ]
    },
    {
      id: 4,
      title: 'STEP 4: 문제해결과 혁신',
      subtitle: '어려움을 극복한 혁신적 해결 과정',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q1.4.1. 어려움을 어떻게 해결했나요?',
          hint: '시간 순서대로 해결 과정',
          placeholder: '예: 창의적 접근법으로 극복...',
          rows: 3
        },
        {
          id: 'q1_4_2',
          label: 'Q1.4.2. 그 해결책의 차별화 포인트는?',
          hint: '가장 열심히 한 활동과 그 성과',
          placeholder: '예: 남들과 다른 독특한 방법...',
          rows: 3
        }
      ]
    },
    {
      id: 5,
      title: 'STEP 5: 결과와 성과',
      subtitle: '달성한 결과와 구체적 성과',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q1.5.1. 최종 결과는 어땠나요?',
          hint: '구체적인 사실과 숫자 포함',
          placeholder: '예: 목표 달성 여부와 성과 지표...',
          rows: 3
        },
        {
          id: 'q1_5_2',
          label: 'Q1.5.2. 그 성과의 의미는?',
          hint: '첫 인상과 끌린 이유',
          placeholder: '예: 단순 결과 이상의 가치...',
          rows: 3
        }
      ]
    },
    {
      id: 6,
      title: 'STEP 6: 배운 점과 적용',
      subtitle: '경험에서 얻은 교훈과 적용',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q1.6.1. 이 경험에서 얻은 가장 큰 교훈은?',
          hint: '보유 교훈과 증명 가능한 경험',
          placeholder: '예: 구체적 학습과 미래 적용...',
          rows: 3
        },
        {
          id: 'q1_6_2',
          label: 'Q1.6.2. 이를 어떻게 적용할 건가요?',
          hint: '구체적 프로젝트나 성과',
          placeholder: '예: 직무에 적용할 방안...',
          rows: 3
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q2.1.1. Q1.1.1(이 목표를 설정하게 된 구체적인 계기는 무엇인가요?)의 계기를 더 구체적으로 묘사해주세요',
        hint: '그 순간의 디테일한 상황과 감정을 생생하게 표현',
        guide: {
          description: '답변 가이드: 그 순간의 디테일한 상황과 감정을 생생하게 표현',
          diagnosis: '즉석자가진단: "그때 무슨 생각이 들었어요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '그날의 날씨, 분위기, 주변 상황은?',
            '함께 있던 사람들의 반응은?',
            '그 순간 들었던 구체적인 생각은?'
          ],
          ifDifficult: '그때 찍은 사진이나 메모를 찾아보세요. SNS나 일기에 기록이 있는지 확인해보거나 함께했던 사람에게 물어보세요.',
          ifStillDifficult: '계절이라도 기억해보세요. "여름이었고 더웠다", "기말고사 직후였다" 같은 시기적 배경이라도 추가하면 진정성이 높아집니다.',
          example: '2023년 9월, 전공 수업에서 데이터 분석 과제를 하다가 제 실력의 한계를 절실히 느꼈습니다. 다른 학생들은 Python으로 쉽게 처리하는 것을 저는 Excel로만 겨우 해내는 상황이 너무 답답했고, 이대로는 취업 경쟁력이 없다는 위기감이 들어 Python 마스터라는 목표를 세우게 되었습니다.'
        },
        placeholder: '예: 2023년 9월, 전공 수업에서 데이터 분석 과제를 하다가...',
        rows: 4
      },
      {
        id: 'q2_1_2',
        label: 'Q2.1.2. 그 계기 이전과 이후, 당신은 어떻게 달라졌나요?',
        hint: '변화의 구체적인 before & after 비교',
        guide: {
          description: '답변 가이드: 변화의 구체적인 before & after 비교',
          diagnosis: '즉석자가진단: "구체적으로 뭐가 달라졌어요?"라고 물으면 3가지 이상 답변 가능한가?',
          helpQuestions: [
            '일상의 관심사가 어떻게 바뀌었나요?',
            '시간을 쓰는 방식이 어떻게 변했나요?',
            '미래 계획이 어떻게 수정되었나요?'
          ],
          ifDifficult: 'SNS 피드나 유튜브 알고리즘이 어떻게 바뀌었는지 생각해보세요.',
          ifStillDifficult: '최소한 검색 기록이 바뀌었을 것입니다. 작은 변화라도 구체적으로 적어보세요.',
          example: '이전에는 Excel로만 겨우 해내는 상황이었지만, 이후에는 매일 2시간씩 Python을 공부하기 시작했습니다.'
        },
        placeholder: '예: 이전에는 Excel로만...',
        rows: 4
      },
      {
        id: 'q2_1_3',
        label: 'Q2.1.3. 만약 그 계기가 없었다면 지금 무엇을 하고 있을까요?',
        hint: '계기의 결정적 중요성을 역설적으로 강조',
        guide: {
          description: '답변 가이드: 계기의 결정적 중요성을 역설적으로 강조',
          diagnosis: '즉석자가진단: "다른 목표를 생각해본 적 있어요?"라고 물으면 답변 가능한가?',
          helpQuestions: [
            '다른 목표를 고려했었나요?',
            '그 계기가 왜 결정적이었나요?',
            '다른 가능성과 비교했을 때 이 길을 선택한 이유는?'
          ],
          ifDifficult: '이전에 막연히 생각했던 목표를 떠올려보세요.',
          ifStillDifficult: '주변 친구들이 선택한 일반적인 목표를 생각해보세요.',
          example: '아마 취업 경쟁력이 없다는 위기감 없이 그대로 있었을 것입니다.'
        },
        placeholder: '예: 아마 취업 경쟁력이...',
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2.2.1. Q1.2.1(설정한 목표를 구체적으로 설명해주세요. (SMART 원칙 적용))의 계획 중 가장 도전적이었던 것을 자세히 설명해주세요',
        hint: '어려움과 극복 과정을 구체적으로 서술',
        guide: {
          description: '답변 가이드: 어려움과 극복 과정을 구체적으로 서술',
          diagnosis: '즉석자가진단: "왜 그게 어려웠어요?"라고 물으면 상세 설명 가능한가?',
          helpQuestions: [
            '어떤 점이 가장 어려웠나요?',
            '포기하고 싶었던 순간은?',
            '어떻게 극복했나요?'
          ],
          ifDifficult: '실패했던 경험도 의미가 있습니다.',
          ifStillDifficult: '처음 해본 것은 모두 도전입니다.',
          example: '가장 어려웠던 건 계획 실행이었습니다.'
        },
        placeholder: '예: 가장 어려웠던 건...',
        rows: 4
      },
      {
        id: 'q2_2_2',
        label: 'Q2.2.2. 그 계획을 통해 얻은 구체적인 결과물은 무엇인가요?',
        hint: '측정 가능하고 검증 가능한 구체적 성과',
        guide: {
          description: '답변 가이드: 측정 가능하고 검증 가능한 구체적 성과',
          diagnosis: '즉석자가진단: "그 성과를 어떻게 증명할 수 있어요?"',
          helpQuestions: [
            '만든 포트폴리오나 프로젝트가 있나요?',
            '받은 인정이나 피드백은?',
            '수치로 표현할 수 있는 성과는?'
          ],
          ifDifficult: '작은 성과도 의미가 있습니다.',
          ifStillDifficult: '학습 기록이나 노트도 결과물입니다.',
          example: '6개월간의 탐구로 구체적인 결과물을 만들었습니다.'
        },
        placeholder: '예: 6개월간의 탐구로...',
        rows: 4
      },
      {
        id: 'q2_2_3',
        label: 'Q2.2.3. 이 과정에서 실패하거나 시행착오를 겪은 경험은?',
        hint: '실패와 극복이 성장의 증거',
        guide: {
          description: '답변 가이드: 실패와 극복이 성장의 증거',
          diagnosis: '즉석자가진단: "그 실패에서 뭘 배웠어요?"',
          helpQuestions: [
            '예상과 다르게 진행된 부분은?',
            '실패의 원인은 무엇이었나요?',
            '그 실패를 어떻게 극복했나요?'
          ],
          ifDifficult: '모든 새로운 도전에는 시행착오가 따릅니다.',
          ifStillDifficult: '작은 실수도 의미가 있습니다.',
          example: '초반에는 무작정 계획만 세우다가 실패했습니다.'
        },
        placeholder: '예: 초반에는...',
        rows: 4
      }
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q2.3.1. 이 실행의 하루 일과를 상상해서 설명해주세요',
        hint: '현실적이고 구체적인 실행 일과 묘사',
        guide: {
          description: '답변 가이드: 현실적이고 구체적인 실행 일과 묘사',
          diagnosis: '즉석자가진단: "그 중 가장 어려운 부분은 뭘까요?"',
          helpQuestions: [
            '오전에는 주로 무슨 실행을?',
            '협업은 누구와 어떻게?',
            '가장 시간이 많이 걸리는 실행은?'
          ],
          ifDifficult: '실전 가이드나 참고자료를 확인하세요.',
          ifStillDifficult: '일반적인 실행 흐름이라도 구체화하세요.',
          example: '오전 9시, 전날 실행 성과를 확인하며 하루를 시작합니다.'
        },
        placeholder: '예: 오전 9시...',
        rows: 4
      },
      {
        id: 'q2_3_2',
        label: 'Q2.3.2. 이 실행에 필요한 핵심 역량 3가지와 본인의 수준은?',
        hint: '객관적 자기 평가와 발전 가능성',
        guide: {
          description: '답변 가이드: 객관적 자기 평가와 발전 가능성',
          diagnosis: '즉석자가진단: "그 역량을 어떻게 키울 건가요?"',
          helpQuestions: [
            '필수 역량 top 3는?',
            '각각의 현재 수준은?',
            '부족한 부분을 어떻게 채울 것인가?'
          ],
          ifDifficult: '참고자료나 직무 소개서를 참고하세요.',
          ifStillDifficult: '일반적인 역량이라도 솔직하게 평가하세요.',
          example: '핵심 역량 3가지는 실행력, 문제해결력, 지속성입니다.'
        },
        placeholder: '예: 핵심 역량 3가지는...',
        rows: 4
      },
      {
        id: 'q2_3_3',
        label: 'Q2.3.3. 부족한 역량을 채우기 위한 구체적 계획은?',
        hint: '우선순위가 명확하고 실행 가능한 계획',
        guide: {
          description: '답변 가이드: 우선순위가 명확하고 실행 가능한 계획',
          diagnosis: '즉석자가진단: "첫 달에는 뭘 할 건가요?"',
          helpQuestions: [
            '우선순위를 정한다면?',
            '각각 언제까지, 어떻게?',
            '이미 시작한 것이 있다면?'
          ],
          ifDifficult: '온라인 강의, 자격증, 독서, 스터디 등을 떠올려보세요.',
          ifStillDifficult: '달성 후 배울 수 있는 것과 지금 준비할 수 있는 것을 구분하세요.',
          example: '우선 실행력 강화를 위해 현재 계획을 수강 중입니다.'
        },
        placeholder: '예: 우선 실행력...',
        rows: 4
      }
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q2.4.1. 이 해결의 최근 1년 주요 뉴스나 변화는?',
        hint: '구체적인 사실과 날짜, 내용 포함',
        guide: {
          description: '답변 가이드: 구체적인 사실과 날짜, 내용 포함',
          diagnosis: '즉석자가진단: "그게 왜 중요한가요?"',
          helpQuestions: [
            '신규 해결이나 사업 확장은?',
            '조직 문화나 제도의 변화는?',
            '업계에서의 포지션 변화는?'
          ],
          ifDifficult: '참고자료를 확인하세요.',
          ifStillDifficult: '기본적인 정보이라도 구체화하세요.',
          example: '지난 2024년 11월, 해결을 공식 발표했습니다.'
        },
        placeholder: '예: 지난 2024년 11월...',
        rows: 4
      },
      {
        id: 'q2_4_2',
        label: 'Q2.4.2. 이 해결만의 독특한 문화나 가치는 무엇인가요?',
        hint: '다른 것과 차별화되는 점',
        guide: {
          description: '답변 가이드: 다른 것과 차별화되는 점',
          diagnosis: '즉석자가진단: "왜 그게 당신에게 중요해요?"',
          helpQuestions: [
            '핵심 가치는?',
            '업무 방식의 특징은?',
            '조직 문화의 차별점은?'
          ],
          ifDifficult: '참고자료의 "About Us"를 확인하세요.',
          ifStillDifficult: '일반적인 키워드라도 연결하세요.',
          example: '혁신적 문제해결을 핵심 가치로 삼고 있습니다.'
        },
        placeholder: '예: 혁신적 문제해결을...',
        rows: 4
      },
      {
        id: 'q2_4_3',
        label: 'Q2.4.3. 이 해결이 직면한 도전 과제와 기회는?',
        hint: '트렌드와 연결한 통찰력 있는 분석',
        guide: {
          description: '답변 가이드: 트렌드와 연결한 통찰력 있는 분석',
          diagnosis: '즉석자가진단: "당신이 어떻게 기여할 수 있을까요?"',
          helpQuestions: [
            '현재 가장 집중하는 이슈는?',
            '향후 성장 동력은?',
            '내가 기여할 수 있는 부분은?'
          ],
          ifDifficult: '리포트, 인터뷰를 찾아보세요.',
          ifStillDifficult: '일반적인 트렌드라도 연결하세요.',
          example: '가장 큰 도전은 어려움 극복입니다.'
        },
        placeholder: '예: 가장 큰 도전은...',
        rows: 4
      }
    ],
    5: [
      {
        id: 'q2_5_1',
        label: 'Q2.5.1. 달성 후 기여 방안을 프로젝트 단위로 설명해주세요',
        hint: '구체적인 프로젝트 아이디어와 실행 계획',
        guide: {
          description: '답변 가이드: 구체적인 프로젝트 아이디어와 실행 계획',
          diagnosis: '즉석자가진단: "필요한 리소스는 뭐예요?"',
          helpQuestions: [
            '구체적인 프로젝트명은?',
            '필요한 리소스와 기간은?',
            '예상되는 성과 지표는?'
          ],
          ifDifficult: '현재 진행 중인 프로젝트를 참고하세요.',
          ifStillDifficult: '간단한 프로젝트부터 시작하세요.',
          example: '첫 3개월: 목표 타겟 프로젝트 기획'
        },
        placeholder: '예: 첫 3개월...',
        rows: 4
      },
      {
        id: 'q2_5_2',
        label: 'Q2.5.2. 달성 첫 6개월 동안의 구체적인 목표는?',
        hint: '시간 순서에 따른 단계별 계획',
        guide: {
          description: '답변 가이드: 시간 순서에 따른 단계별 계획',
          diagnosis: '즉석자가진단: "그게 현실적인가요?"',
          helpQuestions: [
            '첫 달: 적응 및 학습',
            '2-3달: 실무 참여',
            '4-6달: 독자적 기여'
          ],
          ifDifficult: '일반적인 성장 경로를 참고하세요.',
          ifStillDifficult: '단계별로 나눠 생각하세요.',
          example: '첫 달은 업무 방식을 익히며...'
        },
        placeholder: '예: 첫 달은...',
        rows: 4
      },
      {
        id: 'q2_5_3',
        label: 'Q2.5.3. 이 성과 특유의 상황에서 어떻게 적응할 건가요?',
        hint: '문화와 업무 방식에 대한 구체적 적응 전략',
        guide: {
          description: '답변 가이드: 문화와 업무 방식에 대한 구체적 적응 전략',
          diagnosis: '즉석자가진단: "첫 주에 뭘 할 건가요?"',
          helpQuestions: [
            '빠른 의사결정 문화에 적응하려면?',
            '협업이 필요하다면?',
            '애자일한 조직 문화에서는?'
          ],
          ifDifficult: '특징적인 문화를 하나 선택해서 적응 방법을 설명하세요.',
          ifStillDifficult: '일반적인 적응 전략이라도 구체화하세요.',
          example: '애자일 업무 방식에 빠르게 적응하기 위해...'
        },
        placeholder: '예: 애자일 업무 방식에...',
        rows: 4
      }
    ],
    6: [
      {
        id: 'q2_6_1',
        label: 'Q2.6.1. 롤모델이 있다면 누구이고, 왜인가요?',
        hint: '구체적인 인물과 닮고 싶은 점 명확히',
        guide: {
          description: '답변 가이드: 구체적인 인물과 닮고 싶은 점 명확히',
          diagnosis: '즉석자가진단: "그 사람의 어떤 점을 닮고 싶어요?"',
          helpQuestions: [
            '그 사람의 어떤 점을 닮고 싶나요?',
            '그 사람의 경로는?',
            '나만의 차별점은?'
          ],
          ifDifficult: '유명 인사를 찾아보세요.',
          ifStillDifficult: '유명하지 않아도 괜찮습니다.',
          example: '목표 달성 롤모델을...'
        },
        placeholder: '예: 목표 달성 롤모델을...',
        rows: 4
      },
      {
        id: 'q2_6_2',
        label: 'Q2.6.2. 이 분야에서 나만의 전문성을 어떻게 만들 건가요?',
        hint: '차별화된 전문 영역과 구체적 계획',
        guide: {
          description: '답변 가이드: 차별화된 전문 영역과 구체적 계획',
          diagnosis: '즉석자가진단: "왜 그 분야인가요?"',
          helpQuestions: [
            '어떤 세부 분야에 집중할 건가요?',
            '차별화 포인트는?',
            '그를 위한 준비는?'
          ],
          ifDifficult: '현재 트렌드와 자신의 강점을 결합하세요.',
          ifStillDifficult: '기본에 충실하되 한 가지를 깊게 파는 전략도 좋습니다.',
          example: '목표 달성 전문가가 되고자 합니다.'
        },
        placeholder: '예: 목표 달성...',
        rows: 4
      }
    ]
  };

  const round3Questions = [
    {
      id: 'connect_1_2',
      label: '연결 확인 1→2: 동기가 구체적 목표로 자연스럽게 이어지는가?',
      hint: 'STEP 1의 동기가 STEP 2의 목표로 어떻게 이어졌나요?',
      placeholder: '예: 그 경험 이후 목표에 대한 호기심을 실제 계획으로 발전시키고자...',
      rows: 3,
      referenceSteps: [1, 2],
      referenceQuestions: ['q1_1_1', 'q1_1_2', 'q1_2_1']
    },
    {
      id: 'connect_2_3',
      label: '연결 확인 2→3: 계획이 실제 실행과 일치하는가?',
      hint: 'STEP 2의 계획을 통해 STEP 3의 실행이 어떻게 깊어졌나요?',
      placeholder: '예: 이러한 계획을 통해 단순한 흥미를 넘어 이 실행의 본질을 이해하게 되었습니다...',
      rows: 3,
      referenceSteps: [2, 3],
      referenceQuestions: ['q1_2_1', 'q1_2_2', 'q1_3_1', 'q1_3_2']
    },
    {
      id: 'connect_3_4',
      label: '연결 확인 3→4: 어려움이 혁신적 해결로 연결되는가?',
      hint: 'STEP 3의 이해가 STEP 4의 해결로 어떻게 전환되었나요?',
      placeholder: '예: 이러한 관심은 단순한 호기심에 그치지 않고, 실제 역량을 키우기 위한 구체적인 해결로 이어졌습니다...',
      rows: 3,
      referenceSteps: [3, 4],
      referenceQuestions: ['q1_3_2', 'q1_3_1', 'q1_4_1', 'q1_4_2']
    },
    {
      id: 'connect_4_5',
      label: '연결 확인 4→5: 해결책이 구체적 성과로 이어지는가?',
      hint: 'STEP 4의 해결 과정이 STEP 5의 성과에 어떤 영향을 주었나요?',
      placeholder: '예: 이러한 해결 과정을 통해 원하는 결과의 방향이 명확해졌고...',
      rows: 3,
      referenceSteps: [4, 5],
      referenceQuestions: ['q1_4_1', 'q1_4_2', 'q1_5_1', 'q1_5_2']
    },
    {
      id: 'connect_5_6',
      label: '연결 확인 5→6: 성과가 의미 있는 학습으로 승화되는가?',
      hint: 'STEP 5의 성과가 STEP 6의 학습에 어떤 영향을 주었나요?',
      placeholder: '예: 이러한 성과를 통해 학습 방향이 명확해졌고...',
      rows: 3,
      referenceSteps: [5, 6],
      referenceQuestions: ['q1_5_1', 'q1_5_2', 'q1_6_1', 'q1_6_2']
    }
  ];

  const toggleStepSelection = (stepId) => {
    setSelectedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const canGoNext = () => {
    if (currentPhase === 'round1' && currentStep === 0) {
      return Object.values(basicInfo).every(value => value.trim() !== '');
    }
    const currentQuestions = currentPhase === 'round1' 
      ? round1Steps[currentStep].questions || []
      : currentPhase === 'round2'
      ? round2Questions[selectedSteps[currentStep]]
      : [round3Questions[currentStep]];

    return currentQuestions.every(q => answers[q.id]?.trim());
  };

  const calculateProgress = () => {
    if (currentPhase === 'round1') {
      return ((currentStep / (round1Steps.length - 1)) * 33.33);
    } else if (currentPhase === 'round2') {
      return 33.33 + ((currentStep / selectedSteps.length) * 33.33);
    } else if (currentPhase === 'round3') {
      return 66.66 + ((currentStep / round3Questions.length) * 33.33);
    }
    return 0;
  };

  const progress = calculateProgress();

  const goToNextStep = () => {
    if (currentPhase === 'round1') {
      if (currentStep < round1Steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('evaluation');
        setCurrentStep(0);
      }
    } else if (currentPhase === 'evaluation') {
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
        setCurrentPhase('completed');
        generateFinalText();
      }
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentPhase === 'round2') {
      setCurrentPhase('evaluation');
    } else if (currentPhase === 'round3') {
      setCurrentPhase('round2');
      setCurrentStep(selectedSteps.length - 1);
    } else if (currentPhase === 'evaluation') {
      setCurrentPhase('round1');
      setCurrentStep(round1Steps.length - 1);
    } else if (currentPhase === 'completed') {
      setCurrentPhase('round3');
      setCurrentStep(round3Questions.length - 1);
    }
  };

  const toggleGuide = (questionId) => {
    setShowGuide(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const generateFinalText = () => {
    let text = `목표수립 및 달성 완성\n\n`;
    text += `지원 직무: ${basicInfo.position}\n`;
    text += `회사명: ${basicInfo.company}\n`;
    text += `목표: ${basicInfo.goal}\n\n`;

    round1Steps.slice(1).forEach(step => {
      text += `${step.title}\n`;
      step.questions.forEach(q => {
        text += `${q.label}\n${answers[q.id] || ''}\n\n`;
      });
    });

    selectedSteps.forEach(stepId => {
      const step = round1Steps.find(s => s.id === stepId);
      text += `${step.title} - 심화\n`;
      round2Questions[stepId].forEach(q => {
        text += `${q.label}\n${answers[q.id] || ''}\n\n`;
      });
    });

    round3Questions.forEach(q => {
      text += `${q.label}\n${answers[q.id] || ''}\n\n`;
    });

    setFinalText(text);
  };

  const getRawAnswersText = () => {
    let text = '';
    Object.entries(answers).forEach(([id, answer]) => {
      text += `${id}: ${answer}\n\n`;
    });
    return text;
  };

  const downloadFinalText = () => {
    const blob = new Blob([finalText], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${basicInfo.company || '회사'}_목표달성.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              목표수립 및 달성 워크북
            </h1>
            <p className="text-gray-600 mb-4">
              6단계 체계적 목표달성 완성 가이드
            </p>
            <p className="text-sm text-gray-500">
              © 2025 CareerEngineer All Rights Reserved.
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="비밀번호를 입력하세요"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {showError && (
              <p className="text-red-500 text-sm text-center">
                잘못된 비밀번호입니다.
              </p>
            )}

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              워크북 열기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              목표수립 및 달성 워크북
            </h1>
            <p className="text-center text-gray-600 mb-8">
              6단계 체계적 목표달성 완성 가이드
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <h3 className="font-bold text-blue-800 mb-2">💡 빠른 활용 가이드</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 사전 준비: 실전가이드 읽기 완료 권장</li>
                <li>• 목적: 6단계 질문 답변으로 목표달성 완성</li>
                <li>• 막힐 때: 참고자료 해당 섹션 확인</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <h3 className="font-bold text-green-800 mb-2">📝 목표달성 핵심 원칙</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 진정성 원칙: 실제 경험한 사실인가?</li>
                <li>• 구체성 원칙: 명확한 목표와 기한이 있는가?</li>
                <li>• 차별성 원칙: 남들과 다른 독특한 접근법이 있는가?</li>
                <li>• 학습성 원칙: 경험에서 얻은 구체적 교훈이 있는가?</li>
              </ul>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
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
                목표달성 완성! 🎉
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
                    💾 <strong>지금 바로 "워드 파일로 다운로드"</strong> 버튼을 눌러 .doc 파일로 저장하세요!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  완성된 목표달성 (수정 가능)
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
                  다운로드 폴더에서 "{basicInfo.company || '회사'}_목표달성.doc" 파일을 Microsoft Word로 열어주세요.
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-800">
                💾 <strong>워드에서 편집 가능:</strong> 다운로드한 .doc 파일을 Microsoft Word나 한글(HWP)에서 열어 자유롭게 편집하고 서식을 적용할 수 있습니다.
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

          {/* 저작권 안내 */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h3 className="font-bold text-gray-800 mb-2">📌 워크북 사용 안내</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li><strong>진정성 원칙:</strong> 3초 자가진단을 통과한 확실한 내용만 작성</li>
              <li><strong>구체성 원칙:</strong> 숫자와 사실로 표현</li>
              <li><strong>검증 가능:</strong> 가족·친구들도 인정할 수 있는 내용만 사용</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-1">💡 3초 자가진단이란?</p>
              <p className="text-xs text-gray-600">
                누군가 "정말이에요?"라고 물었을 때 3초 안에 자신있게 구체적인 예시나 증거를 댈 수 있는지 확인하는 것입니다.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                © 2025 CareerEngineer All Rights Reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                이 워크북은 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.
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
            목표수립 및 달성 워크북
          </h1>
          <p className="text-gray-600">
            진정성이 화려함을 이긴다 + 구체적 경험이 설득력을 만든다
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
                  지원 직무
                </label>
                <input
                  type="text"
                  value={basicInfo.position}
                  onChange={(e) => handleBasicInfoChange('position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 데이터 분석, SW 개발 등"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  회사명
                </label>
                <input
                  type="text"
                  value={basicInfo.company}
                  onChange={(e) => handleBasicInfoChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 삼성전자, LG 등"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  목표
                </label>
                <input
                  type="text"
                  value={basicInfo.goal}
                  onChange={(e) => handleBasicInfoChange('goal', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: Python 마스터"
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
                      
                      {q.guide.example && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">✏️ 답변 작성 예시:</p>
                          <p className="text-sm text-blue-800 italic bg-white p-2 rounded">{q.guide.example}</p>
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