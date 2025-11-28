import { useState } from "react";
import supabase from "../db/supabase_client";
import { useAuth } from "../context/AuthContext";

export const CreateProjectForm = ({ onClose }) => {
  //estado derivado que trabaja sobre la autenticacion del usuario(context)
  const { user } = useAuth();
  
  //estado que controla los campos de nuestra bd en la tabla projects
  const [form, setForm] = useState({
    folio: "",
    title: "",
    description: "",
    general_obj: "",
    specific_goal: "",
    project_type: "",
    academic_area: "",
    start_date: "",
    estimated_end: "",
    duration_weeks: "",
  });

  //estado para manejos de errores
  const [errors, setErrors] = useState({});

  // VALIDACIONES
  const validateField = (name, value) => {
    let message = "";
    
    if (!value.trim()) {
      message = "Este campo es obligatorio.";
    } else {
      // Validaciones adicionales por campo
      if (name === "duration_weeks" && isNaN(value)) {
        message = "Debes ingresar un número válido.";
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const isFormValid = () => {
    return (
      Object.values(form).every((v) => v.trim() !== "") &&
      Object.values(errors).every((e) => e === "")
    );
  };

  // ENVIAR FORMULARIO
  const handleSubmit = async (e) => {
    //setea nuestro formulario para que no se envie cada vez que se recargue la pagina
    e.preventDefault();
    
    //si los datos no son validos, nos da la alerta
    if (!isFormValid()) {
      alert("Por favor completa todos los campos antes de guardar.");
      return;
    }

    //Inserta desde nuestro client auth el proyecto a la tabla projects(revisar su funcionalidad)
    const { error } = await supabase.from("projects").insert({
      ...form,
      advisor_user_id: user.id,
      registered_by: user.id,
      status_id: 1,
      is_draft: false,
      is_public: false,
    });

    //errores
    if (error) {
      console.error(error);
      alert("Ocurrió un error al guardar el proyecto.");
      return;
    }

    //proyecto success
    alert("Proyecto creado exitosamente.");
    onClose();
  };

  //UI
  return (
    <div className="bg-white flex flex-col w-full" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="px-8 py-6 border-b border-gray-200" style={{ backgroundColor: '#1A386A' }}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Crear Nuevo Proyecto</h2>
            <p className="text-blue-100 text-sm mt-1">Complete los datos del proyecto</p>
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

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-6">
          {/* INFORMACIÓN BÁSICA */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A386A' }}>
              Información Básica
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
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
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
                {errors.folio && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.folio}</p>
                )}
              </div>

              {/* Título - Full Width */}
              <div>
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
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.title}</p>
                )}
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe brevemente el proyecto..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg h-24 resize-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
            </div>
          </div>

          {/* OBJETIVOS */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A386A' }}>
              Objetivos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                  Objetivo General
                </label>
                <textarea
                  name="general_obj"
                  value={form.general_obj}
                  onChange={handleChange}
                  placeholder="Objetivo principal del proyecto"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg h-28 resize-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                  Objetivo Específico
                </label>
                <textarea
                  name="specific_goal"
                  value={form.specific_goal}
                  onChange={handleChange}
                  placeholder="Objetivos específicos a alcanzar"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg h-28 resize-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
            </div>
          </div>

          {/* CATEGORIZACIÓN */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A386A' }}>
              Categorización
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo de Proyecto */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                  Tipo de Proyecto <span className="text-red-500">*</span>
                </label>
                <select
                  name="project_type"
                  value={form.project_type}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                    errors.project_type
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                  }`}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="Académico">Académico</option>
                  <option value="Investigación">Investigación</option>
                  <option value="Servicio Social">Servicio Social</option>
                  <option value="Administrativo">Administrativo</option>
                </select>
                {errors.project_type && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.project_type}</p>
                )}
              </div>

              {/* Área Académica */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                  Área Académica <span className="text-red-500">*</span>
                </label>
                <select
                  name="academic_area"
                  value={form.academic_area}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                    errors.academic_area
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                  }`}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  <option value="">Seleccione un área</option>
                  <option value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas Computacionales</option>
                  <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                  <option value="Ingeniería en Administración">Ingeniería en Administración</option>
                  <option value="Ingeniería en Gestión Empresarial">Ingeniería en Gestión Empresarial</option>
                  <option value="Ingeniería en Industrias Alimentarias">Ingeniería en Industrias Alimentarias</option>
                  <option value="Ingeniería en Desarrollo Comunitario">Ingeniería en Desarrollo Comunitario</option>
                </select>
                {errors.academic_area && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.academic_area}</p>
                )}
              </div>
            </div>
          </div>

          {/* PLANIFICACIÓN TEMPORAL */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A386A' }}>
              Planificación Temporal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                  Fecha de Inicio <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                    errors.start_date
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                  }`}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
                {errors.start_date && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.start_date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                  Fecha Estimada de Fin
                </label>
                <input
                  type="date"
                  name="estimated_end"
                  value={form.estimated_end}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-900 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                  Duración (semanas)
                </label>
                <input
                  type="number"
                  name="duration_weeks"
                  value={form.duration_weeks}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-900 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
            isFormValid()
              ? "text-white hover:opacity-90 shadow-md"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          style={{
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: isFormValid() ? '#1A386A' : undefined
          }}
        >
          Guardar Proyecto
        </button>
      </div>
    </div>
  );
};
