//Rutas

import { Route, Routes, Navigate  } from "react-router-dom";
import { LoginForm } from "../components/LoginForm.jsx";
import { RegisterForm } from "../components/RegisterForm.jsx";
import { Dashboard } from "../components/Dashboard.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { PublicHome } from "../components/PublicHome.jsx";
import { StatisticsView } from "../components/statistics/StatisticsView.jsx";
import { DashboardHome } from '../components/DashboardHome';
import { ProjectsView } from "../components/projects/ProjectsView.jsx";
import {ProjectDetailView} from "../components/projectDetail/ProjectDetailView.jsx"

export const AppRouter = () => {
    return (
        <Routes>

            {/* Ruta raíz - redirige al dashboard */}
            <Route path="/" element={<Navigate to="/home" replace />} />


            {/* Rutas públicas */}
            <Route path="/home" element={<PublicHome />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/projectDetail" element={<ProjectDetailView />} />


            {/* Dashboard con rutas anidadas protegidas */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                {/* Rutas anidadas dentro del Dashboard */}
                <Route index element={<DashboardHome />} />
                <Route path="estadisticas" element={<StatisticsView />} />
                <Route path="proyectos" element={<ProjectsView/>} />
                {/* <Route path="configuracion" element={<Configuracion />} /> */}
            </Route>
        </Routes>
    )
}
