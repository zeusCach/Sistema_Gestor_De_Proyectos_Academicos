import { useState } from "react";
import supabase from "../db/supabase_client";
import { useAuth } from "../context/AuthContext";
import {
  notifyProjectCreated,
  notifyProjectUpdated,
  notifyProjectDeleted,
} from "../helpers/notificationHelpers";

export const useProjectActions = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para crear un proyecto
  const createProject = async (projectData) => {
    setLoading(true);
    setError(null);

    try {
      if (!user?.id) {
        throw new Error("Usuario no autenticado");
      }

      const projectToInsert = {
        ...projectData,
        user_id: user.id,
      };

      const { data, error: insertError } = await supabase
        .from("projects")
        .insert([projectToInsert])
        .select();

      if (insertError) {
        throw insertError;
      }

      // 🔔 Crear notificación
      await notifyProjectCreated(user.id, projectData.title);

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

      // Obtener el proyecto actual para comparar cambios
      const { data: currentProject } = await supabase
        .from("projects")
        .select("title")
        .eq("project_id", projectId)
        .single();

      const { data, error: updateError } = await supabase
        .from("projects")
        .update(updates)
        .eq("project_id", projectId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      // 🔔 Crear notificación
      await notifyProjectUpdated(
        user.id,
        currentProject?.title || "Proyecto",
        updates
      );

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

      // Obtener el título antes de eliminar
      const { data: project } = await supabase
        .from("projects")
        .select("title")
        .eq("project_id", projectId)
        .single();

      // Soft delete
      const { error: deleteError } = await supabase
        .from("projects")
        .update({ is_deleted: true })
        .eq("project_id", projectId)
        .eq("user_id", user.id);

      if (deleteError) {
        throw deleteError;
      }

      // 🔔 Crear notificación
      await notifyProjectDeleted(user.id, project?.title || "Proyecto");

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