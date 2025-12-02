import { useEffect, useState } from "react";
import { RecentProjects } from "./projects/RecentProjects";
import { StatCard } from "./statistics/card/StatCard";
import { CreateProjectForm } from "./formSection/CreateProjectForm";
import { useAuth } from "../context/AuthContext";
import { fetchProjects } from "../services/projectsService";

export const DashboardHome = () => {

  //hook de autenticacion del usuario
  const {user} = useAuth();

  //hooks que sincronizan los proyectos del usuario
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);


//Estado que controla la accion de mostrar el formulario del proyecto
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


  // Función para recargar proyectos después de crear uno nuevo
  const handleProjectCreated = async () => {
    setShowCreateForm(false);

    // Recargar proyectos
    try {
      const data = await fetchProjects(user.id);
      setProjects(data);
    } catch (err) {
      console.error("Error al recargar proyectos:", err);
    }
  };

   // Calcular estadísticas
  const stats = {
    total: projects.length,
    vigente: projects.filter(p => p.status === 'Vigente').length,
    enCurso: projects.filter(p => p.status === 'En Curso').length,
    pausado: projects.filter(p => p.status === 'Pausado').length,
    finalizado: projects.filter(p => p.status === 'Finalizado').length,
  };


   // Obtener los 5 proyectos más recientes
  const recentProjects = projects
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
            <p className="text-gray-600 mt-1">Bienvenido de nuevo, aquí está el resumen de tus proyectos</p>
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
              subtitle="Todos los tiempos" 
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


          {/* Tabla de proyectos */}
          <RecentProjects  projects={recentProjects}/>
        </div>
      )}
    </>
  );
};