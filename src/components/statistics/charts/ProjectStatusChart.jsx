import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { PieChartTooltip } from "./PieChartTooltip";
import { STATUS_COLORS } from "../constants/constants";

export const ProjectStatusChart = ({ projects }) => {
  const data = Object.keys(STATUS_COLORS).map((status) => ({
    name: status,
    value: projects.filter((p) => p.status === status).length,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Distribución por Estado</h2>

      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%">
          {data.map((entry) => (
            <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip content={<PieChartTooltip />} />
      </PieChart>
    </div>
  );
};
