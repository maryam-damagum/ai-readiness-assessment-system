
const dimensionRecommendations = {
  "Technological Infrastructure": [
    "Assess internet reliability, bandwidth, and connectivity across the institution.",
    "Prioritise upgrades to computer laboratories and other essential ICT facilities.",
    "Evaluate secure cloud services and suitable computing resources for AI workloads.",
    "Develop an ICT maintenance and infrastructure improvement plan."
  ],

  "Human Capacity": [
    "Provide regular AI literacy and practical AI training for academic and administrative staff.",
    "Identify staff development needs and create targeted training programmes.",
    "Support students through AI clubs, workshops, and innovation activities.",
    "Develop a plan for recruiting or collaborating with AI specialists where necessary."
  ],

  "Governance and Leadership": [
    "Establish clear institutional leadership and accountability for AI initiatives.",
    "Assign responsibility for coordinating and monitoring AI adoption.",
    "Include AI readiness objectives in institutional strategic planning.",
    "Define measurable indicators for evaluating AI implementation progress."
  ],

  "Data Readiness": [
    "Assess the quality, completeness, accessibility, and consistency of institutional data.",
    "Strengthen data governance, access controls, and data ownership responsibilities.",
    "Improve data privacy, cybersecurity, backup, and recovery procedures.",
    "Identify data gaps that could prevent responsible AI implementation."
  ],

  "Curriculum and Teaching": [
    "Review curricula to identify appropriate opportunities for AI literacy and AI-related learning.",
    "Provide lecturers with guidance on responsible AI use in teaching and assessment.",
    "Pilot AI-supported teaching activities before considering wider implementation.",
    "Establish clear guidance for academic integrity and disclosure of AI-assisted work."
  ],

  "Research Capability": [
    "Identify priority AI research areas aligned with institutional expertise.",
    "Support staff and postgraduate students through AI research training.",
    "Improve access to suitable computing resources, research datasets, and software.",
    "Encourage interdisciplinary AI research and collaboration."
  ],

  "Financial Capacity": [
    "Estimate the costs of AI infrastructure, training, maintenance, and implementation.",
    "Develop a realistic, phased budget for priority AI initiatives.",
    "Explore suitable research grants, partnerships, and other legitimate funding opportunities.",
    "Evaluate the long-term operating costs of proposed AI systems before procurement."
  ],

  "Ethical and Responsible AI": [
    "Develop institutional guidance for responsible and transparent AI use.",
    "Establish procedures for identifying and addressing bias, privacy risks, and potential harm.",
    "Require appropriate human oversight for consequential AI-assisted decisions.",
    "Provide staff and students with guidance on accountability and responsible AI practices."
  ],

  "Policy and Regulatory Support": [
    "Review relevant national policies, applicable laws, and regulatory requirements.",
    "Translate relevant external requirements into clear institutional procedures.",
    "Assign responsibility for monitoring changes in AI-related policy and regulation.",
    "Review institutional AI guidance periodically as requirements and technologies evolve."
  ],

  "External Collaboration and Ecosystem": [
    "Identify relevant universities, research centres, industry partners, and technology organisations.",
    "Develop partnerships for AI training, research, and knowledge exchange.",
    "Explore collaborative projects and shared resources where appropriate.",
    "Establish processes for evaluating partnership outcomes and sustaining beneficial collaborations."
  ]
};

export function recommendationEngine(_readinessLevel, weakCategories = []) {
  const recommendations = [];

  if (!Array.isArray(weakCategories)) {
    return [
      "Review the assessment results and confirm which dimensions require further attention."
    ];
  }

  if (weakCategories.length === 0) {
    return [
      "No dimensions fell below the provisional review threshold. Continue monitoring all ten dimensions and validate improvement priorities using institutional evidence."
    ];
  }

  recommendations.push(
    "Use these recommendations as starting points for institutional review. Prioritise actions according to local evidence, available resources, and institutional objectives."
  );

  weakCategories.forEach((category) => {
    const actions = dimensionRecommendations[category];

    if (actions) {
      recommendations.push(`Priority dimension: ${category}`);
      recommendations.push(...actions);
    }
  });

  return recommendations;
}
