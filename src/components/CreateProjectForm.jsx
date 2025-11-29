// components/CreateProjectForm.jsx
import { useCreateProject } from "../hooks/useCreateProject";

export const CreateProjectForm = ({ onClose }) => {
  const {
    form,
    errors,
    loading,
    loadingCatalogs,
    academicAreas,
    projectTypes,
    handleChange,
    handleSubmit,
    isFormValid,
  } = useCreateProject();

  // UI
  return (
    <div className="bg-white flex flex-col w-full" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* HEADER */}
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

      {/* LOADING CATÁLOGOS */}
      {loadingCatalogs ? (
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            <p className="mt-4 text-gray-600">Cargando formulario...</p>
          </div>
        </div>
      ) : (
        <>
          {/* CONTENIDO DEL FORMULARIO */}
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

                  {/* Título */}
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
                      Objetivos Específicos
                    </label>
                    <textarea
                      name="specific_goals"
                      value={form.specific_goals}
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
                      name="project_type_id"
                      value={form.project_type_id}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                        errors.project_type_id
                          ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                      }`}
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      <option value="">Seleccione un tipo</option>
                      {projectTypes.map(type => (
                        <option key={type.type_id} value={type.type_id}>
                          {type.type_name}
                        </option>
                      ))}
                    </select>
                    {errors.project_type_id && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.project_type_id}</p>
                    )}
                  </div>

                  {/* Área Académica */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Área Académica <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="academic_area_id"
                      value={form.academic_area_id}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                        errors.academic_area_id
                          ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                      }`}
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      <option value="">Seleccione un área</option>
                      {academicAreas.map(area => (
                        <option key={area.area_id} value={area.area_id}>
                          {area.area_name}
                        </option>
                      ))}
                    </select>
                    {errors.academic_area_id && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.academic_area_id}</p>
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
                      Fecha Estimada de Fin <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="estimated_end_date"
                      value={form.estimated_end_date}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                        errors.estimated_end_date
                          ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                      }`}
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    />
                    {errors.estimated_end_date && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.estimated_end_date}</p>
                    )}
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

          {/* FOOTER - BOTONES */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Cancelar
            </button>
            <button
              onClick={() => handleSubmit(onClose)}
              disabled={!isFormValid() || loading}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                isFormValid() && !loading
                  ? "text-white hover:opacity-90 shadow-md"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              style={{
                fontFamily: 'Roboto, sans-serif',
                backgroundColor: isFormValid() && !loading ? '#1A386A' : undefined
              }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Guardando...
                </>
              ) : (
                'Guardar Proyecto'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};