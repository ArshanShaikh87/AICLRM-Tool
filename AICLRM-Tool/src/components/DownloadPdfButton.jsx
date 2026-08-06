import { useState } from 'react'
import { Download, Check, Loader2 } from 'lucide-react'
import { downloadCoverLetterAsPdf } from '../utils/pdfExport'

function DownloadPdfButton({ text, fileName = 'Cover_Letter' }) {
  const [downloaded, setDownloaded] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      // jsPDF loads lazily on first use   this await now also covers
      // that one-time chunk download, not just PDF generation itself.
      await downloadCoverLetterAsPdf(text, fileName)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2000)
    } catch {
      // PDF generation is a convenience feature   fail silently,
      // Copy remains the guaranteed fallback.
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-1.5 self-start rounded-md border border-border
                 px-3 py-1.5 text-xs font-medium text-text
                 transition-colors hover:bg-surface
                 focus:outline-none focus:ring-2 focus:ring-accent/40
                 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <Loader2 size={13} className="animate-spin" />
      ) : downloaded ? (
        <Check size={13} />
      ) : (
        <Download size={13} />
      )}
      {loading ? 'Preparing...' : downloaded ? 'Downloaded ✓' : 'Download PDF'}
    </button>
  )
}

export default DownloadPdfButton