import { FaGithub } from 'react-icons/fa'
import Container from './Container'
import { useAppRouter } from '../../router/Router'
import Logo from '../Logo'

const LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Policies', to: '/policies' },
]

function Footer() {
  const { navigate } = useAppRouter()
  return (
    <footer className="border-t border-border bg-bg">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            {/* <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary font-heading text-xs font-bold text-secondary-text">
              CL
            </span> */}
            <span className="flex h-9 w-9 items-center justify-center transition-transform duration-300 group-hover:-rotate-6">
              <Logo />
            </span>
            <span className="font-heading text-sm font-semibold text-text">
              Cover<span className="text-accent">Letter</span>
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-soft">
            Built for job seekers, not job boards. Paste, tailor, apply.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-soft">
            {LINKS.map(({ label, to }) => (

              <a key={label}
                href={to}
                onClick={(e) => { e.preventDefault(); navigate(to) }}
                className="transition-colors hover:text-text"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-soft transition-colors hover:bg-surface hover:text-text"
          >
            <FaGithub size={17} />
          </a>
        </div>
      </Container>

      <div className="border-t border-border py-5">
        <Container>
          <p className="text-center text-xs text-text-soft sm:text-left">
            © 2026 AI Cover Letter & Resume Match Tool. Built as a personal project.
          </p>
        </Container>
      </div>
    </footer>
  )
}

export default Footer