/**
 * Parses the raw AI response into { coverLetter, missingKeywords }.
 * Throws a ParseError (never a provider error) on any structural problem
 * so the caller (generate.js) can distinguish "retry the AI call" from
 * "the AI/network itself failed".
 */
class ParseError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ParseError'
    this.isParseError = true
  }
}

export function parseAiResponse(rawText) {
  if (typeof rawText !== 'string' || !rawText.trim()) {
    throw new ParseError('Empty AI response')
  }

  // Defensive: strip markdown code fences even though the prompt forbids them.
  let cleaned = rawText.trim()
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim()

  let parsed
  try {
    parsed = JSON.parse(cleaned)
  } catch {
    throw new ParseError('AI response was not valid JSON')
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new ParseError('AI response JSON was not an object')
  }

  if (typeof parsed.coverLetter !== 'string' || !parsed.coverLetter.trim()) {
    throw new ParseError('AI response missing a valid coverLetter field')
  }

  const missingKeywords = Array.isArray(parsed.missingKeywords)
    ? parsed.missingKeywords
        .filter((kw) => typeof kw === 'string' && kw.trim().length > 0)
        .map((kw) => kw.trim())
        .slice(0, 8) // hard ceiling   defensive against a runaway list
    : []

  return {
    coverLetter: parsed.coverLetter,
    missingKeywords,
  }
}