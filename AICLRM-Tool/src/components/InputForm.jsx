import TextAreaField from './TextAreaField'
import GenerateButton from './GenerateButton'

function InputForm({
  resume,
  setResume,
  jobDescription,
  setJobDescription,
  onGenerate,
  loading,
}) {
  const isDisabled = resume.trim() === '' || jobDescription.trim() === ''

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate()
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
      <TextAreaField
        label="Resume"
        placeholder="Paste your resume text here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        maxLength={2500}
        required
      />

      <TextAreaField
        label="Job Description"
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        maxLength={2500}
        required
      />

      <GenerateButton disabled={isDisabled} loading={loading} />
    </form>
  )
}

export default InputForm