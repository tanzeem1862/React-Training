const QuestionCard = ({ question, timer, onAnswer }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto">
      <div className="text-xl font-semibold mb-4 text-gray-800">
        Question {question.id}
      </div>
      <div className="text-3xl font-bold mb-6 text-indigo-600">
        {timer}s Left
      </div>
      <p className="text-lg mb-8">{question.question}</p>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className="cursor-pointer w-full text-left bg-indigo-100 hover:bg-indigo-200 transition duration-150 ease-in-out text-indigo-800 py-3 px-4 rounded-md font-medium shadow-sm"
          >
            {index + 1}. {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;