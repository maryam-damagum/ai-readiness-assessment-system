from pathlib import Path
from typing import Dict

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

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

@app.post("/predict", response_model=PredictionOutput)
def predict(payload: PredictionInput):
    try:
        payload.validate_scores()
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    bundle = load_bundle()
    if bundle is None:
        raise HTTPException(
            status_code=503,
            detail=(
                "Model artifact missing. Copy ai_readiness_c5_pipeline.joblib "
                "into the backend folder."
            ),
        )

    expected = bundle.get("feature_names", FEATURE_NAMES)
    if list(expected) != FEATURE_NAMES:
        raise HTTPException(
            status_code=500,
            detail="Feature names/order in the saved model do not match this API.",
        )

    row = pd.DataFrame([[payload.scores[name] for name in FEATURE_NAMES]],
                       columns=FEATURE_NAMES)
    model = bundle["pipeline"]

    try:
        predicted = int(model.predict(row)[0])
        probabilities = model.predict_proba(row)[0]
        class_to_probability = {
            int(class_value): float(probability)
            for class_value, probability in zip(model.classes_, probabilities)
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {exc}") from exc

    p_yes = class_to_probability.get(1, 0.0)
    p_no = class_to_probability.get(0, 0.0)

    return PredictionOutput(
        predicted_class=str(predicted),
        predicted_label="Yes" if predicted == 1 else "No/Other",
        probability_yes=round(p_yes, 4),
        probability_no_other=round(p_no, 4),
        target="C5: reported AI monitoring/evaluation mechanisms",
        warning=(
            "Exploratory proof of concept only. The model was fitted on 13 respondent "
            "records without verified university identifiers; its 53.8% LOOCV accuracy "
            "was below the 69.2% majority-class baseline. Do not use for real institutional decisions."
        ),
    )
