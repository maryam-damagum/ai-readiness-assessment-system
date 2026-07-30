import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function RadarChartComponent({ data }) {
  return (
    <div className="w-full h-96">

      <ResponsiveContainer>

        <RadarChart data={data}>

          <PolarGrid />

          <PolarAngleAxis dataKey="category" />

          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
          />

          <Radar
            dataKey="score"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.5}
          />

        </RadarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default RadarChartComponent;