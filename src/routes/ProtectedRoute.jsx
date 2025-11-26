// Redirige al login si no hay sesión activa
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Evita que aparezca "parpadeo" mientras carga
  if (loading) return <p>Cargando...</p>;

  // Si no hay sesion manda al login
  if (!user) return <Navigate to="/login" />;

  // Si esta autenticado → deja pasar
  return children;
};
