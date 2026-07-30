const OPTIONS = [
  "Yes",
  "Partially",
  "No",
];

function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <span className="inline-block mb-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
        {question.category}
      </span>

      <h2 className="text-2xl font-semibold text-slate-800 mb-8">
        {question.question}
      </h2>

      <div className="space-y-4">
        {OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`w-full p-4 rounded-xl border text-left transition ${
              selectedAnswer === option
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-blue-50 border-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;