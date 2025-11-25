import { supabase } from "../db/supabase_client"

//funcion asincrona que registrara usuarios publicadores
export async function registerUser ({ name, email, password, institution, phone_number }) {

    //crea autenticacion con supabase por medio de el email y el password
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    //si existe un error en autenticacion de usuario falla dando error
    if (authError) return { error: authError };

    //Obtiene el usuario ID, verifica si existe en authData
    const userId = authData.user?.id;

    //Si no existe nos devuelve el error
    if (!userId) return { error: "No se pudo obtener el ID del usuario." };

    //Insertamos los datos capturados en el form a nuestra tabla users
    const { error: dbError } = await supabase.from("users").insert([{
        user_id: userId,
        name,
        email,
        institution,
        phone_number,
        user_type_id: null
    }]);

    // si existe un error en la insercion de los datos, devuelve el error
    if(dbError) return {error: dbError}

    //succes: true, si los datos se insertan correctamente
    return {success: true}
}