
const LIKERT_OPTIONS = [
  { label: "Strongly Disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neutral/Undecided", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly Agree", value: 5 },
];

export const questionnaireSections = [
  {
    id: "A",
    title: "Section A: Institutional Profile",
    questions: [
      {
        id: "A1",
        question: "Type of University",
        type: "single",
        required: true,
        options: [
          "Federal University",
          "State University",
          "Private University",
        ],
      },
      {
        id: "A2",
        question: "Your Primary Institutional Role",
        type: "single",
        required: true,
        options: [
          "University Management/Administration",
          "ICT/Information Technology",
          "Academic/Teaching",
          "Research/Innovation",
          "Digital Transformation/ICT Management",
          "Quality Assurance/Planning",
          "Other",
        ],
        allowOther: true,
      },
      {
        id: "A3",
        question: "How long have you been associated with the university?",
        type: "single",
        required: true,
        options: [
          "Less than 2 years",
          "2–5 years",
          "6–10 years",
          "More than 10 years",
        ],
      },
      {
        id: "A4",
        question:
          "Does your university currently use any AI-based technologies or applications?",
        type: "single",
        required: true,
        options: ["Yes", "No", "Not sure"],
      },
      {
        id: "A5",
        question: "If yes, which areas currently use AI?",
        type: "multiple",
        required: true,
        options: [
          "Teaching and learning",
          "Assessment",
          "Research",
          "Student services",
          "Administration",
          "Library/information services",
          "ICT/cybersecurity",
          "Other",
        ],
        allowOther: true,
        showWhen: { questionId: "A4", values: ["Yes"] },
      },
    ],
  },
  {
    id: "B",
    title: "Section B: Institutional AI Capability",
    description:
      "Indicate the extent to which you agree that each statement accurately describes your university.",
    questions: [
      {
        id: "B1_1",
        category: "Technological Infrastructure",
        question:
          "The university has adequate internet and network infrastructure to support AI applications.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B1_2",
        category: "Technological Infrastructure",
        question:
          "The university has sufficient computing resources to support AI-related activities.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B1_3",
        category: "Technological Infrastructure",
        question:
          "The university has access to appropriate cloud or other computational resources for AI applications.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B1_4",
        category: "Technological Infrastructure",
        question:
          "Adequate technical support is available for implementing and maintaining AI technologies.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },

      {
        id: "B2_1",
        category: "Human Capacity",
        question:
          "The university has staff with relevant AI knowledge and skills.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B2_2",
        category: "Human Capacity",
        question:
          "Academic and professional staff have access to AI-related training opportunities.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B2_3",
        category: "Human Capacity",
        question:
          "The university has personnel capable of supporting the implementation of AI technologies.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B2_4",
        category: "Human Capacity",
        question:
          "The university supports continuous development of staff AI-related competencies.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },

      {
        id: "B3_1",
        category: "Governance and Leadership",
        question:
          "University leadership demonstrates commitment to the responsible adoption of AI.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B3_2",
        category: "Governance and Leadership",
        question:
          "Responsibility for coordinating AI-related activities is clearly established within the university.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B3_3",
        category: "Governance and Leadership",
        question:
          "The university has mechanisms for monitoring AI-related initiatives.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B3_4",
        category: "Governance and Leadership",
        question:
          "AI-related decisions are incorporated into relevant institutional planning processes.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },

      {
        id: "B4_1",
        category: "Data Readiness",
        question:
          "The university has adequate data resources to support AI applications.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B4_2",
        category: "Data Readiness",
        question:
          "Institutional data are maintained in sufficiently organised and usable formats.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B4_3",
        category: "Data Readiness",
        question:
          "The university has procedures for managing and protecting data used in AI applications.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B4_4",
        category: "Data Readiness",
        question:
          "Appropriate institutional data can be accessed when required for legitimate AI-related activities.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },

      {
        id: "B5_1",
        category: "Curriculum and Teaching",
        question:
          "AI-related knowledge or skills are incorporated into relevant university programmes.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B5_2",
        category: "Curriculum and Teaching",
        question:
          "The university supports the use of AI technologies to enhance teaching and learning.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B5_3",
        category: "Curriculum and Teaching",
        question:
          "Staff have adequate support for integrating AI into teaching activities.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B5_4",
        category: "Curriculum and Teaching",
        question:
          "The university provides opportunities for students to develop appropriate AI-related competencies.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },

      {
        id: "B6_1",
        category: "Research Capability",
        question:
          "The university has researchers with expertise relevant to AI research.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B6_2",
        category: "Research Capability",
        question:
          "The university provides infrastructure or resources for AI-related research.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B6_3",
        category: "Research Capability",
        question:
          "The university supports research projects involving AI.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B6_4",
        category: "Research Capability",
        question:
          "The university participates in AI-related research collaborations.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },

      {
        id: "B7_1",
        category: "Financial Capacity",
        question:
          "The university allocates financial resources to support AI-related initiatives.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B7_2",
        category: "Financial Capacity",
        question:
          "Adequate funding is available for acquiring or upgrading AI-related infrastructure.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B7_3",
        category: "Financial Capacity",
        question:
          "Funding is available for AI-related staff training and professional development.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B7_4",
        category: "Financial Capacity",
        question:
          "The university has mechanisms for sustaining investment in AI-related activities.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },

      {
        id: "B8_1",
        category: "Ethical and Responsible AI",
        question:
          "The university has guidelines addressing the responsible use of AI.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B8_2",
        category: "Ethical and Responsible AI",
        question:
          "The university has mechanisms for protecting privacy and personal data when AI technologies are used.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B8_3",
        category: "Ethical and Responsible AI",
        question:
          "Ethical considerations are incorporated into institutional AI-related activities.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B8_4",
        category: "Ethical and Responsible AI",
        question:
          "The university has mechanisms for addressing academic integrity issues associated with AI use.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },

      {
        id: "B9_1",
        category: "Policy and Regulatory Support",
        question:
          "The university has institutional policies or guidelines addressing AI use.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B9_2",
        category: "Policy and Regulatory Support",
        question:
          "Existing institutional policies provide clear guidance on the use of AI.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B9_3",
        category: "Policy and Regulatory Support",
        question:
          "The university considers relevant national or regulatory requirements when implementing AI.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B9_4",
        category: "Policy and Regulatory Support",
        question:
          "Institutional policies are regularly reviewed to address emerging AI developments.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },

      {
        id: "B10_1",
        category: "External Collaboration and Ecosystem",
        question:
          "The university collaborates with other institutions on AI-related activities.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B10_2",
        category: "External Collaboration and Ecosystem",
        question:
          "The university has partnerships with industry or technology organisations relevant to AI.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B10_3",
        category: "External Collaboration and Ecosystem",
        question:
          "The university has access to external expertise that supports AI-related initiatives.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
      {
        id: "B10_4",
        category: "External Collaboration and Ecosystem",
        question:
          "External partnerships provide opportunities to access resources or knowledge relevant to AI adoption.",
        type: "likert",
        required: true,
        options: LIKERT_OPTIONS,
      },
    ],
  },

  {
    id: "C",
    title: "Section C: Institutional AI Adoption and Implementation Outcomes",
    description:
      "Answer based on your university's actual institutional activities rather than your personal AI use.",
    questions: [
      {
        id: "C1",
        question: "How would you describe the university's current level of AI implementation?",
        type: "single",
        required: true,
        options: [
          "No institutional AI implementation",
          "Initial/experimental implementation",
          "Implementation in selected areas",
          "Implementation across several institutional areas",
          "Extensive/institution-wide implementation",
          "Not sure",
        ],
      },
      {
        id: "C2",
        question: "In which of the following areas has the university implemented or formally supported AI-related initiatives?",
        type: "multiple",
        required: true,
        options: [
          "Teaching and learning",
          "Assessment",
          "Research",
          "Student services",
          "Administration",
          "Library/information services",
          "ICT/cybersecurity",
          "Other",
        ],
        allowOther: true,
      },
      {
        id: "C3",
        question: "Does the university have formally recognized institutional AI initiatives?",
        type: "single",
        required: true,
        options: ["Yes", "No", "In development", "Not sure"],
      },
      {
        id: "C4",
        question: "To what extent has AI moved beyond isolated individual experimentation to institutionally supported activities?",
        type: "single",
        required: true,
        options: [
          "Not at all",
          "To a limited extent",
          "To a moderate extent",
          "To a considerable extent",
          "To a very great extent",
          "Not sure",
        ],
      },
      {
        id: "C5",
        question: "Does the university have mechanisms for monitoring or evaluating the implementation of AI initiatives?",
        type: "single",
        required: true,
        options: ["Yes", "No", "In development", "Not sure"],
      },
      {
        id: "C6",
        question: "What is the current stage of the university's overall AI implementation?",
        type: "single",
        required: true,
        options: [
          "No implementation",
          "Exploration/awareness",
          "Pilot implementation",
          "Early institutional implementation",
          "Established institutional implementation",
          "Broad/integrated implementation",
          "Not sure",
        ],
      },
    ],
  },
  {
    id: "D",
    title: "Section D: Institutional AI Readiness Outcome",
    description:
      "This section records the respondent's overall assessment of the university's current AI readiness.",
    questions: [
      {
        id: "D1",
        question: "Overall, how would you describe your university's current readiness to adopt and sustain AI?",
        type: "single",
        required: true,
        options: [
          "Very Low",
          "Low",
          "Moderate",
          "High",
          "Very High",
          "Not sure",
        ],
      },
      {
        id: "D2",
        question: "Which area represents the university's greatest constraint to AI adoption?",
        type: "single",
        required: true,
        options: [
          "Technological infrastructure",
          "Human capacity",
          "Governance and leadership",
          "Data readiness",
          "Curriculum and teaching",
          "Research capability",
          "Financial capacity",
          "Ethical/responsible AI",
          "Policy/regulatory support",
          "External collaboration",
          "Other",
        ],
        allowOther: true,
      },
      {
        id: "D3",
        question: "Which area represents the university's strongest capability for AI adoption?",
        type: "single",
        required: false,
        options: [
          "Technological infrastructure",
          "Human capacity",
          "Governance and leadership",
          "Data readiness",
          "Curriculum and teaching",
          "Research capability",
          "Financial capacity",
          "Ethical/responsible AI",
          "Policy/regulatory support",
          "External collaboration",
          "Other",
        ],
        allowOther: true,
      },
    ],
  },
  {
    id: "E",
    title: "Section E: Additional Information",
    description: "These questions are optional.",
    questions: [
      {
        id: "E1",
        question: "What major challenge currently limits your university's adoption of AI?",
        type: "text",
        required: false,
      },
      {
        id: "E2",
        question: "What institutional intervention would most improve your university's readiness for AI adoption?",
        type: "text",
        required: false,
      },
      {
        id: "E3",
        question: "Please provide any additional comments regarding AI readiness in your university.",
        type: "text",
        required: false,
      },
    ],
  },
];

