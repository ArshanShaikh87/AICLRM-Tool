import { ShieldCheck, MessageSquare, Sparkles } from 'lucide-react'
import Container from './Container'
import Card from '../Card'

const POINTS = [
  {
    icon: ShieldCheck,
    title: 'Nothing you paste is stored',
    body: 'Your resume and job description live in your browser tab. Close it, and they are gone   no account, no database.',
  },
  {
    icon: MessageSquare,
    title: 'Two inputs, not twenty',
    body: 'No onboarding forms, no templates to pick. Paste your resume, paste the role, and you are done.',
  },
  {
    icon: Sparkles,
    title: 'Written for Indian hiring',
    body: 'Tone, structure, and phrasing tuned for how recruiters in India actually read a cover letter not a US-market export.',
  },
]

function TrustSection() {
  return (
    <section className="border-t border-border py-16 md:py-20">
      <Container>
        <div className="grid gap-5 sm:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="flex flex-col gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary dark:bg-accent/15 dark:text-accent">
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

export default TrustSection