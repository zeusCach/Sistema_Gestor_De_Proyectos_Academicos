export const RecentProjects = () => {
  const projects = [
    { id: 'PROY-001', name: 'Sistema de gestión académica', status: 'aprobado', date: '2024-11-20' },
    { id: 'PROY-002', name: 'Plataforma e-learning', status: 're', date: '2024-11-18' },
    { id: 'PROY-003', name: 'App móvil educativa', status: 'borrador', date: '2024-11-15' },
  ];

  const statusColors = {
    vigente: 'bg-green-100 text-green-800',
    enCurso: 'bg-yellow-100 text-yellow-800',
    pausado: 'bg-gray-100 text-gray-800',
    finalizado:'bg-yellow-100 text-yellow-800'
  };

  const statusLabels = {
    vigente: 'Vigente',
    enCurso: 'En curso',
    pausado: 'Pausado',
    finalizado: 'Finalizado'

  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Proyectos Recientes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Folio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{project.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[project.status]}`}>
                    {statusLabels[project.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{project.date}</td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 font-medium mr-3">Ver</button>
                  <button className="text-gray-600 hover:text-gray-800 font-medium">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};