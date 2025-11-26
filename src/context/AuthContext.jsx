import { createContext, useEffect, useState } from "react";
import supabase from "../db/supabase_client";



const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    // Guarda al usuario actual
    const [user, setUser] = useState(null);

    // Evita parpadeos mientras se carga la sesión
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getSession = async () => {

            const { data } = await supabase.auth.getSession();
            
            //Si existe un usuario logueado devuelve ese usuario si no regresa undefined(null)
            setUser(data?.session?.user || null);
            setLoading(false);
        }

        
    // Escucha cambios (login, logout, refresh)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // si existe una sesion devuelve el usuario
        setUser(session?.user || null);
      });

    // Limpieza del listener
    return () => listener.subscription.unsubscribe();
    },[]);

    return(

        //parte central del sistema de autenticación.
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

// Hook para usar el contexto más fácil
export const useAuth = () => useContext(AuthContext);