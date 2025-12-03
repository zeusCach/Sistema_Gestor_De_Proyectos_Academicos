import { useEffect, useState } from "react";
import { RecentProjects } from "./projects/RecentProjects";
import { StatCard } from "./statistics/card/StatCard";
import { CreateProjectForm } from "./formSection/CreateProjectForm";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext"; // Importa el hook
import { fetchProjects } from "../services/projectsService";

export const DashboardHome = () => {
  const { user } = useAuth();
  const { searchTerm } = useSearch(); // Obtén el término de búsqueda
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

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

  const handleProjectCreated = async () => {
    setShowCreateForm(false);

    try {
      const data = await fetchProjects(user.id);
      setProjects(data);
    } catch (err) {
      console.error("Error al recargar proyectos:", err);
    }
  };

  // FILTRAR PROYECTOS SEGÚN BÚSQUEDA
  const filteredProjects = projects.filter(project => {
    if (!searchTerm) return true; // Si no hay búsqueda, mostrar todos
    
    const searchLower = searchTerm.toLowerCase();
    return (
      project.title?.toLowerCase().includes(searchLower) ||
      project.folio?.toLowerCase().includes(searchLower) ||
      project.description?.toLowerCase().includes(searchLower) ||
      project.type?.toLowerCase().includes(searchLower) ||
      project.area?.toLowerCase().includes(searchLower)
    );
  });

  // Calcular estadísticas con proyectos filtrados
  const stats = {
    total: filteredProjects.length,
    vigente: filteredProjects.filter(p => p.status === 'Vigente').length,
    enCurso: filteredProjects.filter(p => p.status === 'En Curso').length,
    pausado: filteredProjects.filter(p => p.status === 'Pausado').length,
    finalizado: filteredProjects.filter(p => p.status === 'Finalizado').length,
  };

  // Obtener los 5 proyectos más recientes (filtrados)
  const recentProjects = filteredProjects
    .sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <>
      {showCreateForm ? (
        <div className="">
          <CreateProjectForm onClose={handleProjectCreated} />
        </div>
      ) : (
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Bienvenido de nuevo, aquí está el resumen de tus proyectos
            </p>
            
            {/* Mostrar si hay búsqueda activa */}
            {searchTerm && (
              <p className="text-sm text-blue-600 mt-2">
                Mostrando resultados para: "<strong>{searchTerm}</strong>"
              </p>
            )}
          </div>

          {/* Botón destacado */}
          <div className="mb-8">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
              onClick={() => setShowCreateForm(true)}
            >
              <span className="text-xl">➕</span>
              <span>Crear Nuevo Proyecto</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <StatCard 
              title="Total Proyectos" 
              value={stats.total} 
              color="#3B82F6" 
              subtitle={searchTerm ? "Filtrados" : "Todos los tiempos"} 
            />
            <StatCard 
              title="Vigente" 
              value={stats.vigente} 
              color="#06B6D4" 
            />
            <StatCard 
              title="En Curso" 
              value={stats.enCurso} 
              color="#F59E0B" 
            />
            <StatCard 
              title="Pausado" 
              value={stats.pausado} 
              color="#6B7280" 
            />
            <StatCard 
              title="Finalizado" 
              value={stats.finalizado} 
              color="#10B981" 
            />
          </div>

          {/* Mensaje si no hay resultados */}
          {filteredProjects.length === 0 && searchTerm && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 mb-8">
              <p className="text-gray-500">
                No se encontraron proyectos que coincidan con "<strong>{searchTerm}</strong>"
              </p>
            </div>
          )}

          {/* Tabla de proyectos */}
          {filteredProjects.length > 0 && (
            <RecentProjects projects={recentProjects} />
          )}
        </div>
      )}
    </>
  );
};
