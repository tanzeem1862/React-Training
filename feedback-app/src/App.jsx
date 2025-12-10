import { useFeedback } from './hooks/useFeedback';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  const { 
    feedbackList, 
    isLoading, 
    error: fetchError, 
    isSubmitting, 
    submitSuccess, 
    feedbackStats, 
    postFeedback,
  } = useFeedback();

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-indigo-800">
        Feedback Collection App
      </h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeedbackForm
          onSubmit={postFeedback}
          isSubmitting={isSubmitting} 
          submitSuccess={submitSuccess}
          error={fetchError} 
        />

        <FeedbackList
          feedbackList={feedbackList} 
          stats={feedbackStats} // useMemo derived values (Avg/Total)
          isLoading={isLoading}
          error={fetchError}
        />
      </div>
      
    </div>
  );
}

export default App;