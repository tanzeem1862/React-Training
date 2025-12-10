const Results = ({ scoreSummary, onRestart }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md mx-auto text-center">
      <h2 className="text-3xl font-extrabold mb-4 text-green-600">Quiz Finished! 🎉</h2>
      <p className="text-xl text-gray-700 mb-2">
        You scored **{scoreSummary.score} out of {scoreSummary.total}** questions correctly.
      </p>
      <p className="text-4xl font-black mb-8 text-indigo-700">
        {scoreSummary.percentage}
      </p>
      <button
        onClick={onRestart}
        className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-150 ease-in-out shadow-lg"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;