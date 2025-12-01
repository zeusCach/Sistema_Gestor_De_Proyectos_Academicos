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
    collaborators: "",
    general_objective: "",
    specific_objectives: "",
    type: "",
    area: "",
    creation_date: "",
    completion_date: "",
    status: "", // ahora se seleccionará del dropdown
  });

  // Opciones para los selectores
  const statusOptions = ["Vigente", "En Curso", "Pausado", "Finalizado"];
  
  const typeOptions = ["Académico", "Investigación", "Servicio Social", "Administrativo"];
  
  const areaOptions = [
    "Ingeniería en Sistemas Computacionales",
    "Ingeniería Industrial",
    "Ingeniería en Administración",
    "Ingeniería en Gestión Empresarial",
    "Ingeniería en Industrias Alimentarias",
    "Ingeniería en Desarrollo Comunitario"
  ];

  //estado para manejos de errores
  const [errors, setErrors] = useState({});

  
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

     // Filtrar collaborators de la validación obligatoria
    const { collaborators, ...requiredFields } = form;
    
    return (
      Object.values(requiredFields).every((v) => v.trim() !== "") &&
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

    //Inserta desde nuestro client auth el proyecto a la tabla projects
    const { error } = await supabase.from("projects").insert({
      ...form,
      user_id: user.id,
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
                  style={{ fontFamily: 'Roboto, sans-serif' }}
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
                  style={{ fontFamily: 'Roboto, sans-serif' }}
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
                style={{ fontFamily: 'Roboto, sans-serif' }}
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
                style={{ fontFamily: 'Roboto, sans-serif' }}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1.5">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Colaboradores*/}
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
                  className='w-full px-4 py-2.5 border rounded-lg transition-all duration-200'
                  style={{ fontFamily: 'Roboto, sans-serif' }}
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
                  style={{ fontFamily: 'Roboto, sans-serif' }}
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
                  style={{ fontFamily: 'Roboto, sans-serif' }}
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
                  style={{ fontFamily: 'Roboto, sans-serif' }}
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
                  style={{ fontFamily: 'Roboto, sans-serif' }}
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
                  style={{ fontFamily: 'Roboto, sans-serif' }}
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
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
                {errors.completion_date && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.completion_date}</p>
                )}
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
}