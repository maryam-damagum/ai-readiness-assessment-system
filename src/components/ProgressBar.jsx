function ProgressBar({
  currentQuestion,
  totalQuestions,
}) {
  const progress =
    (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        <span>
          Question {currentQuestion} of {totalQuestions}
        </span>

        <span>{Math.round(progress)}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;