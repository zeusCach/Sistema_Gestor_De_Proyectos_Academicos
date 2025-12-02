import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = ({ activeMenu }) => {

  const location = useLocation();

  const { logoutUser } = useContext(AuthContext);

   const menuItems = [
    { icon: '🏠', label: 'Dashboard', id: 'dashboard', path: '/dashboard' },
    { icon: '📁', label: 'Mis Proyectos', id: 'proyectos', path: '/dashboard/proyectos' },
    { icon: '📊', label: 'Estadísticas', id: 'estadisticas', path: '/dashboard/estadisticas' },
    { icon: '⚙️', label: 'Configuración', id: 'configuracion', path: '/dashboard/configuracion' },
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
            <Link
              key={item.id}
              to={`${item.path}`}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-800'
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-20 left-4 right-4">

          <Link to="/home" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-red-600 transition-colors">
            <span className="font-medium" onClick={logoutUser}>Cerrar Sesión</span>
          </Link>
          
        </div>
      </div>
    </aside>
  );
};