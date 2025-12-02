import { useEffect, useState } from "react";
import { DeleteConfirmModal } from "./buttons/DeleteConfirmModal";
import { ProjectCardAdmin } from "./cards/ProjectCardAdmin";
import { ProjectFilters } from "./filters/ProjectFilters";
import { useAuth } from "../../context/AuthContext";
import { fetchProjects } from "../../services/projectsService";
import { useProjectActions } from "../../hooks/useProjectActions";
import { EditProjectForm } from "../formSection/EditProjectForm";


export const ProjectsView = () => {
  const { user } = useAuth();
  
  // ✅ NUEVO: Usar el hook para las acciones
  const { updateProject, deleteProject } = useProjectActions();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: ''
  });
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    if (!user) return;

    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjects(user.id);
        setProjects(data);
      } catch (err) {
        console.error("Error al cargar proyectos:", err);
        setError("No se pudieron cargar los proyectos. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [user]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.folio?.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.description?.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = !filters.status || project.status === filters.status;
    const matchesType = !filters.type || project.type === filters.type;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleEdit = (project) => {
    console.log('Abriendo modal de edición:', project); // Debug
    setEditingProject(project);
  };

  const handleProjectUpdated = (updatedProject) => {
    console.log('Proyecto actualizado:', updatedProject); // Debug
    setProjects(projects.map(p => 
      p.project_id === updatedProject.project_id ? updatedProject : p
    ));
  };

  const handleDelete = (project) => {
    setProjectToDelete(project);
  };

  const confirmDelete = async () => {
    try {
      const result = await deleteProject(projectToDelete.project_id);
      
      if (result.success) {
        setProjects(projects.filter(p => p.project_id !== projectToDelete.project_id));
        setProjectToDelete(null);
        alert("Proyecto eliminado exitosamente");
      } else {
        alert(`Error al eliminar: ${result.error}`);
      }
    } catch (err) {
      console.error("Error al eliminar proyecto:", err);
      alert("Error al eliminar el proyecto. Por favor, intenta de nuevo.");
    }
  };

  const handleChangeStatus = async (projectId, newStatus) => {
    try {
      const result = await updateProject(projectId, { status: newStatus });
      
      if (result.success) {
        setProjects(projects.map(p => 
          p.project_id === projectId ? { ...p, status: newStatus } : p
        ));
      } else {
        alert(`Error al cambiar estado: ${result.error}`);
      }
    } catch (err) {
      console.error("Error al cambiar el estado:", err);
      alert("Error al cambiar el estado del proyecto. Por favor, intenta de nuevo.");
    }
  };

  const clearFilters = () => {
    setFilters({ search: '', status: '', type: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mis Proyectos</h1>
        <p className="text-gray-600 mt-1">
          Gestiona y da seguimiento a todos tus proyectos académicos
        </p>
      </div>

      <ProjectFilters
        filters={filters} 
        onFilterChange={setFilters}
        onClear={clearFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
          <div className="text-sm text-gray-600">Total Proyectos</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-cyan-600">
            {projects.filter(p => p.status === 'Vigente').length}
          </div>
          <div className="text-sm text-gray-600">Vigentes</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-amber-600">
            {projects.filter(p => p.status === 'En Curso').length}
          </div>
          <div className="text-sm text-gray-600">En Curso</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-emerald-600">
            {projects.filter(p => p.status === 'Finalizado').length}
          </div>
          <div className="text-sm text-gray-600">Finalizados</div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">
            {filters.search || filters.status || filters.type 
              ? "No se encontraron proyectos con los filtros aplicados" 
              : "No tienes proyectos registrados"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCardAdmin
              key={project.project_id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onChangeStatus={handleChangeStatus}
            />
          ))}
        </div>
      )}

      {projectToDelete && (
        <DeleteConfirmModal
          project={projectToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setProjectToDelete(null)}
        />
      )}

      {/* Verifica que este modal se esté renderizando */}
      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onClose={() => {
            console.log('Cerrando modal'); // Debug
            setEditingProject(null);
          }}
          onProjectUpdated={handleProjectUpdated}
        />
      )}
    </div>
  );
};