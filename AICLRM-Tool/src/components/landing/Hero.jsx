import {
  ShieldCheck,
  Clock3,
  KeyRound,
  ArrowRight,
  ArrowDown,
  Plus,
  FileText,
  CheckCircle2,
} from 'lucide-react'
import Container from './Container'
import Button from '../Button'

function Hero() {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        className="pointer-events-none absolute -top-24 right-[-8%] h-[420px] w-[420px] rounded-full bg-accent/25 blur-[110px]"
        aria-hidden="true"
      />

      <Container className="relative flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary dark:text-accent">
          Built for the Indian job hunt
        </span>

        <h1 className="mt-6 max-w-3xl font-heading text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-5xl md:text-[56px]">
          Turn one resume into the letter every job description asks for.
        </h1>

        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-text-soft sm:text-[17px]">
          Paste your resume once. Paste any job description. Get a tailored cover letter
          and the exact keywords you&apos;re missing — in under thirty seconds.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button variant="primary" onClick={scrollToGenerator}>
            Start writing — it&apos;s free
            <ArrowRight size={17} />
          </Button>
          <button
            type="button"
            onClick={scrollToHowItWorks}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-[15px] font-medium text-text-soft transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            See how it works
            <ArrowDown size={15} />
          </button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-text-soft">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-secondary dark:text-accent" />
            No sign-up, nothing stored
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 size={16} className="text-secondary dark:text-accent" />
            Ready in ~30 seconds
          </span>
          <span className="inline-flex items-center gap-2">
            <KeyRound size={16} className="text-secondary dark:text-accent" />
            Flags missing keywords
          </span>
        </div>

        {/* Signature element: resume + job description converging into a tailored letter */}
        <div className="relative mt-16 w-full max-w-2xl">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
            <DocChip label="Resume" lines={['80%', '55%', '68%']} />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-secondary dark:bg-accent/15 dark:text-accent">
              <Plus size={15} />
            </span>
            <DocChip label="Job Description" lines={['90%', '60%', '75%']} align="right" />
          </div>

          <div className="mx-auto mt-3 h-8 w-px bg-border" aria-hidden="true" />

          <div className="rounded-2xl border-2 border-accent/40 bg-surface p-6 text-left shadow-[0_24px_60px_var(--shadow)] sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-text">
                <FileText size={16} className="text-secondary dark:text-accent" />
                Cover Letter — Draft
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-secondary dark:text-accent">
                <CheckCircle2 size={13} />
                8/10 keywords matched
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-2.5">
              <div className="h-2.5 w-[92%] rounded-full bg-border" />
              <div className="h-2.5 w-[78%] rounded-full bg-border" />
              <div className="h-2.5 w-[85%] rounded-full bg-border" />
              <div className="h-2.5 w-[64%] rounded-full bg-border" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function DocChip({ label, lines, align = 'left' }) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-4 shadow-sm ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-soft">
        {label}
      </span>
      <div className={`mt-2.5 flex flex-col gap-1.5 ${align === 'right' ? 'items-end' : 'items-start'}`}>
        {lines.map((width) => (
          <div key={width} className="h-2 rounded-full bg-border" style={{ width }} />
        ))}
      </div>
    </div>
  )
}

export default Hero