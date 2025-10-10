import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, Lock, HelpCircle, Eye, Edit3 } from 'lucide-react';
import './App.css'; // CSS 파일이 있다면 포함

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
    date: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'),
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
    let text = '[최종 목표달성 작성]\n\n';
    text += answers['q1_1_1'] + '\n' + answers['q1_1_2'] + '\n' + (answers['connect_1_2'] || '') + '\n\n';
    text += answers['q1_2_1'] + '\n' + (answers['connect_2_3'] || '') + '\n' + answers['q1_3_1'] + '\n\n';
    text += (answers['connect_3_4'] || '') + '\n' + answers['q1_4_1'] + '\n\n';
    text += (answers['connect_4_5'] || '') + '\n' + answers['q1_5_1'] + '\n' + (answers['connect_5_6'] || '') + '\n' + answers['q1_6_1'] + '\n';
    return text;
  };

  const downloadFinalText = () => {
    const blob = new Blob([finalText], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${basicInfo.company || '회사'}_목표달성_${new Date().toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}.doc`;
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
          placeholder: '예: 2023년 9월, 전공 수업에서 데이터 분석 과제를 하다가 제 실력의 한계를 느꼈습니다...',
          rows: 4,
          guide: {
            description: '답변 가이드: 구체적인 날짜, 상황, 감정을 포함한 계기 설명',
            diagnosis: '즉석자가진단: “그 순간 무슨 생각이 들었나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '그날의 구체적 상황은 어떠셨나요?',
              '어떤 감정을 느끼셨나요?',
              '왜 그때 행동하기로 결정하셨나요?'
            ],
            ifDifficult: '그 당시 어떤 문제나 아쉬움이 있으셨나요? 누군가의 영향을 받으셨나요? 특별한 사건이나 경험이 있으셨나요?',
            ifStillDifficult: '“2023년 3월, 동기들이 토익 900점을 달성하는 것을 보고 경쟁심과 자신감이 생겼습니다”처럼 시간, 장소, 감정을 구체적으로 표현하세요.',
            example: '2023년 9월, 전공 수업에서 데이터 분석 과제를 하다가 제 실력의 한계를 절실히 느꼈습니다. 다른 학생들은 Python으로 쉽게 처리했지만 저는 Excel로만 겨우 해내는 상황이 답답했고, 이대로는 취업 경쟁력이 없다는 위기감이 들어 목표를 세웠습니다.'
          }
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 이 목표가 본인에게 왜 중요했나요?',
          hint: '개인적 의미와 가치, 달성 시 변화 기대를 구체적으로',
          placeholder: '예: 이 목표는 제 커리어 방향성을 결정짓는 전환점이었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 개인적 동기와 직무 연관성 강조',
            diagnosis: '즉석자가진단: “달성하지 못했다면 어떤 영향이 있었을까요?”',
            helpQuestions: [
              '개인적으로 어떤 변화를 원하셨나요?',
              '주변 사람들과 비교했을 때 어떠셨나요?',
              '미래 계획과 어떤 연관이 있으셨나요?'
            ],
            ifDifficult: '달성하지 못했을 때 어떤 기분이었을까요? 달성하면 무엇이 달라질 것 같았나요?',
            ifStillDifficult: '“취업 경쟁력 확보”, “자신감 회복” 등 실질적인 이유를 구체적으로 제시하세요.',
            example: '이 목표는 제 커리어 방향성을 결정짓는 전환점이었습니다. 데이터 분석 역량 없이는 원하는 마케팅 직무에 도전할 수 없었고, 동기들과의 경쟁에서 뒤처질 위기감이 들었기 때문에 꼭 필요했습니다.'
          }
        },
        {
          id: 'q1_1_3',
          label: 'Q1.1.3. 이 목표가 없었다면 어떻게 되었을까요?',
          hint: '대안적 시나리오와 목표의 필연성',
          placeholder: '예: 아마도 현재 직무 경쟁력 확보에 어려움을 겪었을 것입니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 목표 없었을 경우의 대안과 현재와의 차이 설명',
            diagnosis: '즉석자가진단: “다른 길을 생각해봤나요?”',
            helpQuestions: [
              '다른 진로를 고려했었나요?',
              '그 계기가 왜 결정적이었나요?',
              '다른 가능성과 비교했을 때 이 길을 선택한 이유는?'
            ],
            ifDifficult: '이전에 막연히 생각했던 진로를 떠올려보세요.',
            ifStillDifficult: '주변 친구들이 선택한 일반적인 진로를 상상해보세요.',
            example: '이 목표가 없었다면 아마도 현재 직무 경쟁력 확보에 어려움을 겪었을 것입니다. 데이터 분석 능력 없이 마케팅 직무에 지원하려면 기본적인 기술적 자격이 부족했을 것이고, 단순 사무직으로 전환했을 가능성이 높았습니다.'
          }
        }
      ]
    },
    {
      id: 2,
      title: 'STEP 2: 구체적 목표와 계획',
      subtitle: '구체적인 목표와 실행 계획 수립',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. 설정한 구체적 목표는 무엇인가요? (SMART 원칙)',
          hint: '측정 가능하고 구체적인 목표',
          placeholder: '예: 6개월 안에 Python으로 데이터 분석 프로젝트 3개 완성...',
          rows: 4,
          guide: {
            description: '답변 가이드: SMART(구체적, 측정 가능, 달성 가능, 관련성, 시간 제한) 원칙 적용',
            diagnosis: '즉석자가진단: “그 성과를 어떻게 증명할 수 있나요?”',
            helpQuestions: [
              '달성 여부를 어떻게 판단할 건가요?',
              '구체적인 수치나 기준이 있나요?',
              '언제까지 달성하려고 했나요?'
            ],
            ifDifficult: '“실력 향상” 대신 “프로젝트 3개 완성”처럼 측정 가능하게 설정하세요.',
            ifStillDifficult: '예: “3개월 내 토익 850점 달성”, “6개월 내 포트폴리오 구축”처럼 구체화하세요.',
            example: '저는 6개월 안에 Python 데이터 분석 전문가가 되기 위해 SMART 원칙을 적용한 목표를 세웠습니다. 구체적으로, 1) Pandas와 NumPy로 데이터 전처리 마스터, 2) 머신러닝 기초 알고리즘 5개 구현, 3) 실제 데이터셋으로 프로젝트 3개 완성 및 GitHub 업로드입니다.'
          }
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 목표 달성을 위한 세부 계획은 무엇인가요?',
          hint: '단계별 실행 일정',
          placeholder: '예: 1개월: 기초 학습, 2-3개월: 프로젝트 시작...',
          rows: 4,
          guide: {
            description: '답변 가이드: 단계별 시간표와 자원 계획',
            diagnosis: '즉석자가진단: “첫 달에 뭘 했나요?”',
            helpQuestions: [
              '첫 달에는 무엇을 했나요?',
              '중간 점검은 어떻게 했나요?',
              '주간/일일 계획이 있었나요?'
            ],
            ifDifficult: '1개월 단위로 나눠보세요 (예: 학습, 실행, 마무리).',
            ifStillDifficult: '하루 1-2시간 투자 계획부터 시작하세요.',
            example: '저는 6개월 계획을 세웠습니다. 1-2개월: Python 기초 문법과 Pandas 학습, 3-4개월: 실제 데이터셋으로 프로젝트 2개 완성, 5-6개월: 최종 프로젝트 마무리와 GitHub 업로드, 주 1회 진도 점검을 포함했습니다.'
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
          label: 'Q1.3.1. 실행 과정에서 겪은 가장 큰 어려움은 무엇인가요?',
          hint: '구체적인 상황과 어려움',
          placeholder: '예: 시간 부족과 이해 부족이 가장 큰 어려움이었습니다...',
          rows: 4,
          guide: {
            description: '답변 가이드: 구체적인 상황과 어려움 설명',
            diagnosis: '즉석자가진단: “가장 포기하고 싶었던 순간은 언제였나요?”',
            helpQuestions: [
              '어떤 부분이 가장 어려웠나요?',
              '포기하고 싶었던 순간은 언제였나요?',
              '계획대로 안 된 이유는 무엇인가요?'
            ],
            ifDifficult: '시간, 기술, 동기 부여 중 무엇이 문제였나요?',
            ifStillDifficult: '“시간 부족”이나 “기초 부족”처럼 일반적인 어려움부터 구체화하세요.',
            example: '가장 큰 어려움은 예상보다 높은 학습 곡선이었습니다. 객체지향 프로그래밍을 이해하는 데 3주가 걸렸고, 매일 4시간 투자했음에도 진도가 더뎌 좌절감이 컸습니다.'
          }
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 어려움을 극복하기 위해 시도한 방법은 무엇인가요?',
          hint: '다양한 시도와 해결 과정',
          placeholder: '예: 스터디 그룹을 만들어 함께 학습했습니다...',
          rows: 4,
          guide: {
            description: '답변 가이드: 시도한 방법과 효과 설명',
            diagnosis: '즉석자가진단: “왜 그 방법이 효과적이었나요?”',
            helpQuestions: [
              '어떤 방법을 시도했나요?',
              '그 방법이 왜 효과적이었나요?',
              '도움을 요청한 적이 있나요?'
            ],
            ifDifficult: '혼자 해결하려 했나요? 외부 도움을 받았나요?',
            ifStillDifficult: '온라인 자료나 친구의 도움을 구한 경험을 떠올리세요.',
            example: '처음엔 유튜브 강의를 보며 독학했지만 한계가 있어 온라인 스터디를 구성해 주 2회 코드 리뷰를 했습니다. 또한 Stack Overflow에 질문을 올려 문제를 해결했습니다.'
          }
        }
      ]
    },
    {
      id: 4,
      title: 'STEP 4: 문제해결과 혁신',
      subtitle: '문제를 해결한 창의적 방법',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q1.4.1. 어려움을 극복한 창의적 방법은 무엇인가요?',
          hint: '독창적인 해결책',
          placeholder: '예: 동료와 협력해 새로운 학습 방법을 개발했습니다...',
          rows: 4
        }
      ]
    },
    {
      id: 5,
      title: 'STEP 5: 결과와 성과',
      subtitle: '달성한 결과와 성과',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q1.5.1. 최종 결과와 성과는 무엇인가요?',
          hint: '구체적 숫자와 증거',
          placeholder: '예: 3개월 만에 프로젝트 3개 완성...',
          rows: 4
        }
      ]
    },
    {
      id: 6,
      title: 'STEP 6: 배운 점과 적용',
      subtitle: '경험에서 얻은 교훈',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q1.6.1. 이 경험에서 얻은 가장 큰 교훈은 무엇인가요?',
          hint: '구체적 학습 포인트',
          placeholder: '예: 체계적 계획의 중요성을 배웠습니다...',
          rows: 4
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q2.1.1. 그 순간의 감정과 생각을 더 자세히 설명한다면?',
        hint: '구체적 상황과 내면 변화',
        guide: {
          description: '구체화 포인트: 날짜, 환경, 감정',
          diagnosis: '즉석자가진단: “그때 무슨 생각이 들었나요?”',
          helpQuestions: ['그날의 분위기는 어땠나요?', '어떤 사람이 영향을 주었나요?', '구체적인 생각은?'],
          ifDifficult: '사진이나 메모를 떠올려보세요.',
          example: '2023년 9월, 도서관에서 과제를 하던 중 좌절감이 들었습니다.'
        },
        rows: 4
      },
      {
        id: 'q2_1_2',
        label: 'Q2.1.2. 이 목표가 없었다면 어떻게 되었을까요?',
        hint: '대안적 시나리오',
        guide: {
          description: '답변 가이드: 목표 없었을 경우의 결과',
          diagnosis: '즉석자가진단: “다른 선택지는 없었나요?”',
          helpQuestions: ['다른 진로를 생각했나요?', '왜 이 목표가 필수였나요?'],
          example: '아마도 사무직으로 전환했을 것입니다.'
        },
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2.2.1. 계획 수립 시 고민했던 대안은 무엇이었나요?',
        hint: '다른 옵션과 선택 이유',
        guide: {
          description: '구체화 포인트: 대안과 선택 기준',
          diagnosis: '즉석자가진단: “왜 그 계획을 택했나요?”',
          helpQuestions: ['다른 방법은 없었나요?', '어떤 기준으로 선택했나요?'],
          example: '혼자 공부할까 고민했지만 팀 학습이 더 효과적일 것 같아 선택했습니다.'
        },
        rows: 4
      }
    ]
  };

  const round3Questions = [
    {
      id: 'connect_1_2',
      label: '연결 확인 1→2: 동기가 구체적 목표로 이어지는가?',
      hint: 'STEP 1 동기가 STEP 2 계획으로 자연스럽게 연결',
      placeholder: '예: 위기감으로 인해 구체적인 학습 계획을 세웠습니다...',
      rows: 3,
      referenceSteps: [1, 2],
      referenceQuestions: ['q1_1_1', 'q1_2_1']
    },
    {
      id: 'connect_2_3',
      label: '연결 확인 2→3: 계획이 실행으로 이어지는가?',
      hint: 'STEP 2 계획이 STEP 3 실행과 일치',
      placeholder: '예: 계획한 학습 일정을 따르며 어려움을 겪었습니다...',
      rows: 3,
      referenceSteps: [2, 3],
      referenceQuestions: ['q1_2_2', 'q1_3_1']
    }
  ];

  // 3라운드 구조에 맞춘 렌더링
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호를 입력하세요"
          />
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            로그인
          </button>
          {showError && <p className="text-red-500 text-center mt-2">잘못된 비밀번호입니다.</p>}
        </div>
      </div>
    );
  }

  if (currentPhase === 'round1') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">1라운드: 기본 작성</h2>
            <p className="text-gray-600 mb-6">기본 정보를 입력하고 각 STEP에 답변하세요.</p>
            {currentStep === 0 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">작성일</label>
                  <input
                    type="text"
                    value={basicInfo.date}
                    onChange={(e) => handleBasicInfoChange('date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 2025-10-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">지원 직무</label>
                  <input
                    type="text"
                    value={basicInfo.position}
                    onChange={(e) => handleBasicInfoChange('position', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 마케팅, 개발 등"
                  />
                </div>
                {/* 나머지 기본 정보 입력 필드 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">회사명</label>
                  <input
                    type="text"
                    value={basicInfo.company}
                    onChange={(e) => handleBasicInfoChange('company', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 삼성전자, 네이버 등"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">경험 제목</label>
                  <input
                    type="text"
                    value={basicInfo.experienceTitle}
                    onChange={(e) => handleBasicInfoChange('experienceTitle', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="예: Python 학습 프로젝트"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">경험 시기</label>
                  <input
                    type="text"
                    value={basicInfo.experiencePeriod}
                    onChange={(e) => handleBasicInfoChange('experiencePeriod', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 2023년 9월 ~ 2024년 3월"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">소요 기간</label>
                  <input
                    type="text"
                    value={basicInfo.duration}
                    onChange={(e) => handleBasicInfoChange('duration', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 6개월"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">관련 직무 역량</label>
                  <input
                    type="text"
                    value={basicInfo.relatedCompetency}
                    onChange={(e) => handleBasicInfoChange('relatedCompetency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 데이터 분석, 문제 해결"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {round1Steps[currentStep].questions.map((q) => (
                  <div key={q.id} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <label className="text-lg font-semibold text-gray-800">{q.label}</label>
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
                    {q.hint && <p className="text-sm text-gray-600 mb-2">💡 {q.hint}</p>}
                    {q.guide && showGuide[q.id] && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 space-y-3">
                        <p className="text-sm font-semibold text-blue-900 mb-1">📝 {q.guide.description}</p>
                        <p className="text-sm font-semibold text-blue-900 mb-1">🎯 {q.guide.diagnosis}</p>
                        {q.guide.helpQuestions && (
                          <div>
                            <p className="text-sm font-semibold text-blue-900 mb-1">❓ 구체화 도움 질문:</p>
                            <ul className="text-sm text-blue-800 space-y-1 ml-4">
                              {q.guide.helpQuestions.map((hq, i) => <li key={i}>• {hq}</li>)}
                            </ul>
                          </div>
                        )}
                        {q.guide.ifDifficult && <p className="text-sm text-blue-800">{q.guide.ifDifficult}</p>}
                        {q.guide.ifStillDifficult && <p className="text-sm text-blue-800">{q.guide.ifStillDifficult}</p>}
                        {q.guide.example && <p className="text-sm text-blue-800 italic bg-white p-2 rounded">{q.guide.example}</p>}
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
              {currentStep > 0 && (
                <button onClick={goToPrevStep} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  <ChevronLeft className="w-5 h-5" /> 이전
                </button>
              )}
              <button
                onClick={goToNextStep}
                disabled={!canGoNext()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음 <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'round2') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">2라운드: 심화 작성</h2>
            <p className="text-gray-600 mb-6">선택한 STEP에 대해 심화 질문에 답변하세요.</p>
            <div className="space-y-6">
              {round2Questions[selectedSteps[currentStep]].map((q) => (
                <div key={q.id} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <label className="text-lg font-semibold text-gray-800">{q.label}</label>
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
                  {q.hint && <p className="text-sm text-gray-600 mb-2">💡 {q.hint}</p>}
                  {q.guide && showGuide[q.id] && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 space-y-3">
                      <p className="text-sm font-semibold text-blue-900 mb-1">📝 {q.guide.description}</p>
                      <p className="text-sm font-semibold text-blue-900 mb-1">🎯 {q.guide.diagnosis}</p>
                      {q.guide.helpQuestions && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">❓ 구체화 도움 질문:</p>
                          <ul className="text-sm text-blue-800 space-y-1 ml-4">
                            {q.guide.helpQuestions.map((hq, i) => <li key={i}>• {hq}</li>)}
                          </ul>
                        </div>
                      )}
                      {q.guide.ifDifficult && <p className="text-sm text-blue-800">{q.guide.ifDifficult}</p>}
                      {q.guide.example && <p className="text-sm text-blue-800 italic bg-white p-2 rounded">{q.guide.example}</p>}
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
            <div className="flex gap-4 mt-8">
              <button onClick={goToPrevStep} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                <ChevronLeft className="w-5 h-5" /> 이전
              </button>
              <button
                onClick={goToNextStep}
                disabled={!canGoNext()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음 <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'round3') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">3라운드: 연결 및 완성</h2>
            <p className="text-gray-600 mb-6">각 STEP 간 연결을 확인하고 최종 답변을 작성하세요.</p>
            <div className="space-y-6">
              {round3Questions[currentStep].questions.map((q) => (
                <div key={q.id} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <label className="text-lg font-semibold text-gray-800">{q.label}</label>
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
                  {q.hint && <p className="text-sm text-gray-600 mb-2">💡 {q.hint}</p>}
                  {q.referenceQuestions && (
                    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-3">
                      <p className="text-sm font-semibold text-indigo-900 mb-2">📚 참고: 이전 답변</p>
                      <div className="space-y-3">
                        {q.referenceQuestions.map((refId) => {
                          const refQuestion = [...round1Steps.flatMap(s => s.questions || [])].find(q => q?.id === refId);
                          return refQuestion && answers[refId] ? (
                            <div key={refId} className="bg-white p-3 rounded text-sm">
                              <p className="font-semibold text-gray-700 mb-1">{refQuestion.label}</p>
                              <p className="text-gray-600 italic">{answers[refId]?.substring(0, 150)}{answers[refId]?.length > 150 ? '...' : ''}</p>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                  {q.guide && showGuide[q.id] && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 space-y-3">
                      <p className="text-sm font-semibold text-blue-900 mb-1">📝 {q.guide.description}</p>
                      <p className="text-sm font-semibold text-blue-900 mb-1">🎯 {q.guide.diagnosis}</p>
                      {q.guide.helpQuestions && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">❓ 구체화 도움 질문:</p>
                          <ul className="text-sm text-blue-800 space-y-1 ml-4">
                            {q.guide.helpQuestions.map((hq, i) => <li key={i}>• {hq}</li>)}
                          </ul>
                        </div>
                      )}
                      {q.guide.ifDifficult && <p className="text-sm text-blue-800">{q.guide.ifDifficult}</p>}
                      {q.guide.example && <p className="text-sm text-blue-800 italic bg-white p-2 rounded">{q.guide.example}</p>}
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
            <div className="flex gap-4 mt-8">
              <button onClick={goToPrevStep} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                <ChevronLeft className="w-5 h-5" /> 이전
              </button>
              <button
                onClick={goToNextStep}
                disabled={!canGoNext()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음 <ChevronRight className="w-5 h-5" />
              </button>
            </div>
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
              <h2 className="text-3xl font-bold text-gray-800 mb-2">목표달성 완성! 🎉</h2>
              <p className="text-gray-600">아래 내용을 확인하고 자유롭게 수정하세요.</p>
            </div>
            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <p className="text-base font-bold text-red-900 mb-2">반드시 다운로드하세요!</p>
                  <p className="text-sm text-red-800 leading-relaxed">
                    작성한 내용은 브라우저에 임시 저장되어 있습니다. 페이지를 새로고침하거나 닫으면 <strong>모든 내용이 삭제</strong>됩니다.
                    <br />
                    💾 <strong>지금 바로 "워드 파일로 다운로드"</strong> 버튼을 눌러 .doc 파일로 저장하세요!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" /> 완성된 목표달성 (수정 가능)
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
              <Download className="w-6 h-6" /> 워드 파일로 다운로드 (.doc)
            </button>
            {downloadSuccess && (
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center mb-4">
                <p className="text-green-800 font-semibold">✅ 다운로드 완료!</p>
                <p className="text-sm text-green-700 mt-1">
                  다운로드 폴더에서 "{basicInfo.company || '회사'}_목표달성_{new Date().toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}.doc" 파일을 열어주세요.
                </p>
              </div>
            )}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-800">
                💾 <strong>워드에서 편집 가능:</strong> 다운로드한 .doc 파일을 Microsoft Word나 한글(HWP)에서 편집하세요.
              </p>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                <ChevronLeft className="w-5 h-5" /> 이전으로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // 기본적으로 3라운드 외 상태는 처리되지 않음
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>목표수립 및 달성 워크북</h1>
      </header>
      <main>
        <GoalAchievementWorkbook />
      </main>
      <footer>
        <p>© 2025 CareerEngineer All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;