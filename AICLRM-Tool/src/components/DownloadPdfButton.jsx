import { useState } from 'react'
import { Download, Check } from 'lucide-react'
import { downloadCoverLetterAsPdf } from '../utils/pdfExport'

function DownloadPdfButton({ text, fileName = 'Cover_Letter' }) {
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    try {
      downloadCoverLetterAsPdf(text, fileName)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2000)
    } catch {
      // PDF generation is a convenience feature   fail silently,
      // Copy remains the guaranteed fallback.
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center gap-1.5 self-start rounded-md border border-border
                 px-3 py-1.5 text-xs font-medium text-text
                 transition-colors hover:bg-surface
                 focus:outline-none focus:ring-2 focus:ring-accent/40"
    >
      {downloaded ? <Check size={13} /> : <Download size={13} />}
      {downloaded ? 'Downloaded ✓' : 'Download PDF'}
    </button>
  )
}

export default DownloadPdfButton