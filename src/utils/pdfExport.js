import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

/**
 * Exports a DOM element to a high-resolution PDF file.
 * Supports modern CSS colors including OKLCH, OKLAB, and CSS variables.
 * 
 * @param {string|HTMLElement} target - Element ID or HTMLElement to render
 * @param {string} filename - Download file name
 */
export async function exportElementToPdf(target, filename = 'document.pdf') {
  const element = typeof target === 'string' ? document.getElementById(target) : target;
  if (!element) {
    throw new Error(`Element "${target}" not found for PDF export`);
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  if (imgHeight <= pageHeight) {
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
  } else {
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  }

  pdf.save(filename);
}
