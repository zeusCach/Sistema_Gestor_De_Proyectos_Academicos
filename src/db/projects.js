import supabase from "./supabase_client";

/**
 * Obtiene todos los proyectos públicos (tipo externo)
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
        area,
        type,
        status,
        creation_date
      `)
      //.eq("type", "externo") // Solo proyectos externos (públicos)
      .order("creation_date", { ascending: false });

    if (error) throw error;

    // Adaptar al formato que usa tu componente PublicHome
    return data.map(p => ({
      id: p.project_id,
      title: p.title,
      description: p.description,
      area: formatArea(p.area),
      type: formatType(p.type),
      status: formatStatus(p.status),
      date: formatDateShort(p.creation_date)
    }));

  } catch (error) {
    console.error("Error obteniendo proyectos:", error.message);
    throw new Error(`No se pudieron cargar los proyectos: ${error.message}`);
  }
};



/**
 * Obtiene UN proyecto específico con TODOS sus detalles
 * Para la vista detallada (ProjectDetailView)
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
    let specificObjectivesList = [];
    if (projectData.specific_objectives) {
      specificObjectivesList = projectData.specific_objectives
        .split(/\n|(?<=\w)\.\s+/)
        .map(o => o.trim())
        .filter(o => o.length > 0);
    }

    // 4. Calcular duración del proyecto
    const duration = projectData.completion_date
      ? calculateDuration(projectData.creation_date, projectData.completion_date)
      : "En curso";

    // 5. Respuesta final adaptada para ProjectDetailView
    return {
      // IDs
      id: projectData.project_id,
      userId: projectData.user_id,
      
      // Información básica
      title: projectData.title,
      description: projectData.description,
      fullDescription: projectData.description, // Usamos description como fullDescription
      
      // Categorización
      area: formatArea(projectData.area),
      type: formatType(projectData.type),
      status: formatStatus(projectData.status),
      folio: projectData.folio,
      
      // Fechas
      date: formatDateShort(projectData.creation_date),
      endDate: projectData.completion_date ? formatDateShort(projectData.completion_date) : null,
      creationDate: formatDateLong(projectData.creation_date),
      completionDate: formatDateLong(projectData.completion_date),
      duration: duration,
      
      // Objetivos
      generalObjective: projectData.general_objective,
      specificObjectives: specificObjectivesList,
      objectives: specificObjectivesList, // Para compatibilidad con componentes
      
      // Colaboradores (NUEVO CAMPO)
      collaborators: projectData.collaborators || null,
      
      // Datos del usuario creador
      creator: userData?.name || "Usuario desconocido",
      creatorEmail: userData?.email || null,
      institution: userData?.institution || null,
      
      // Campos que no existen en tu BD (para compatibilidad)
      team: null,
      budget: null
    };

  } catch (error) {
    console.error("Error obteniendo proyecto por ID:", error.message);
    throw new Error(`No se pudo cargar el proyecto: ${error.message}`);
  }
};

/**
 * Obtiene los archivos asociados a un proyecto
 */
export const getProjectFiles = async (projectId) => {
  try {
    const { data, error } = await supabase
      .from("project_files")
      .select("*")
      .eq("project_id", projectId)
      .order("upload_date", { ascending: false });

    if (error) throw error;
    return data || [];

  } catch (error) {
    console.error("Error obteniendo archivos:", error.message);
    return [];
  }
};

// ======================================================
// FUNCIONES AUXILIARES
// ======================================================

/**
 * Formatea el área al formato de visualización
 */
const formatArea = (area) => {
  const areaMap = {
    'investigacion': 'Investigación',
    'vinculacion': 'Vinculación'
  };
  return areaMap[area] || area || "Sin área";
};

/**
 * Formatea el tipo al formato de visualización
 */
const formatType = (type) => {
  const typeMap = {
    'interno': 'Interno',
    'externo': 'Externo'
  };
  return typeMap[type] || type || "Sin tipo";
};

/**
 * Formatea el estado al formato de visualización
 */
const formatStatus = (status) => {
  const statusMap = {
    'vigente': 'Vigente',
    'en curso': 'En Curso',
    'finalizado': 'Finalizado',
    'pausado': 'Pausado'
  };
  return statusMap[status] || status || "Sin estado";
};

/**
 * Formatea fecha corta: DD/MM/YYYY
 */
const formatDateShort = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formatea fecha larga: "15 de enero de 2025"
 */
const formatDateLong = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Calcula la duración entre dos fechas
 */
const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return null;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'año' : 'años'}`;
    }
    return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
  }
};