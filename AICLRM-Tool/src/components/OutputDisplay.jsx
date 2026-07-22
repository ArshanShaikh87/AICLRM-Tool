function OutputDisplay({ coverLetter, missingKeywords, loading, error }) {
  if (loading) {
    return (
      <div className="w-full rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
        <p className="text-[15px] text-gray-500 dark:text-gray-400">
          Generating cover letter...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full rounded-lg border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-6">
        <p className="text-[15px] font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      </div>
    )
  }

  if (!coverLetter) {
    return (
      <div className="w-full rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center">
        <p className="mb-2 text-2xl">✨</p>
        <p className="text-[15px] font-medium text-gray-900 dark:text-gray-100">
          Your generated cover letter will appear here.
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Paste your resume and job description, then click Generate.
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-left">
      <section className="flex flex-col gap-2">
        <h2 className="text-base font-medium text-gray-900 dark:text-gray-100">
          Generated Cover Letter
        </h2>
        <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
          {coverLetter}
        </p>
      </section>

      {missingKeywords && missingKeywords.length > 0 && (
        <section className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h2 className="text-base font-medium text-gray-900 dark:text-gray-100">
            Missing Keywords
          </h2>
          <ul className="flex flex-col gap-1">
            {missingKeywords.map((keyword) => (
              <li
                key={keyword}
                className="text-[15px] text-gray-700 dark:text-gray-300"
              >
                • {keyword}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default OutputDisplay