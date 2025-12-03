import { jsPDF } from "jspdf";

/**
 * Función para generar el PDF del proyecto
 * @param {Object} project - Objeto con la información del proyecto
 */
export const generateProjectPDF = (project) => {
  // Crear instancia de jsPDF
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  let yPosition = 25; // Posición vertical inicial
  const margin = 25;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - (margin * 2);

  // ==================== HEADER CON LOGOS ====================
  // Nota: Para agregar las imágenes de los logos, necesitas convertirlas a base64
  // o usar doc.addImage() con las rutas
  
  // Título principal centrado
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.text('REPORTE DE PROYECTO', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Línea separadora
  doc.setDrawColor(59, 130, 246); // Color azul
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // ==================== INFORMACIÓN BÁSICA ====================
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Información General', margin, yPosition);
  yPosition += 8;

  // Título del proyecto
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Título:', margin, yPosition);
  doc.setFont(undefined, 'normal');
  const titleLines = doc.splitTextToSize(project.title, contentWidth - 30);
  doc.text(titleLines, margin + 30, yPosition);
  yPosition += (titleLines.length * 5) + 5;

  // Folio
  if (project.folio) {
    doc.setFont(undefined, 'bold');
    doc.text('Folio:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(project.folio, margin + 30, yPosition);
    yPosition += 7;
  }

  // Área
  if (project.area) {
    doc.setFont(undefined, 'bold');
    doc.text('Área:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(project.area, margin + 30, yPosition);
    yPosition += 7;
  }

  // Tipo
  if (project.type) {
    doc.setFont(undefined, 'bold');
    doc.text('Tipo:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(project.type, margin + 30, yPosition);
    yPosition += 7;
  }

  // Estado
  if (project.status) {
    doc.setFont(undefined, 'bold');
    doc.text('Estado:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(project.status, margin + 30, yPosition);
    yPosition += 7;
  }

  // Fecha de inicio
  if (project.date) {
    doc.setFont(undefined, 'bold');
    doc.text('Fecha de inicio:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(project.date, margin + 40, yPosition);
    yPosition += 7;
  }

  // Fecha de finalización
  if (project.endDate) {
    doc.setFont(undefined, 'bold');
    doc.text('Fecha de finalización:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(project.endDate, margin + 55, yPosition);
    yPosition += 7;
  }

  // Duración
  if (project.duration) {
    doc.setFont(undefined, 'bold');
    doc.text('Duración:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(project.duration, margin + 30, yPosition);
    yPosition += 7;
  }

  yPosition += 5;

  // ==================== RESPONSABLE ====================
  if (project.creator || project.creatorEmail || project.institution) {
    // Verificar si necesitamos nueva página
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(37, 99, 235); // Color azul
    doc.text('RESPONSABLE DEL PROYECTO', margin, yPosition);
    doc.setTextColor(0, 0, 0); // Volver a negro
    yPosition += 8;

    doc.setFontSize(12);

    if (project.creator) {
      doc.setFont(undefined, 'bold');
      doc.text('Nombre:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text(project.creator, margin + 30, yPosition);
      yPosition += 7;
    }

    if (project.creatorEmail) {
      doc.setFont(undefined, 'bold');
      doc.text('Correo:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text(project.creatorEmail, margin + 30, yPosition);
      yPosition += 7;
    }

    if (project.institution) {
      doc.setFont(undefined, 'bold');
      doc.text('Institución:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text(project.institution, margin + 30, yPosition);
      yPosition += 7;
    }

    yPosition += 5;
  }

  // ==================== DESCRIPCIÓN ====================
  // Verificar si necesitamos nueva página
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(37, 99, 235);
  doc.text('DESCRIPCIÓN DEL PROYECTO', margin, yPosition);
  doc.setTextColor(0, 0, 0);
  yPosition += 8;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  const descriptionText = project.fullDescription || project.description || 'Sin descripción';
  const descLines = doc.splitTextToSize(descriptionText, contentWidth);
  
  descLines.forEach((line) => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });

  yPosition += 5;

  // ==================== OBJETIVOS ====================
  if (project.generalObjective) {
    // Verificar si necesitamos nueva página
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('OBJETIVOS DEL PROYECTO', margin, yPosition);
    doc.setTextColor(0, 0, 0);
    yPosition += 8;

    // Objetivo General
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Objetivo General:', margin, yPosition);
    yPosition += 6;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    const generalObjLines = doc.splitTextToSize(project.generalObjective, contentWidth);
    
    generalObjLines.forEach((line) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });

    yPosition += 5;

    // Objetivos Específicos
    if (project.specificObjectives && project.specificObjectives.length > 0) {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('Objetivos Específicos:', margin, yPosition);
      yPosition += 6;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');

      project.specificObjectives.forEach((objective, index) => {
        if (yPosition > 265) {
          doc.addPage();
          yPosition = 20;
        }

        const objText = `${index + 1}. ${objective}`;
        const objLines = doc.splitTextToSize(objText, contentWidth - 5);
        
        objLines.forEach((line) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, margin + 5, yPosition);
          yPosition += 5;
        });

        yPosition += 2;
      });
    }

    yPosition += 5;
  }

  // ==================== COLABORADORES ====================
  if (project.collaborators) {
    // Verificar si necesitamos nueva página
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('COLABORADORES', margin, yPosition);
    doc.setTextColor(0, 0, 0);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    const collabLines = doc.splitTextToSize(project.collaborators, contentWidth);
    
    collabLines.forEach((line) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });
  }

  // ==================== PIE DE PÁGINA ====================
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    
    // Fecha de generación
    const fechaGeneracion = new Date().toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(
      `Generado el: ${fechaGeneracion}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 6,
      { align: 'center' }
    );
  }

  // ==================== GUARDAR PDF ====================
  const fileName = `Proyecto_${project.folio || 'sin-folio'}_${project.title.substring(0, 30).replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};