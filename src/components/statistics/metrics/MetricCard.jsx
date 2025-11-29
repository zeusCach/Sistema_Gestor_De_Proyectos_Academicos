export const MetricCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);
