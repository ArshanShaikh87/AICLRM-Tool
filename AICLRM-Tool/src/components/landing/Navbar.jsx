import { useState, useEffect } from 'react'
import { PenLine, MoonStar, Menu, X } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import Container from './Container'
import Button from '../Button'

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') {
    return stored
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

  const isDark = theme === 'dark'

  return (
    <nav
      aria-label="Primary"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'border-b border-border bg-bg/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container className="flex items-center justify-between py-3.5">
        <button
          type="button"
          onClick={scrollToTop}
          className="group flex items-center gap-2.5 focus-visible:outline-none"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary font-heading text-sm font-bold text-secondary-text transition-transform duration-300 group-hover:-rotate-6">
            CL
          </span>
          <span className="font-heading text-[15px] font-semibold tracking-tight text-text">
            Cover<span className="text-accent">Letter</span>
          </span>
        </button>

        <div className="flex-1" />

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text-soft transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FaGithub size={18} />
          </a>

          <Button variant="primary" onClick={scrollToGenerator} className="ml-1">
            Get Started
          </Button>
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {isMobileMenuOpen && (
        <div className="border-t border-border bg-bg md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center gap-2.5 rounded-lg px-3 text-sm font-medium text-text-soft transition-colors hover:bg-surface hover:text-text"
            >
              <FaGithub size={18} />
              View source on GitHub
            </a>
            <Button variant="primary" onClick={scrollToGenerator} className="mt-1 w-full justify-center">
              Get Started
            </Button>
          </Container>
        </div>
      )}
    </nav>
  )
}

/**
 * Replaces the generic Sun/Moon icon-button with a pill switch using
 * PenLine (light — writing) / MoonStar (dark). The sliding knob makes
 * state legible even without reading the icon.
 */
function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-10 w-[68px] shrink-0 items-center rounded-full border border-border bg-surface px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-text shadow-sm transition-transform duration-300 ease-out ${
          isDark ? 'translate-x-[28px]' : 'translate-x-0'
        }`}
      >
        {isDark ? <MoonStar size={15} /> : <PenLine size={15} />}
      </span>
    </button>
  )
}

export default Navbar