export const ERROR_MESSAGES = {
  resume_required: 'Please paste your resume before generating.',
  job_description_required: 'Please paste the job description before generating.',
  input_too_long: 'Resume or job description is too long. Please shorten it.',
  rate_limit_exceeded: 'Too many requests right now. Please try again in a few minutes.',
  network_error: 'Network error. Please check your connection and try again.',
  invalid_response: 'Something went wrong on our end. Please try again.',
  low_quality_output: 'Unable to generate a high-quality cover letter. Please try again.',
  generation_failed: 'Something went wrong while generating your cover letter. Please try again.',
  method_not_allowed: 'Something went wrong. Please refresh and try again.',
}

export function getErrorMessage(code) {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES.generation_failed
}