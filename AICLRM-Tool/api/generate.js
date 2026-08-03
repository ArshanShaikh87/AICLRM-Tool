import { validateInput } from './utils/validator.js'
import { buildSystemPrompt } from './prompts/systemPrompt.js'
import { generateText } from './providers/gemini.js'
import { parseAiResponse } from './utils/responseParser.js'
import { cleanResponseText } from './utils/responseCleaner.js'
import { isValidCoverLetter } from './utils/responseValidator.js'
import { checkRateLimit } from './utils/rateLimiter.js'
const ALLOWED_METHOD = 'POST'

//const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://yourdomain.com'
// Comma-separated list in .env, e.g.:
// ALLOWED_ORIGIN=https://aiclrm.vercel.app,https://aiclrm-tool.vercel.app
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

/**
 * Returns the origin to echo back in Access-Control-Allow-Origin, or
 * null if the request's origin isn't on the allowlist. Vercel preview
 * deployments get unique subdomains every time, so a single hardcoded
 * origin breaks CORS on every preview build   this checks against a
 * list instead of one fixed string.
 */
function resolveAllowedOrigin(requestOrigin) {
  if (!requestOrigin) return null
  return ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : null
}
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
  const requestOrigin = req.headers.origin
  const allowedOrigin = resolveAllowedOrigin(requestOrigin)

  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Vary', 'Origin') // caches must not serve one origin's CORS headers to another

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  // If the origin exists but isn't allowed, block outright instead of
  // silently omitting the header (browser would block it anyway, but
  // this gives a clear, logged reason rather than a vague CORS failure).
  if (requestOrigin && !allowedOrigin) {
    return sendError(res, 403, 'origin_not_allowed')
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

  /**
   * Calls Gemini and parses the JSON response.
   * Any structural JSON problem throws a ParseError (from responseParser.js);
   * any network/API problem throws a provider error (has .status).
   * Kept as its own function so the retry logic below stays simple.
   */
  async function callAndParse() {
    const raw = await generateText(prompt, resumeImage)
    return parseAiResponse(raw)
  }

  let parsed

  try {
    parsed = await callAndParse()
  } catch (err) {
    console.error("Provider Error:", err);
    console.error("Status:", err.status);
    console.error("Message:", err.message);
    if (err.isParseError) {
      // JSON Reliability rule (dev notes #3): retry once on parse failure.
      try {
        parsed = await callAndParse()
      } catch (retryErr) {
        console.error("Retry Error:", retryErr);
        if (retryErr.isParseError) {
          return sendError(res, 500, 'generation_failed')
        }
        const errorCode = mapProviderError(retryErr)
        const status = errorCode === 'rate_limit_exceeded' ? 429 : 500
        return sendError(res, status, errorCode)
      }
    } else {
      const errorCode = mapProviderError(err)
      const status = errorCode === 'rate_limit_exceeded' ? 429 : 500
      return sendError(res, status, errorCode)
    }
  }

  const coverLetter = cleanResponseText(parsed.coverLetter)

  if (!isValidCoverLetter(coverLetter)) {
    return sendError(res, 500, 'low_quality_output')
  }

  return res.status(200).json(
    buildResponse({
      coverLetter,
      missingKeywords: parsed.missingKeywords,
    })
  )
}