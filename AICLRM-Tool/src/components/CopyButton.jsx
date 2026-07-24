import { useState } from 'react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API can fail (permissions, insecure context, etc.)
      // Fail silently — copy is a convenience, not a critical path.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="self-start rounded-md border border-gray-200 dark:border-gray-700
                 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300
                 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800
                 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}

export default CopyButton