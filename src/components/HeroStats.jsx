/**
 * HeroStats
 * Muestra el título principal y las tarjetas de resumen estadístico.
 * Recibe los datos numéricos como 'props' para no tener lógica compleja aquí.
 */
export const HeroStats = ({ stats }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Título y Descripción */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Hola, bienvenido al Repositorio de Proyectos.
          </h2>
          <p className="text-lg text-slate-600">
            Explora la innovación académica, investigaciones y proyectos de vinculación de nuestra comunidad docente.
          </p>
        </div>

        {/* Grid de Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          
          <StatBox 
            count={stats.total} 
            label="Total Proyectos" 
            colors="bg-blue-50 border-blue-100 text-blue-700 text-blue-900" 
          />
          <StatBox 
            count={stats.vigentes} 
            label="Vigentes" 
            colors="bg-green-50 border-green-100 text-green-700 text-green-900" 
          />
          <StatBox 
            count={stats.enCurso} 
            label="En Curso" 
            colors="bg-amber-50 border-amber-100 text-amber-700 text-amber-900" 
          />
          <StatBox 
            count={stats.finalizados} 
            label="Finalizados" 
            colors="bg-purple-50 border-purple-100 text-purple-700 text-purple-900" 
          />

        </div>
      </div>
    </div>
  );
};

// Sub-componente interno para evitar repetir código HTML en las cajitas
const StatBox = ({ count, label, colors }) => {
  // Desestructuramos las clases de color para aplicarlas
  // Nota: 'colors' viene como string completo, ej: "bg-blue-50 ..."
  // Para hacerlo más limpio en React puro podríamos pasar props individuales, 
  // pero mantendremos la simplicidad visual.
  
  // Extraemos las clases de texto específicas (un hack rápido para reutilizar tu string de clases)
  const bgClass = colors.split(' ')[0];
  const borderClass = colors.split(' ')[1];
  const numberClass = colors.split(' ')[2];
  const textClass = colors.split(' ')[3];

  return (
    <div className={`${bgClass} border ${borderClass} p-4 rounded-xl text-center`}>
      <span className={`block text-3xl font-bold ${numberClass}`}>
        {count}
      </span>
      <span className={`text-sm font-medium ${textClass}`}>
        {label}
      </span>
    </div>
  );
};