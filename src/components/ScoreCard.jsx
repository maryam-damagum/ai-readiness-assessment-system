function ScoreCard({
  title,
  value,
  color = "blue",
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",

    green: "bg-green-100 text-green-700",

    yellow: "bg-yellow-100 text-yellow-700",

    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <p className="text-gray-500 mb-2">
        {title}
      </p>

      <div
        className={`inline-block px-4 py-2 rounded-lg font-bold text-xl ${colors[color]}`}
      >
        {value}
      </div>
    </div>
  );
}

export default ScoreCard;