import { useEffect, useState } from "react";
import { DeleteConfirmModal } from "./buttons/DeleteConfirmModal";
import { ProjectCardAdmin } from "./cards/ProjectCardAdmin";
import { ProjectFilters } from "./filters/ProjectFilters";
import { MOCK_PROJECTS } from "./constants/constants_proyects";
import { useAuth } from "../../context/AuthContext";
import { fetchProjects } from "../../services/projectsService";

export const ProjectsView = () => {
  

  //estado de autenticacion de usuario
  const {user} = useAuth();

  //Estado que inicializa nuestros projects
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: ''
  });
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  
  useEffect(() => {
    if(!user) return;

    const loadProjects = async () => {
      try {
                const data = await fetchProjects(user.id);
                setProjects(data);
            } catch (err) {
                console.error("Error al cargar proyectos:", err);
            } finally {
                setLoading(false);
            }

    }

    loadProjects();

  }, [user]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.folio.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = !filters.status || project.status === filters.status;
    const matchesType = !filters.type || project.type === filters.type;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleEdit = (project) => {
    setEditingProject(project);
    console.log('Editar:', project);
  };

  const handleDelete = (project) => {
    setProjectToDelete(project);
  };

  const confirmDelete = async () => {
    // TÚ: Aquí harías el delete en Supabase
    setProjects(projects.filter(p => p.id !== projectToDelete.id));
    setProjectToDelete(null);
  };

  const handleChangeStatus = async (projectId, newStatus) => {
    // TÚ: Aquí actualizarías el estado en Supabase
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, status: newStatus } : p
    ));
  };

  const clearFilters = () => {
    setFilters({ search: '', status: '', type: '' });
  };

   if (loading) return <p>Cargando proyectos...</p>;

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
          <p className="text-gray-500">No se encontraron proyectos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCardAdmin
              key={project.id}
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
    </div>
  );
};