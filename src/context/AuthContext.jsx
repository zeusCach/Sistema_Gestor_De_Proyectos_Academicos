import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../db/supabase_client";



export const AuthContext = createContext();


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


        getSession();



        // Escucha cambios (login, logout, refresh)
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                // si existe una sesion devuelve el usuario
                setUser(session?.user || null);
            });

        // Limpieza del listener
        return () => listener.subscription.unsubscribe();
    }, []);


    const logoutUser = async () => {
        await supabase.auth.signOut();
        //Modificamos el estado del usuario, pasa a null para cerrar sesion
        setUser(null)
    }

    return (

        //parte central del sistema de autenticación.
        <AuthContext.Provider value={{ user, loading, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )

}


// Hook para usar el contexto más fácil
export const useAuth = () => {
    const context = useContext(AuthContext);
    
    // Validación para prevenir uso fuera del Provider
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    
    return context;
};