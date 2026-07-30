import { Navigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScoreCard from "../components/ScoreCard";
import CircularProgressChart from "../components/CircularProgressChart";
import RadarChartComponent from "../components/RadarChartComponent";

import { useAssessment } from "../context/AssessmentContext";

function Results() {
  const { results } = useAssessment();

  if (!results) {
    return <Navigate to="/assessment" replace />;
  }

  const levelColor =
    results.readinessLevel === "Highly Ready"
      ? "green"
      : results.readinessLevel === "Moderately Ready"
      ? "yellow"
      : "red";

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 min-h-screen py-12">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-4xl font-bold">

            Assessment Results

          </h1>

          <p className="text-gray-500 mt-2">

            AI Readiness Assessment Dashboard

          </p>

          {/* Top Cards */}

          <div className="grid md:grid-cols-2 gap-8 mt-10">

            <ScoreCard
              title="Readiness Score"
              value={`${results.percentage}%`}
            />

            <ScoreCard
              title="Readiness Level"
              value={results.readinessLevel}
              color={levelColor}
            />

          </div>

          {/* Charts */}

          <div className="grid lg:grid-cols-2 gap-10 mt-14">

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-semibold mb-6">

                Overall AI Readiness

              </h2>

              <CircularProgressChart
                score={results.percentage}
              />

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-semibold mb-6">

                Category Performance

              </h2>

              <RadarChartComponent
                data={results.categoryResults}
              />

            </div>

          </div>

          {/* Category Scores */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-14">

            <h2 className="text-2xl font-semibold mb-8">

              Category Scores

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

              {results.categoryResults.map((category) => (

                <div
                  key={category.category}
                  className="border rounded-xl p-5 text-center"
                >

                  <h3 className="font-semibold">

                    {category.category}

                  </h3>

                  <p className="text-4xl text-blue-600 font-bold mt-4">

                    {category.score}%

                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Weak Areas */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-14">

            <h2 className="text-2xl font-semibold mb-6">

              Identified Gaps

            </h2>

            {results.weakCategories.length === 0 ? (

              <div className="bg-green-50 border border-green-200 rounded-lg p-5">

                <p className="text-green-700">

                  No significant gaps were identified. Your institution
                  demonstrates strong AI readiness across all assessment
                  dimensions.

                </p>

              </div>

            ) : (

              <ul className="space-y-3">

                {results.weakCategories.map((category) => (

                  <li
                    key={category}
                    className="bg-red-50 border border-red-200 rounded-lg p-4"
                  >
                    {category}
                  </li>

                ))}

              </ul>

            )}

          </div>

          {/* CTA */}

          <div className="text-center mt-16">

            <Link
              to="/recommendations"
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl transition"
            >
              View Recommendations
            </Link>

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}

export default Results;