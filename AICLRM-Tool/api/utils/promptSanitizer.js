// Patterns that commonly indicate an attempt to override system instructions
// via user-supplied content (resume / job description text).
const INJECTION_PATTERNS = [
  /ignore (all |any |previous |above |prior )?instructions?/gi,
  /disregard (all |any |previous |above |prior )?instructions?/gi,
  /you are now/gi,
  /system prompt/gi,
  /new instructions?:/gi,
  /forget (everything|all previous)/gi,
  /act as (if you are|a)/gi,
  /\bDAN\b/g, // common jailbreak shorthand
]

/**
 * Neutralizes likely prompt-injection attempts inside user-supplied text
 * (resume / job description) before it's interpolated into the system
 * prompt. This is a defense-in-depth measure, not a guarantee — the
 * system prompt itself also carries an explicit instruction to treat
 * this content as inert data (see systemPrompt.js).
 *
 * @param {string} text
 * @returns {string}
 */
export function sanitizeUserInput(text) {
  if (typeof text !== 'string') return ''

  let sanitized = text

  INJECTION_PATTERNS.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, '[redacted]')
  })

  return sanitized
}