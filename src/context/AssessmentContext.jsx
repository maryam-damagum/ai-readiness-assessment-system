
import { createContext, useContext, useMemo, useState } from "react";
import { questionnaireSections } from "../data/questionnaire";
import { calculateScore } from "../utils/calculateScore";
import { recommendationEngine } from "../utils/recommendationEngine";

const AssessmentContext = createContext();

const questions = questionnaireSections.flatMap((section) =>
  section.questions.map((question) => ({
    ...question,
    section: section.id,
    sectionTitle: section.title,
  }))
);

export function AssessmentProvider({ children }) {
  const [answers, setAnswers] = useState({});

  const saveAnswer = (questionId, answer) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: answer,
    }));
  };

  const resetAssessment = () => {
    setAnswers({});
  };

  const results = useMemo(
    () => calculateScore(answers, questions),
    [answers]
  );

  const recommendations = useMemo(() => {
    if (!results?.complete) return [];

    return recommendationEngine(
      results.readinessLevel,
      results.weakCategories
    );
  }, [results]);

  return (
    <AssessmentContext.Provider
      value={{
        questions,
        answers,
        saveAnswer,
        resetAssessment,
        results,
        recommendations,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  return useContext(AssessmentContext);
}
