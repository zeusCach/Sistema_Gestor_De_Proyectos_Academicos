import { Calendar, Tag } from "lucide-react";

export const RecentProjects = ({ projects }) => {
  const statusColors = {
    'Vigente': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'En Curso': 'bg-amber-100 text-amber-800 border-amber-200',
    'Finalizado': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Pausado': 'bg-gray-100 text-gray-800 border-gray-200',
  };

  if (projects.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No hay proyectos recientes
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Folio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Proyecto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Área
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Creación
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.project_id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-mono text-gray-900 font-medium">
                  {project.folio}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                  {project.title}
                </div>
                <div className="text-sm text-gray-500 max-w-xs truncate">
                  {project.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Tag size={14} />
                  {project.type}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  {project.area}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[project.status] || 'bg-gray-100 text-gray-800'}`}>
                  {project.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar size={14} />
                  {project.creation_date}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};