// hooks/useCreateProject.js
import { useState, useEffect } from "react";
import { 
  createProject, 
  getAcademicAreas, 
  getProjectTypes, 
  getProjectStatus 
} from "../db/projects";
import { useAuth } from "../context/AuthContext";
import supabase from "../db/supabase_client";

export const useCreateProject = () => {
  const { user } = useAuth(); // ⬅️ Este user viene de auth.users (tiene .id)

  // Estado del formulario
  const [form, setForm] = useState({
    folio: "",
    title: "",
    description: "",
    general_objective: "",
    specific_goals: "",
    project_type_id: "",
    academic_area_id: "",
    start_date: "",
    estimated_end_date: "",
    duration_weeks: "",
  });

  // Catálogos dinámicos
  const [academicAreas, setAcademicAreas] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);

  // Estados de carga y errores
  const [loading, setLoading] = useState(false);
  const [loadingCatalogs, setLoadingCatalogs] = useState(true);
  const [errors, setErrors] = useState({});

  // Cargar catálogos al montar el componente
  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        setLoadingCatalogs(true);
        const [areas, types, status] = await Promise.all([
          getAcademicAreas(),
          getProjectTypes(),
          getProjectStatus()
        ]);

        setAcademicAreas(areas);
        setProjectTypes(types);
        setProjectStatus(status);
      } catch (error) {
        console.error("Error cargando catálogos:", error);
      } finally {
        setLoadingCatalogs(false);
      }
    };

    loadCatalogs();
  }, []);

  // Validar campo individual
  const validateField = (name, value) => {
    let message = "";

    const requiredFields = [
      "folio", 
      "title", 
      "general_objective", 
      "project_type_id", 
      "academic_area_id", 
      "start_date",
      "estimated_end_date"
    ];

    if (requiredFields.includes(name) && !value.toString().trim()) {
      message = "Este campo es obligatorio.";
    } else if (name === "duration_weeks" && value && isNaN(value)) {
      message = "Debes ingresar un número válido.";
    }

    setErrors(prev => ({ ...prev, [name]: message }));
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  // Validar formulario completo
  const isFormValid = () => {
    const requiredFields = [
      "folio", 
      "title", 
      "general_objective", 
      "project_type_id", 
      "academic_area_id", 
      "start_date",
      "estimated_end_date"
    ];

    const allFieldsFilled = requiredFields.every(field => 
      form[field]?.toString().trim() !== ""
    );

    const noErrors = Object.values(errors).every(e => e === "");

    return allFieldsFilled && noErrors;
  };

  // 🔥 FUNCIÓN PARA VERIFICAR/CREAR USUARIO EN TABLA USERS
  const ensureUserExists = async (authUserId) => {
    try {
      // Verificar si el usuario ya existe en la tabla users
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', authUserId)
        .single();

      if (existingUser) {
        console.log('✅ Usuario ya existe en tabla users');
        return authUserId;
      }

      // Si no existe, obtener datos de auth para crearlo
      if (fetchError && fetchError.code === 'PGRST116') {
        console.log('⚠️ Usuario no existe en tabla users, creando...');
        
        const { data: authData } = await supabase.auth.getUser();
        
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            user_id: authUserId,
            email: authData.user.email,
            name: authData.user.user_metadata?.name || 'Usuario',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (insertError) {
          console.error('❌ Error creando usuario en tabla users:', insertError);
          throw new Error('No se pudo sincronizar el usuario');
        }

        console.log('✅ Usuario creado en tabla users');
        return authUserId;
      }

      return authUserId;

    } catch (error) {
      console.error('❌ Error en ensureUserExists:', error);
      throw error;
    }
  };

  // Enviar formulario
  const handleSubmit = async (onSuccess) => {
    if (!isFormValid()) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    if (!user?.id) {
      alert("Error: Debes iniciar sesión para crear un proyecto.");
      return;
    }

    setLoading(true);

    try {
      // 🔥 VERIFICAR/CREAR USUARIO EN TABLA USERS
      await ensureUserExists(user.id);

      const defaultStatus = projectStatus.find(s => s.status_name === "Vigente") 
        || projectStatus[0];

      // Preparar datos para la BD
      const projectData = {
        folio: form.folio.trim(),
        title: form.title.trim(),
        description: form.description.trim() || null,
        general_objective: form.general_objective.trim(),
        specific_goals: form.specific_goals.trim() || null,
        project_type_id: parseInt(form.project_type_id),
        academic_area_id: parseInt(form.academic_area_id),
        start_date: form.start_date,
        estimated_end_date: form.estimated_end_date,
        duration_weeks: form.duration_weeks ? parseInt(form.duration_weeks) : null,
        advisor_user_id: user.id, // ⬅️ Usar user.id de auth.users
        registered_by_user_id: user.id, // ⬅️ Usar user.id de auth.users
        status_id: defaultStatus?.status_id || 6,
        is_draft: false,
        is_public: false,
      };

      console.log("📤 Datos a insertar:", projectData);

      const result = await createProject(projectData);

      if (result.success) {
        alert("✅ Proyecto creado exitosamente.");
        // Resetear formulario
        setForm({
          folio: "",
          title: "",
          description: "",
          general_objective: "",
          specific_goals: "",
          project_type_id: "",
          academic_area_id: "",
          start_date: "",
          estimated_end_date: "",
          duration_weeks: "",
        });
        setErrors({});
        
        if (onSuccess) onSuccess();
      } else {
        console.error("❌ Error del servidor:", result.error);
        alert(`❌ Error: ${result.error}`);
      }

    } catch (error) {
      console.error("💥 Error inesperado:", error);
      alert(`Ocurrió un error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    loadingCatalogs,
    academicAreas,
    projectTypes,
    handleChange,
    handleSubmit,
    isFormValid,
  };
};