/**
 * ProjectAdditionalInfo
 * Componente que muestra información adicional del proyecto (presupuesto, colaboradores)
 */
export const ProjectAdditionalInfo = ({ budget, collaborators, duration }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Información Adicional
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Presupuesto */}
        {budget && (
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Presupuesto
            </h3>
            <p className="text-slate-700 text-2xl font-bold text-blue-600">
              {budget}
            </p>
          </div>
        )}
        
        {/* Colaboradores */}
        {collaborators && (
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Colaboradores
            </h3>
            <p className="text-slate-700">
              {collaborators}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};