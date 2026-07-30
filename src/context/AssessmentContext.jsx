import { createContext, useContext, useMemo, useState } from "react";

import { questions } from "../data/questions";
import { calculateScore } from "../utils/calculateScore";
import { recommendationEngine } from "../utils/recommendationEngine";

const AssessmentContext = createContext();

export function AssessmentProvider({ children }) {
  const [answers, setAnswers] = useState({});

  const saveAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const resetAssessment = () => {
    setAnswers({});
  };

  const results = useMemo(() => {
    return calculateScore(answers, questions);
  }, [answers]);

  const recommendations = useMemo(() => {
    if (!results) return [];

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