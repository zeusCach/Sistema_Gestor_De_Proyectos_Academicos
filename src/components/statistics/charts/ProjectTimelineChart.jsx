import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const calculateDuration = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate - startDate;
  const days = Math.round(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0; // Asegurar que no haya valores negativos
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900 mb-1">{payload[0].payload.fullName}</p>
        <p className="text-xs text-gray-500 mb-2">Folio: {payload[0].payload.folio}</p>
        <p className="text-sm text-gray-600">
          Duración: <span className="font-bold text-blue-600">{payload[0].value} días</span>
        </p>
        <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
          <p>Inicio: {payload[0].payload.startDate}</p>
          <p>Fin: {payload[0].payload.endDate}</p>
        </div>
      </div>
    );
  }
  return null;
};

export const ProjectTimelineChart = ({ projects }) => {
  // Solo incluir proyectos con fechas válidas
  const chartData = projects
    .filter(p => p.creation_date && p.completion_date)
    .map((p) => {
      const duration = calculateDuration(p.creation_date, p.completion_date);
      return {
        name: p.folio,
        fullName: p.title,
        duration: duration,
        folio: p.folio,
        startDate: p.creation_date,
        endDate: p.completion_date,
      };
    })
    .filter(p => p.duration > 0) // Excluir proyectos sin duración válida
    .sort((a, b) => b.duration - a.duration) // Ordenar por duración
    .slice(0, 10); // Mostrar solo los 10 con mayor duración

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Duración de Proyectos</h2>
        <div className="text-center py-12 text-gray-500">
          No hay proyectos con fechas de inicio y finalización válidas
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold mb-2 text-gray-900">Duración de Proyectos (Top 10)</h2>
      <p className="text-sm text-gray-600 mb-4">Días entre fecha de creación y fecha de finalización</p>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            label={{ value: 'Días', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="duration" 
            fill="#3B82F6" 
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};