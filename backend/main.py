import os
from pathlib import Path
from typing import Dict
from backend.scoring import validate_and_score
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import json
import uuid
from datetime import datetime, timezone

from pydantic import ConfigDict
from backend.database import get_connection, initialize_database


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "ai_readiness_c5_pipeline.joblib"

app = FastAPI(
    title="AI Readiness Model API",
    description="Exploratory API for the C5 monitoring/evaluation prediction prototype.",
    version="0.1.0",
)

# Development origins. Add your deployed frontend origin before production use.
app.add_middleware(
    CORSMiddleware,
   allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "https://ai-readiness-assessment-system.vercel.app",
],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

FEATURE_NAMES = [
    "Technological Infrastructure",
    "Human Capacity",
    "Governance",
    "Data Readiness",
    "Curriculum Readiness",
    "Research Capability",
    "Financial Readiness",
    "Ethical & Responsible AI",
    "Policy & Regulatory Support",
    "External Collaboration",
]

class PredictionInput(BaseModel):
    scores: Dict[str, float]

    # Each value is the mean of four Likert items, expected on a 1–5 scale.
    # We validate all ten features instead of silently filling missing values.
    def validate_scores(self):
        missing = [name for name in FEATURE_NAMES if name not in self.scores]
        extra = [name for name in self.scores if name not in FEATURE_NAMES]
        if missing:
            raise ValueError(f"Missing feature(s): {', '.join(missing)}")
        if extra:
            raise ValueError(f"Unexpected feature(s): {', '.join(extra)}")
        for name in FEATURE_NAMES:
            value = self.scores[name]
            if not 1 <= value <= 5:
                raise ValueError(f"{name} must be between 1 and 5.")

class PredictionOutput(BaseModel):
    predicted_class: str
    predicted_label: str
    probability_yes: float
    probability_no_other: float
    target: str
    warning: str



class SubmissionInput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    responses: Dict[str, object]
    questionnaire_version: str = Field(
        default="1.0",
        min_length=1,
        max_length=20
    )


def load_bundle():
    if not MODEL_PATH.exists():
        return None
    try:
        bundle = joblib.load(MODEL_PATH)
        if "pipeline" not in bundle:
            raise ValueError("The model file does not contain a 'pipeline' key.")
        return bundle
    except Exception as exc:
        raise RuntimeError(
            f"Could not load model artifact: {exc}. "
            "Check that it was exported from the notebook and that scikit-learn versions match."
        ) from exc

@app.get("/health")
def health():
    bundle = load_bundle()
    return {
        "status": "ok" if bundle else "model_missing",
        "model_loaded": bundle is not None,
        "target": "C5: reported AI monitoring/evaluation mechanisms",
    }



@app.post("/submit")
def submit_response(payload: SubmissionInput):
    # Validate answers and calculate scores.
    try:
        original_responses = payload.responses.copy()
        calculated = validate_and_score(payload.responses)
    except (ValueError, TypeError) as exc:
        raise HTTPException(
            status_code=422,
            detail=str(exc)
        ) from exc

    submission_id = str(uuid.uuid4())
    submitted_at = datetime.now(timezone.utc).isoformat()

    placeholders = (
        "%s, %s, %s, %s, %s, %s"
        if os.getenv("DATABASE_URL")
        else "?, ?, ?, ?, ?, ?"
    )

    try:
        with get_connection() as connection:
            connection.execute(
                f"""
                INSERT INTO responses (
                    submission_id,
                    submitted_at,
                    questionnaire_version,
                    responses_json,
                    dimension_scores_json,
                    overall_score
                )
                VALUES ({placeholders})
                """,
                (
                    submission_id,
                    submitted_at,
                    payload.questionnaire_version,
                    json.dumps(original_responses),
                    json.dumps(calculated["dimension_scores"]),
                    calculated["overall_score"],
                ),
            )

    except Exception as exc:
        print("DATABASE SAVE ERROR:", repr(exc))
        raise HTTPException(
            status_code=500,
            detail="Could not save the submission."
        ) from exc

    return {
        "message": "Response saved successfully.",
        "submission_id": submission_id,
        "submitted_at": submitted_at,
        "dimension_scores": calculated["dimension_scores"],
        "overall_score": calculated["overall_score"],
    }
