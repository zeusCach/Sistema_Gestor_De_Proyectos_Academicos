import supabase from "./supabase_client";

/**
 * Obtiene todos los proyectos públicos (no borradores)
 * Formato adaptado para PublicHome
 */
export const getProjects = async () => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        project_id,
        title,
        description,
        start_date,
        is_public,
        academic_area:academic_area_id (area_name),
        status:status_id (status_name)
      `)
      .eq("is_draft", false)
      .order("start_date", { ascending: false });

    if (error) throw error;

    // Mapea los datos al formato que espera PublicHome
    return data.map(p => ({
      id: p.project_id,
      title: p.title,
      description: p.description,
      area: p.academic_area?.area_name || "Sin área",
      type: p.is_public ? "Externo" : "Interno",
      status: p.status?.status_name || "Sin estado",
      date: p.start_date
    }));

  } catch (error) {
    console.error("Error obteniendo proyectos:", error.message);
    throw new Error(`No se pudieron cargar los proyectos: ${error.message}`);
  }
};