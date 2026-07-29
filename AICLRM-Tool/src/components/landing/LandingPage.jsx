import Navbar from './Navbar'
import Hero from './Hero'
//import GeneratorPlaceholder from './GeneratorPlaceholder'
import GeneratorSection from './GeneratorSection'
import TrustSection from './TrustSection'
import FeaturesSection from './FeaturesSection'
import HowItWorks from './HowItWorks'
import FinalCTA from './FinalCTA'
import Footer from './Footer'

function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />

      <main>
        <section aria-label="Hero">
          <Hero />
        </section>

        <GeneratorSection />

        <section aria-label="Why people trust it">
          <TrustSection />
        </section>

        <section aria-label="Features">
          <FeaturesSection />
        </section>

        <section id="how-it-works" aria-label="How it works">
          <HowItWorks />
        </section>

        <section aria-label="Call to action">
          <FinalCTA />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage