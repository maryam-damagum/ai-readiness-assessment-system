import { Link } from "react-router-dom";
import {
  FaRobot,
  FaUniversity,
  FaArrowRight,
  FaNetworkWired,
  FaUsers,
  FaDatabase,
  FaClipboardCheck,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const dimensions = [
    {
      title: "Infrastructure",
      icon: <FaNetworkWired />,
      description:
        "Evaluate internet connectivity, ICT facilities, laboratories, and AI computing resources.",
    },
    {
      title: "Human Capacity",
      icon: <FaUsers />,
      description:
        "Assess staff AI skills, student readiness, professional development, and AI expertise.",
    },
    {
      title: "Governance & Policy",
      icon: <FaClipboardCheck />,
      description:
        "Measure AI governance, ethics, institutional policies, leadership support, and funding.",
    },
    {
      title: "Data Management",
      icon: <FaDatabase />,
      description:
        "Evaluate data quality, cybersecurity, digital repositories, privacy, and analytics.",
    },
    {
      title: "AI Strategy",
      icon: <FaLightbulb />,
      description:
        "Assess institutional AI strategy, innovation, partnerships, and future AI initiatives.",
    },
  ];

  const benefits = [
    "Measure AI readiness using a structured framework.",
    "Identify strengths and weaknesses across five key dimensions.",
    "Generate intelligent recommendations automatically.",
    "Visualize results using interactive dashboards and charts.",
  ];

  return (
    <>
      <Navbar />

      <main className="bg-slate-50">

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Side */}
            <div>

              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium text-sm">

                <FaRobot />

                Intelligent Decision Support System

              </span>

              <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-800 mt-6 leading-tight">

                AI Readiness Assessment System

              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-8">

                Evaluate the readiness of Nigerian universities for Artificial
                Intelligence adoption using a structured multi-dimensional
                assessment framework. Receive intelligent recommendations
                to support institutional decision-making.

              </p>

              <div className="flex flex-wrap gap-5 mt-10">

                <Link
                  to="/assessment"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition"
                >
                  Start Assessment

                  <FaArrowRight />

                </Link>

                <a
                  href="#about"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl transition"
                >
                  Learn More
                </a>

              </div>

            </div>

            {/* Right Side */}

            <div>

              <div className="bg-white rounded-3xl shadow-xl p-10">

                <FaUniversity className="text-7xl text-blue-600 mb-6" />

                <h2 className="text-2xl font-bold text-slate-800">

                  AI Readiness Framework

                </h2>

                <p className="text-gray-600 mt-5 leading-8">

                  The system evaluates institutional AI readiness across
                  Infrastructure, Human Capacity, Governance & Policy,
                  Data Management, and AI Strategy, providing evidence-based
                  recommendations for improvement.

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

          <div className="max-w-6xl mx-auto px-6 text-center">

            <h2 className="text-4xl font-bold text-slate-800">

              About the System

            </h2>

            <p className="mt-6 text-gray-600 leading-8 max-w-4xl mx-auto">

              Artificial Intelligence is transforming teaching, research,
              and university administration worldwide. This assessment
              system helps higher institutions determine their level of
              preparedness for AI adoption using a scientifically structured
              assessment framework.

            </p>

          </div>

        </section>

        {/* Assessment Dimensions */}

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center text-slate-800">

              Assessment Dimensions

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

              {dimensions.map((item) => (

                <div
                  key={item.title}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
                >

                  <div className="text-4xl text-blue-600 mb-5">

                    {item.icon}

                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-4">

                    {item.title}

                  </h3>

                  <p className="text-gray-600 leading-7">

                    {item.description}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* Benefits */}

        <section className="bg-blue-600 py-20 text-white">

          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center">

              Why Use This Assessment?

            </h2>

            <div className="grid md:grid-cols-2 gap-8 mt-14">

              {benefits.map((benefit) => (

                <div
                  key={benefit}
                  className="bg-blue-500 rounded-xl p-6 flex gap-4 items-start"
                >

                  <FaChartLine className="text-2xl mt-1" />

                  <p className="leading-7">

                    {benefit}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* Process */}

        <section className="py-20">

          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center text-slate-800">

              How It Works

            </h2>

            <div className="grid md:grid-cols-4 gap-8 mt-14">

              {[
                "Answer 25 Assessment Questions",
                "System Calculates Readiness Score",
                "Identify Institutional Gaps",
                "Receive Intelligent Recommendations",
              ].map((step, index) => (

                <div
                  key={step}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center"
                >

                  <div className="w-14 h-14 bg-blue-600 rounded-full text-white flex items-center justify-center text-xl font-bold mx-auto">

                    {index + 1}

                  </div>

                  <p className="mt-6 font-medium text-slate-700">

                    {step}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* Call To Action */}

        <section className="pb-24">

          <div className="max-w-5xl mx-auto px-6">

            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

              <h2 className="text-4xl font-bold text-slate-800">

                Ready to Assess Your Institution?

              </h2>

              <p className="text-gray-600 mt-6 leading-8 max-w-3xl mx-auto">

                Complete the AI Readiness Assessment to discover your
                institution's strengths, identify improvement areas,
                and receive practical recommendations for successful
                AI adoption.

              </p>

              <Link
                to="/assessment"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl mt-10 transition"
              >

                Start Assessment

                <FaArrowRight />

              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </>
  );
}

export default Home;