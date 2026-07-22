import { useState } from 'react'
import InputForm from './components/InputForm'
import OutputDisplay from './components/OutputDisplay'

function App() {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [missingKeywords, setMissingKeywords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = () => {
    setLoading(true)
    setError(null)

    // Temporary dummy logic — will be replaced by services/api.js later
    setTimeout(() => {
      setCoverLetter(
        'Dear Hiring Manager,\n\nThis is a placeholder cover letter generated for UI testing purposes. Once the Claude API integration is complete, this text will be replaced with an actual tailored cover letter based on your resume and the job description.\n\nSincerely,\nCandidate'
      )
      setMissingKeywords(['Spring Boot', 'REST API', 'Hibernate', 'MySQL'])
      setLoading(false)
    }, 2000)
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