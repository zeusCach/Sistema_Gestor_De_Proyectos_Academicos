import { useState } from "react";
import { Navbar } from "./NavBar";
import { RecentProjects } from "./RecentProjects";
import { Sidebar } from "./SideBar";
import { StatCard } from "./StatCard";
import { useAuth } from "../context/AuthContext";
import { CreateProjectForm } from "./CreateProjectForm";

export const Dashboard = () => {

  //Estado que controla la accion de mostrar el formulario del proyecto
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [activeMenu] = useState('dashboard');
  const { user } = useAuth();//verificar el uso del estado

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="" />
      <Sidebar activeMenu={activeMenu} />
      <main className="ml-64 pt-16">
        {/* Si showCreateForm es TRUE muestra Formulario */}
        {showCreateForm ? (
          <div className="">
            <CreateProjectForm onClose={() => setShowCreateForm(false)} />
          </div>
        ) : (
          /* Si es FALSE muestra el dashboard completo */
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Bienvenido de nuevo, aquí está el resumen de tus proyectos</p>
            </div>

            {/* Botón destacado */}
            <div className="mb-8">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                onClick={() => setShowCreateForm(true)}
              >
                <span className="text-xl">➕</span>
                <span>Crear Nuevo Proyecto</span>
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard icon="" title="Total Proyectos" value="24" color="#3B82F6" subtitle="Todos los tiempos" />
              <StatCard icon="" title="Vigente" value="18" color="#10B981" />
              <StatCard icon="" title="En curso" value="4" color="#F59E0B" />
              <StatCard icon="" title="Pausado" value="2" color="#6B7280" />
              <StatCard icon="" title="Finalizado" value="18" color="#10B981" />
            </div>

            {/* Tabla de proyectos */}
            <RecentProjects />
          </div>
        )}
      </main>

    </div>
  );
};