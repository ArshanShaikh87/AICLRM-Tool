import { Sparkles, ShieldCheck, Clock3, FileText, ArrowRight } from 'lucide-react'
import Container from './Container'

function Hero() {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="pt-24 pb-24 md:pt-32 md:pb-32">
      <Container className="flex flex-col items-center text-center">
        <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
          <Sparkles size={16} />
          AI Powered
        </span>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
          Create Tailored Cover Letters
          <br />
          That Get You Noticed
        </h1>

        <p className="mt-6 max-w-xl text-base text-gray-600 sm:text-lg dark:text-gray-400">
          Generate personalized, ATS-friendly cover letters in seconds using AI. Match every
          job application with confidence.
        </p>

        <button
          type="button"
          onClick={scrollToGenerator}
          aria-label="Get started"
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[#ff4d05] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e64504] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d05] focus-visible:ring-offset-2"
        >
          Get Started
          <ArrowRight size={18} />
        </button>

        <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <ShieldCheck size={18} />
            Privacy First
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock3 size={18} />
            30 Second Generation
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FileText size={18} />
            ATS Friendly
          </div>
        </div>

        <div className="mt-16 w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Resume
              </span>
              <div className="h-3 w-3/4 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-3 w-1/2 rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Job Description
              </span>
              <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-3 w-2/3 rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>

            <div className="h-10 w-full rounded-xl bg-[#ff4d05]/20 dark:bg-[#ff4d05]/20" />

            <div className="flex flex-col gap-2 border-t border-gray-200 pt-6 dark:border-gray-800">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Cover Letter
              </span>
              <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-3 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero