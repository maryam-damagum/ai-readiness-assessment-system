import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function CircularProgressChart({ score }) {
  const data = [
    {
      name: "Score",
      value: score,
    },
    {
      name: "Remaining",
      value: 100 - score,
    },
  ];

  return (
    <div className="relative w-72 h-72 mx-auto">

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            startAngle={90}
            endAngle={-270}
          >

            <Cell fill="#2563eb" />

            <Cell fill="#e5e7eb" />

          </Pie>

        </PieChart>

      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <h1 className="text-5xl font-bold text-slate-800">

          {score}%

        </h1>

        <p className="text-gray-500 mt-2">

          AI Readiness

        </p>

      </div>

    </div>
  );
}

export default CircularProgressChart;