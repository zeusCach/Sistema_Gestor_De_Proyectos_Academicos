import supabase from "../db/supabase_client";

/**
 * Obtiene los datos del perfil del usuario desde Supabase
 * @param {string} userId - ID del usuario autenticado
 * @returns {Promise<Object>} Datos del perfil
 */
export async function fetchUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    throw error;
  }
}

/**
 * Actualiza el nombre e institución del usuario en Supabase
 * @param {string} userId - ID del usuario
 * @param {Object} updates - Objeto con name e institution
 * @returns {Promise<Object>} Datos actualizados
 */
export async function updateUserProfile(userId, { name, institution }) {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        name,
        institution
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    throw error;
  }
}

/**
 * Guarda la foto de perfil en localStorage sincronizada por usuario
 * Solo la imagen se guarda en localStorage, NO en la base de datos
 * @param {string} userId - ID del usuario
 * @param {string} photoBase64 - Imagen en formato base64
 */
export function saveProfilePhoto(userId, photoBase64) {
  try {
    const storageKey = `profile_photo_${userId}`;
    localStorage.setItem(storageKey, photoBase64);
    
    // Emitir evento para actualizar avatar en tiempo real
    window.dispatchEvent(new CustomEvent("profilePhotoUpdated", {
      detail: { userId, photoBase64 }
    }));
    
    return { success: true };
  } catch (error) {
    console.error("Error al guardar foto:", error);
    return { error: "No se pudo guardar la foto" };
  }
}

/**
 * Obtiene la foto de perfil desde localStorage
 * La foto NO está en la base de datos, solo en localStorage
 * @param {string} userId - ID del usuario
 * @returns {string|null} Base64 de la imagen o null
 */
export function getProfilePhoto(userId) {
  try {
    const storageKey = `profile_photo_${userId}`;
    return localStorage.getItem(storageKey);
  } catch (error) {
    console.error("Error al obtener foto:", error);
    return null;
  }
}

/**
 * Elimina la foto de perfil del localStorage
 * @param {string} userId - ID del usuario
 */
export function deleteProfilePhoto(userId) {
  try {
    const storageKey = `profile_photo_${userId}`;
    localStorage.removeItem(storageKey);
    
    // Emitir evento para actualizar avatar en tiempo real
    window.dispatchEvent(new CustomEvent("profilePhotoUpdated", {
      detail: { userId, photoBase64: null }
    }));
    
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar foto:", error);
    return { error: "No se pudo eliminar la foto" };
  }
}