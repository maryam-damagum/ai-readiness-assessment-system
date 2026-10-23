
const DIMENSIONS = [
  { prefix: "B1_", name: "Technological Infrastructure" },
  { prefix: "B2_", name: "Human Capacity" },
  { prefix: "B3_", name: "Governance and Leadership" },
  { prefix: "B4_", name: "Data Readiness" },
  { prefix: "B5_", name: "Curriculum and Teaching" },
  { prefix: "B6_", name: "Research Capability" },
  { prefix: "B7_", name: "Financial Capacity" },
  { prefix: "B8_", name: "Ethical and Responsible AI" },
  { prefix: "B9_", name: "Policy and Regulatory Support" },
  { prefix: "B10_", name: "External Collaboration and Ecosystem" },
];

export function calculateScore(answers, questions) {
  if (!answers || !questions) return null;

  const capabilityQuestions = questions.filter(
    (question) => question.section === "B"
  );

  // Do not calculate a readiness score until all 40
  // capability indicators have valid responses.
  const complete = capabilityQuestions.length === 40 &&
    capabilityQuestions.every((question) => {
      const value = answers[question.id];
      return Number.isInteger(value) && value >= 1 && value <= 5;
    });

  if (!complete) {
    return {
      complete: false,
      totalAnswered: capabilityQuestions.filter((question) =>
        Number.isInteger(answers[question.id]) &&
        answers[question.id] >= 1 &&
        answers[question.id] <= 5
      ).length,
      requiredCount: 40,
      percentage: null,
      readinessLevel: null,
      categoryResults: [],
      dimensionMeans: {},
      weakCategories: [],
    };
  }

  const categoryResults = DIMENSIONS.map(({ prefix, name }) => {
    const items = capabilityQuestions.filter((question) =>
      question.id.startsWith(prefix)
    );

    const mean =
      items.reduce((sum, question) => sum + answers[question.id], 0) /
      items.length;

    return {
      category: name,
      mean: Number(mean.toFixed(2)),
      score: Number(((mean / 5) * 100).toFixed(1)),
    };
  });

  // Equal-weighted average of the ten dimension means, scaled to 100.
  const overallMean =
    categoryResults.reduce((sum, item) => sum + item.mean, 0) /
    categoryResults.length;

  const percentage = Number(((overallMean / 5) * 100).toFixed(1));

  return {
    complete: true,
    totalAnswered: 40,
    requiredCount: 40,
    overallMean: Number(overallMean.toFixed(2)),
    percentage,
    readinessLevel: null,
    categoryResults,
    dimensionMeans: Object.fromEntries(
      categoryResults.map((item) => [item.category, item.mean])
    ),
    weakCategories: categoryResults
      .filter((item) => item.score < 60)
      .map((item) => item.category),
  };
}
