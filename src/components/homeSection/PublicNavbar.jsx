import { GraduationCap, LogIn } from "lucide-react"; // Usamos Lucide para los iconos en React
import { Link } from "react-router-dom";
import Logo_isc from "../../assets/Logo_isc.png";

/**
 * PublicNavbar
 * Barra de navegación para la vista pública.
 * Incluye el logo y el botón de acceso al login administrativo.
 */
export const PublicNavbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* --- LOGO E IDENTIDAD --- */}
                    <div className="flex items-center gap-2">
                        
                            <img
                                src={Logo_isc}
                                alt="logo_isc"
                                className="w-[100px] h-[100px] object-contain"
                            />
                        
                        <div>
                            <h1 className="font-bold text-lg tracking-tight text-slate-900 leading-tight">
                                Sistema para seguimiento de proyectos
                            </h1>
                            <p className="text-xs text-slate-500 font-medium">Gestión Académica</p>
                        </div>
                    </div>

                    {/* --- MENÚ DESKTOP --- */}
                    <div className="hidden md:flex items-center space-x-25">
                        <a href="#" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">
                            Inicio
                        </a>
                        <a href="#proyectos" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">
                            Proyectos
                        </a>
                        
                    </div>

                    {/* --- BOTÓN DE LOGIN --- */}
                    <div>
                        <Link
                            to="/login"
                            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                        >
                            <LogIn size={18} />
                            <span>Acceso Administrativo</span>
                        </Link>
                    </div>


                </div>
            </div>
        </nav>
    );
};
