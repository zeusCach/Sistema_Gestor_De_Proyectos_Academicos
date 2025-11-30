import { Calendar, Tag, Microscope, Handshake, Folder } from "lucide-react";

/**
 * ProjectCard
 * Renderiza la información de un solo proyecto.
 * Recibe el objeto 'project' completo como prop y onClick para manejar el click
 */
export const ProjectCard = ({ project, onClick }) => {
  
  const statusColors = {
    'Vigente': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'En Curso': 'bg-amber-100 text-amber-800 border-amber-200',
    'Finalizado': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Pausado': 'bg-gray-100 text-gray-800 border-gray-200',
    'Rechazado': 'bg-red-100 text-red-800 border-red-200'
  };

  const getAreaIcon = (area) => {
    switch(area) {
      case 'Investigación': return <Microscope size={14} />;
      case 'Vinculación': return <Handshake size={14} />;
      default: return <Folder size={14} />;
    }
  };

  const badgeClass = statusColors[project.status] || 'bg-gray-100 text-gray-800';

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full cursor-pointer"
    >
      
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            {getAreaIcon(project.area)}
            {project.area}
          </span>
          
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClass}`}>
            {project.status}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl flex justify-between items-center text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>Inicio: {project.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag size={16} />
          <span>{project.type}</span>
        </div>
      </div>
    </div>
  );
};