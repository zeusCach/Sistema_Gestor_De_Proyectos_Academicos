import { useFilteredProjects } from "../../hooks/useFilteredProjects.js";
import { useProjectMetrics } from "../../hooks/useProjectMetrics";
import { StatisticsFilters } from "./filters/StatisticsFilters";
import { ProjectStatusChart } from "./charts/ProjectStatusChart";
import { ProjectTimelineChart } from "./charts/ProjectTimelineChart";
import { StatusProgressBars } from "./charts/StatusProgressBars";
import { MetricCard } from "./metrics/MetricCard";

export const StatisticsView = () => {
  const { filteredProjects, status, search, selectedDate, setStatus, setSearch, setSelectedDate } =
    useFilteredProjects();

  const { metrics } = useProjectMetrics(filteredProjects);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Estadísticas de Proyectos</h1>

      <StatisticsFilters
        status={status}
        search={search}
        selectedDate={selectedDate}
        setStatus={setStatus}
        setSearch={setSearch}
        setSelectedDate={setSelectedDate}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Total Proyectos" value={metrics.total} />
        <MetricCard title="Promedio Duración (días)" value={metrics.avgDuration} />
        <MetricCard title="Completados" value={metrics.completed} />
      </div>

      <ProjectStatusChart projects={filteredProjects} />
      <ProjectTimelineChart projects={filteredProjects} />
      <StatusProgressBars projects={filteredProjects} />
    </div>
  );
};
