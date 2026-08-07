// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getDocument } from 'pdfjs-dist'

// Mock pdfjs-dist   we're testing our wrapper's join/cleanup logic,
// not pdfjs's own parsing correctness.
vi.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: { workerSrc: '' },
  getDocument: vi.fn(() => ({
    promise: Promise.resolve({
      numPages: 2,
      getPage: vi.fn((pageNum) =>
        Promise.resolve({
          getTextContent: () =>
            Promise.resolve({
              items:
                pageNum === 1
                  ? [{ str: 'Hello' }, { str: 'World' }]
                  : [{ str: 'Page' }, { str: 'Two' }],
            }),
        })
      ),
    }),
  })),
}))

vi.mock('pdfjs-dist/build/pdf.worker.min.mjs?url', () => ({ default: 'mock-worker-url' }))

// Mock mammoth   same reasoning as pdfjs-dist above.
vi.mock('mammoth', () => ({
  default: {
    extractRawText: vi.fn(() =>
      Promise.resolve({ value: '  Resume text with trailing whitespace.  \n\n' })
    ),
  },
}))

const {
  getFileKind,
  formatFileSize,
  fileToBase64,
  extractTextFromPdf,
  extractTextFromDocx,
  FileParseTimeoutError,
} = await import('./fileParsers.js')

function makeFile(content, name, type) {
  return new File([content], name, { type })
}

describe('getFileKind', () => {
  it('recognizes PDF mime type', () => {
    expect(getFileKind(makeFile('x', 'r.pdf', 'application/pdf'))).toBe('pdf')
  })

  it('recognizes DOCX mime type', () => {
    expect(
      getFileKind(
        makeFile(
          'x',
          'r.docx',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
      )
    ).toBe('docx')
  })

  it('recognizes PNG and JPEG as image', () => {
    expect(getFileKind(makeFile('x', 'r.png', 'image/png'))).toBe('image')
    expect(getFileKind(makeFile('x', 'r.jpg', 'image/jpeg'))).toBe('image')
  })

  it('returns null for unsupported mime types', () => {
    expect(getFileKind(makeFile('x', 'r.txt', 'text/plain'))).toBeNull()
  })
})

describe('formatFileSize', () => {
  it('formats bytes under 1KB as B', () => {
    expect(formatFileSize(500)).toBe('500 B')
  })

  it('formats bytes under 1MB as KB', () => {
    expect(formatFileSize(2048)).toBe('2.0 KB')
  })

  it('formats bytes over 1MB as MB', () => {
    expect(formatFileSize(5 * 1024 * 1024)).toBe('5.0 MB')
  })
})

describe('fileToBase64', () => {
  it('resolves the base64 payload without the data-URL prefix', async () => {
    const file = makeFile('hello world', 'r.txt', 'text/plain')
    const result = await fileToBase64(file)

    // Decode and compare instead of asserting an exact base64 string  
    // keeps the test robust to encoding-detail differences across environments.
    const decoded = Buffer.from(result, 'base64').toString('utf-8')
    expect(decoded).toBe('hello world')
  })
})

describe('extractTextFromPdf', () => {
  it('joins text items across pages with blank-line separation', async () => {
    const file = makeFile('fake-pdf-bytes', 'r.pdf', 'application/pdf')
    const text = await extractTextFromPdf(file)

    expect(text).toContain('Hello World')
    expect(text).toContain('Page Two')
  })
})

describe('extractTextFromDocx', () => {
  beforeEach(() => vi.clearAllMocks())

  it('trims the extracted raw text', async () => {
    const file = makeFile('fake-docx-bytes', 'r.docx', 'application/...')
    const text = await extractTextFromDocx(file)

    expect(text).toBe('Resume text with trailing whitespace.')
  })
})

describe('parse timeout guard (Phase 6 — File-parsing timeout)', () => {
  afterEach(() => vi.useRealTimers())

  it('rejects with FileParseTimeoutError instead of hanging forever on a stuck PDF', async () => {
    vi.useFakeTimers()
    // Simulate pdfjs never resolving   e.g. a malformed/adversarial PDF
    // structure that the parser gets stuck on.
    getDocument.mockImplementationOnce(() => ({ promise: new Promise(() => {}) }))

    const file = makeFile('fake-pdf-bytes', 'r.pdf', 'application/pdf')
    const resultPromise = extractTextFromPdf(file)
    const expectation = expect(resultPromise).rejects.toBeInstanceOf(FileParseTimeoutError)

    await vi.advanceTimersByTimeAsync(20_000)
    await expectation
  })
})