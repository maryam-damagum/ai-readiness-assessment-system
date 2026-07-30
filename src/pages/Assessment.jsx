import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { useAssessment } from "../context/AssessmentContext";

function Assessment() {
  const navigate = useNavigate();

  const {
    questions,
    answers,
    saveAnswer,
  } = useAssessment();

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = questions[currentIndex];

  const selectedAnswer =
    answers[currentQuestion.id];

  function handleSelect(answer) {
    saveAnswer(currentQuestion.id, answer);
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/results");
    }
  }

  function previousQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12">

        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-4xl font-bold mb-8">

            AI Readiness Assessment

          </h1>

          <ProgressBar
            currentQuestion={currentIndex + 1}
            totalQuestions={questions.length}
          />

          <div className="mt-10">

            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelect={handleSelect}
            />

          </div>

          <div className="flex justify-between mt-10">

            <button
              onClick={previousQuestion}
              disabled={currentIndex === 0}
              className={`px-8 py-3 rounded-xl font-medium transition ${
                currentIndex === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-700 text-white hover:bg-gray-800"
              }`}
            >
              Previous
            </button>

            <button
              onClick={nextQuestion}
              disabled={!selectedAnswer}
              className={`px-8 py-3 rounded-xl font-medium transition ${
                selectedAnswer
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-200 cursor-not-allowed"
              }`}
            >
              {currentIndex === questions.length - 1
                ? "Finish Assessment"
                : "Next"}
            </button>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Assessment;