import { describe, it, expect, vi, beforeEach } from 'vitest'

const saveMock = vi.fn()
const addPageMock = vi.fn()

// Full module mock instead of prototype spying   jsPDF's save/addPage
// aren't plain prototype properties (plugin-based API), so vi.spyOn on
// jsPDF.prototype fails. Mocking the module lets us assert on our own
// pagination logic (in pdfExport.js) without depending on jsPDF's real
// internals or its heavy optional dependencies (canvg, html2canvas).
vi.mock('jspdf', () => {
  class MockJsPDF {
    constructor() {
      this.internal = {
        pageSize: {
          getWidth: () => 595.28,
          getHeight: () => 841.89,
        },
      }
    }
    setFont() {}
    setFontSize() {}
    // One "line" per word   deterministic and easy to force overflow
    // with a long paragraph, without needing real text-measurement.
    splitTextToSize(text) {
      return text.split(' ')
    }
    text() {}
    addPage(...args) {
      addPageMock(...args)
    }
    save(...args) {
      saveMock(...args)
    }
  }
  return { default: MockJsPDF }
})

const { downloadCoverLetterAsPdf } = await import('./pdfExport.js')

describe('downloadCoverLetterAsPdf', () => {
  beforeEach(() => {
    saveMock.mockClear()
    addPageMock.mockClear()
  })

  it('calls save with the default filename when none is provided', async () => {
    await downloadCoverLetterAsPdf('Dear Hiring Manager,\n\nThank you.')
    expect(saveMock).toHaveBeenCalledWith('Cover_Letter.pdf')
  })

  it('calls save with a custom filename', async () => {
    await downloadCoverLetterAsPdf('Some content here.', 'My_Letter')
    expect(saveMock).toHaveBeenCalledWith('My_Letter.pdf')
  })

  it('does not throw on multi-paragraph content', async () => {
    const text = 'Paragraph one.\n\nParagraph two.\n\nParagraph three.'
    await downloadCoverLetterAsPdf(text) // rejects → test fails automatically
  })

  it('adds extra pages when content is long enough to overflow one page', async () => {
    // ~2000 "lines" (one word each, per the mock's splitTextToSize)
    // comfortably exceeds one A4 page at 16pt line height.
    const longParagraph = 'word '.repeat(2000)
    await downloadCoverLetterAsPdf(longParagraph)
    expect(addPageMock).toHaveBeenCalled()
  })

  it('handles empty input without throwing', async () => {
    await downloadCoverLetterAsPdf('') // rejects → test fails automatically
  })
})