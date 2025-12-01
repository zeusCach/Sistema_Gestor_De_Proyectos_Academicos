import supabase from "../db/supabase_client";

/**
 * Obtiene todos los proyectos de un usuario específico
 * @param {string} userId - ID del usuario autenticado
 * @returns {Promise<Array>} Array de proyectos
 */
export async function fetchProjects(userId) {
  try {
    console.log("Buscando proyectos para userId:", userId); // Debug
    
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("creation_date", { ascending: false }); // Ordena por fecha de creación

    if (error) {
      console.error("Error de Supabase:", error);
      throw error;
    }

    console.log("Proyectos encontrados:", data?.length); // Debug
    return data || [];
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    throw error;
  }
}

/**
 * Obtiene un proyecto específico por su ID
 * @param {number} projectId - ID del proyecto
 * @param {string} userId - ID del usuario (para verificar permisos)
 * @returns {Promise<Object>} Objeto del proyecto
 */
export async function fetchProjectById(projectId, userId) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error al obtener proyecto:", error);
    throw error;
  }
}

/**
 * Busca proyectos por término de búsqueda
 * @param {string} userId - ID del usuario
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Promise<Array>} Array de proyectos que coinciden
 */
export async function searchProjects(userId, searchTerm) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .or(`title.ilike.%${searchTerm}%,folio.ilike.%${searchTerm}%`)
      .order("creation_date", { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error al buscar proyectos:", error);
    throw error;
  }
}

/**
 * Filtra proyectos por estado, tipo o área
 * @param {string} userId - ID del usuario
 * @param {Object} filters - Objeto con filtros { status, type, area }
 * @returns {Promise<Array>} Array de proyectos filtrados
 */
export async function filterProjects(userId, filters) {
  try {
    let query = supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId);

    if (filters.status) {
      query = query.eq("status", filters.status);
    }

    if (filters.type) {
      query = query.eq("type", filters.type);
    }

    if (filters.area) {
      query = query.eq("area", filters.area);
    }

    const { data, error } = await query.order("creation_date", { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error al filtrar proyectos:", error);
    throw error;
  }
}