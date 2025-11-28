import { useState, useEffect, useMemo } from "react";
import { Search, FolderOpen } from "lucide-react";
import { PublicNavbar } from "./PublicNavbar";
import { HeroStats } from "./HeroStats";
import { ProjectCard } from "./ProjectCard";
import { useProjects } from "../hooks/useProjects";

/**
 * PublicHome
 * Componente principal (Page) que maneja toda la lógica de la vista pública.
 * Aquí reside el estado de los datos, los filtros y el cálculo de estadísticas.
 */
export const PublicHome = () => {
  
  // 1. ESTADO: Datos de proyectos LLamando al Hook
  const { projects, loading, error } = useProjects();
  

  
  // 2. ESTADO: Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // 3. LÓGICA: Filtrado de proyectos
  // Usamos useMemo para que esto solo se recalcule si cambian los filtros o los datos
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = areaFilter === 'all' || project.area === areaFilter;
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

      return matchesSearch && matchesArea && matchesStatus;
    });
  }, [projects, searchTerm, areaFilter, statusFilter]);

  // 4. LÓGICA: Cálculo de estadísticas
  // También memorizado para eficiencia
  const stats = useMemo(() => {
    return {
      total: projects.length,
      vigentes: projects.filter(p => p.status === 'Vigente').length,
      enCurso: projects.filter(p => p.status === 'En Curso').length,
      finalizados: projects.filter(p => p.status === 'Finalizado').length,
    };
  }, [projects]);


  return (
    <div className="bg-gray-50 text-slate-800 min-h-screen font-sans">
      
      {/* Componente Navbar */}
      <PublicNavbar />

      {/* Componente Hero con Stats */}
      <HeroStats stats={stats} />

      {/* --- SECCIÓN PRINCIPAL --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="proyectos">
        
        {/* Barra de Herramientas (Filtros) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-20 z-40">
          
          {/* Buscador */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por título..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-shadow"
            />
          </div>

          {/* Selects de Filtro */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
            <select 
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="all">Todas las Áreas</option>
              <option value="Investigación">Investigación</option>
              <option value="Vinculación">Vinculación</option>
            </select>

            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="all">Todos los Estados</option>
              <option value="Vigente">Vigente</option>
              <option value="En Curso">En Curso</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Pausado">Pausado</option>
            </select>
          </div>
        </div>

        {/* --- GRID DE RESULTADOS --- */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          // Estado Vacío
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FolderOpen size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No se encontraron proyectos</h3>
            <p className="text-gray-500 mt-1">Intenta ajustar los filtros o la búsqueda.</p>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2024 Universidad - Sistema de Gestión de Proyectos Académicos.</p>
        </div>
      </footer>

    </div>
  );
};