import Card from './Card'
import Spinner from './Spinner'
import CopyButton from './CopyButton'
import DownloadPdfButton from './DownloadPdfButton'
import { getErrorMessage } from '../utils/errorMessages'

function OutputDisplay({ coverLetter, missingKeywords, loading, error }) {
  if (loading) {
    return (
      <Card className="w-full text-center">
        <Spinner size="lg" className="mx-auto mb-3 text-accent" />
        <p className="text-[15px] text-text-soft">
          Generating cover letter...
        </p>
      </Card>
    )
  }

  if (error) {
    return (
      <div className="w-full rounded-lg border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-6">
        <p className="text-[15px] font-medium text-red-600 dark:text-red-400">
          {getErrorMessage(error)}
        </p>
      </div>
    )
  }

  if (!coverLetter) {
    return (
      <Card className="w-full border-dashed p-10 text-center shadow-none">
        <p className="mb-2 text-2xl">✨</p>
        <p className="text-[15px] font-medium text-text">
          Your generated cover letter will appear here.
        </p>
        <p className="mt-1 text-sm text-text-soft">
          Paste your resume and job description, then click Generate.
        </p>
      </Card>
    )
  }

  // Split on blank lines so each paragraph renders as its own block —
  // more reliable across screen sizes than a single pre-wrap blob.
  const paragraphs = coverLetter.split(/\n{2,}/).filter(Boolean)

  return (
    <Card className="flex w-full flex-col gap-6 text-left">
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-medium text-text">
            Generated Cover Letter
          </h2>
          <div className="flex items-center gap-2">
            <CopyButton text={coverLetter} />
            <DownloadPdfButton text={coverLetter} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {paragraphs.map((paragraph, index) => (
            <p
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="whitespace-pre-line text-[15px] leading-relaxed text-text"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {missingKeywords && missingKeywords.length > 0 && (
        <section className="flex flex-col gap-2 border-t border-border pt-4">
          <h2 className="text-base font-medium text-text">
            Missing Keywords
          </h2>
          <ul className="flex flex-col gap-1">
            {missingKeywords.map((keyword) => (
              <li
                key={keyword}
                className="text-[15px] text-text"
              >
                • {keyword}
              </li>
            ))}
          </ul>
        </section>
      )}
    </Card>
  )
}

export default OutputDisplay