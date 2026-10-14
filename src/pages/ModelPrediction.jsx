import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE_URL = import.meta.env.VITE_MODEL_API_URL || "http://127.0.0.1:8000";

const DIMENSIONS = [
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
];

const initialScores = Object.fromEntries(DIMENSIONS.map((name) => [name, 3]));

export default function ModelPrediction() {
  const [scores, setScores] = useState(initialScores);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateScore(name, value) {
    setScores((current) => ({ ...current, [name]: Number(value) }));
  }

  async function submitPrediction(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores }),
      });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.detail || "The prediction request failed.");
      }
      setResult(body);
    } catch (err) {
      setError(
        `${err.message} Check that the Python API is running and VITE_MODEL_API_URL is correct.`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-3xl font-bold text-slate-900">
            AI Implementation Monitoring Prediction
          </h1>
          <p className="mt-3 text-slate-600">
            Enter the mean score for each readiness dimension on a 1–5 scale.
            Each score should represent the mean of its four Likert indicators.
          </p>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Research limitation:</strong> This exploratory model predicts
            the C5 monitoring/evaluation response—not overall AI readiness. It
            was fitted on only 13 respondent records, had 53.8% leave-one-out
            accuracy versus a 69.2% majority baseline, and should not be used
            for real institutional decisions.
          </div>

          <form
            onSubmit={submitPrediction}
            className="mt-8 rounded-2xl bg-white p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {DIMENSIONS.map((name) => (
                <label key={name} className="block">
                  <span className="mb-2 block font-medium text-slate-800">
                    {name}
                  </span>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.25"
                      value={scores[name]}
                      onChange={(event) => updateScore(name, event.target.value)}
                      className="w-full accent-blue-600"
                    />
                    <output className="w-12 rounded-lg bg-slate-100 px-2 py-1 text-center font-semibold tabular-nums">
                      {scores[name].toFixed(2).replace(/\.00$/, "")}
                    </output>
                  </div>
                  <span className="mt-1 block text-xs text-slate-500">
                    Valid range: 1–5
                  </span>
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Running prediction…" : "Run model prediction"}
            </button>
          </form>

          {error && (
            <div role="alert" className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
              {error}
            </div>
          )}

          {result && (
            <section aria-live="polite" className="mt-8 rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Prediction result</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Predicted C5 class</p>
                  <p className="mt-2 text-xl font-bold">{result.predicted_label}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Probability: Yes</p>
                  <p className="mt-2 text-xl font-bold">
                    {(result.probability_yes * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Probability: No/Other</p>
                  <p className="mt-2 text-xl font-bold">
                    {(result.probability_no_other * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-slate-600">
                Target: {result.target}
              </p>
              <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                {result.warning}
              </p>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
