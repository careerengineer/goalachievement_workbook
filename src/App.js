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
    date: '',
    position: '',
    company: '',
    experienceTitle: '',
    experiencePeriod: '',
    duration: '',
    relatedCompetency: ''
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

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const toggleGuide = (id) => {
    setShowGuide(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleStepSelection = (stepId) => {
    setSelectedSteps(prev => 
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  const goToNextStep = () => {
    const steps = currentPhase === 'round1' ? round1Steps : currentPhase === 'round2' ? selectedSteps.map(id => ({id, questions: round2Questions[id]})) : round3Questions;
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (currentPhase === 'round1') {
      setCurrentPhase('evaluation');
      setCurrentStep(0);
    } else if (currentPhase === 'round2') {
      setCurrentPhase('round3');
      setCurrentStep(0);
    } else if (currentPhase === 'round3') {
      setCurrentPhase('completed');
      setFinalText(generateFinalText());
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else if (currentPhase === 'evaluation') {
      setCurrentPhase('round1');
      setCurrentStep(round1Steps.length - 1);
    } else if (currentPhase === 'round2') {
      setCurrentPhase('evaluation');
    } else if (currentPhase === 'round3') {
      setCurrentPhase('round2');
      setCurrentStep(selectedSteps.length - 1);
    } else if (currentPhase === 'completed') {
      setCurrentPhase('round3');
      setCurrentStep(round3Questions.length - 1);
    }
  };

  const canGoNext = () => {
    if (currentPhase === 'evaluation') return selectedSteps.length > 0;
    const currentData = currentPhase === 'round1' ? round1Steps[currentStep] : currentPhase === 'round2' ? {questions: round2Questions[selectedSteps[currentStep]]} : {questions: [round3Questions[currentStep]]};
    if (currentStep === 0 && currentPhase === 'round1') {
      return Object.values(basicInfo).every(v => v.trim() !== '');
    }
    return currentData.questions.every(q => answers[q.id]?.trim() !== '');
  };

  const progress = () => {
    if (currentPhase === 'round1') return ((currentStep + 1) / round1Steps.length) * 33;
    if (currentPhase === 'evaluation') return 33;
    if (currentPhase === 'round2') return 33 + (((currentStep + 1) / selectedSteps.length) * 33);
    if (currentPhase === 'round3') return 66 + (((currentStep + 1) / round3Questions.length) * 33);
    return 100;
  };

  const getRawAnswersText = () => {
    let text = '';
    round1Steps.forEach(step => {
      if (step.questions) {
        step.questions.forEach(q => {
          if (answers[q.id]) text += `${q.label}: ${answers[q.id]}\n\n`;
        });
      }
    });
    selectedSteps.forEach(stepId => {
      round2Questions[stepId].forEach(q => {
        if (answers[q.id]) text += `${q.label}: ${answers[q.id]}\n\n`;
      });
    });
    round3Questions.forEach(q => {
      if (answers[q.id]) text += `${q.label}: ${answers[q.id]}\n\n`;
    });
    return text;
  };

  const generateFinalText = () => {
    // Logic to combine answers into final story, using connection phrases from round3
    let text = '[최종 목표달성 작성]\n\n';
    // 도입부 (STEP 1)
    text += answers['q1_1_1'] + '\n' + answers['q1_1_2'] + '\n' + (answers['connect_1_2'] || '') + '\n\n';
    // 전개부 (STEP 2-3)
    text += answers['q1_2_1'] + '\n' + (answers['connect_2_3'] || '') + '\n' + answers['q1_3_1'] + '\n\n';
    // 절정부 (STEP 4)
    text += (answers['connect_3_4'] || '') + '\n' + answers['q1_4_1'] + '\n\n';
    // 결론부 (STEP 5-6)
    text += (answers['connect_4_5'] || '') + '\n' + answers['q1_5_1'] + '\n' + (answers['connect_5_6'] || '') + '\n' + answers['q1_6_1'] + '\n';
    return text;
  };

  const downloadFinalText = () => {
    const blob = new Blob([finalText], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${basicInfo.company || '회사'}_목표달성.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const round1Steps = [
    { id: 0, title: '기본 정보 입력', subtitle: '워크북 작성 정보를 입력하세요' },
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
          rows: 4,
          guide: {
            description: '답변 가이드: 개인적 의미와 가치, 달성했을 때의 변화 기대를 구체적으로 설명',
            diagnosis: '즉석자가진단: “그 목표를 달성하지 못했다면 어떤 영향이 있었을까요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '그 당시 어떤 문제나 아쉬움이 있으셨나요?',
              '누군가의 영향을 받으셨나요?',
              '특별한 사건이나 경험이 있으셨나요?'
            ],
            ifDifficult: '그날의 구체적 상황은 어떠셨나요? 어떤 감정을 느끼셨나요? 왜 그때 행동하기로 결정하셨나요?',
            ifStillDifficult: '“그냥 하고 싶어서”가 아니라 구체적인 상황과 감정을 떠올려보세요. “2023년 3월, 동기들이 토익 900점을 달성하는 것을 보고 경쟁심과 함께 나도 할 수 있다는 자신감이 생겼습니다” 같은 식으로 시간, 장소, 감정을 구체적으로 표현하면 진정성이 느껴집니다.',
            example: '2023년 9월, 전공 수업에서 데이터 분석 과제를 하다가 제 실력의 한계를 절실히 느꼈습니다. 다른 학생들은 Python으로 쉽게 처리하는 것을 저는 Excel로만 겨우 해내는 상황이 너무 답답했고, 이대로는 취업 경쟁력이 없다는 위기감이 들어 Python 마스터라는 목표를 세우게 되었습니다.'
          }
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 이 목표가 본인에게 왜 중요했나요?',
          hint: '개인적 의미와 가치, 달성했을 때의 변화 기대를 구체적으로',
          placeholder: '예: 이 목표는 제 커리어 방향성을 결정짓는 중요한 전환점이었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 개인적 의미와 가치, 달성했을 때의 변화 기대를 구체적으로 설명',
            diagnosis: '즉석자가진단: “그 목표를 달성하지 못했다면 어떤 영향이 있었을까요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '개인적으로 어떤 변화를 원하셨나요?',
              '주변 사람들과 비교했을 때 어떠셨나요?',
              '미래 계획과 어떤 연관이 있으셨나요?'
            ],
            ifDifficult: '이 목표를 달성하지 못한다면 어떤 기분이셨을까요? 달성하면 무엇이 달라질 것 같으셨나요? 다른 목표보다 이것을 우선순위로 둔 이유를 생각해보세요.',
            ifStillDifficult: '“그냥 중요해서”가 아니라 구체적인 이유를 찾으세요. “취업 경쟁력 확보”, “자신감 회복”, “전문성 입증” 등 실질적이고 측정 가능한 이유를 제시하세요. 예를 들어 “이 목표를 달성하면 제가 원하는 분야의 전문가로 인정받을 수 있고, 이는 곧 취업과 직결되기 때문입니다”처럼 구체적으로 표현하세요.',
            example: '이 목표는 제 커리어 방향성을 결정짓는 중요한 전환점이었습니다. 데이터 분석 역량 없이는 제가 원하는 마케팅 애널리스트로 성장할 수 없었고, 동기들과의 경쟁에서도 뒤처질 것이 분명했습니다. 무엇보다 스스로에게 \'할 수 있다\'는 것을 증명하고 싶었고, 이는 제 자신감 회복에 필수적이었습니다.'
          }
        },
        {
          id: 'q1_1_3',
          label: 'Q1.1.3. 이 목표가 지원 직무와 어떤 연관이 있나요?',
          hint: '직무 역량과의 직접적 연결',
          placeholder: '예: 이 목표 달성 과정에서 어떤 역량을 개발했나요?...',
          rows: 3,
          guide: {
            description: '빠른 작성: 직무 역량과의 직접적 연결',
            diagnosis: '즉석자가진단: “그 목표를 달성하지 못했다면 어떤 영향이 있었을까요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '이 목표 달성 과정에서 어떤 역량을 개발했나요?',
              '해당 직무에서 필요한 능력과 어떤 연관이 있나요?',
              '업무 수행 시 어떻게 도움이 될까요?'
            ],
            ifDifficult: '이 목표를 달성하지 못한다면 어떤 기분이셨을까요? 달성하면 무엇이 달라질 것 같으셨나요? 다른 목표보다 이것을 우선순위로 둔 이유를 생각해보세요.',
            ifStillDifficult: '“그냥 중요해서”가 아니라 구체적인 이유를 찾으세요. “취업 경쟁력 확보”, “자신감 회복”, “전문성 입증” 등 실질적이고 측정 가능한 이유를 제시하세요. 예를 들어 “이 목표를 달성하면 제가 원하는 분야의 전문가로 인정받을 수 있고, 이는 곧 취업과 직결되기 때문입니다”처럼 구체적으로 표현하세요.',
            example: '이 목표는 제 커리어 방향성을 결정짓는 중요한 전환점이었습니다. 데이터 분석 역량 없이는 제가 원하는 마케팅 애널리스트로 성장할 수 없었고, 동기들과의 경쟁에서도 뒤처질 것이 분명했습니다. 무엇보다 스스로에게 \'할 수 있다\'는 것을 증명하고 싶었고, 이는 제 자신감 회복에 필수적이었습니다.'
          }
        },
        {
          id: 'q1_1_4',
          label: 'Q1.1.4. 목표 달성 시 예상했던 어려움은?',
          hint: '시작 전부터 걱정했던 현실적 제약사항을 솔직하게 설명',
          placeholder: '예: 가장 큰 걱정은 프로그래밍 경험이 전무하다는 점이었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 시작 전부터 걱정했던 현실적 제약사항을 솔직하게 설명',
            diagnosis: '즉석자가진단: “그런 어려움이 있을 걸 알면서도 왜 도전했나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '가장 걱정되었던 부분은 무엇인가요?',
              '포기하고 싶은 순간이 올 것 같았나요?',
              '주변의 우려나 반대는 없었나요?'
            ],
            ifDifficult: '시간이나 비용 측면에서 어려운 점은 무엇이었나요? 개인 능력상 부족한 부분은 무엇이었나요? 외부 환경적 제약은 어떤 것들이 있었나요?',
            ifStillDifficult: '모든 새로운 도전에는 시행착오가 따릅니다. “시간 부족”, “기초 지식 부족”, “경제적 부담”, “주변의 만류”, “체력적 한계” 등 솔직한 우려사항을 구체적으로 표현하세요. 예를 들어 “하루 4시간씩 투자해야 하는데 학업과 아르바이트를 병행하며 시간을 확보하는 것이 가장 큰 걱정이었습니다”처럼 현실적인 제약을 언급하세요.',
            example: '가장 큰 걱정은 프로그래밍 경험이 전무하다는 점이었습니다. 문과생으로서 코딩을 처음 접하는 것이 막막했고, 주변에서도 "너무 늦은 시작 아니냐"는 우려의 목소리가 많았습니다. 또한 학기 중 매일 3시간씩 투자하는 것이 현실적으로 가능할지, 중간에 포기하지 않을 자신이 있는지도 확신이 서지 않았습니다.'
          }
        }
      ]
    },
    // 다른 STEP 2-6도 유사하게 PDF에서 추출된 질문으로 채움
    {
      id: 2,
      title: 'STEP 2: 구체적 목표와 계획',
      subtitle: '구체적인 목표와 실행 계획',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. 설정한 구체적 목표는 무엇인가요? (SMART 원칙)',
          hint: '측정 가능하고 검증 가능한 목표와 계획',
          placeholder: '예: 저는 6개월 안에 Python 데이터 분석 전문가가 되기 위해 다음과 같은 구체적 목표를 세웠습니다...',
          rows: 3,
          guide: {
            description: '빠른 작성: 측정 가능한 명확한 목표',
            diagnosis: '즉석자가진단: “그 성과를 어떻게 증명할 수 있어요?”',
            helpQuestions: [
              '달성 여부를 어떻게 판단할 건가요?',
              '구체적인 수치나 기준이 있나요?',
              '언제까지 달성하려고 했나요?'
            ],
            ifDifficult: '“실력 향상”이나 “열심히 하기” 같은 막연한 목표가 아니라, 측정 가능한 구체적 목표를 세우세요.',
            ifStillDifficult: '“Python으로 데이터 분석 프로젝트 3개 완성하기”, “토익 850점 이상 달성하기”, “마케팅 공모전 수상하기”처럼 달성 여부를 명확히 판단할 수 있는 목표여야 합니다.',
            example: '저는 6개월 안에 Python 데이터 분석 전문가가 되기 위해 다음과 같은 구체적 목표를 세웠습니다. 첫째, Pandas와 NumPy를 활용한 데이터 전처리 마스터, 둘째, 머신러닝 기초 알고리즘 5개 구현, 셋째, 실제 데이터셋을 활용한 분석 프로젝트 3개 완성 및 GitHub 포트폴리오 구축이었습니다.'
          }
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 목표 달성을 위한 세부 계획은?',
          hint: '단계별 실행 계획',
          placeholder: '예: 1단계 (1개월): 기초 학습 및 자료 수집...',
          rows: 3,
          guide: {
            description: '답변 가이드: 단계별 실행 계획',
            diagnosis: '즉석자가진단: “첫 달에는 뭘 할 건가요?”',
            helpQuestions: [
              '첫 달에는 무엇을 했나요?',
              '중간 점검은 어떻게 했나요?',
              '일일/주간 계획이 있었나요?'
            ],
            ifDifficult: '예시) 1단계 (1개월): 기초 학습 및 자료 수집, 2단계 (2개월): 본격 실행 및 연습, 3단계 (1개월): 마무리 및 검증',
            ifStillDifficult: '계획은 실행 가능해야 합니다. 구체적으로 시간표를 만들어 보세요.',
            example: '완벽해 보였던 계획도 실제 실행 과정에서는 예상치 못한 어려움들과 마주하게 되었습니다.'
          }
        },
        {
          id: 'q1_2_3',
          label: 'Q1.2.3. 계획 수립 시 참고한 자료나 조언은?',
          hint: '정보 수집과 벤치마킹 과정',
          placeholder: '예: Python 개발자 선배님께 직접 조언을 구했고...',
          rows: 3,
          guide: {
            description: '답변 가이드: 정보 수집과 벤치마킹 과정을 구체적으로 서술',
            diagnosis: '즉석자가진단: “그 조언을 어떻게 실제 계획에 반영했나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '어떻게 나만의 계획으로 수정했나요?',
              '조언 중 실제로 적용한 것은 무엇인가요?'
            ],
            ifDifficult: '성공 사례를 찾아보셨나요? 전문가나 선배의 조언을 구했나요? 관련 책이나 온라인 자료를 참고했나요?',
            ifStillDifficult: '아무런 정보 없이 시작하는 사람은 없습니다. “유튜브 강의 커리큘럼”, “선배의 조언”, “온라인 커뮤니티 로드맵”, “관련 도서” 등 참고한 자료를 구체적으로 언급하세요.',
            example: 'Python 개발자 선배님께 직접 조언을 구했고, "처음엔 기초 문법보다 실제 프로젝트를 따라 만들면서 배우라"는 조언이 가장 가장 도움이 되었습니다. 또한 \'점프 투 파이썬\' 책과 코딩 부트캠프 커리큘럼을 참고해 제 수준과 일정에 맞는 3개월 학습 로드맵을 수립했습니다.'
          }
        }
      ]
    },
    {
      id: 3,
      title: 'STEP 3: 실행과 어려움',
      subtitle: '실행 과정과 직면한 어려움',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q1.3.1. 실행 과정에서 겪은 가장 큰 어려움은?',
          hint: '구체적인 어려움과 상황',
          placeholder: '예: 가장 큰 어려움은 예상보다 훨씬 어려운 학습 곡선이었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 예상치 못한 난관',
            diagnosis: '즉석자가진단: “가장 포기하고 싶었던 순간은 언제였나요?”',
            helpQuestions: [
              '포기하고 싶었던 순간은?',
              '계획대로 안 된 부분은?',
              '가장 힘들었던 시기는?'
            ],
            ifDifficult: '모든 목표 달성 과정에는 어려움이 있습니다. “아무런 어려움이 없었다”는 것은 도전적인 목표가 아니었다는 의미입니다.',
            ifStillDifficult: '“시간 부족”, “실력 부족”, “동기 저하”, “주변의 방해”, “예상 외의 난이도” 등 솔직한 어려움을 구체적으로 표현하세요.',
            example: '가장 큰 어려움은 예상보다 훨씬 어려운 학습 곡선이었습니다. 특히 객체지향 프로그래밍 개념을 이해하는 데 3주가 걸렸고, 매일 4시간씩 투자했음에도 진도가 나가지 않아 좌절감이 컸습니다. 또한 혼자 공부하다 보니 막히는 부분에서 해결책을 찾기 어려워 포기하고 싶은 순간도 많았습니다.'
          }
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 어려움을 극복하기 위해 시도한 방법들은?',
          hint: '다양한 시도와 노력',
          placeholder: '예: 처음엔 혼자 유튜브 강의를 들으며 독학했지만...',
          rows: 3,
          guide: {
            description: '답변 가이드: 다양한 시도와 노력을 순차적으로 설명, 실패한 시도도 포함',
            diagnosis: '즉석자가진단: “왜 처음 방법이 효과가 없었나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '몇 가지 방법을 시도했나요?',
              '왜 그 방법들을 선택했나요?'
            ],
            ifDifficult: '처음 시도한 해결책은 무엇이었나요? 효과가 없어서 바꾼 방법은 무엇인가요? 도움을 요청한 경험이 있나요?',
            ifStillDifficult: '어려움을 극복하는 과정은 여러 시행착오를 거칩니다. “처음엔 혼자 해결하려 했지만 한계를 느껴 스터디를 구성했다” 등 실제 시도한 다양한 방법들을 순서대로 설명하세요.',
            example: '처음엔 혼자 유튜브 강의를 들으며 독학했지만 막히는 부분이 많아 한계를 느꼈습니다. 그래서 온라인 스터디를 구성해 주 2회 코드 리뷰를 진행했고, 막히는 문제는 Stack Overflow에 질문을 올려 해결했습니다. 또한 \'러버덕 디버깅\' 기법을 활용해 문제를 소리내어 설명하며 스스로 해결책을 찾았고, 마지막으로 멘토링 프로그램에 참여해 전문가의 피드백을 받았습니다.'
          }
        },
        {
          id: 'q1_3_3',
          label: 'Q1.3.3. 중간에 포기하지 않고 지속할 수 있었던 이유는?',
          hint: '동기부여 유지 방법',
          placeholder: '예: 가장 큰 동력은 매주 눈에 보이는 작은 성과들이었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 동기부여 유지 방법과 내적/외적 동기를 구체적으로 설명',
            diagnosis: '즉석자가진단: “가장 포기하고 싶었던 순간은 언제였나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '어떤 생각이 힘이 되었나요?',
              '주변의 응원이나 격려가 있었나요?',
              '중간 성과가 동기가 되었나요?'
            ],
            ifDifficult: '힘이 된 사람이나 말이 있었나요? 포기할 수 없었던 이유는 무엇인가요? 작은 성취의 기쁨을 느낀 순간이 있었나요?',
            ifStillDifficult: '지속의 비결은 구체적이어야 합니다. “작은 성공 경험”, “동료들의 격려”, “목표 시각화”, “중간 보상 시스템” 등 실제로 도움이 된 요소들을 언급하세요.',
            example: '가장 큰 동력은 매주 눈에 보이는 작은 성과들이었습니다. 첫 번째 웹 크롤링 프로그램이 작동했을 때의 성취감, 알고리즘 문제를 처음으로 혼자 해결했을 때의 기쁨이 저를 계속 나아가게 했습니다. 또한 함께하는 스터디원들과의 약속, 그리고 "3개월만 버티자"는 구체적인 기한 설정이 포기하지 않는 원동력이 되었습니다.'
          }
        }
      ]
    },
    // STEP 4-6 questions similarly added from PDF
    // ...
  ];

  const round2Questions = {
    1: [
      // STEP 1 심화
      {
        id: 'q2_1_1',
        label: 'Q2.1.1. 그 순간의 감정과 생각을 더 자세히 설명한다면?',
        hint: '구체적 상황과 내면의 변화',
        guide: {
          description: '구체화 포인트: 정확한 날짜와 시간, 주변 환경과 분위기, 내면의 갈등과 결심',
          // ... PDF guide details
        },
        rows: 4
      },
      {
        id: 'q2_1_2',
        label: 'Q2.1.2. 이 목표가 없었다면 어떻게 되었을까요?',
        hint: '대안적 시나리오와 목표의 필연성',
        guide: {
          // ...
        },
        rows: 4
      },
      // PDF에서 추가 심화 질문
    ],
    2: [
      // STEP 2 심화
      {
        id: 'q2_2_1',
        label: 'Q2.2.1. 계획 수립 과정에서의 고민과 선택은?',
        hint: '여러 옵션 중 선택 이유',
        guide: {
          description: '구체화 포인트: 여러 옵션 중 선택 이유, 우선순위 설정 기준, 리스크 관리 방안',
          // ...
        },
        rows: 4
      },
      {
        id: 'q2_2_2',
        label: 'Q2.2.2. 일일/주간 단위의 구체적 실행 내용은?',
        hint: '하루 일과표와 주간 마일스톤',
        guide: {
          description: '구체화 포인트: 하루 일과표, 주간 마일스톤, 진도 체크 방법',
          // ...
        },
        rows: 4
      },
      // ...
    ],
    // 3-6 similarly
  };

  const round3Questions = [
    {
      id: 'connect_1_2',
      label: '연결 확인 1→2: 동기가 구체적 목표로 자연스럽게 이어지는가?',
      hint: 'STEP 1의 동기가 STEP 2의 계획으로 어떻게 이어졌나요?',
      placeholder: '예: 이러한 절실함을 바탕으로 저는 [구체적 목표]라는 명확한 목표를 세우고 체계적인 계획을 수립했습니다.',
      rows: 3,
      referenceSteps: [1, 2],
      referenceQuestions: ['q1_1_1', 'q1_1_2', 'q1_2_1', 'q1_2_2']
    },
    // connect_2_3, connect_3_4, connect_4_5, connect_5_6 from PDF
    // ...
  ];

  if (!isAuthenticated) {
    return (
      // Login screen same as App.js
      // ...
    );
  }

  if (showIntro) {
    return (
      // Intro screen same as App.js, update title to '목표수립 및 달성 워크북'
      // ...
    );
  }

  if (currentPhase === 'evaluation') {
    return (
      // Evaluation screen, select steps for round2
      // ...
    );
  }

  if (currentPhase === 'completed') {
    return (
      // Completed screen with final text, download etc.
      // ...
    );
  }

  const currentStepData = currentPhase === 'round1' 
    ? round1Steps[currentStep]
    : currentPhase === 'round2'
    ? { 
        title: `${round1Steps.find(s => s.id === selectedSteps[currentStep]).title} - 심화`,
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
              <span>전체 진행률: {Math.round(progress())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress()}%` }}
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
                  작성일
                </label>
                <input
                  type="text"
                  value={basicInfo.date}
                  onChange={(e) => handleBasicInfoChange('date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 2025-10-10"
                />
              </div>
              // other basicInfo fields...
              // ...
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
                    // reference display
                    // ...
                  )}
                  
                  {q.guide && showGuide[q.id] && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 space-y-3">
                      // guide content
                      // ...
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

        // footer
        // ...
      </div>
    </div>
  );
};

export default GoalAchievementWorkbook;