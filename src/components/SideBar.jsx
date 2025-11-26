export const Sidebar = ({ activeMenu }) => {
  const menuItems = [
    { icon: '🏠', label: 'Dashboard', id: 'dashboard' },
    { icon: '📁', label: 'Mis Proyectos', id: 'proyectos' },
    { icon: '➕', label: 'Nuevo Proyecto', id: 'nuevo' },
    { icon: '📊', label: 'Estadísticas', id: 'estadisticas' },
    { icon: '⚙️', label: 'Configuración', id: 'configuracion' },
  ];

  return (
    <aside className="fixed left-0 top-16 h-full w-64 bg-[#1A386A] text-white">
      <div className="p-4">
        <div className="mb-8">
          <p className="text-sm text-blue-300">Panel de Control</p>
          <p className="text-xs text-blue-400 mt-1">Publicador</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === item.id
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
        
        <div className="absolute bottom-20 left-4 right-4">
          <a
            href="#logout"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-red-600 transition-colors"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Cerrar Sesión</span>
          </a>
        </div>
      </div>
    </aside>
  );
};