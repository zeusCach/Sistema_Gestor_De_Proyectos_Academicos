import { Users } from "lucide-react";

/**
 * ProjectTeam
 * Componente que muestra el equipo de trabajo del proyecto
 */
export const ProjectTeam = ({ team }) => {
  // Si no hay equipo, no renderizar nada
  if (!team || team.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header de la sección */}
      <div className="flex items-center gap-2 mb-4">
        <Users size={24} className="text-green-600" />
        <h2 className="text-2xl font-bold text-slate-900">Equipo de Trabajo</h2>
      </div>
      
      {/* Lista de miembros del equipo */}
      <ul className="space-y-3">
        {team.map((member, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-slate-700">{member}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};