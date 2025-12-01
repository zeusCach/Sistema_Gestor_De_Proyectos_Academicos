import { STATUS_COLORS } from '../constants/constants';

export const StatusProgressBars = ({ projects }) => {
  const total = projects.length;

  if (total === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Progreso por Estado</h2>
        <div className="text-center py-12 text-gray-500">
          No hay proyectos para mostrar
        </div>
      </div>
    );
  }

  const counts = Object.keys(STATUS_COLORS).map((status) => ({
    status,
    count: projects.filter((p) => p.status === status).length,
    percentage: ((projects.filter((p) => p.status === status).length / total) * 100).toFixed(1),
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-gray-900">Progreso por Estado</h2>

      <div className="space-y-4">
        {counts.map(({ status, count, percentage }) => (
          <div key={status}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">
                {status}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {count} ({percentage}%)
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                style={{
                  width: `${percentage}%`,
                  background: STATUS_COLORS[status],
                }}
              >
                {parseFloat(percentage) > 15 && (
                  <span className="text-xs font-semibold text-white">
                    {percentage}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">Total de proyectos:</span>
          <span className="font-bold text-gray-900">{total}</span>
        </div>
      </div>
    </div>
  );
};