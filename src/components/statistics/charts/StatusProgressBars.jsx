import { STATUS_COLORS } from '../constants/constants'

export const StatusProgressBars = ({ projects }) => {
  const total = projects.length;

  const counts = Object.keys(STATUS_COLORS).map((status) => ({
    status,
    count: projects.filter((p) => p.status === status).length,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Progreso por Estado</h2>

      <div className="space-y-3">
        {counts.map(({ status, count }) => (
          <div key={status}>
            <span className="text-sm font-medium capitalize">
              {status}: {count}
            </span>

            <div className="w-full bg-gray-200 rounded h-3 mt-1">
              <div
                className="h-3 rounded"
                style={{
                  width: `${(count / total) * 100}%`,
                  background: STATUS_COLORS[status],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
