import { useState } from "react";
import supabase from "../db/supabase_client";
import { useAuth } from "../context/AuthContext";

export const useProjectActions = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para crear un proyecto
  const createProject = async (projectData) => {
    setLoading(true);
    setError(null);

    try {
      // Validar que el usuario esté autenticado
      if (!user?.id) {
        throw new Error("Usuario no autenticado");
      }

      // Preparar los datos del proyecto con el user_id
      const projectToInsert = {
        ...projectData,
        user_id: user.id, // Usuario que está creando el proyecto
      };

      // Insertar el proyecto en la base de datos
      const { data, error: insertError } = await supabase
        .from("projects")
        .insert([projectToInsert])
        .select(); // Devuelve el proyecto insertado

      if (insertError) {
        throw insertError;
      }

      setLoading(false);
      return { success: true, data: data[0] };

    } catch (err) {
      console.error("Error al crear proyecto:", err);
      setError(err.message || "Error desconocido al crear el proyecto");
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Función para actualizar un proyecto
  const updateProject = async (projectId, updates) => {
    setLoading(true);
    setError(null);

    try {
      if (!user?.id) {
        throw new Error("Usuario no autenticado");
      }

      const { data, error: updateError } = await supabase
        .from("projects")
        .update(updates)
        .eq("project_id", projectId)
        .eq("user_id", user.id) // Solo puede actualizar sus propios proyectos
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      setLoading(false);
      return { success: true, data };

    } catch (err) {
      console.error("Error al actualizar proyecto:", err);
      setError(err.message || "Error desconocido al actualizar el proyecto");
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Función para eliminar un proyecto (soft delete)
  const deleteProject = async (projectId) => {
    setLoading(true);
    setError(null);

    try {
      if (!user?.id) {
        throw new Error("Usuario no autenticado");
      }

      // Opción 1: Soft delete (recomendado)
      const { error: deleteError } = await supabase
        .from("projects")
        .update({ is_deleted: true })
        .eq("project_id", projectId)
        .eq("user_id", user.id);

      // Opción 2: Hard delete (eliminar permanentemente)
      // const { error: deleteError } = await supabase
      //   .from("projects")
      //   .delete()
      //   .eq("project_id", projectId)
      //   .eq("user_id", user.id);

      if (deleteError) {
        throw deleteError;
      }

      setLoading(false);
      return { success: true };

    } catch (err) {
      console.error("Error al eliminar proyecto:", err);
      setError(err.message || "Error desconocido al eliminar el proyecto");
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return {
    createProject,
    updateProject,
    deleteProject,
    loading,
    error,
  };
};