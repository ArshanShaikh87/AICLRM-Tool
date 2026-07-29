import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import Container from './Container'

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const isDark = theme === 'dark'

  return (
    <nav
      aria-label="Primary Navigation"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 shadow-sm backdrop-blur-md dark:bg-black/80'
          : 'bg-transparent'
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <button
          type="button"
          onClick={scrollToTop}
          className="cursor-pointer text-lg font-semibold tracking-normal text-gray-900 dark:text-gray-100"
        >
          AI Cover Letter
        </button>

        <div className="flex-1" />

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-600 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d05] dark:text-gray-400 dark:hover:bg-gray-900"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-600 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d05] dark:text-gray-400 dark:hover:bg-gray-900"
          >
            <FaGithub size={20} />
          </a>

          <button
            type="button"
            onClick={scrollToGenerator}
            className="rounded-xl bg-[#ff4d05] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#e64504] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d05] focus-visible:ring-offset-2"
          >
            Get Started
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-600 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d05] dark:text-gray-400 dark:hover:bg-gray-900"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Mobile menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-600 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d05] dark:text-gray-400 dark:hover:bg-gray-900"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white/80 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-gray-800 dark:bg-black/80 md:hidden">
          <Container className="flex flex-col gap-3 py-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d05] dark:text-gray-400 dark:hover:bg-gray-900"
            >
              <FaGithub size={20} />
              GitHub
            </a>

            <button
              type="button"
              onClick={scrollToGenerator}
              className="flex h-11 items-center justify-center rounded-xl bg-[#ff4d05] px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#e64504] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d05] focus-visible:ring-offset-2"
            >
              Get Started
            </button>
          </Container>
        </div>
      )}
    </nav>
  )
}

export default Navbar