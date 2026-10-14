# React + FastAPI model integration

This package adds a separate React page that calls a Python API. It deliberately does **not** map the existing 25 Yes/Partially/No React assessment questions to the model: the saved model expects ten means of four Likert indicators, each on a 1–5 scale. Those schemas are not interchangeable.

## 1. Export the fitted model from Google Colab

Run the notebook cell that creates `/content/ai_readiness_c5_pipeline.joblib`. Then run:

```python
from google.colab import files
files.download("/content/ai_readiness_c5_pipeline.joblib")
```

Copy the downloaded file into this package's `backend/` folder. The resulting path must be:

`backend/ai_readiness_c5_pipeline.joblib`

Do not commit this model artifact to a public repository unless you intentionally want it public. It is excluded by the suggested `.gitignore` entry below.

## 2. Add the React page and route

Copy `src/pages/ModelPrediction.jsx` into your React project at the same path.

In `src/App.jsx`, add this import:

```jsx
import ModelPrediction from "./pages/ModelPrediction";
```

Then add this route inside `<Routes>`:

```jsx
<Route path="/model-demo" element={<ModelPrediction />} />
```

Start the frontend and open `http://localhost:5173/model-demo`.

## 3. Run the Python API

Open a terminal at your project root:

```bash
python -m venv .venv
```

Activate it:
- Windows PowerShell: `.venv\\Scripts\\Activate.ps1`
- macOS/Linux: `source .venv/bin/activate`

Install dependencies and start the API:

```bash
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

If Python reports that scikit-learn cannot load the joblib file because of a version mismatch, print `sklearn.__version__` in Colab and locally and install the same scikit-learn version used to export the artifact.

Check `http://127.0.0.1:8000/health`. A successful response should include `"model_loaded": true`. API documentation is at `http://127.0.0.1:8000/docs`.

## 4. Connect React to the API

By default, the React page calls `http://127.0.0.1:8000`. To use another API host, create a `.env` file in the React project root:

```text
VITE_MODEL_API_URL=http://127.0.0.1:8000
```

Restart Vite after changing `.env`.

## 5. Ignore the model artifact

Add this line to the project's `.gitignore`:

```text
backend/ai_readiness_c5_pipeline.joblib
```

## 6. Important research interpretation

The endpoint predicts C5 (reported AI monitoring/evaluation mechanisms), not overall AI readiness. The existing React assessment calculates a separate rule-based score from 25 Yes/Partially/No questions across five categories. Do not present these as a single unified model unless the questionnaire and model are redesigned and validated to use matching features.

The current model is a proof of concept fitted on 13 respondent records. Report its known evaluation honestly: 53.8% LOOCV accuracy, below a 69.2% majority-class baseline, and zero recall for the positive class in the reviewed confusion matrix. A working API demonstrates software integration, not predictive validity.
