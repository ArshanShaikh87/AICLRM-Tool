import Navbar from './Navbar'
import Hero from './Hero'
import GeneratorPlaceholder from './GeneratorPlaceholder'
import TrustSection from './TrustSection'
import FeaturesSection from './FeaturesSection'
import HowItWorks from './HowItWorks'
import FinalCTA from './FinalCTA'
import Footer from './Footer'

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-black/80">
        <Navbar />
      </header>

      <main>
        <section aria-label="Hero">
          <Hero />
        </section>

        <GeneratorPlaceholder />

        <section aria-label="Trust indicators">
          <TrustSection />
        </section>

        <section aria-label="Features">
          <FeaturesSection />
        </section>

        <section aria-label="How it works">
          <HowItWorks />
        </section>

        <section aria-label="Call to action">
          <FinalCTA />
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800">
        <Footer />
      </footer>
    </div>
  )
}

export default LandingPage