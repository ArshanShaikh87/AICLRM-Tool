import { useRef, useState } from 'react'
import CharacterCounter from './CharacterCounter'
import { RESUME_MAX_LENGTH } from '../constants/limits'
import { Upload, FileText, Image as ImageIcon, X, Loader2, CheckCircle2, RefreshCw } from 'lucide-react'
import {
  getFileKind,
  extractTextFromPdf,
  extractTextFromDocx,
  fileToBase64,
  formatFileSize,
} from '../utils/fileParsers'

const ACCEPT_ATTR = '.pdf,.docx,.png,.jpg,.jpeg'
const MAX_SIZE_MB = 8

const KIND_META = {
  pdf: { icon: FileText, label: 'PDF', color: 'text-red-500 bg-red-500/10' },
  docx: {
    icon: FileText,
    label: 'DOCX',
    color: 'text-secondary bg-secondary/10 dark:text-accent dark:bg-accent/15',
  },
  image: { icon: ImageIcon, label: 'Image', color: 'text-emerald-500 bg-emerald-500/10' },
}

function ResumeUpload({ resumeText, onTextExtracted, onImageExtracted, onClear }) {
  const inputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [parsing, setParsing] = useState(false)
  const [fileMeta, setFileMeta] = useState(null) // { name, size, kind }
  const [error, setError] = useState('')
  const [showPasteFallback, setShowPasteFallback] = useState(false)

  const openPicker = () => inputRef.current?.click()

  const handleFile = async (file) => {
    setError('')
    const kind = getFileKind(file)

    if (!kind) {
      setError('Unsupported file type. Please upload a PDF, DOCX, PNG, or JPEG.')
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${MAX_SIZE_MB}MB.`)
      return
    }

    setParsing(true)
    setFileMeta({ name: file.name, size: file.size, kind })

    try {
      if (kind === 'pdf') {
        onTextExtracted(await extractTextFromPdf(file))
      } else if (kind === 'docx') {
        onTextExtracted(await extractTextFromDocx(file))
      } else if (kind === 'image') {
        const base64 = await fileToBase64(file)
        onImageExtracted({ base64, mimeType: file.type })
      }
    } catch {
      setError('Could not read this file. Try a different file, or paste your resume text instead.')
      setFileMeta(null)
    } finally {
      setParsing(false)
    }
  }

  const handleInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleClear = () => {
    setFileMeta(null)
    setError('')
    onClear()
  }

  // ── Active Resume Card (file already uploaded) ──────────────────────
  if (fileMeta) {
    const { icon: Icon, label, color } = KIND_META[fileMeta.kind]

    return (
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3.5">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${color}`}>
            {parsing ? <Loader2 size={18} className="animate-spin" /> : <Icon size={18} />}
          </span>

          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium text-text">{fileMeta.name}</span>
            <span className="text-xs text-text-soft">
              {label} · {formatFileSize(fileMeta.size)}
            </span>
          </div>

          {!parsing && (
            <span className="hidden shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-secondary dark:text-accent sm:inline-flex">
              <CheckCircle2 size={12} />
              Active Resume
            </span>
          )}

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={openPicker}
              aria-label="Replace resume"
              className="flex h-8 w-8 items-center justify-center rounded-md text-text-soft transition-colors hover:bg-bg hover:text-text"
            >
              <RefreshCw size={15} />
            </button>
            <button
              type="button"
              onClick={handleClear}
              aria-label="Remove resume"
              className="flex h-8 w-8 items-center justify-center rounded-md text-text-soft transition-colors hover:bg-bg hover:text-text"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {fileMeta.kind === 'image' && !parsing && (
          <p className="text-xs text-text-soft">
            We&apos;ll read your resume directly from the image   no manual retyping needed.
          </p>
        )}
        {fileMeta.kind !== 'image' && !parsing && (
          <div className="flex items-center justify-between">
            <CharacterCounter current={resumeText.length} max={RESUME_MAX_LENGTH} />
            {resumeText.length > RESUME_MAX_LENGTH && (
              <span className="text-xs font-medium text-red-500">
                Too long   please shorten your resume
              </span>
            )}
          </div>
        )}

        {error && <p className="text-xs font-medium text-red-500">{error}</p>}

        <input ref={inputRef} type="file" accept={ACCEPT_ATTR} onChange={handleInputChange} className="hidden" />
      </div>
    )
  }

  // ── Empty state   dropzone ───────────────────────────────────────────
  return (
    <div className="flex w-full flex-col gap-2">
      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openPicker()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`flex w-full cursor-pointer flex-col items-center gap-2.5 rounded-lg border-2 border-dashed p-8 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${dragActive ? 'border-accent bg-accent/10' : 'border-border bg-bg hover:bg-surface'
          }`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary dark:bg-accent/15 dark:text-accent">
          <Upload size={18} />
        </span>
        <p className="text-sm font-medium text-text">Drop your resume here, or click to browse</p>
        <p className="text-xs text-text-soft">PDF, DOCX, PNG, or JPEG · up to {MAX_SIZE_MB}MB</p>
      </div>

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}

      <button
        type="button"
        onClick={() => setShowPasteFallback((prev) => !prev)}
        className="self-start text-xs font-medium text-secondary underline underline-offset-2 dark:text-accent"
      >
        {showPasteFallback ? 'Hide text paste option' : 'Or paste resume text instead'}
      </button>

      {showPasteFallback && (
        <textarea
          value={resumeText}
          onChange={(e) => onTextExtracted(e.target.value)}
          placeholder="Paste your resume text here..."
          rows={8}
          className="mt-1 w-full resize-y rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] leading-relaxed text-text placeholder-text-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:border-accent"
        />
      )}
      {showPasteFallback && (
        <CharacterCounter
          current={resumeText.length}
          max={RESUME_MAX_LENGTH}
          className="self-end"
        />
      )}

      <input ref={inputRef} type="file" accept={ACCEPT_ATTR} onChange={handleInputChange} className="hidden" />
    </div>
  )
}

export default ResumeUpload