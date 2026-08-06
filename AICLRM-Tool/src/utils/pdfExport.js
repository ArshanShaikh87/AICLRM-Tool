const PAGE_MARGIN = 56 // ~0.75in in pt, jsPDF default unit is pt
const FONT_SIZE = 11
const LINE_HEIGHT = 16
const FONT_FAMILY = 'times'

let jsPDFPromise = null

/**
 * Lazily loads jsPDF (and its own optional deps: canvg, html2canvas) only
 * when the user actually clicks "Download PDF"   see docs/Do_and_Dont.md
 * Phase 5. Cached so repeated downloads in the same session don't refetch.
 */
function loadJsPDF() {
  if (!jsPDFPromise) {
    jsPDFPromise = import('jspdf').then((mod) => mod.default)
  }
  return jsPDFPromise
}

/**
 * Generates and downloads a cover letter as a formatted, selectable-text PDF.
 *
 * @param {string} coverLetterText   the full letter, paragraphs separated by \n\n
 * @param {string} [fileName]   without extension
 * @returns {Promise<void>}
 */
export async function downloadCoverLetterAsPdf(coverLetterText, fileName = 'Cover_Letter') {
  const jsPDF = await loadJsPDF()
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const usableWidth = pageWidth - PAGE_MARGIN * 2

  doc.setFont(FONT_FAMILY, 'normal')
  doc.setFontSize(FONT_SIZE)

  const paragraphs = coverLetterText.split(/\n{2,}/).filter(Boolean)

  let cursorY = PAGE_MARGIN

  paragraphs.forEach((paragraph, index) => {
    const lines = doc.splitTextToSize(paragraph.trim(), usableWidth)

    lines.forEach((line) => {
      if (cursorY + LINE_HEIGHT > pageHeight - PAGE_MARGIN) {
        doc.addPage()
        cursorY = PAGE_MARGIN
      }
      doc.text(line, PAGE_MARGIN, cursorY)
      cursorY += LINE_HEIGHT
    })

    // Space between paragraphs (skip after the last one)
    if (index < paragraphs.length - 1) {
      cursorY += LINE_HEIGHT * 0.6
    }
  })

  doc.save(`${fileName}.pdf`)
}