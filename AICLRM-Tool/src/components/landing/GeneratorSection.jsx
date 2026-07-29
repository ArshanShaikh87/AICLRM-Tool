import { useState, useRef } from 'react'
import { Sparkles } from 'lucide-react'
import { generateCoverLetter } from '../../services/api'
import Container from './Container'
import InputForm from '../InputForm'
import OutputDisplay from '../OutputDisplay'

function GeneratorSection() {
  const [resumeText, setResumeText] = useState('')
  const [resumeImage, setResumeImage] = useState(null) // { base64, mimeType } | null
  const [jobDescription, setJobDescription] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [missingKeywords, setMissingKeywords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Double-submit guard (Enter + click race), on top of disabled button state.
  const requestInFlight = useRef(false)

  const hasResume = resumeText.trim() !== '' || Boolean(resumeImage)

  const handleResumeTextExtracted = (text) => {
    setResumeText(text)
    setResumeImage(null)
  }

  const handleResumeImageExtracted = (image) => {
    setResumeImage(image)
    setResumeText('')
  }

  const handleResumeClear = () => {
    setResumeText('')
    setResumeImage(null)
  }

  const handleGenerate = async () => {
    if (requestInFlight.current) return
    requestInFlight.current = true

    setError('')
    setCoverLetter('')
    setMissingKeywords([])
    setLoading(true)

    try {
      const result = await generateCoverLetter({ resume: resumeText, resumeImage, jobDescription, })
      setCoverLetter(result.coverLetter)
      setMissingKeywords(result.missingKeywords)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      requestInFlight.current = false
    }
  }

  return (
    <section id="generator" aria-labelledby="generator-heading" className="py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary dark:text-accent">
            <Sparkles size={13} />
            Generator
          </span>
          <h2
            id="generator-heading"
            className="mt-5 font-heading text-2xl font-bold text-text sm:text-3xl"
          >
            Paste your resume and the job description
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-text-soft">
            Nothing here is saved. Generate your tailored cover letter below.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-surface p-6 shadow-[0_16px_40px_var(--shadow)] sm:p-8">
          <InputForm
            resumeText={resumeText}
            onResumeTextExtracted={handleResumeTextExtracted}
            onResumeImageExtracted={handleResumeImageExtracted}
            onResumeClear={handleResumeClear}
            hasResume={hasResume}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            onGenerate={handleGenerate}
            loading={loading}
          />
        </div>

        {(loading || error || coverLetter) && (
          <div className="mx-auto mt-8 max-w-2xl">
            <OutputDisplay
              coverLetter={coverLetter}
              missingKeywords={missingKeywords}
              loading={loading}
              error={error}
            />
          </div>
        )}
      </Container>
    </section>
  )
}

export default GeneratorSection