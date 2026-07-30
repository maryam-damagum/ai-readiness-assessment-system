import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaPrint, FaRedo } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecommendationCard from "../components/RecommendationCard";

import { useAssessment } from "../context/AssessmentContext";

function Recommendations() {
  const navigate = useNavigate();

  const {
    recommendations,
    results,
    resetAssessment,
  } = useAssessment();

  if (!results) {
    return <Navigate to="/assessment" replace />;
  }

  function handleRestart() {
    resetAssessment();
    navigate("/assessment");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12">

        <div className="max-w-6xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <h1 className="text-4xl font-bold">
                Intelligent Recommendations
              </h1>

              <p className="text-gray-600 mt-3">
                These recommendations are automatically generated based on
                your institution's AI Readiness Assessment.
              </p>

            </div>

            <div className="flex gap-4">

              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-xl transition"
              >
                <FaPrint />

                Print Report
              </button>

            </div>

          </div>

          {/* Summary */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">

            <h2 className="text-2xl font-semibold mb-6">
              Assessment Summary
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="border rounded-xl p-6">

                <h3 className="text-gray-500">
                  AI Readiness Score
                </h3>

                <p className="text-4xl font-bold text-blue-600 mt-3">
                  {results.percentage}%
                </p>

              </div>

              <div className="border rounded-xl p-6">

                <h3 className="text-gray-500">
                  Readiness Level
                </h3>

                <p className="text-2xl font-bold mt-3">
                  {results.readinessLevel}
                </p>

              </div>

              <div className="border rounded-xl p-6">

                <h3 className="text-gray-500">
                  Weak Categories
                </h3>

                <p className="text-2xl font-bold text-red-600 mt-3">
                  {results.weakCategories.length}
                </p>

              </div>

            </div>

          </div>

          {/* Recommendations */}

          <div className="mt-14">

            <h2 className="text-3xl font-bold mb-8">

              Recommended Actions

            </h2>

            <div className="space-y-5">

              {recommendations.map((recommendation, index) => (

                <RecommendationCard
                  key={index}
                  recommendation={recommendation}
                />

              ))}

            </div>

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-5 justify-center mt-16">

            <button
              onClick={handleRestart}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition"
            >

              <FaRedo />

              Restart Assessment

            </button>

            <Link
              to="/"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl transition"
            >

              Return Home

            </Link>

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}

export default Recommendations;