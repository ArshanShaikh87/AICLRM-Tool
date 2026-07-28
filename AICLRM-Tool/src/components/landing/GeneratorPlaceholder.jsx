import Container from './Container'

function GeneratorPlaceholder() {
  return (
    <section
      id="generator"
      aria-labelledby="generator-placeholder-heading"
      className="flex min-h-[400px] items-center justify-center border-t border-gray-200 dark:border-gray-800"
    >
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2
          id="generator-placeholder-heading"
          className="text-2xl font-medium text-gray-900 dark:text-gray-100"
        >
          Generator Coming Soon
        </h2>
        <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">
          This section will contain the AI Cover Letter Generator.
        </p>
      </Container>
    </section>
  )
}

export default GeneratorPlaceholder