import { validateInput } from './utils/validator.js'
import { buildSystemPrompt } from './prompts/systemPrompt.js'

const ALLOWED_METHOD = 'POST'

/**
 * Sends a standardized error response.
 * Every error in this file goes through this single function so the
 * `{ error: { code } }` shape never gets duplicated inline.
 */
function sendError(res, status, code) {
  res.status(status).json({ error: { code } })
}

/**
 * Maps any internal result (dummy today, real AI response later) into
 * the one public response contract. This is the single place that
 * defines what the frontend ever sees.
 */
function buildResponse({ coverLetter, missingKeywords }) {
  return {
    coverLetter,
    missingKeywords,
  }
}

export default async function handler(req, res) {
  if (req.method !== ALLOWED_METHOD) {
    return sendError(res, 405, 'method_not_allowed')
  }

  try {
    const { resume, jobDescription } = req.body || {}

    const validationError = validateInput({ resume, jobDescription })
    if (validationError) {
      return sendError(res, 400, validationError)
    }

    // Prompt is built but not sent anywhere yet — placeholder until
    // the AI provider is wired in.
    buildSystemPrompt({ resume, jobDescription })

    // Dummy Response Policy: deterministic output, no AI call yet.
    const dummyResult = {
      coverLetter:
        'Dummy cover letter generated for testing purposes. This will be replaced once Claude API integration is complete.',
      missingKeywords: ['Leadership', 'Docker'],
    }

    return res.status(200).json(buildResponse(dummyResult))
  } catch(error) {
    return sendError(res, 500, 'generation_failed')
  }
}