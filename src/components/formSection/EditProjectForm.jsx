import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useProjectActions } from "../../hooks/useProjectActions";

export const EditProjectForm = ({ project, onClose, onProjectUpdated }) => {
  const { user } = useAuth();
  const { updateProject, loading } = useProjectActions();
  const [errors, setErrors] = useState({});

  // Inicializar el formulario con los datos del proyecto
  const [form, setForm] = useState({
    folio: "",
    title: "",
    description: "",
    collaborators: "",
    general_objective: "",
    specific_objectives: "",
    type: "",
    area: "",
    creation_date: "",
    completion_date: "",
    status: "",
  });

  // Cargar los datos del proyecto cuando el componente se monta
  useEffect(() => {
    if (project) {
      setForm({
        folio: project.folio || "",
        title: project.title || "",
        description: project.description || "",
        collaborators: project.collaborators || "",
        general_objective: project.general_objective || "",
        specific_objectives: project.specific_objectives || "",
        type: project.type || "",
        area: project.area || "",
        creation_date: project.creation_date || "",
        completion_date: project.completion_date || "",
        status: project.status || "",
      });
    }
  }, [project]);

  // Opciones para los selectores
  const statusOptions = ["Vigente", "En Curso", "Pausado", "Finalizado", "Rechazado"];
  const typeOptions = ["interno", "externo"];
  const areaOptions = ["investigacion", "vinculacion"];

  // VALIDACIONES
  const validateField = (name, value) => {
    let message = "";

    if (name !== "collaborators" && !value.trim()) {
      message = "Este campo es obligatorio.";
    }

    setErrors(prev => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const isFormValid = () => {
    const { collaborators, ...requiredFields } = form;
    return (
      Object.values(requiredFields).every((v) => v.trim() !== "") &&
      Object.values(errors).every((e) => e === "")
    );
  };

  // ENVIAR FORMULARIO
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Por favor completa todos los campos antes de guardar.");
      return;
    }

    // Actualizar el proyecto usando el hook
    const result = await updateProject(project.project_id, form);

    if (result.success) {
      alert("Proyecto actualizado exitosamente.");
      if (onProjectUpdated) {
        onProjectUpdated(result.data);
      }
      onClose();
    } else {
      alert(`Ocurrió un error al actualizar el proyecto: ${result.error}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200" style={{ backgroundColor: '#1A386A' }}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Editar Proyecto</h2>
              <p className="text-blue-100 text-sm mt-1">Modifica los datos del proyecto</p>
            </div>
            <button
              type="button"
              className="text-white/80 hover:text-white hover:bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
              onClick={onClose}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido del formulario */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-6">

            {/* INFORMACIÓN BÁSICA */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A386A' }}>
                Información Básica
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Folio */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                    Folio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="folio"
                    value={form.folio}
                    onChange={handleChange}
                    placeholder="Ej: PRY-2024-001"
                    className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                      errors.folio
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  {errors.folio && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.folio}</p>
                  )}
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                      errors.status
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">Selecciona un estado</option>
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.status}</p>
                  )}
                </div>
              </div>

              {/* Título - Full Width */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                  Título del Proyecto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Nombre descriptivo del proyecto"
                  className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                    errors.title
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.title}</p>
                )}
              </div>

              {/* Descripción */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe brevemente el proyecto..."
                  className={`w-full px-4 py-2.5 border rounded-lg h-24 resize-none transition-all duration-200 ${
                    errors.description
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Colaboradores */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                Colaboradores
              </label>
              <input
                type="text"
                name="collaborators"
                value={form.collaborators}
                onChange={handleChange}
                placeholder="Mario Castillo"
                className="w-full px-4 py-2.5 border rounded-lg transition-all duration-200 border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* OBJETIVOS */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A386A' }}>
                Objetivos
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                    Objetivo General <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="general_objective"
                    value={form.general_objective}
                    onChange={handleChange}
                    placeholder="Objetivo principal del proyecto"
                    className={`w-full px-4 py-2.5 border rounded-lg h-28 resize-none transition-all duration-200 ${
                      errors.general_objective
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  {errors.general_objective && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.general_objective}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                    Objetivos Específicos <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="specific_objectives"
                    value={form.specific_objectives}
                    onChange={handleChange}
                    placeholder="Objetivos específicos a alcanzar"
                    className={`w-full px-4 py-2.5 border rounded-lg h-28 resize-none transition-all duration-200 ${
                      errors.specific_objectives
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  {errors.specific_objectives && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.specific_objectives}</p>
                  )}
                </div>
              </div>
            </div>

            {/* CATEGORIZACIÓN */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A386A' }}>
                Categorización
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                    Tipo de Proyecto <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                      errors.type
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">Selecciona un tipo</option>
                    {typeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.type}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                    Área <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                      errors.area
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">Selecciona un área</option>
                    {areaOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.area && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.area}</p>
                  )}
                </div>
              </div>
            </div>

            {/* PLANIFICACIÓN TEMPORAL */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A386A' }}>
                Planificación Temporal
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                    Fecha de Creación <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="creation_date"
                    value={form.creation_date}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                      errors.creation_date
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  {errors.creation_date && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.creation_date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                    Fecha de Finalización <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="completion_date"
                    value={form.completion_date}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                      errors.completion_date
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  {errors.completion_date && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.completion_date}</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer con botones */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || loading}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
              isFormValid() && !loading
                ? "text-white hover:opacity-90 shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            style={{
              backgroundColor: isFormValid() && !loading ? '#1A386A' : undefined
            }}
          >
            {loading ? "Actualizando..." : "Actualizar Proyecto"}
          </button>
        </div>

      </div>
    </div>
  );
};