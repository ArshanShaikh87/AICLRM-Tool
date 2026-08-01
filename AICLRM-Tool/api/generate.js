import { validateInput } from './utils/validator.js'
import { buildSystemPrompt } from './prompts/systemPrompt.js'
import { generateText } from './providers/gemini.js'
import { cleanResponseText } from './utils/responseCleaner.js'
import { isValidCoverLetter } from './utils/responseValidator.js'
import { checkRateLimit } from './utils/rateLimiter.js'
const ALLOWED_METHOD = 'POST'
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://yourdomain.com'
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
 * error code. Private to this file   if more providers or statuses
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb', // images ke base64 size ke liye default 4mb kaafi nahi
    },
  },
}


export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== ALLOWED_METHOD) {
    return sendError(res, 405, 'method_not_allowed')
  }

  try {
    const { success, remaining, reset } = await checkRateLimit(req)

    res.setHeader('X-RateLimit-Remaining', remaining)
    res.setHeader('X-RateLimit-Reset', reset)

    if (!success) {
      return sendError(res, 429, 'rate_limit_exceeded')
    }
  } catch {
    // Redis itself unreachable   fail open (don't block real users
    // because of an infra hiccup), but this should trigger monitoring
    // once Sentry/error tracking is wired up in Phase 3.
  }

  const { resume, resumeImage, jobDescription } = req.body || {}

  //const validationError = validateInput({ resume, jobDescription })
  const validationError = validateInput({ resume, resumeImage, jobDescription })
  if (validationError) {
    return sendError(res, 400, validationError)
  }

  //const prompt = buildSystemPrompt({ resume, jobDescription })
  const prompt = buildSystemPrompt({ resume, jobDescription, hasResumeImage: Boolean(resumeImage?.base64) })

  let rawCoverLetter

  try {
    //rawCoverLetter = await generateText(prompt)
    rawCoverLetter = await generateText(prompt, resumeImage)
  } catch (err) {
    const errorCode = mapProviderError(err)
    const status = errorCode === 'rate_limit_exceeded' ? 429 : 500
    return sendError(res, status, errorCode)
  }

  const coverLetter = cleanResponseText(rawCoverLetter)

  if (!isValidCoverLetter(coverLetter)) {
    return sendError(res, 500, 'low_quality_output')
  }

  return res.status(200).json(
    buildResponse({
      coverLetter,
      missingKeywords: [],
    })
  )
}