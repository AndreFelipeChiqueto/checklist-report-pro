import jsPDF from 'jspdf';
import { InspectionData, InspectionItem } from '@/types/inspection';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const addHeader = (doc: jsPDF, title: string, info: InspectionData['generalInfo']) => {
  doc.setFillColor(26, 54, 93);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 15, 18);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Elevador: ${info.elevatorNumber} | Cliente: ${info.client}`, 15, 28);
  doc.text(`Data: ${formatDate(info.date)} | Auditor: ${info.auditor}`, 15, 35);
  
  doc.setTextColor(0, 0, 0);
  
  return 50;
};

const addFooter = (doc: jsPDF, pageNumber: number) => {
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(`Página ${pageNumber}`, 105, pageHeight - 10, { align: 'center' });
  doc.text(`Gerado em ${new Date().toLocaleString('pt-BR')}`, 105, pageHeight - 5, { align: 'center' });
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'conforme': return 'CONFORME';
    case 'nao_conforme': return 'NÃO CONFORME';
    case 'nao_aplicavel': return 'N/A';
    default: return 'PENDENTE';
  }
};

const getStatusColor = (status: string): [number, number, number] => {
  switch (status) {
    case 'conforme': return [34, 139, 34];
    case 'nao_conforme': return [220, 53, 69];
    case 'nao_aplicavel': return [128, 128, 128];
    default: return [255, 193, 7];
  }
};

const addImageToPDF = (doc: jsPDF, imageUrl: string, yPos: number, pageNumber: { value: number }): number => {
  try {
    const imgWidth = 60;
    const imgHeight = 45;
    
    if (yPos + imgHeight > 270) {
      addFooter(doc, pageNumber.value);
      doc.addPage();
      pageNumber.value++;
      yPos = 20;
    }
    
    doc.addImage(imageUrl, 'JPEG', 15, yPos, imgWidth, imgHeight);
    return yPos + imgHeight + 5;
  } catch (error) {
    console.error('Erro ao adicionar imagem:', error);
    return yPos;
  }
};

export const generateCompletePDF = async (data: InspectionData): Promise<Blob> => {
  const doc = new jsPDF();
  let yPos = addHeader(doc, 'Relatório Completo de Inspeção', data.generalInfo);
  const pageNumber = { value: 1 };
  
  // General Info Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(26, 54, 93);
  doc.text('Informações Gerais', 15, yPos);
  yPos += 8;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  
  const infoLines = [
    `Cliente: ${data.generalInfo.client}`,
    `Endereço: ${data.generalInfo.address}`,
    `Elevador: ${data.generalInfo.elevatorNumber} | Velocidade: ${data.generalInfo.speed} | Paradas: ${data.generalInfo.stops}`,
    `Capacidade: ${data.generalInfo.capacityKg} kg / ${data.generalInfo.capacityPassengers} passageiros`,
    `Modelo do Comando: ${data.generalInfo.commandModel}`,
    `Supervisor: ${data.generalInfo.supervisor} | Montador: ${data.generalInfo.assemblerName}`,
  ];
  
  infoLines.forEach(line => {
    doc.text(line, 15, yPos);
    yPos += 5;
  });
  
  yPos += 5;
  
  // Sections
  for (const section of data.sections) {
    if (yPos > 250) {
      addFooter(doc, pageNumber.value);
      doc.addPage();
      pageNumber.value++;
      yPos = 20;
    }
    
    doc.setFillColor(240, 240, 240);
    doc.rect(10, yPos - 5, 190, 10, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 54, 93);
    doc.text(`${section.code} - ${section.title}`, 15, yPos + 2);
    yPos += 12;
    
    for (const item of section.items) {
      if (yPos > 260) {
        addFooter(doc, pageNumber.value);
        doc.addPage();
        pageNumber.value++;
        yPos = 20;
      }
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${item.code} - ${item.title}`, 15, yPos);
      
      const statusColor = getStatusColor(item.status);
      doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.text(getStatusText(item.status), 170, yPos);
      
      yPos += 5;
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      const descLines = doc.splitTextToSize(item.description, 150);
      doc.text(descLines, 15, yPos);
      yPos += descLines.length * 4;
      
      if (item.comment) {
        doc.setTextColor(80, 80, 80);
        doc.setFont('helvetica', 'italic');
        const commentLines = doc.splitTextToSize(`Comentário: ${item.comment}`, 150);
        doc.text(commentLines, 15, yPos);
        yPos += commentLines.length * 4;
      }
      
      // Add photo if exists
      if (item.photoUrl) {
        yPos += 2;
        yPos = addImageToPDF(doc, item.photoUrl, yPos, pageNumber);
      }
      
      yPos += 3;
    }
    
    yPos += 5;
  }
  
  // Client observations
  if (data.clientObservations.length > 0) {
    if (yPos > 240) {
      addFooter(doc, pageNumber.value);
      doc.addPage();
      pageNumber.value++;
      yPos = 20;
    }
    
    doc.setFillColor(255, 243, 205);
    doc.rect(10, yPos - 5, 190, 10, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(133, 100, 4);
    doc.text('Observações do Cliente', 15, yPos + 2);
    yPos += 12;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    data.clientObservations.forEach((obs) => {
      doc.text(`• ${obs}`, 15, yPos);
      yPos += 6;
    });
  }
  
  addFooter(doc, pageNumber.value);
  
  return doc.output('blob');
};

export const generatePendingPDF = async (data: InspectionData): Promise<Blob> => {
  const doc = new jsPDF();
  let yPos = addHeader(doc, 'Relatório de Pendências', data.generalInfo);
  const pageNumber = { value: 1 };
  
  const pendingItems: { section: string; item: InspectionItem }[] = [];
  
  data.sections.forEach(section => {
    section.items.forEach(item => {
      if (item.status === 'nao_conforme') {
        pendingItems.push({ section: section.title, item });
      }
    });
  });
  
  if (pendingItems.length === 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(34, 139, 34);
    doc.text('Nenhuma pendência encontrada!', 105, yPos + 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Todos os itens estão conformes ou não aplicáveis.', 105, yPos + 30, { align: 'center' });
  } else {
    // Summary
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(254, 226, 226);
    doc.rect(10, yPos - 5, 190, 15, 'F');
    doc.setTextColor(185, 28, 28);
    doc.text(`Total de Pendências: ${pendingItems.length}`, 15, yPos + 3);
    yPos += 20;
    
    let currentSection = '';
    
    for (const { section, item } of pendingItems) {
      if (yPos > 240) {
        addFooter(doc, pageNumber.value);
        doc.addPage();
        pageNumber.value++;
        yPos = 20;
      }
      
      if (section !== currentSection) {
        currentSection = section;
        doc.setFillColor(240, 240, 240);
        doc.rect(10, yPos - 5, 190, 10, 'F');
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(26, 54, 93);
        doc.text(section, 15, yPos + 2);
        yPos += 12;
      }
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(220, 53, 69);
      doc.text(`${item.code} - ${item.title}`, 15, yPos);
      yPos += 6;
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      const descLines = doc.splitTextToSize(item.description, 180);
      doc.text(descLines, 15, yPos);
      yPos += descLines.length * 4 + 2;
      
      if (item.comment) {
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'italic');
        const commentLines = doc.splitTextToSize(`Observação: ${item.comment}`, 180);
        doc.text(commentLines, 15, yPos);
        yPos += commentLines.length * 4;
      }
      
      // Add photo if exists
      if (item.photoUrl) {
        yPos += 2;
        yPos = addImageToPDF(doc, item.photoUrl, yPos, pageNumber);
      }
      
      // Separator
      doc.setDrawColor(220, 220, 220);
      doc.line(15, yPos, 195, yPos);
      yPos += 8;
    }
  }
  
  // Client observations
  if (data.clientObservations.length > 0) {
    if (yPos > 240) {
      addFooter(doc, pageNumber.value);
      doc.addPage();
      pageNumber.value++;
      yPos = 20;
    }
    
    doc.setFillColor(255, 243, 205);
    doc.rect(10, yPos - 5, 190, 10, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(133, 100, 4);
    doc.text('Pendências do Cliente', 15, yPos + 2);
    yPos += 12;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    data.clientObservations.forEach((obs) => {
      doc.text(`• ${obs}`, 15, yPos);
      yPos += 6;
    });
  }
  
  addFooter(doc, pageNumber.value);
  
  return doc.output('blob');
};

export const downloadPDF = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
