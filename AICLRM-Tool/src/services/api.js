// Single Source of Truth — backend endpoint is defined only here.
// If the backend URL ever changes (different host, versioned path, etc.),
// this is the only line that needs to change.
const GENERATE_ENDPOINT = '/api/generate'

/**
 * Sends resume + job description to the backend and returns a
 * tailored cover letter along with missing keywords.
 *
 * @param {{ resume: string, jobDescription: string }} payload
 * @returns {Promise<{ coverLetter: string, missingKeywords: string[] }>}
 *
 * @throws {Error} with `.message` set to the backend's canonical error
 * code (e.g. "input_too_long", "rate_limit_exceeded", "generation_failed").
 * Human-readable details, if any, are for debugging only and are never
 * relied upon by the caller.
 */
export async function generateCoverLetter(payload) {
  let response

  try {
    response = await fetch(GENERATE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    // Network failure (offline, DNS, CORS, etc.) — normalize into the
    // same Error contract callers already handle.
    throw new Error('network_error')
  }

  let data

  try {
    data = await response.json()
  } catch {
    throw new Error('invalid_response')
  }

  if (!response.ok) {
    const errorCode = data?.error?.code || data?.error || 'generation_failed'
    throw new Error(errorCode)
  }

  // Only documented fields are exposed to the caller. If the backend
  // starts sending additional metadata (usage, tokens, model, timings),
  // it will be selectively added here — App.jsx will never see raw
  // backend response shapes.
  return {
    coverLetter: data.coverLetter ?? '',
    missingKeywords: data.missingKeywords ?? [],
  }
}