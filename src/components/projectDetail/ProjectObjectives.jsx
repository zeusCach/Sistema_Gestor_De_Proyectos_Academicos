import { Target } from "lucide-react";

/**
 * ProjectObjectives
 * Componente que muestra los objetivos del proyecto
 */
export const ProjectObjectives = ({ objectives }) => {
  // Si no hay objetivos, no renderizar nada
  if (!objectives || objectives.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header de la sección */}
      <div className="flex items-center gap-2 mb-4">
        <Target size={24} className="text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-900">Objetivos</h2>
      </div>
      
      {/* Lista de objetivos */}
      <ul className="space-y-3">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-slate-700">{objective}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};