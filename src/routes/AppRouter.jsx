//Rutas

import { Route, Routes } from "react-router-dom";
import { LoginForm } from "../components/LoginForm.jsx";
import { RegisterForm } from "../components/RegisterForm.jsx";
import { Dashboard } from "../components/Dashboard.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { PublicHome } from "../components/PublicHome.jsx";

export const AppRouter = () => {
    return (
        <Routes>
            
            <Route path="/" element={<PublicHome />} />

            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />}></Route>
            <Route path="/PublicHome" element={<PublicHome/>}></Route>
            

            {/* Protejemos el dashboard con ProtectedRoute para que solo
             usuarios logueados pueden entrar al dashboard
             */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }></Route>
        </Routes>
    )
}
