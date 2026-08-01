import { FileText, KeyRound, Globe2, ShieldCheck, Copy, Lock } from 'lucide-react'
import Container from './Container'
import Card from '../Card'

const FEATURES = [
  {
    icon: FileText,
    title: 'A full draft, not a snippet',
    body: 'A 250–300 word cover letter, structured with a greeting, your strongest matches, and a close   ready to send.',
  },
  {
    icon: KeyRound,
    title: 'Keyword gap analysis',
    body: 'See the 3–5 terms from the job description your resume is missing, before an ATS filters you out.',
  },
  {
    icon: Globe2,
    title: 'India-context tone',
    body: 'Professional and warm, written for how it reads here   not translated from a US or UK template.',
  },
  {
    icon: ShieldCheck,
    title: 'Never invents experience',
    body: 'Your resume is the only source of truth. If a skill is not on it, the letter will not claim you have it.',
  },
  {
    icon: Copy,
    title: 'Copy in one click',
    body: 'No downloads, no formatting to clean up. Copy the text and paste it straight into the application.',
  },
  {
    icon: Lock,
    title: 'No login, no history',
    body: 'There is nothing to sign up for, and nothing saved after you close the tab.',
  },
]

function FeaturesSection() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary dark:text-accent">
            What you get
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-4xl">
            Built around one job description at a time
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="group flex flex-col gap-3 transition-shadow hover:shadow-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-accent group-hover:text-accent-text dark:bg-accent/15 dark:text-accent">
                <Icon size={19} />
              </span>
              <h3 className="font-heading text-[15px] font-semibold text-text">{title}</h3>
              <p className="text-sm leading-relaxed text-text-soft">{body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default FeaturesSection