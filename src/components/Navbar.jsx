import { Link, useLocation } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `transition font-medium ${
      location.pathname === path
        ? "text-blue-600"
        : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <FaRobot className="text-3xl text-blue-600" />

          <div>
            <h1 className="font-bold text-lg text-slate-800">
              AI Readiness
            </h1>

            <p className="text-xs text-gray-500">
              Assessment System
            </p>
          </div>
        </Link>

        <div className="hidden md:flex gap-8">
          <Link className={linkClass("/")} to="/">
            Home
          </Link>

          <Link
            className={linkClass("/assessment")}
            to="/assessment"
          >
            Assessment
          </Link>

          <Link
            className={linkClass("/results")}
            to="/results"
          >
            Results
          </Link>

          <Link
            className={linkClass("/recommendations")}
            to="/recommendations"
          >
            Recommendations
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;