
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { useAssessment } from "../context/AssessmentContext";

const API_URL =
  import.meta.env.VITE_MODEL_API_URL || "http://127.0.0.1:8000";

function Assessment() {
  const navigate = useNavigate();
  const { questions, answers, saveAnswer } = useAssessment();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const visibleQuestions = useMemo(
    () =>
      questions.filter((question) => {
        if (!question.showWhen) return true;

        const controllingAnswer = answers[question.showWhen.questionId];

        return question.showWhen.values.includes(controllingAnswer);
      }),
    [questions, answers]
  );

  const safeIndex = Math.min(
    currentIndex,
    Math.max(visibleQuestions.length - 1, 0)
  );

  const currentQuestion = visibleQuestions[safeIndex];

  if (!currentQuestion) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50 p-8">
          <p>Loading questionnaire...</p>
        </main>
        <Footer />
      </>
    );
  }

  const selectedAnswer = answers[currentQuestion.id];

  const hasAnswer = (question, answer) => {
    if (answer === undefined || answer === null) return false;
    if (typeof answer === "string") return answer.trim().length > 0;
    if (Array.isArray(answer)) return answer.length > 0;
    if (typeof answer === "object") {
      return Boolean(answer.value);
    }
    return true;
  };

  const canContinue =
    !currentQuestion.required ||
    hasAnswer(currentQuestion, selectedAnswer);

  function handleSelect(answer) {
    saveAnswer(currentQuestion.id, answer);
    setSubmitError("");
  }

  async function finishAssessment() {
    if (!canContinue || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    // Include only visible questions with saved answers.
    // This excludes A5 when A4 is not "Yes".
    const responses = Object.fromEntries(
      visibleQuestions
        .filter((question) =>
          Object.prototype.hasOwnProperty.call(answers, question.id)
        )
        .map((question) => [question.id, answers[question.id]])
    );

    try {
      const response = await fetch(`${API_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          responses,
          questionnaire_version: "1.0",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const detail =
          typeof result.detail === "string"
            ? result.detail
            : "Please check your answers and try again.";

        throw new Error(detail);
      }

      // Navigate only after the backend confirms that it saved the response.
      navigate("/results", {
        state: {
          submissionId: result.submission_id,
          submittedAt: result.submitted_at,
        },
      });
    } catch (error) {
      setSubmitError(
        error.message ||
          "We couldn't save your responses. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function nextQuestion() {
    if (!canContinue || submitting) return;

    if (safeIndex < visibleQuestions.length - 1) {
      setCurrentIndex(safeIndex + 1);
    } else {
      finishAssessment();
    }
  }

  function previousQuestion() {
    if (safeIndex > 0 && !submitting) {
      setCurrentIndex(safeIndex - 1);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="mb-3 text-3xl font-bold text-slate-800">
            AI Readiness Assessment
          </h1>

          <p className="mb-8 text-slate-600">
            Answer the questions based on your institution's current situation.
          </p>

          <ProgressBar
            currentQuestion={safeIndex + 1}
            totalQuestions={visibleQuestions.length}
          />

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-blue-700">
              {currentQuestion.sectionTitle}
            </p>

            {currentQuestion.description && (
              <p className="mb-4 text-sm text-slate-600">
                {currentQuestion.description}
              </p>
            )}

            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelect={handleSelect}
            />
          </div>

          {submitError && (
            <div
              role="alert"
              className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {submitError}
            </div>
          )}

          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={previousQuestion}
              disabled={safeIndex === 0 || submitting}
              className="rounded-xl border border-slate-300 px-6 py-3 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={nextQuestion}
              disabled={!canContinue || submitting}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting
                ? "Saving responses..."
                : safeIndex === visibleQuestions.length - 1
                  ? "Submit Assessment"
                  : "Next"}
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-slate-500">
            Question {safeIndex + 1} of {visibleQuestions.length}
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Assessment;
