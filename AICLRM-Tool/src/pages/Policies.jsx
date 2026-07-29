import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import Container from '../components/landing/Container'
import Card from '../components/Card'

const LAST_UPDATED = 'July 2026'

const SECTIONS = [
  { id: 'privacy-policy', label: 'Privacy Policy' },
  { id: 'terms-of-service', label: 'Terms of Service' },
  { id: 'data-and-storage', label: 'Data & Storage' },
  { id: 'cookies', label: 'Cookies & Local Storage' },
  { id: 'third-party', label: 'Third-Party Services' },
  { id: 'acceptable-use', label: 'Acceptable Use' },
  { id: 'disclaimer', label: 'Disclaimer' },
  { id: 'changes', label: 'Changes to This Page' },
  { id: 'contact', label: 'Contact' },
]

function Policies() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />

      <main className="pt-32 pb-20 md:pt-40 md:pb-28">
        <Container className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary dark:text-accent">
            Policies
          </span>
          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl">
            Privacy, Terms and how your data is handled
          </h1>
          <p className="mt-5 text-[15px] text-text-soft">Last updated: {LAST_UPDATED}</p>
        </Container>

        <Container className="mt-8 max-w-3xl">
          <Card>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-text-soft">
              On this page
            </h2>
            <nav aria-label="Policy sections" className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-sm text-secondary underline underline-offset-2 dark:text-accent"
                >
                  {label}
                </a>
              ))}
            </nav>
          </Card>
        </Container>

        <Container className="mt-10 flex max-w-3xl flex-col gap-10 text-left">
          <section id="privacy-policy" className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-text">Privacy Policy</h2>
            <p className="text-[15px] leading-relaxed text-text-soft">
              This service is built to collect as little as possible. We do not require
              an account, and we do not run a database of user submissions.
            </p>
            <ul className="flex flex-col gap-2 pl-1 text-[15px] leading-relaxed text-text-soft">
              <li>
                Your resume and job description text are sent to our serverless backend
                only to generate a cover letter, and are not written to any database or
                log store by us.
              </li>
              <li>
                We do not sell, rent, or share your resume or job description content
                with advertisers or data brokers.
              </li>
              <li>
                Basic technical data, such as IP address and request timestamps, may be
                processed transiently by our hosting provider for rate limiting and
                abuse prevention, and is not linked to any personal profile.
              </li>
              <li>
                We do not knowingly collect information from anyone under the age of 18,
                and this service is intended for use by job seekers of working age.
              </li>
            </ul>
          </section>

          <section id="terms-of-service" className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-text">Terms of Service</h2>
            <p className="text-[15px] leading-relaxed text-text-soft">
              By using this tool, you agree to the following terms. If you do not agree,
              please do not use the service.
            </p>
            <ul className="flex flex-col gap-2 pl-1 text-[15px] leading-relaxed text-text-soft">
              <li>
                The service generates AI-assisted draft cover letters based on the text
                you provide. It is a drafting aid, not professional career, legal, or
                employment advice.
              </li>
              <li>
                You are responsible for reviewing, editing, and verifying the accuracy of
                any generated content before submitting it as part of a job application.
              </li>
              <li>
                You retain full ownership of the content you submit and the letters
                generated from it. We claim no ownership over your resume, job
                description, or output.
              </li>
              <li>
                You agree not to use the service to generate misleading, fraudulent,
                defamatory, or unlawful content, or to misrepresent qualifications you do
                not hold.
              </li>
              <li>
                The service is provided on an as-is, as-available basis, without warranty
                of uninterrupted availability or error-free operation.
              </li>
              <li>These terms are governed by the laws of India.</li>
            </ul>
          </section>

          <section id="data-and-storage" className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-text">Data &amp; Storage</h2>
            <p className="text-[15px] leading-relaxed text-text-soft">
              There is no persistent server-side storage in this application. Resume and
              job description text live only in your browser tab for the current session
              and are cleared automatically when the tab or browser session ends. Closing
              the tab removes them completely from your device; we never had a copy to
              begin with.
            </p>
          </section>

          <section id="cookies" className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-text">
              Cookies &amp; Local Storage
            </h2>
            <p className="text-[15px] leading-relaxed text-text-soft">
              We do not use tracking or advertising cookies. The only value stored in
              your browser is your light or dark theme preference, saved in{' '}
              <code>localStorage</code> so the site remembers your choice on your next
              visit. This value never leaves your device.
            </p>
          </section>

          <section id="third-party" className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-text">
              Third-Party Services
            </h2>
            <p className="text-[15px] leading-relaxed text-text-soft">
              To generate a cover letter, the text you submit is sent to a third-party AI
              provider, Google&apos;s Gemini API, for processing. That provider processes
              the request under its own terms and privacy policy, which we encourage you
              to review separately. We do not control how that provider handles data
              beyond the request we send.
            </p>
          </section>

          <section id="acceptable-use" className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-text">Acceptable Use</h2>
            <p className="text-[15px] leading-relaxed text-text-soft">
              Please do not attempt to abuse, overload, scrape, or reverse-engineer the
              service, send automated bulk requests, or use it to generate content
              intended to harass, discriminate against, or deceive others. We reserve the
              right to rate-limit or block access from sources that violate this.
            </p>
          </section>

          <section id="disclaimer" className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-text">Disclaimer</h2>
            <p className="text-[15px] leading-relaxed text-text-soft">
              Cover letters are generated by an AI model and, like any AI output, may
              occasionally be inaccurate, generic, or need editing. We do not guarantee
              interview calls, job offers, or any specific hiring outcome from using this
              tool. Always review the final letter before sending it.
            </p>
          </section>

          <section id="changes" className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-text">
              Changes to This Page
            </h2>
            <p className="text-[15px] leading-relaxed text-text-soft">
              This page may be updated as the product evolves. Material changes will
              update the &ldquo;Last updated&rdquo; date above. Continued use of the
              service after a change means you accept the revised terms.
            </p>
          </section>

          <section id="contact" className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-text">Contact</h2>
            <p className="text-[15px] leading-relaxed text-text-soft">
              Questions about privacy or these terms can be sent through the
              project&apos;s GitHub page linked in the footer.
            </p>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default Policies