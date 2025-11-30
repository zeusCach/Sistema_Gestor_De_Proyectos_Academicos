import supabase from "./supabase_client";


/**ACTUALIZACION DE COMO SE PIDEN LOS DATOS PARA LOS PROYECTOS */

/**
 * Obtiene todos los proyectos públicos (no borradores)
 * Formato adaptado para PublicHome
 */
/**
 * Obtiene todos los proyectos
 * Formato adaptado a tu nueva base de datos
 */
export const getProjects = async () => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        project_id,
        title,
        description,
        area,
        type,
        status,
        creation_date
      `)
      .order("creation_date", { ascending: false });

    if (error) throw error;

    // Adaptar al formato que usa tu componente PublicHome
    return data.map(p => ({
      id: p.project_id,
      title: p.title,
      description: p.description,
      area: p.area || "Sin área",
      type: p.type === "externo" ? "Externo" : "Interno",
      status: p.status || "Sin estado",
      date: p.creation_date
    }));

  } catch (error) {
    console.error("Error obteniendo proyectos:", error.message);
    throw new Error(`No se pudieron cargar los proyectos: ${error.message}`);
  }
};





/**
 * Obtiene UN proyecto específico con TODOS sus detalles
 * Para la vista detallada (ProjectDetailView)
 * ✅ BASADO EN EL ESQUEMA REAL DE SUPABASE
 */
/**
 * Obtiene un proyecto con sus detalles reales según la nueva nueva BD
 */
export const getProjectById = async (projectId) => {
  try {
    // 1. Obtener datos del proyecto
    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("project_id", projectId)
      .single();

    if (projectError) throw projectError;
    if (!projectData) throw new Error("Proyecto no encontrado");

    // 2. Obtener datos del creador (users)
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("name, email, institution")
      .eq("user_id", projectData.user_id)
      .single();

    if (userError) {
      console.warn("No se pudo obtener el usuario creador:", userError.message);
    }

    // 3. Procesar objetivos específicos (TEXT → array)
    let objectives = [];
    if (projectData.specific_objectives) {
      objectives = projectData.specific_objectives
        .split(/\n|(?<=\w)\.\s+/)
        .map(o => o.trim())
        .filter(o => o.length > 0);
    }

    // 4. Formato de fechas
    const formatDate = (dateString) => {
      if (!dateString) return null;
      const d = new Date(dateString);
      return d.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    // 5. Respuesta final adaptada a tu nueva BD
    return {
      id: projectData.project_id,
      title: projectData.title,
      description: projectData.description,
      generalObjective: projectData.general_objective,
      objectives: objectives,
      area: projectData.area,
      type: projectData.type,
      status: projectData.status,
      folio: projectData.folio,
      creationDate: formatDate(projectData.creation_date),
      completionDate: formatDate(projectData.completion_date),

      // Datos del usuario creador
      creator: userData?.name || "Usuario desconocido",
      creatorEmail: userData?.email || null,
      institution: userData?.institution || null,

      // Como ya NO existen participantes ni asesores:
      team: null,
      collaborators: null
    };

  } catch (error) {
    console.error("Error obteniendo proyecto por ID:", error.message);
    throw new Error(`No se pudo cargar el proyecto: ${error.message}`);
  }
};
