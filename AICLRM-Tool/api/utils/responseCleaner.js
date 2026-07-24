/**
 * Cleans raw AI-generated text before validation/response.
 * Pure function — no side effects, no logging.
 *
 * @param {string} text
 * @returns {string}
 */
export function cleanResponseText(text) {
  if (typeof text !== 'string') return ''

  let cleaned = text

  // Remove control chars and invisible unicode (zero-width spaces, BOM, etc.)
  // Keeps normal \n and \t.
  cleaned = cleaned.replace(
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028\u2029\uFEFF]/g,
    ''
  )

  // Normalize Windows line endings
  cleaned = cleaned.replace(/\r\n/g, '\n')

  // Trim trailing spaces on every line
  cleaned = cleaned
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')

  // Collapse 3+ consecutive blank lines into a single blank line
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n')

  // Trim overall leading/trailing whitespace
  cleaned = cleaned.trim()

  return cleaned
}