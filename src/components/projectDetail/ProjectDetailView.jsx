import { ProjectHeader } from './ProjectHeader';
import { ProjectInfo } from './ProjectInfo';
import { ProjectObjectives } from './ProjectObjectives';
import { ProjectTeam } from './ProjectTeam';
import { ProjectAdditionalInfo } from './ProjectAdditionalInfo';

/**
 * ProjectDetailView
 * Componente principal que orquesta la vista detallada del proyecto
 * Importa y organiza todos los sub-componentes
 */
export const ProjectDetailView = ({ project, onBack }) => {
  
  const handleDownloadPDF = () => {
    // Aquí implementarás la lógica de descarga del PDF
    // Puede ser una llamada a tu API para generar/descargar el PDF
    alert('Función de descarga de PDF - Aquí implementarás la descarga del documento');
    
    // Ejemplo de implementación futura:
    // window.open(`/api/projects/${project.id}/download-pdf`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header con logos y botón de regreso */}
      <ProjectHeader onBack={onBack} />

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          
          {/* Información principal del proyecto */}
          <ProjectInfo 
            project={project} 
            onDownloadPDF={handleDownloadPDF} 
          />
          
          {/* Grid con objetivos y equipo */}
          <div className="grid md:grid-cols-2 gap-6">
            <ProjectObjectives objectives={project.objectives} />
            <ProjectTeam team={project.team} />
          </div>

          {/* Información adicional */}
          <ProjectAdditionalInfo 
            budget={project.budget} 
            collaborators={project.collaborators}
            duration={project.duration}
          />
        </div>
      </div>
    </div>
  );
};