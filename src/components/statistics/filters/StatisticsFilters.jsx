export const StatisticsFilters = ({
  status,
  search,
  selectedDate,
  setStatus,
  setSearch,
  setSelectedDate,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4">
      <input
        type="text"
        placeholder="Buscar proyecto..."
        className="border px-3 py-2 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border px-3 py-2 rounded w-full"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Todos los estados</option>
        <option value="planning">Planificación</option>
        <option value="in-progress">En progreso</option>
        <option value="completed">Completado</option>
      </select>

      <input
        type="date"
        className="border px-3 py-2 rounded w-full"
        value={selectedDate || ""}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>
  );
};
