const FeedbackList = ({ feedbackList, stats, isLoading, error }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Feedback Summary & List</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-8 p-4 border rounded-md bg-indigo-50">
        <div className="text-center">
          <p className="text-4xl font-extrabold text-indigo-700">{stats.totalItems}</p>
          <p className="text-sm font-medium text-gray-600">Total Feedback Items</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-extrabold text-indigo-700">{stats.averageRating}</p>
          <p className="text-sm font-medium text-gray-600">Average Rating (1-5)</p>
        </div>
      </div>

      {isLoading && <div className="text-center text-indigo-600">Loading Feedback...</div>}
      {error && <div className="text-center text-red-500 font-bold">{error}</div>}
      
      <div className="space-y-4">
        {feedbackList.map((feedback) => (
          <div key={feedback.id} className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold text-gray-800">{feedback.name}</p>
              <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                Rating: {feedback.rating} / 5
              </span>
            </div>
            <p className="text-sm italic text-gray-600 mb-2">{feedback.email}</p>
            <p className="text-gray-700">{feedback.comments}</p>
            {feedback.timestamp && (
              <p className="text-xs text-right text-gray-400 mt-2">
                {new Date(feedback.timestamp).toLocaleString()}
              </p>
            )}
          </div>
        ))}
        {!isLoading && feedbackList.length === 0 && (
          <p className="text-center text-gray-500">No feedback submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;