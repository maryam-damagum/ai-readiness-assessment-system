import { FaCheckCircle } from "react-icons/fa";

function RecommendationCard({
  recommendation,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex gap-4">

      <FaCheckCircle className="text-green-600 mt-1 text-lg shrink-0" />

      <p className="text-gray-700 leading-7">
        {recommendation}
      </p>
    </div>
  );
}

export default RecommendationCard;