export const ACCEPTED_MIME_TYPES = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'image/png': 'image',
  'image/jpeg': 'image',
}

export function getFileKind(file) {
  return ACCEPTED_MIME_TYPES[file.type] || null
}

let pdfjsLibPromise = null

/**
 * Lazily loads pdfjs-dist (and its worker) only when a PDF is actually
 * uploaded. This library previously sat in the main bundle for every
 * visitor, even those who never touch a PDF   see docs/Do_and_Dont.md
 * Phase 5. Cached in a module-level promise so repeated PDF uploads in
 * the same session don't re-fetch the chunk.
 */
function loadPdfjs() {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = Promise.all([
      import('pdfjs-dist'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
    ]).then(([pdfjsLib, workerUrl]) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl.default
      return pdfjsLib
    })
  }
  return pdfjsLibPromise
}

export async function extractTextFromPdf(file) {
  const pdfjsLib = await loadPdfjs()
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  let fullText = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    fullText += content.items.map((item) => item.str).join(' ') + '\n\n'
  }

  return fullText
    .replace(/[ \t]{2,}/g, ' ')   // multiple spaces → single space
    .replace(/\n{3,}/g, '\n\n')  // extra blank lines collapse
    .trim()
}

export async function extractTextFromDocx(file) {
  // Same lazy-load reasoning as pdfjs-dist above.
  const { default: mammoth } = await import('mammoth')
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value.trim()
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}