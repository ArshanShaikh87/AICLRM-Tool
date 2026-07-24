import { useState, useRef } from 'react'
import { generateCoverLetter } from './services/api'
import InputForm from './components/InputForm'
import OutputDisplay from './components/OutputDisplay'

function App() {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [missingKeywords, setMissingKeywords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Extra guard against double-fire (e.g. Enter + click racing),
  // on top of the disabled button state.
  const requestInFlight = useRef(false)

  const handleGenerate = async () => {
    if (requestInFlight.current) return
    requestInFlight.current = true

    setError('')
    setCoverLetter('')
    setMissingKeywords([])
    setLoading(true)

    try {
      const result = await generateCoverLetter({ resume, jobDescription })
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
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-10 px-4 py-10">
      <InputForm
        resume={resume}
        setResume={setResume}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        onGenerate={handleGenerate}
        loading={loading}
      />

      <OutputDisplay
        coverLetter={coverLetter}
        missingKeywords={missingKeywords}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default App