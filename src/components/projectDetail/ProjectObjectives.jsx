import { Target } from "lucide-react";

/**
 * ProjectObjectives
 * Componente que muestra los objetivos del proyecto
 */
export const ProjectObjectives = ({ objectives, generalObjective }) => {
  // Si no hay objetivos, no renderizar nada
  if (!objectives || objectives.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header de la sección */}
      <div className="flex items-center gap-2 mb-4">
        <Target size={24} className="text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-900">Objetivos del Proyecto</h2>
      </div>
      
      {/* Objetivo General */}
      {generalObjective && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-blue-600 uppercase mb-3">
            Objetivo General
          </h3>
          <p className="text-slate-700 leading-relaxed text-base">
            {generalObjective}
          </p>
        </div>
      )}
      
      {/* Objetivos Específicos */}
      {objectives.length > 1 && (
        <>
          <h3 className="text-sm font-semibold text-blue-600 uppercase mb-3">
            Objetivos Específicos
          </h3>
          <ul className="space-y-3">
            {objectives.slice(1).map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-semibold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-slate-700 leading-relaxed">{objective}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};