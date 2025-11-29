import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import {BarChartTooltip} from "./BarChartTooltip";
import { calculateDuration } from "../../../utils/utils";

export const ProjectTimelineChart = ({ projects }) => {
  const chartData = projects.map((p) => ({
    name: p.name,
    duration: calculateDuration(p.startDate, p.endDate),
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Duración de Proyectos</h2>

      <BarChart width={500} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<BarChartTooltip />} />
        <Bar dataKey="duration" />
      </BarChart>
    </div>
  );
};
