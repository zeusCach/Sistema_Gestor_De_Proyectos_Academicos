export const BarChartTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const { name, value } = payload[0];

  return (
    <div className="bg-white p-2 rounded shadow text-sm">
      {name}: {value}
    </div>
  );
};
