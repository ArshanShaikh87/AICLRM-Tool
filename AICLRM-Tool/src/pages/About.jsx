import { Target, ShieldCheck, Users, Sparkles } from 'lucide-react'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import Container from '../components/landing/Container'
import Card from '../components/Card'

const VALUES = [
  {
    icon: Target,
    title: 'Built for one problem',
    body: 'Not a resume builder, not a job board, not a career platform. Just the one repetitive step everyone hates   writing a fresh cover letter for every application.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy by default',
    body: 'Nothing you paste is saved on a server. Your resume and the job description exist in your browser tab, get sent once for processing, and are gone.',
  },
  {
    icon: Users,
    title: 'Made for the Indian job hunt',
    body: 'Tone, structure, and phrasing are tuned for how recruiters in India actually read applications   not adapted from a US template.',
  },
  {
    icon: Sparkles,
    title: 'Honest output',
    body: 'The tool never invents experience, skills, or achievements. Your resume is the only source of truth it is allowed to draw from.',
  },
]

function About() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />

      <main className="pt-32 pb-20 md:pt-40 md:pb-28">
        <Container className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary dark:text-accent">
            About
          </span>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl">
            One resume. Every job description. A letter that actually fits.
          </h1>

          <p className="mt-5 text-[16px] leading-relaxed text-text-soft sm:text-[17px]">
            This tool exists because of a very specific kind of tired: opening a blank
            document for the fifth time this week to write &ldquo;yet another&rdquo;
            cover letter that says the same thing in slightly different words. Most
            people either reuse one generic letter everywhere, or burn an evening
            rewriting it by hand for each role.
          </p>

          <p className="mt-4 text-[16px] leading-relaxed text-text-soft sm:text-[17px]">
            The idea here is simple: paste your resume once, paste the job description,
            and get a genuinely tailored first draft   plus the keywords your resume is
            missing before an ATS filters you out. No account, no template picker, no
            twenty-question onboarding form.
          </p>
        </Container>

        <Container className="mt-14 max-w-3xl">
          <div className="grid gap-5 sm:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="flex flex-col gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary dark:bg-accent/15 dark:text-accent">
                  <Icon size={19} />
                </span>
                <h2 className="font-heading text-[15px] font-semibold text-text">
                  {title}
                </h2>
                <p className="text-sm leading-relaxed text-text-soft">{body}</p>
              </Card>
            ))}
          </div>
        </Container>

        <Container className="mt-14 max-w-3xl">
          <Card className="flex flex-col gap-3">
            <h2 className="font-heading text-lg font-semibold text-text">
              Who this is for
            </h2>
            <p className="text-sm leading-relaxed text-text-soft">
              Freshers applying to their first few roles, working professionals
              switching companies, and anyone who would rather spend their time
              actually applying than formatting paragraphs. Career changers and
              mentors helping others apply are welcome to use it too.
            </p>
          </Card>
        </Container>

        <Container className="mt-8 max-w-3xl">
          <Card className="flex flex-col gap-3">
            <h2 className="font-heading text-lg font-semibold text-text">
              A small, independent project
            </h2>
            <p className="text-sm leading-relaxed text-text-soft">
              This is built and maintained as an independent project, not by a large
              company. It runs on a lightweight serverless backend with no database  
              your data has nowhere to be stored even if we wanted to keep it. For
              details on exactly what happens to your information, see the{' '}
              <a href="/policies" className="text-secondary underline underline-offset-2 dark:text-accent">
                Policies
              </a>{' '}
              page.
            </p>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default About