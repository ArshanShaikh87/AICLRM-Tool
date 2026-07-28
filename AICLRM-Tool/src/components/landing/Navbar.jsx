import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import Container from './Container'

const GITHUB_URL = 'https://github.com/'

const iconButtonClass =
  'flex h-11 w-11 items-center justify-center rounded-xl text-gray-600 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d05] dark:text-gray-400 dark:hover:bg-gray-900'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, [isDark])

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20

      setIsScrolled((prev) => {
        if (prev !== shouldBeScrolled) {
          return shouldBeScrolled
        }
        return prev
      })
    }
    

    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    setIsMobileMenuOpen(false)
  }

  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({
      behavior: 'smooth',
    })

    setIsMobileMenuOpen(false)
  }

const toggleTheme = () => {
  setIsDark((prev) => {
    const next = !prev

    if (next) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    return next
  })
}

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

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
        {/* Left */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="cursor-pointer text-lg font-semibold tracking-normal text-gray-900 transition-colors hover:text-[#ff4d05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d05] dark:text-gray-100"
          >
            AI Cover Letter
          </button>
        </div>

        {/* Right Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={iconButtonClass}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={iconButtonClass}
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

        {/* Right Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={iconButtonClass}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className={iconButtonClass}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white/80 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-black/80 md:hidden">
          <Container className="flex flex-col gap-3 py-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d05] dark:text-gray-400 dark:hover:bg-gray-900"
            >
              <FaGithub size={20} />
              <span>GitHub</span>
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