import Container from './Container'

const STEPS = [
  {
    n: '01',
    title: 'Paste your resume',
    body: 'Once per session — it stays active while you try different roles.',
  },
  {
    n: '02',
    title: 'Paste the job description',
    body: 'Straight from the listing. No reformatting needed.',
  },
  {
    n: '03',
    title: 'Generate, then copy',
    body: 'Get your letter and the keywords you are missing in one pass.',
  },
]

function HowItWorks() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary dark:text-accent">
            How it works
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-4xl">
            Three steps, no detours
          </h2>
        </div>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-border sm:block"
            aria-hidden="true"
          />
          {STEPS.map(({ n, title, body }) => (
            <div
              key={n}
              className="relative flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-bg font-heading text-sm font-bold text-secondary dark:text-accent">
                {n}
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold text-text">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-soft">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default HowItWorks