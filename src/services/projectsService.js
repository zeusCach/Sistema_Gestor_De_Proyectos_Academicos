import supabase from "../db/supabase_client";

//Obtiene proyectos del asesor logueado

export const fetchProjects = async (registered_by_user_id) => {
    const {data, error} = await supabase
    .from("projects")
    .select("*")
    .eq("id", registered_by_user_id)
    .order("created_at", {ascending: false})


    if(error) throw error;
    return data;
}

//Actualizar Proyecto
export const updateProject = async (project_id, updates) => {
    const {data, error} = await supabase
    .from("projects")
    .update(updates)
    .eq("id", project_id)
    .select();

    if (error) throw error;
    return data[0];
}

//Eliminar Proyecto

export const deleteProjects = async (project_id) => {
    const {error} = await supabase
    .from("projects")
    .delete()
    .eq("id", project_id)

    if(error) throw error;
    return true;
}