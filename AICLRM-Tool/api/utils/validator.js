const MAX_LENGTH = 2500 // kept in sync with TextAreaField's maxLength on the frontend

function isBlank(value) {
  return typeof value !== 'string' || value.trim().length === 0
}

/**
 * Validates the incoming request payload.
 *
 * Returns `null` when valid, or a canonical error code string when
 * invalid. Never modifies the input (no trimming, no sanitizing) —
 * that responsibility belongs to a different layer.
 *
 * @param {{ resume: unknown, jobDescription: unknown }} payload
 * @returns {string | null}
 */
export function validateInput(payload) {
  const { resume, jobDescription } = payload || {}

  if (isBlank(resume)) {
    return 'resume_required'
  }

  if (isBlank(jobDescription)) {
    return 'job_description_required'
  }

  if (resume.length > MAX_LENGTH) {
    return 'input_too_long'
  }

  if (jobDescription.length > MAX_LENGTH) {
    return 'input_too_long'
  }

  return null
}