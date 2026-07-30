const categoryRecommendations = {
  Infrastructure: [
    "Invest in reliable high-speed internet connectivity across the institution.",
    "Upgrade computer laboratories with modern AI-capable hardware.",
    "Adopt cloud computing services to support AI research and learning.",
    "Improve campus-wide ICT infrastructure for staff and students.",
    "Allocate funding for AI computing resources such as GPU-enabled systems."
  ],

  "Human Capacity": [
    "Provide regular AI training and certification programs for academic staff.",
    "Recruit AI specialists and experienced technology professionals.",
    "Encourage staff participation in AI workshops, conferences, and seminars.",
    "Integrate AI-related courses into existing academic programmes.",
    "Support students through AI clubs, hackathons, and innovation competitions."
  ],

  "Governance & Policy": [
    "Develop a comprehensive institutional AI policy.",
    "Establish ethical guidelines for responsible AI adoption.",
    "Create a dedicated AI governance committee.",
    "Allocate annual budgets specifically for AI initiatives.",
    "Monitor and evaluate AI implementation using measurable KPIs."
  ],

  "Data Management": [
    "Strengthen institutional data governance policies.",
    "Implement secure digital repositories for institutional data.",
    "Improve data privacy and cybersecurity measures.",
    "Develop regular backup and disaster recovery procedures.",
    "Promote data-driven decision-making across university departments."
  ],

  "AI Strategy": [
    "Develop a university-wide AI adoption roadmap.",
    "Integrate AI into teaching, research, and administrative processes.",
    "Collaborate with industry and research institutions on AI initiatives.",
    "Invest in AI pilot projects before large-scale deployment.",
    "Conduct annual AI readiness assessments to monitor progress."
  ]
};

export function recommendationEngine(
  readinessLevel,
  weakCategories
) {
  const recommendations = [];

  // Overall Recommendation

  switch (readinessLevel) {
    case "Highly Ready":
      recommendations.push(
        "Your institution demonstrates a high level of AI readiness. Focus on sustaining innovation, expanding AI research, and continuously evaluating emerging technologies."
      );
      break;

    case "Moderately Ready":
      recommendations.push(
        "Your institution has established a solid foundation for AI adoption but should prioritize improvements in weaker areas before scaling AI initiatives."
      );
      break;

    default:
      recommendations.push(
        "Your institution is currently not ready for widespread AI adoption. Priority should be given to strengthening foundational infrastructure, governance, and staff capacity."
      );
  }

  // Category Recommendations

  weakCategories.forEach((category) => {
    if (categoryRecommendations[category]) {
      recommendations.push(...categoryRecommendations[category]);
    }
  });

  return recommendations;
}
