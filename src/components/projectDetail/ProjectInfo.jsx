import { Calendar, Tag, Microscope, Handshake, Download, FileText, CheckCircle, User, Mail, Building2 } from "lucide-react";

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

          {/* Badge de tipo */}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <Tag size={16} />
            {project.type}
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
      <h1 className="text-4xl font-bold text-slate-900 mb-6">
        {project.title}
      </h1>

      {/* INFORMACIÓN DEL RESPONSABLE - DESTACADA */}
      {(project.creator || project.creatorEmail || project.institution) && (
        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-600">
          <h3 className="text-sm font-bold text-blue-900 uppercase mb-4 flex items-center gap-2">
            <User size={20} className="text-blue-600" />
            Responsable del Proyecto
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nombre */}
            {project.creator && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <User size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium uppercase">Nombre</p>
                  <p className="text-slate-900 font-bold text-lg">{project.creator}</p>
                </div>
              </div>
            )}
            
            {/* Email */}
            {project.creatorEmail && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium uppercase">Correo</p>
                  <a 
                    href={`mailto:${project.creatorEmail}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                  >
                    {project.creatorEmail}
                  </a>
                </div>
              </div>
            )}
            
            {/* Institución */}
            {project.institution && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Building2 size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium uppercase">Institución</p>
                  <p className="text-slate-900 font-bold">{project.institution}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Metadatos del proyecto */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
        {/* Folio */}
        {project.folio && (
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-blue-600" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Folio</p>
              <p className="text-sm font-semibold text-slate-900">{project.folio}</p>
            </div>
          </div>
        )}
        
        {/* Fecha de inicio */}
        {project.date && (
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Fecha de inicio</p>
              <p className="text-sm font-semibold text-slate-900">{project.date}</p>
            </div>
          </div>
        )}
        
        {/* Fecha de finalización */}
        {project.endDate && (
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Fecha de finalización</p>
              <p className="text-sm font-semibold text-slate-900">{project.endDate}</p>
            </div>
          </div>
        )}

        {/* Duración (si existe) */}
        {project.duration && (
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-purple-600" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Duración</p>
              <p className="text-sm font-semibold text-slate-900">{project.duration}</p>
            </div>
          </div>
        )}
      </div>

      {/* Descripción completa */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Descripción del Proyecto</h2>
        <p className="text-slate-700 text-base leading-relaxed">
          {project.fullDescription || project.description}
        </p>
      </div>
    </div>
  );
}