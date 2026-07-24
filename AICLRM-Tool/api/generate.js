import { validateInput } from './utils/validator.js'
import { buildSystemPrompt } from './prompts/systemPrompt.js'
import { generateText } from './providers/gemini.js'

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
 * Maps a provider (Gemini today, others later) error into a canonical
 * error code. Private to this file — if more providers or statuses
 * are added later, this is the only place that changes.
 */
function mapProviderError(error) {
  switch (error.status) {
    case 429:
      return 'rate_limit_exceeded'
    case 401:
    case 403:
    case 500:
    default:
      return 'generation_failed'
  }
}

/**
 * Maps any internal result (from any provider) into the one public
 * response contract. This is the single place that defines what the
 * frontend ever sees.
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

  const { resume, jobDescription } = req.body || {}

  const validationError = validateInput({ resume, jobDescription })
  if (validationError) {
    return sendError(res, 400, validationError)
  }

  const prompt = buildSystemPrompt({ resume, jobDescription })

  let coverLetter

  try {
    coverLetter = await generateText(prompt)
  } catch (err) {
    const errorCode = mapProviderError(err)
    const status = errorCode === 'rate_limit_exceeded' ? 429 : 500
    return sendError(res, status, errorCode)
  }

  return res.status(200).json(
    buildResponse({
      coverLetter,
      missingKeywords: [],
    })
  )
}