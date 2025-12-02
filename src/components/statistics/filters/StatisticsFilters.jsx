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
        <option value="Vigente">Vigente</option>
        <option value="En Curso">En curso</option>
        <option value="Pausado">Pausado</option>
        <option value="Finalizado">Finalizado</option>
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
