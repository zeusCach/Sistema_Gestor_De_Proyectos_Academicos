import supabase from "../db/supabase_client";

/**
 * Crea una notificación en la base de datos
 */
export const createNotification = async (userId, type, title, message, metadata = {}) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert([
        {
          user_id: userId,
          type, // 'profile_update', 'project_update', 'project_create', etc.
          title,
          message,
          metadata, // Información adicional en JSON
          is_read: false,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error al crear notificación:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtiene todas las notificaciones de un usuario
 */
export const fetchNotifications = async (userId, limit = 50) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    throw error;
  }
};

/**
 * Obtiene notificaciones no leídas
 */
export const fetchUnreadNotifications = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .eq("is_read", false)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error al obtener notificaciones no leídas:", error);
    throw error;
  }
};

/**
 * Marca una notificación como leída
 */
export const markAsRead = async (notificationId) => {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("notification_id", notificationId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error al marcar notificación como leída:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Marca todas las notificaciones como leídas
 */
export const markAllAsRead = async (userId) => {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId)
      .eq("is_read", false);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error al marcar todas como leídas:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Elimina una notificación
 */
export const deleteNotification = async (notificationId) => {
  try {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("notification_id", notificationId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar notificación:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Suscribirse a notificaciones en tiempo real
 */
export const subscribeToNotifications = (userId, callback) => {
  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return channel;
};