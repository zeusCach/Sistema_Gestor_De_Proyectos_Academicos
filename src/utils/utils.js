// Calcula la duración en días entre dos fechas
export const calculateDuration = (start, end) => {
  if (!start || !end) return 0;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const diff = endDate - startDate;
  return Math.round(diff / (1000 * 60 * 60 * 24)); // días
};

// Convierte una fecha a formato legible
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Capitaliza texto (útil para nombres de estados)
export const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() + text.slice(1);

// Filtra por estado (extra opcional)
export const filterByStatus = (projects, status) => {
  if (!status) return projects;
  return projects.filter((p) => p.status === status);
};

// Filtra por búsqueda (extra opcional)
export const filterBySearch = (projects, search) => {
  if (!search) return projects;
  return projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
};
