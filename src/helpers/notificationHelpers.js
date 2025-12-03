import { createNotification } from "../services/notificationsServices";

/**
 * Notificación: Usuario actualizó su perfil
 */
export const notifyProfileUpdate = async (userId, changes) => {


  const fieldLabels = {
  folio: 'Folio',
  title: 'Título',
  description: 'Descripción',
  collaborators: 'Colaboradores',
  general_objective: 'Objetivo General',
  specific_objectives: 'Objetivos Específicos',
  type: 'Tipo de Proyecto',
  area: 'Área',
  creation_date: 'Fecha de Inicio',
  completion_date: 'Fecha de Finalización',
  status: 'Estado',
  institution: 'Institución',
  duration: 'Duración'
};

  const changedFields = Object.keys(changes);
  let message = "Has actualizado tu perfil: ";

  if (changedFields.includes("name")) {
    message += "nombre";
  }
  if (changedFields.includes("institution")) {
    message += changedFields.includes("name") ? ", institución" : "institución";
  }

  return await createNotification(
    userId,
    "profile_update",
    "Perfil actualizado",
    message,
    { changes }
  );
};

/**
 * Notificación: Usuario creó un proyecto
 */
export const notifyProjectCreated = async (userId, projectTitle) => {
  return await createNotification(
    userId,
    "project_create",
    "Proyecto creado",
    `Has creado el proyecto: "${projectTitle}"`,
    { projectTitle }
  );
};

/**
 * Notificación: Usuario actualizó un proyecto
 */
export const notifyProjectUpdated = async (userId, projectTitle, changes) => {
  //const changedFields = Object.keys(changes).join(", ");

  return await createNotification(
    userId,
    "project_update",
    "Proyecto actualizado",
    `Has actualizado "${projectTitle}"`,
    { projectTitle}
  );
};

/**
 * Notificación: Usuario eliminó un proyecto
 */
export const notifyProjectDeleted = async (userId, projectTitle) => {
  return await createNotification(
    userId,
    "project_delete",
    "Proyecto eliminado",
    `Has eliminado el proyecto: "${projectTitle}"`,
    { projectTitle }
  );
};

/**
 * Notificación: Cambio de estado del proyecto
 */
export const notifyProjectStatusChange = async (userId, projectTitle, oldStatus, newStatus) => {
  return await createNotification(
    userId,
    "project_update",
    "Estado del proyecto actualizado",
    `"${projectTitle}" cambió de "${oldStatus}" a "${newStatus}"`,
    { projectTitle, oldStatus, newStatus }
  );
};