import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export async function generatePDF(
  elementId: string,
  filename: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    alert("Invoice preview not found. Please make sure the preview is visible.");
    return;
  }

  try {
    // A4 dimensions in mm
    const a4Width = 210;
    const a4Height = 297;

    // Render at high quality
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = a4Width;
    const pdfHeight = a4Height;

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Scale to fit A4 width
    const ratio = pdfWidth / imgWidth;
    const scaledHeight = imgHeight * ratio;

    // If content fits on one page
    if (scaledHeight <= pdfHeight) {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, scaledHeight);
    } else {
      // Split across multiple pages
      const pageCanvasHeight = pdfHeight / ratio;
      let yOffset = 0;
      let pageIndex = 0;

      while (yOffset < imgHeight) {
        const remainingHeight = imgHeight - yOffset;
        const currentPageHeight = Math.min(pageCanvasHeight, remainingHeight);

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = currentPageHeight;

        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(
            canvas,
            0,
            yOffset,
            imgWidth,
            currentPageHeight,
            0,
            0,
            imgWidth,
            currentPageHeight
          );
        }

        const pageImgData = pageCanvas.toDataURL("image/png");
        if (pageIndex > 0) pdf.addPage();

        const pageScaledHeight = currentPageHeight * ratio;
        pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, pageScaledHeight);

        yOffset += pageCanvasHeight;
        pageIndex++;
      }
    }

    pdf.save(filename);
  } catch (error) {
    console.error("PDF generation failed:", error);
    alert("Failed to generate PDF. Please try again.");
  }
}