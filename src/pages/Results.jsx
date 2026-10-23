
import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScoreCard from "../components/ScoreCard";
import CircularProgressChart from "../components/CircularProgressChart";
import RadarChartComponent from "../components/RadarChartComponent";

import { useAssessment } from "../context/AssessmentContext";

function Results() {
  const { results } = useAssessment();

const [prediction, setPrediction] = useState(null);
const [predictionLoading, setPredictionLoading] = useState(false);
const [predictionError, setPredictionError] = useState("");

useEffect(() => {
  if (!results?.complete) return;

  const dimensionMeans = results.dimensionMeans;

  
const scores = {
  "Technological Infrastructure":
    dimensionMeans["Technological Infrastructure"],
  "Human Capacity":
    dimensionMeans["Human Capacity"],
  "Governance":
    dimensionMeans["Governance and Leadership"],
  "Data Readiness":
    dimensionMeans["Data Readiness"],
  "Curriculum Readiness":
    dimensionMeans["Curriculum and Teaching"],
  "Research Capability":
    dimensionMeans["Research Capability"],
  "Financial Readiness":
    dimensionMeans["Financial Capacity"],
  "Ethical & Responsible AI":
    dimensionMeans["Ethical and Responsible AI"],
  "Policy & Regulatory Support":
    dimensionMeans["Policy and Regulatory Support"],
  "External Collaboration":
    dimensionMeans["External Collaboration and Ecosystem"],
};


  const controller = new AbortController();

  async function getPrediction() {
    setPredictionLoading(true);
    setPredictionError("");
    setPrediction(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_MODEL_API_URL || "http://127.0.0.1:8000"}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ scores }),
          signal: controller.signal,
        }
      );

     
if (!response.ok) {
  const errorBody = await response.json().catch(() => null);

  throw new Error(
    errorBody?.detail
      ? `${response.status}: ${
          typeof errorBody.detail === "string"
            ? errorBody.detail
            : JSON.stringify(errorBody.detail)
        }`
      : `Prediction request failed (${response.status}).`
  );
}


      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      if (error.name !== "AbortError") {
       setPredictionError(error.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setPredictionLoading(false);
      }
    }
  }

  getPrediction();

  return () => controller.abort();
}, [results]);

  if (!results) {
    return <Navigate to="/assessment" replace />;
  }

  if (!results.complete) {
    return (
      <Navigate
        to="/assessment"
        replace
        state={{
          message: "Complete all 40 Section B statements to calculate the readiness index.",
        }}
      />
    );
  }

  const dimensions = results.categoryResults || [];
  const weakDimensions = results.weakCategories || [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold text-slate-800">
            Assessment Results
          </h1>

          <p className="mt-2 text-gray-500">
            Institutional AI Readiness Assessment Dashboard
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <ScoreCard
              title="Descriptive AI Readiness Index"
              value={`${results.percentage}%`}
            />

            <ScoreCard
              title="Overall Mean Score"
              value={`${results.overallMean} / 5`}
            />
          </div>

          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-5">
            <p className="font-semibold text-blue-900">
              How to interpret this result
            </p>
            <p className="mt-2 text-sm leading-6 text-blue-800">
              This index summarizes responses to the 40 institutional
              capability statements across 10 dimensions. It is a descriptive
              score, not a validated readiness classification or a prediction
              of AI adoption success.
            </p>
          </div>

          
<section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
  <h2 className="text-2xl font-semibold text-slate-800">
    AI Monitoring and Evaluation Prediction
  </h2>

  <p className="mt-2 text-sm leading-6 text-gray-600">
    This exploratory model estimates whether the institution reports
    having AI monitoring and evaluation mechanisms. This prediction
    is separate from the descriptive AI readiness index.
  </p>

  {predictionLoading && (
    <p className="mt-5 text-gray-600">
      Generating prediction...
    </p>
  )}

  {predictionError && (
    <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
      {predictionError}
    </div>
  )}

  {prediction && (
    <div className="mt-6">
      <p className="text-sm text-gray-500">
        Predicted outcome
      </p>

      <p className="mt-1 text-2xl font-bold text-blue-700">
        {prediction.predicted_label}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-gray-600">
            Probability of Yes
          </p>
          <p className="mt-1 text-xl font-semibold">
            {(prediction.probability_yes * 100).toFixed(1)}%
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-gray-600">
            Probability of No/Other
          </p>
          <p className="mt-1 text-xl font-semibold">
            {(prediction.probability_no_other * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-amber-800">
        Research prototype only: this model has limited validation
        performance and should not be used to make real institutional
        decisions. The displayed probabilities are model estimates,
        not guarantees.
      </p>
    </div>
  )}
</section>


          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-semibold">
                Overall AI Readiness Index
              </h2>

              <CircularProgressChart score={results.percentage} />
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-semibold">
                Performance Across Ten Dimensions
              </h2>

              <RadarChartComponent data={dimensions} />
            </div>
          </div>

          <section className="mt-14 rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-3 text-2xl font-semibold">
              Dimension Scores
            </h2>

            <p className="mb-8 text-sm text-gray-500">
              Scores are expressed as percentages of the maximum possible
              dimension mean.
            </p>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {dimensions.map((dimension) => (
                <div
                  key={dimension.category}
                  className="rounded-xl border border-gray-200 p-5"
                >
                  <h3 className="font-semibold text-slate-800">
                    {dimension.category}
                  </h3>

                  <p className="mt-4 text-3xl font-bold text-blue-600">
                    {dimension.score}%
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Mean score: {dimension.mean} / 5
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-3 text-2xl font-semibold">
              Dimensions for Further Attention
            </h2>

            <p className="mb-6 text-sm leading-6 text-gray-600">
              The dimensions listed below have scores below 60%. This is a
              provisional descriptive flag for review, not a validated
              institutional readiness threshold.
            </p>

            {weakDimensions.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                No dimensions fell below the provisional 60% review threshold.
                This does not, by itself, establish that the institution is
                fully AI-ready.
              </div>
            ) : (
              <ul className="space-y-3">
                {weakDimensions.map((dimension) => (
                  <li
                    key={dimension}
                    className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900"
                  >
                    {dimension}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <Link
              to="/recommendations"
              className="rounded-xl bg-blue-600 px-8 py-4 text-white transition hover:bg-blue-700"
            >
              View Recommendations
            </Link>

            <Link
              to="/assessment"
              className="rounded-xl border border-gray-300 bg-white px-8 py-4 text-slate-700 transition hover:bg-gray-100"
            >
              Return to Assessment
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Results;
