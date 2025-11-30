import { Calendar, Tag, Microscope, Handshake, Download, Award } from "lucide-react";

/**
 * ProjectInfo
 * Componente con la información principal del proyecto
 */
export const ProjectInfo = ({ project, onDownloadPDF }) => {
  const statusColors = {
    'Vigente': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'En Curso': 'bg-amber-100 text-amber-800 border-amber-200',
    'Finalizado': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Pausado': 'bg-gray-100 text-gray-800 border-gray-200',
    'Rechazado': 'bg-red-100 text-red-800 border-red-200'
  };

  const badgeClass = statusColors[project.status] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Header con badges y botón de descarga */}
      <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          {/* Badge de área */}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
            {project.area === 'Investigación' ? <Microscope size={16} /> : <Handshake size={16} />}
            {project.area}
          </span>
          
          {/* Badge de estado */}
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${badgeClass}`}>
            {project.status}
          </span>
        </div>
        
        {/* Botón descargar PDF */}
        <button
          onClick={onDownloadPDF}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium shadow-md hover:shadow-lg"
        >
          <Download size={20} />
          Descargar PDF
        </button>
      </div>

      {/* Título del proyecto */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4">
        {project.title}
      </h1>

      {/* Metadatos del proyecto */}
      <div className="flex flex-wrap gap-6 text-sm text-slate-600 mb-6">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-blue-600" />
          <span><strong>Fecha de inicio:</strong> {project.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={18} className="text-blue-600" />
          <span><strong>Tipo:</strong> {project.type}</span>
        </div>
        {project.duration && (
          <div className="flex items-center gap-2">
            <Award size={18} className="text-blue-600" />
            <span><strong>Duración:</strong> {project.duration}</span>
          </div>
        )}
      </div>

      {/* Descripción completa */}
      <p className="text-slate-700 text-lg leading-relaxed">
        {project.fullDescription || project.description}
      </p>
    </div>
  );
};