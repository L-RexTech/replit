// Configure PDF.js
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

// Function to extract text from PDF file
export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
  }
  
  return fullText;
}

// Function to extract text from TXT file
export async function extractTextFromTxt(file: File): Promise<string> {
  return await file.text();
}
