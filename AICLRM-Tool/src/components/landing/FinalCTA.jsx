import Button from '../Button'
import Container from './Container'

function FinalCTA() {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-secondary py-20 text-secondary-text md:py-28">
      <Container className="flex flex-col items-center text-center">
        <h2 className="max-w-xl font-heading text-3xl font-bold leading-tight sm:text-4xl">
          Your next application deserves more than a copy-paste letter.
        </h2>
        <p className="mt-4 max-w-md text-[15px] text-secondary-text/80">
          Paste your resume and a job description above. The first draft is free —
          and it stays free.
        </p>
        <Button variant="primary" onClick={scrollToGenerator} className="mt-8">
          Jump to the generator
        </Button>
      </Container>
    </section>
  )
}

export default FinalCTA