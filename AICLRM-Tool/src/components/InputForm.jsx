import ResumeUpload from './ResumeUpload'
import TextAreaField from './TextAreaField'
import GenerateButton from './GenerateButton'
import ConsentCheckbox from './ConsentCheckbox'
import { RESUME_MAX_LENGTH } from '../constants/limits'
import { JOB_DESCRIPTION_MAX_LENGTH } from '../constants/limits'
function InputForm({
  resumeText,
  onResumeTextExtracted,
  onResumeImageExtracted,
  onResumeClear,
  hasResume,
  jobDescription,
  setJobDescription,
  consentGiven,
  setConsentGiven,
  onGenerate,
  loading,
}) {
  const isDisabled =
    !hasResume ||
    jobDescription.trim() === '' ||
    !consentGiven ||
    resumeText.length > RESUME_MAX_LENGTH ||
    jobDescription.length > JOB_DESCRIPTION_MAX_LENGTH

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate()
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-2 text-left">
        <label className="mb-2 block text-base font-medium text-text">
          Resume<span className="ml-1 text-accent">*</span>
        </label>
        <ResumeUpload
          resumeText={resumeText}
          onTextExtracted={onResumeTextExtracted}
          onImageExtracted={onResumeImageExtracted}
          onClear={onResumeClear}
        />
      </div>

      <TextAreaField
        label="Job Description"
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        maxLength={JOB_DESCRIPTION_MAX_LENGTH}
        required
      />

      <ConsentCheckbox checked={consentGiven} onChange={setConsentGiven} />

      <GenerateButton disabled={isDisabled} loading={loading} />
    </form>
  )
}

export default InputForm