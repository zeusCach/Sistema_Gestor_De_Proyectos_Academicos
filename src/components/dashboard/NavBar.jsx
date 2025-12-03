import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getProfilePhoto } from "../../services/profileService";
import Logo_isc from "../../assets/Logo_isc.png"; // CORRECTO
import logo_TecNM from "../../assets/Logo_TecNM.png"; // CORRECTO
import logo_educacion from "../../assets/logo_educacion.png"; // CORRECTO
import { NotificationsDropdown } from "../notifications/NotificationsDropdown";
import { useSearch } from "../../context/SearchContext";

export const Navbar = ({ userName = "Zeus" }) => {

  //Hook que controla acceso a permisos del usuario
  const { user } = useAuth()

  const { searchTerm, setSearchTerm } = useSearch(); // Usa el hook de búsqueda

  const userId = user?.id; //si existe un usuario actual, guardalo

  //estado que maneja accion de mostrar imagen
  const [profilePhoto, setProfilePhoto] = useState(null)

  useEffect(() => {

    if (!userId) return; // si es diferente a la autenticacion del usuario o si no existe retorna nullo

    // 1. Cargar imagen inicial
    const photo = getProfilePhoto(userId);
    setProfilePhoto(photo);

    // 2. Escuchar cambios en tiempo real
    function handlePhotoUpdated(e) {
      if (e.detail.userId === userId) {
        setProfilePhoto(e.detail.photoBase64);
      }
    }

    window.addEventListener("profilePhotoUpdated", handlePhotoUpdated);

    return () => {
      window.removeEventListener("profilePhotoUpdated", handlePhotoUpdated);
    };

  }, [userId])

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10 top-0">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18">

          {/* Logos institucionales */}
          <div className="flex items-center gap-6">
            {/* Logo 1 - Instituto Tecnológico Felipe Carrillo Puerto */}
            <img
              src={logo_TecNM}
              alt="Instituto Tecnológico Felipe Carrillo Puerto"
              className="h-18 object-contain"
            />

            {/* Logo 2 - SEP */}
            <img
              src={logo_educacion}
              alt="Secretaría de Educación Pública"
              className="h-18 object-contain"
            />

            {/* Logo 3 - Ingeniería en Sistemas */}
            <img
              src={Logo_isc}
              alt="Ingeniería en Sistemas Computacionales"
              className="h-18 object-contain"
            />
          </div>


          <div className="flex items-center space-x-4">
            {/* Buscador */}
            <div className="hidden md:block">
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>

            {/* Notificaciones */}
            <NotificationsDropdown />

            {/* Avatar y nombre */}
            <div className="flex items-center space-x-3">


              {

                profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Perfil"
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {userName.charAt(0)}
                  </div>
                )}
              <span className="hidden md:block text-sm font-medium text-gray-700">{userName}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}