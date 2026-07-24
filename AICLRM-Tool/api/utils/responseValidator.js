const MIN_LENGTH = 150 // rough floor for "this looks like a real cover letter"

// Patterns that signal the model refused, apologized, or produced a
// non-answer instead of an actual cover letter.
const REFUSAL_PATTERNS = [
  /^i'?m sorry/i,
  /^sorry[,.]/i,
  /^i cannot/i,
  /^i can'?t/i,
  /^as an ai/i,
  /i am unable to/i,
  /^unable to/i,
  /i don'?t have (enough )?information/i,
  /^i need more (information|details|context)/i,
]

/**
 * Decides whether a cleaned response is good enough to send to the user.
 *
 * @param {string} text — already passed through cleanResponseText
 * @returns {boolean}
 */
export function isValidCoverLetter(text) {
  if (typeof text !== 'string') return false

  const trimmed = text.trim()

  if (trimmed.length === 0) return false
  if (trimmed.length < MIN_LENGTH) return false
  if (REFUSAL_PATTERNS.some((pattern) => pattern.test(trimmed))) return false

  return true
}