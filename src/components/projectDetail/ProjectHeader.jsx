import { ArrowLeft } from "lucide-react";
import Logo_isc from "../../assets/Logo_isc.png"; // CORRECTO
import logo_TecNM from "../../assets/logo_TecNM.png"; // CORRECTO
import logo_educacion from "../../assets/logo_educacion.png"; // CORRECTO

/**
 * ProjectHeader
 * Componente del header con logos institucionales y botón de regreso
 */
export const ProjectHeader = ({ onBack }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          
          {/* Logos institucionales */}
          <div className="flex items-center gap-6">
            {/* Logo 1 - Instituto Tecnológico Felipe Carrillo Puerto */}
            <img 
              src={logo_TecNM}
              alt="Instituto Tecnológico Felipe Carrillo Puerto"
              className="h-20 object-contain"
            />
            
            {/* Logo 2 - SEP */}
            <img 
              src={logo_educacion} 
              alt="Secretaría de Educación Pública"
              className="h-20 object-contain"
            />
            
            {/* Logo 3 - Ingeniería en Sistemas */}
            <img 
              src={Logo_isc} 
              alt="Ingeniería en Sistemas Computacionales"
              className="h-20 object-contain"
            />
          </div>
          
          {/* Botón de regreso */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <ArrowLeft size={20} />
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};