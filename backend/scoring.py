
from typing import Any, Dict


DIMENSIONS = {
    "Technological Infrastructure": "B1_",
    "Human Capacity": "B2_",
    "Governance and Leadership": "B3_",
    "Data Readiness": "B4_",
    "Curriculum and Teaching": "B5_",
    "Research Capability": "B6_",
    "Financial Capacity": "B7_",
    "Ethical and Responsible AI": "B8_",
    "Policy and Regulatory Support": "B9_",
    "External Collaboration and Ecosystem": "B10_",
}

REQUIRED_QUESTIONS = {
    "A1", "A2", "A3", "A4",
    "C1", "C2", "C3", "C4", "C5", "C6",
    "D1", "D2",
}

LIKERT_IDS = [
    f"B{dimension}_{item}"
    for dimension in range(1, 11)
    for item in range(1, 5)
]

SINGLE_OPTIONS = {
    "A1": [
        "Federal University",
        "State University",
        "Private University",
    ],
    "A2": [
        "University Management/Administration",
        "ICT/Information Technology",
        "Academic/Teaching",
        "Research/Innovation",
        "Digital Transformation/ICT Management",
        "Quality Assurance/Planning",
        "Other",
    ],
    "A3": [
        "Less than 2 years",
        "2–5 years",
        "6–10 years",
        "More than 10 years",
        "2â€“5 years",
        "6â€“10 years",
    ],
    "A4": ["Yes", "No", "Not sure"],
    "C1": [
        "No institutional AI implementation",
        "Initial/experimental implementation",
        "Implementation in selected areas",
        "Implementation across several institutional areas",
        "Extensive/institution-wide implementation",
        "Not sure",
    ],
    "C3": ["Yes", "No", "In development", "Not sure"],
    "C4": [
        "Not at all",
        "To a limited extent",
        "To a moderate extent",
        "To a considerable extent",
        "To a very great extent",
        "Not sure",
    ],
    "C5": ["Yes", "No", "In development", "Not sure"],
    "C6": [
        "No implementation",
        "Exploration/awareness",
        "Pilot implementation",
        "Early institutional implementation",
        "Established institutional implementation",
        "Broad/integrated implementation",
        "Not sure",
    ],
    "D1": ["Very Low", "Low", "Moderate", "High", "Very High", "Not sure"],
    "D2": [
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
    "D3": [
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
}

MULTIPLE_OPTIONS = {
    "A5": [
        "Teaching and learning",
        "Assessment",
        "Research",
        "Student services",
        "Administration",
        "Library/information services",
        "ICT/cybersecurity",
        "Other",
    ],
    "C2": [
        "Teaching and learning",
        "Assessment",
        "Research",
        "Student services",
        "Administration",
        "Library/information services",
        "ICT/cybersecurity",
        "Other",
    ],
}

ALLOWED_IDS = (
    REQUIRED_QUESTIONS
    | set(LIKERT_IDS)
    | {"A5", "D3", "E1", "E2", "E3"}
)


def validate_and_score(responses: Dict[str, Any]) -> dict:
    """Validate a complete questionnaire and calculate its descriptive scores."""

    if not isinstance(responses, dict):
        raise ValueError("Responses must be an object.")

    # Work on a copy so the original answers can be stored unchanged.
    normalized = dict(responses)

    unknown = set(normalized) - ALLOWED_IDS
    if unknown:
        raise ValueError(
            f"Unknown question IDs: {', '.join(sorted(unknown))}"
        )

    missing = REQUIRED_QUESTIONS - set(normalized)
    if missing:
        raise ValueError(
            f"Missing required answers: {', '.join(sorted(missing))}"
        )

    # Normalize single-choice "Other" answers.
    for question_id, options in SINGLE_OPTIONS.items():
        if question_id not in normalized:
            continue

        value = normalized[question_id]

        if isinstance(value, dict):
            if value.get("value") != "Other":
                raise ValueError(
                    f"Invalid answer format for {question_id}."
                )

            other_text = value.get("otherText", "")
            if not isinstance(other_text, str) or not other_text.strip():
                raise ValueError(
                    f"Please provide text for 'Other' in {question_id}."
                )

            value = "Other"
            normalized[question_id] = value

        if not isinstance(value, str) or value not in options:
            raise ValueError(f"Invalid answer for {question_id}.")

    # A5 is visible and required only when A4 is Yes.
    if normalized["A4"] == "Yes":
        if "A5" not in normalized:
            raise ValueError("A5 is required when A4 is Yes.")
    elif "A5" in normalized:
        raise ValueError("A5 should only be answered when A4 is Yes.")

    # Normalize and validate multiple-choice answers.
    for question_id, options in MULTIPLE_OPTIONS.items():
        if question_id not in normalized:
            continue

        value = normalized[question_id]
        if not isinstance(value, list) or not value:
            raise ValueError(
                f"{question_id} must contain at least one selected option."
            )

        selected_options = []

        for item in value:
            if isinstance(item, dict):
                if item.get("value") != "Other":
                    raise ValueError(
                        f"Invalid answer format for {question_id}."
                    )

                other_text = item.get("otherText", "")
                if not isinstance(other_text, str) or not other_text.strip():
                    raise ValueError(
                        f"Please provide text for 'Other' in {question_id}."
                    )

                option_value = "Other"
            else:
                option_value = item

            if not isinstance(option_value, str) or option_value not in options:
                raise ValueError(
                    f"Invalid option in {question_id}: {option_value}"
                )

            selected_options.append(option_value)

        if len(selected_options) != len(set(selected_options)):
            raise ValueError(
                f"Duplicate options are not allowed in {question_id}."
            )

        normalized[question_id] = selected_options

    # Validate all 40 required Likert responses.
    for question_id in LIKERT_IDS:
        value = normalized.get(question_id)

        if (
            isinstance(value, bool)
            or not isinstance(value, int)
            or value not in range(1, 6)
        ):
            raise ValueError(
                f"{question_id} must be an integer from 1 to 5."
            )

    # Validate optional D3.
    if "D3" in normalized:
        value = normalized["D3"]

        if isinstance(value, dict):
            if value.get("value") != "Other":
                raise ValueError("Invalid answer format for D3.")

            other_text = value.get("otherText", "")
            if not isinstance(other_text, str) or not other_text.strip():
                raise ValueError("Please provide text for 'Other' in D3.")

            value = "Other"
            normalized["D3"] = value

        if not isinstance(value, str) or value not in SINGLE_OPTIONS["D3"]:
            raise ValueError("Invalid answer for D3.")

    # Validate optional free-text answers.
    for question_id in ("E1", "E2", "E3"):
        if question_id in normalized and not isinstance(
            normalized[question_id], str
        ):
            raise ValueError(f"{question_id} must be text.")

    # Calculate each dimension from its four Likert answers.
    dimension_scores = {}

    for name, prefix in DIMENSIONS.items():
        values = [
            normalized[f"{prefix}{item}"]
            for item in range(1, 5)
        ]
        dimension_scores[name] = round(sum(values) / 4, 2)

    # Calculate the equally weighted descriptive index.
    overall_mean = sum(dimension_scores.values()) / len(dimension_scores)
    overall_score = round((overall_mean / 5) * 100, 1)

    return {
        "dimension_scores": dimension_scores,
        "overall_score": overall_score,
    }
