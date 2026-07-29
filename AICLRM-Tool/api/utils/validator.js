const MAX_LENGTH = 2500
const MAX_IMAGE_BASE64_LENGTH = 6_000_000 // ~4.5MB decoded ceiling

function isBlank(value) {
  return typeof value !== 'string' || value.trim().length === 0
}

export function validateInput(payload) {
  const { resume, resumeImage, jobDescription } = payload || {}

  const hasResumeText = !isBlank(resume)
  const hasResumeImage = Boolean(resumeImage?.base64)

  if (!hasResumeText && !hasResumeImage) {
    return 'resume_required'
  }

  if (hasResumeImage && resumeImage.base64.length > MAX_IMAGE_BASE64_LENGTH) {
    return 'input_too_long'
  }

  if (hasResumeText && resume.length > MAX_LENGTH) {
    return 'input_too_long'
  }

  if (isBlank(jobDescription)) {
    return 'job_description_required'
  }

  if (jobDescription.length > MAX_LENGTH) {
    return 'input_too_long'
  }

  return null
}