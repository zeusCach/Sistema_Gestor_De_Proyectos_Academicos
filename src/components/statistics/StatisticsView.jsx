import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchProjects } from "../../services/projectsService";
import { useFilteredProjects } from "../../hooks/useFilteredProjects.js";
import { useProjectMetrics } from "../../hooks/useProjectMetrics";
import { StatisticsFilters } from "./filters/StatisticsFilters";
import { ProjectStatusChart } from "./charts/ProjectStatusChart";
import { ProjectTimelineChart } from "./charts/ProjectTimelineChart";
import { StatusProgressBars } from "./charts/StatusProgressBars";
import { MetricCard } from "./metrics/MetricCard";

export const StatisticsView = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar proyectos del usuario autenticado
  useEffect(() => {
    if (!user) return;

    const loadProjects = async () => {
      try {
        const data = await fetchProjects(user.id);
        setProjects(data);
      } catch (err) {
        console.error("Error al cargar proyectos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [user]);

  // Hook para filtrar proyectos (pasamos los proyectos del usuario)
  const { filteredProjects, status, search, selectedDate, setStatus, setSearch, setSelectedDate } =
    useFilteredProjects(projects);

  // Hook para calcular métricas sobre proyectos filtrados
  const { metrics } = useProjectMetrics(filteredProjects);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">Cargando estadísticas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Estadísticas de Proyectos</h1>
        <p className="text-gray-600 mt-1">
          Análisis detallado de tus {projects.length} proyectos
        </p>
      </div>

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
        <MetricCard title="Completados" value={metrics.completed} />
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No se encontraron proyectos con estos filtros</p>
        </div>
      ) : (
        <>
          <ProjectStatusChart projects={filteredProjects} />
          <ProjectTimelineChart projects={filteredProjects} />
          <StatusProgressBars projects={filteredProjects} />
        </>
      )}
    </div>
  );
};