import QuestionCard from './components/QuestionCard';
import Results from './components/Results';
import { useQuiz } from './hooks/useQuiz';

const QUESTION_TIME_LIMIT = 30;

function App() {
  const { 
    quizStatus, 
    error, 
    currentQuestion, 
    timer, 
    scoreSummary, 
    startQuiz, 
    restartQuiz, 
    handleAnswer,
    isFinished
  } = useQuiz();

  if (error) {
    return (
      <div className="p-8 text-center bg-red-100 border-l-4 border-red-500 text-red-700 shadow-md max-w-xl mx-auto mt-20">
        <p className="font-bold">API Error</p>
        <p>{error}</p>
        <button 
          onClick={restartQuiz} 
          className="cursor-pointer mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (quizStatus === 'loading') {
    return (
      <div className="p-8 text-center max-w-xl mx-auto mt-20 text-indigo-600 text-2xl font-semibold">
        Loading Questions...
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center bg-gray-50">
        <Results scoreSummary={scoreSummary} onRestart={restartQuiz} />
      </div>
    );
  }

  if (quizStatus === 'idle' || !currentQuestion) {
    return (
      <div className="p-8 min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">React Hook Quiz</h1>
        <p className="text-lg text-gray-600 mb-8">Test your knowledge! You have {QUESTION_TIME_LIMIT} seconds per question.</p>
        <button
          onClick={startQuiz}
          className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-150 ease-in-out shadow-xl"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen flex items-center justify-center bg-gray-50">
      <QuestionCard
        question={currentQuestion}
        timer={timer}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default App;