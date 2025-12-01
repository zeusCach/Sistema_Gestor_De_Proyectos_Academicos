import { DollarSign, Users, Clock, FileText } from "lucide-react";

/**
 * ProjectAdditionalInfo
 * Componente que muestra información adicional del proyecto
 */
export const ProjectAdditionalInfo = ({ collaborators, folio, duration }) => {
  // Si no hay ninguna información, no mostrar el componente
  if (!collaborators && !folio && !duration) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Información Adicional
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Folio */}
        {folio && (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-1 uppercase">
                Folio del Proyecto
              </h3>
              <p className="text-slate-900 text-xl font-bold">
                {folio}
              </p>
            </div>
          </div>
        )}
        
        {/* Duración */}
        {duration && (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Clock size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-1 uppercase">
                Duración
              </h3>
              <p className="text-slate-900 text-lg font-semibold">
                {duration}
              </p>
            </div>
          </div>
        )}
        
        {/* Colaboradores */}
        {collaborators && (
          <div className="md:col-span-2 flex items-start gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users size={24} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-slate-600 mb-2 uppercase">
                Colaboradores del Proyecto
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {collaborators}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};