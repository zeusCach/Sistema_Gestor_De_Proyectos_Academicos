import { GraduationCap, LogIn } from "lucide-react"; // Usamos Lucide para los iconos en React

/**
 * PublicNavbar
 * Barra de navegación para la vista pública.
 * Incluye el logo y el botón de acceso al login administrativo.
 */
export const PublicNavbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* --- LOGO E IDENTIDAD --- */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-slate-900 leading-tight">
                Sistema Gestor de Proyectos
              </h1>
              <p className="text-xs text-slate-500 font-medium">Gestión Académica</p>
            </div>
          </div>

          {/* --- MENÚ DESKTOP --- */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">
              Inicio
            </a>
            <a href="#proyectos" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">
              Explorar
            </a>
            <a href="#estadisticas" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">
              Estadísticas
            </a>
          </div>

          {/* --- BOTÓN DE LOGIN --- */}
          <div>
            <a 
              href="/login" // En una app real usarías <Link to="/login">
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <LogIn size={18} />
              <span>Acceso Administrativo</span>
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};