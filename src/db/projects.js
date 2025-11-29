// db/projetcs.js
import supabase from "./supabase_client";

// CONSUMIR DATA DE LA DB PARA MOSTRAR PROYECTOS PAGINA DE INICION
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


  //NUEVA FUNCIÓN: CREAR PROYECTO (componete para el registro de proyects)
  export const createProject = async (projectData) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };

    } catch (error) {
      console.error("Error creando proyecto:", error.message);
      return { 
        success: false, 
        error: error.message || "Error desconocido al crear el proyecto" 
      };
    }
  };

  // OBTENER ÁREAS ACADÉMICAS
  export const getAcademicAreas = async () => {
    try {
      const { data, error } = await supabase
        .from("academic_areas")
        .select("area_id, area_name")
        .order("area_name", { ascending: true });

      if (error) throw error;
      return data;

    } catch (error) {
      console.error("Error obteniendo áreas académicas:", error.message);
      throw error;
    }
  };

  // OBTENER TIPOS DE PROYECTO
  export const getProjectTypes = async () => {
    try {
      const { data, error } = await supabase
        .from("project_types")
        .select("type_id, type_name")
        .order("type_name", { ascending: true });

      if (error) throw error;
      return data;

    } catch (error) {
      console.error("Error obteniendo tipos de proyecto:", error.message);
      throw error;
    }
  };

  // OBTENER ESTADOS DE PROYECTO
  export const getProjectStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("project_status")
        .select("status_id, status_name, color_code")
        .order("status_name", { ascending: true });

      if (error) throw error;
      return data;

    } catch (error) {
      console.error("Error obteniendo estados de proyecto:", error.message);
      throw error;
    }
  };