import { supabase } from "../db/supabase_client"

//funcion asincrona que registrara usuarios publicadores
const registerUser = async ({ name, email, password, institution, phone_number }) => {

    const { data: authData, error: authError } = await supabase.auth.singUp({
        email: email,
        password: password
    });

    if (authError) return { error: authError };

    const userId = authData.user?.id;
    if (!userId) return { error: "No se pudo obtener el ID del usuario." };

    const { error: dbError } = await supabase.from("users").insert([{
        user_id: userId,
        name,
        email,
        institution,
        phone_number,
        user_type_id: 1
    }]);

    if(dbError) return {error: errorDb}

    return {success: true}
}