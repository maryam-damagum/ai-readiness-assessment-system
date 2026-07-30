const SCORE_MAP = {
  Yes: 5,
  Partially: 3,
  No: 1,
};

export function calculateScore(answers, questions) {
  if (!answers || !questions) {
    return null;
  }

  const categoryScores = {};
  const categoryMaximums = {};

  let totalScore = 0;
  let maximumScore = questions.length * 5;

  questions.forEach((question) => {
    const answer = answers[question.id] || "No";
    const score = SCORE_MAP[answer];

    totalScore += score;

    if (!categoryScores[question.category]) {
      categoryScores[question.category] = 0;
      categoryMaximums[question.category] = 0;
    }

    categoryScores[question.category] += score;
    categoryMaximums[question.category] += 5;
  });

  const percentage = Number(
    ((totalScore / maximumScore) * 100).toFixed(1)
  );

  let readinessLevel = "";

  if (percentage >= 80) {
    readinessLevel = "Highly Ready";
  } else if (percentage >= 50) {
    readinessLevel = "Moderately Ready";
  } else {
    readinessLevel = "Not Ready";
  }

  const categoryResults = Object.keys(categoryScores).map((category) => ({
    category,
    score: Number(
      (
        (categoryScores[category] /
          categoryMaximums[category]) *
        100
      ).toFixed(1)
    ),
  }));

  const weakCategories = categoryResults
    .filter((item) => item.score < 60)
    .map((item) => item.category);

  return {
    totalScore,
    maximumScore,
    percentage,
    readinessLevel,
    categoryResults,
    weakCategories,
  };
}