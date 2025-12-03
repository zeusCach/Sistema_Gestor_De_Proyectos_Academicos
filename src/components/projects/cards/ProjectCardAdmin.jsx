import { Calendar, Download, Edit2, Folder, Handshake, Microscope, MoreVertical, RefreshCw, Tag, Trash2 } from "lucide-react";
import { STATUS_OPTIONS } from "../constants/constants_proyects";
import { useState } from "react";
import { generateProjectPDF } from "../../../utils/pdfGenerator";

export const ProjectCardAdmin = ({ project, onEdit, onDelete, onChangeStatus }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statusColors = {
    'Vigente': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'En Curso': 'bg-amber-100 text-amber-800 border-amber-200',
    'Finalizado': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Pausado': 'bg-gray-100 text-gray-800 border-gray-200',
    'Rechazado': 'bg-red-100 text-red-800 border-red-200'
  };

  const handleDownloadPDF = (e) => {
    e.stopPropagation(); // Evita que se active el onClick de la tarjeta

    generateProjectPDF(project);
    setShowMenu(false);
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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full relative">
      
      {/* Menú de acciones*/}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <MoreVertical size={18} className="text-gray-600" />
        </button>
        
        {showMenu && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
              <button
                onClick={() => {
                  onEdit(project);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
              >
                <Edit2 size={16} />
                Editar
              </button>
              <button
                onClick={() => {
                  setShowStatusMenu(true);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
              >
                <RefreshCw size={16} />
                Cambiar Estado
              </button>
              <button
                onClick={() => {
                  onDelete(project);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
              >
                <Trash2 size={16} />
                Eliminar
              </button>

              {/* Botón de descargar PDF */}
            <button
              onClick={handleDownloadPDF}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-green-700"
            >
              <Download size={16} />
              Descargar PDF
            </button>
            </div>
          </>
        )}

        {/* Submenú de estados */}
        {showStatusMenu && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowStatusMenu(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b">
                Cambiar estado a:
              </div>
              {STATUS_OPTIONS.map(status => (
                <button
                  key={status}
                  onClick={() => {
                    onChangeStatus(project.project_id, status);
                    setShowStatusMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                    project.status === status ? 'font-semibold text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Contenido del card*/}
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3 pr-8">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            {getAreaIcon(project.area)}
            {project.area}
          </span>
          
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClass}`}>
            {project.status}
          </span>
        </div>
        
        <div className="mb-2">
          <span className="text-xs text-gray-500 font-mono">{project.folio}</span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl flex justify-between items-center text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>Inicio: {project.creation_date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag size={16} />
          <span>{project.type}</span>
        </div>
      </div>
    </div>
  );
}