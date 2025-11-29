// Colores utilizados en las gráficas y barras de progreso
export const STATUS_COLORS = {
  planning: "#3B82F6",     // azul
  "in-progress": "#F59E0B", // amarillo
  completed: "#10B981",     // verde
};

// Opciones para filtros de estado
export const STATUS_OPTIONS = [
  { value: "", label: "Todos los estados" },
  { value: "planning", label: "Planificación" },
  { value: "in-progress", label: "En progreso" },
  { value: "completed", label: "Completado" },
];

// Etiquetas legibles si quieres usar en tablas, cards o tooltips
export const STATUS_LABELS = {
  planning: "Planificación",
  "in-progress": "En progreso",
  completed: "Completado",
};
