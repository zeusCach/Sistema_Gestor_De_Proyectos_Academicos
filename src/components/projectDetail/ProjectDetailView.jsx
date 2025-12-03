import { ProjectHeader } from './ProjectHeader';
import { ProjectInfo } from './ProjectInfo';
import { ProjectObjectives } from './ProjectObjectives';
import { ProjectAdditionalInfo } from './ProjectAdditionalInfo';
import { generateProjectPDF } from '../../utils/pdfGenerator';

/**
 * ProjectDetailView
 * Componente principal que orquesta la vista detallada del proyecto
 * Importa y organiza todos los sub-componentes
 */
export const ProjectDetailView = ({ project, onBack }) => {
  
  const handleDownloadPDF = () => {
    generateProjectPDF(project);
  };

  // Combinar objetivo general con objetivos específicos
  const allObjectives = project.specificObjectives 
    ? [project.generalObjective, ...project.specificObjectives]
    : [project.generalObjective];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header con logos y botón de regreso */}
      <ProjectHeader onBack={onBack} />

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          
          {/* Información principal del proyecto (incluye responsable) */}
          <ProjectInfo 
            project={project} 
            onDownloadPDF={handleDownloadPDF} 
          />
          
          {/* Objetivos */}
          <ProjectObjectives 
            objectives={allObjectives}
            generalObjective={project.generalObjective}
          />

          {/* Colaboradores externos (si existen) */}
          <ProjectAdditionalInfo 
            collaborators={project.collaborators}
          />
        </div>
      </div>
    </div>
  );
};