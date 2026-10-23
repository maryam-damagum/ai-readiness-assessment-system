import { Link } from "react-router-dom";
import {
  FaRobot,
  FaUniversity,
  FaChartLine,
  FaClipboardCheck,
  FaArrowRight,
  FaNetworkWired,
  FaUsers,
  FaDatabase,
  FaLightbulb,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const features = [
    {
      title: "Infrastructure",
      icon: <FaNetworkWired />,
      description:
        "Evaluate ICT infrastructure, internet connectivity, laboratories, and AI computing resources.",
    },
    {
      title: "Human Capacity",
      icon: <FaUsers />,
      description:
        "Assess AI knowledge, staff training, student engagement, and professional development.",
    },
    {
      title: "Governance & Policy",
      icon: <FaClipboardCheck />,
      description:
        "Measure AI policies, ethics, institutional leadership, governance, and funding.",
    },
    {
      title: "Data Management",
      icon: <FaDatabase />,
      description:
        "Assess data governance, security, digital repositories, privacy, and analytics.",
    },
    {
      title: "AI Strategy",
      icon: <FaLightbulb />,
      description:
        "Evaluate institutional AI strategy, partnerships, innovation, and long-term planning.",
    },
  ];

  const benefits = [
    "Assess institutional AI readiness using a structured framework.",
    "Identify strengths and critical gaps across five dimensions.",
    "Generate intelligent recommendations for decision-makers.",
    "Visualize readiness scores using interactive charts.",
  ];

  return (
    <>
      <Navbar />

      <main className="bg-slate-50">

        {/* Hero Section */}

        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">

                <FaRobot />

                Intelligent Decision Support System

              </span>

              <h1 className="text-5xl font-extrabold text-slate-800 mt-6 leading-tight">

                AI Readiness Assessment System for Nigerian Universities

              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-8">

                Evaluate your institution's preparedness for Artificial
                Intelligence adoption through a comprehensive multi-dimensional
                assessment framework. Receive data-driven insights and
                actionable recommendations to support strategic decision-making.

              </p>

              <div className="mt-10 flex gap-5">

                <Link
                  to="/assessment"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-xl flex items-center gap-3 transition"
                >
                  Start Assessment

                  <FaArrowRight />
                </Link>

                <a
                  href="#about"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-7 py-4 rounded-xl transition"
                >
                  Learn More
                </a>

              </div>

            </div>

            <div>

              <div className="bg-white rounded-3xl shadow-xl p-10">

                <FaUniversity className="text-7xl text-blue-600 mb-6" />

                <h2 className="text-2xl font-bold mb-4">

                  AI Readiness Framework

                </h2>

                <p className="text-gray-600 leading-8">

                  This prototype evaluates institutional readiness across
                  Infrastructure, Human Capacity, Governance & Policy,
                  Data Management, and AI Strategy to support evidence-based
                  AI adoption.

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* About */}

        <section
          id="about"
          className="bg-white py-20"
        >

          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center">

              About the Assessment

            </h2>

            <p className="text-gray-600 text-center mt-6 max-w-4xl mx-auto leading-8">

              Artificial Intelligence is transforming higher education
              worldwide. This system helps universities evaluate their
              readiness for AI adoption using a structured assessment model
              designed around critical institutional dimensions.

            </p>

          </div>

        </section>

        {/* Assessment Dimensions */}

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center">

              Assessment Dimensions

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

              {features.map((feature) => (

                <div
                  key={feature.title}
                  className="bg-white rounded-2xl shadow-md p-8 hover:-translate-y-2 transition"
                >

                  <div className="text-4xl text-blue-600 mb-6">

                    {feature.icon}

                  </div>

                  <h3 className="text-xl font-bold mb-4">

                    {feature.title}

                  </h3>

                  <p className="text-gray-600 leading-7">

                    {feature.description}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* Benefits */}

        <section className="bg-blue-600 text-white py-20">

          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center">

              Why Use This System?

            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-12">

              {benefits.map((benefit) => (

                <div
                  key={benefit}
                  className="bg-blue-500 rounded-xl p-6 flex gap-4"
                >

                  <FaChartLine className="text-2xl mt-1" />

                  <p>{benefit}</p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* Process */}

        <section className="py-20">

          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center">

              How It Works

            </h2>

            <div className="grid md:grid-cols-4 gap-8 mt-14">

              {[
                "Answer Questions",
                "System Calculates Readiness",
                "Identify Weak Areas",
                "Receive Recommendations",
              ].map((step, index) => (

                <div
                  key={step}
                  className="bg-white shadow rounded-xl p-8 text-center"
                >

                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-xl font-bold">

                    {index + 1}

                  </div>

                  <p className="font-medium">

                    {step}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="pb-24">

          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-14 text-center">

            <h2 className="text-4xl font-bold">

              Ready to Assess Your Institution?

            </h2>

            <p className="mt-5 text-gray-600 leading-8">

              Complete the AI Readiness Assessment and receive an
              evidence-based readiness score together with practical
              recommendations for improving AI adoption.

            </p>

            <Link
              to="/assessment"
              className="inline-block mt-10 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-lg transition"
            >
              Start Assessment
            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Home;