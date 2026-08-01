import { FileText, Sparkles } from 'lucide-react'
import Container from './Container'

function GeneratorPlaceholder() {
  return (
    <section
      id="generator"
      aria-labelledby="generator-heading"
      className="py-20 md:py-28"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary dark:text-accent">
            <Sparkles size={13} />
            Opening soon
          </span>
          <h2
            id="generator-heading"
            className="mt-5 font-heading text-2xl font-bold text-text sm:text-3xl"
          >
            Your resume and the job description meet here.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-text-soft">
            This is where you&apos;ll paste both and get a tailored letter back. We&apos;re
            wiring it up   here&apos;s a preview of the workspace.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-surface p-6 shadow-[0_16px_40px_var(--shadow)] sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <MockField label="Resume" lines={['85%', '60%', '72%']} />
            <MockField label="Job Description" lines={['95%', '70%', '55%']} />
          </div>

          <div className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-border/60 text-sm font-medium text-text-soft">
            <FileText size={16} />
            Generate cover letter
          </div>
        </div>
      </Container>
    </section>
  )
}

function MockField({ label, lines }) {
  return (
    <div className="rounded-xl border border-border bg-bg p-4 text-left">
      <span className="text-xs font-semibold uppercase tracking-wide text-text-soft">
        {label}
      </span>
      <div className="mt-3 flex flex-col gap-2">
        {lines.map((width) => (
          <div key={width} className="h-2.5 rounded-full bg-border" style={{ width }} />
        ))}
      </div>
    </div>
  )
}

export default GeneratorPlaceholder