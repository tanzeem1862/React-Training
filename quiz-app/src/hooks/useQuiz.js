import { useState, useEffect, useCallback, useMemo } from 'react';

const API_URL = 'http://localhost:4000/questions';
const QUESTION_TIME_LIMIT = 30; // Seconds

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStatus, setQuizStatus] = useState('idle'); // 'idle' | 'loading' | 'active' | 'finished' | 'error'
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(QUESTION_TIME_LIMIT);

  const fetchQuestions = useCallback(async () => {
    setQuizStatus('loading');
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch questions. Check if API is running.');
      }
      const data = await response.json();
      setQuestions(data);
      setCurrentQuestionIndex(0);
      setScore(0);
      setTimer(QUESTION_TIME_LIMIT);
      setQuizStatus('active');
    } catch (err) {
      setError(err.message);
      setQuizStatus('error');
    }
  }, []);

  useEffect(() => {
    if (quizStatus !== 'active' || currentQuestionIndex >= questions.length) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          handleAnswer(null); 
          return QUESTION_TIME_LIMIT;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStatus, currentQuestionIndex, questions.length]);

  const handleAnswer = useCallback((selectedIndex) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion && selectedIndex !== null && selectedIndex === currentQuestion.correctIndex) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimer(QUESTION_TIME_LIMIT);
    } else {
      setQuizStatus('finished');
    }
  }, [questions, currentQuestionIndex]);

  const restartQuiz = useCallback(() => {
    setQuizStatus('idle');
    setQuestions([]);
    fetchQuestions(); 
  }, [fetchQuestions]);

  useEffect(() => {
    if (quizStatus === 'finished' && questions.length > 0) {
      const postResults = async () => {
        const resultPayload = {
          name: "Quiz Taker",
          score,
          total: questions.length,
          timestamp: new Date().toISOString(),
        };
        try {
          const response = await fetch('http://localhost:4000/results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultPayload),
          });

          if (!response.ok) {
            console.error('Failed to post results.');
          }
        } catch (postError) {
          console.error("Error posting results:", postError);
        }
      };
      postResults();
    }
  }, [quizStatus, score, questions.length]);

  const scoreSummary = useMemo(() => {
    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(0) : '0';
    return { score, total: totalQuestions, percentage: `${percentage}%` };
  }, [score, questions.length]);


  return {
    quizStatus,
    error,
    currentQuestion: questions[currentQuestionIndex],
    timer,
    scoreSummary,
    startQuiz: fetchQuestions,
    restartQuiz,
    handleAnswer,
    isFinished: quizStatus === 'finished',
  };
};